/**
 * Full static clone of a live site into a local, servable folder.
 *
 * Captures rendered HTML for every crawled page plus every network asset
 * (CSS, JS, fonts, images), saves them to disk mirroring the URL paths, and
 * rewrites absolute/protocol-relative URLs to root-relative local paths so the
 * result runs on a plain static server.
 *
 * Scope: front-end shell only. Server features (Shopify cart, checkout, app
 * APIs, search) are dead on the clone. Do not publish someone else's content.
 *
 * Usage:
 *   npm run clone:yatao
 *   node scripts/clone-yatao.mjs --url https://yataoshop.com --out reference/yatao/clone --max 40
 *
 * Then:
 *   npx serve reference/yatao/clone   # serves at domain root
 */

import { mkdir, writeFile, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { chromium } from "playwright";

const DEFAULT_URL = "https://yataoshop.com";
const DEFAULT_OUT = "reference/yatao/clone";
const DEFAULT_MAX_PAGES = 40;

function parseArgs(argv) {
  const args = { url: DEFAULT_URL, out: DEFAULT_OUT, max: DEFAULT_MAX_PAGES };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--url" && argv[i + 1]) args.url = argv[++i];
    else if (argv[i] === "--out" && argv[i + 1]) args.out = argv[++i];
    else if (argv[i] === "--max" && argv[i + 1]) args.max = Number(argv[++i]);
  }
  return args;
}

function sanitizeSearch(search) {
  if (!search || search === "?") return "";
  const hash = createHash("md5").update(search).digest("hex").slice(0, 8);
  return `__${hash}`;
}

/** Map an absolute URL to a root-relative local path (leading slash). */
function urlToLocal(absUrl, startHost) {
  let u;
  try {
    u = new URL(absUrl);
  } catch {
    return null;
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") return null;

  let pathname = decodeURIComponent(u.pathname);
  const sameHost = u.host === startHost;
  // Same-host assets: ignore query (e.g. ?width=) so srcset variants resolve to
  // one saved file. Cross-host: hash the query to avoid path collisions.
  const suffix = sameHost ? "" : sanitizeSearch(u.search);

  // Directory-style URL -> index.html
  let isDocLike = false;
  const last = pathname.split("/").pop() ?? "";
  if (pathname.endsWith("/")) {
    pathname += "index.html";
    isDocLike = true;
  } else if (!last.includes(".")) {
    pathname += "/index.html";
    isDocLike = true;
  }

  // Insert search hash before extension for assets to avoid collisions.
  if (suffix && !isDocLike) {
    const ext = path.extname(pathname);
    pathname = pathname.slice(0, -ext.length) + suffix + ext;
  }

  const base = sameHost ? pathname : `/_ext/${u.host}${pathname}`;
  return base.replace(/\/{2,}/g, "/").replace(/^\/?/, "/");
}

function localToFile(root, localPath) {
  return path.join(root, localPath.replace(/^\//, ""));
}

/** Page URL -> root-relative .html path that a static server resolves. */
function pageUrlToLocal(absUrl, startHost) {
  const local = urlToLocal(absUrl, startHost);
  if (!local) return null;
  if (local.endsWith(".html")) return local;
  return `${local.replace(/\/$/, "")}/index.html`;
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const step = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight + 1000) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 120);
    });
  });
  await page.waitForTimeout(800);
}

function isCrawlablePage(absUrl, startHost) {
  let u;
  try {
    u = new URL(absUrl);
  } catch {
    return false;
  }
  if (u.host !== startHost) return false;
  if (u.hash && u.pathname === "/") return false;
  const p = u.pathname.toLowerCase();
  // Skip account/cart/checkout and non-page asset extensions.
  if (/(\/cart|\/checkout|\/account|\/orders|\.json|\.xml|\.pdf|\.png|\.jpe?g|\.webp|\.svg|\.gif|\.css|\.js|\.ico|\.woff2?)/.test(p))
    return false;
  return true;
}

async function main() {
  const { url, out, max } = parseArgs(process.argv);
  const root = path.resolve(out);
  await mkdir(root, { recursive: true });

  const startHost = new URL(url).host;

  /** @type {Map<string,string>} asset absUrl(no fragment) -> local path (for rewriting) */
  const assetMap = new Map();
  /** @type {Map<string,string>} page absUrl -> local .html path */
  const pageMap = new Map();
  /** @type {Set<string>} files saved (local paths) we may need to rewrite */
  const htmlFiles = new Set();
  const cssFiles = new Set();
  const savedAssets = new Set();
  let assetBytes = 0;

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch {
    console.log("Bundled Chromium missing - falling back to installed Google Chrome.");
    browser = await chromium.launch({ headless: true, channel: "chrome" });
  }
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0 Safari/537.36",
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  context.on("response", async (res) => {
    try {
      const reqUrl = res.url().split("#")[0];
      const type = res.request().resourceType();
      if (type === "document") return; // saved from page.content() with rewrites
      if (!res.ok()) return;

      const local = urlToLocal(reqUrl, startHost);
      if (!local) return;
      if (savedAssets.has(local)) return;

      const body = await res.body().catch(() => null);
      if (!body) return;

      const file = localToFile(root, local);
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, body);

      assetMap.set(reqUrl, local);
      savedAssets.add(local);
      assetBytes += body.length;
      if (local.endsWith(".css")) cssFiles.add(local);
    } catch {
      /* ignore individual asset failures */
    }
  });

  const queue = [url];
  const seen = new Set();
  const crawled = [];

  while (queue.length > 0 && crawled.length < max) {
    const pageUrl = queue.shift();
    const key = pageUrl.split("#")[0];
    if (seen.has(key)) continue;
    seen.add(key);

    try {
      console.log(`[${crawled.length + 1}/${max}] ${pageUrl}`);
      try {
        await page.goto(pageUrl, { waitUntil: "load", timeout: 60_000 });
      } catch (navErr) {
        // Shopify keeps sockets open so "load"/"networkidle" can stall.
        // Proceed if the document is at least interactive.
        console.warn(`  nav warning: ${navErr.message.split("\n")[0]}`);
      }
      await page
        .waitForLoadState("domcontentloaded", { timeout: 15_000 })
        .catch(() => {});
      await page.waitForTimeout(2500);
      await autoScroll(page);

      const links = await page.evaluate(() =>
        Array.from(document.querySelectorAll("a[href]")).map((a) => a.href),
      );
      for (const link of links) {
        const clean = link.split("#")[0];
        if (!seen.has(clean) && isCrawlablePage(clean, startHost)) {
          queue.push(clean);
        }
      }

      const html = await page.content();
      const localHtml = pageUrlToLocal(pageUrl, startHost);
      const file = localToFile(root, localHtml);
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, html, "utf8");
      htmlFiles.add(localHtml);
      pageMap.set(key, localHtml);
      crawled.push({ url: pageUrl, local: localHtml });
    } catch (err) {
      console.warn(`  skipped: ${err.message}`);
    }
  }

  console.log(`Rewriting ${htmlFiles.size} HTML + ${cssFiles.size} CSS files...`);
  await rewriteFiles(root, [...htmlFiles, ...cssFiles], assetMap, startHost);

  const manifest = {
    clonedAt: new Date().toISOString(),
    url,
    startHost,
    pages: crawled,
    assetCount: savedAssets.size,
    assetBytes,
    note:
      "Static front-end clone. Cart/checkout/search/app APIs are non-functional. Reference use only.",
  };
  await writeFile(
    path.join(root, "clone-manifest.json"),
    JSON.stringify(manifest, null, 2),
  );

  await browser.close();

  console.log("");
  console.log(`Pages cloned : ${crawled.length}`);
  console.log(`Assets saved : ${savedAssets.size} (${(assetBytes / 1e6).toFixed(1)} MB)`);
  console.log(`Output       : ${root}`);
  console.log("");
  console.log("Serve it:");
  console.log(`  npx serve "${out}"`);
}

async function rewriteFiles(root, localPaths, assetMap, startHost) {
  // Build replacement pairs from ASSETS only (never page-doc URLs, which would
  // corrupt asset paths that share the host prefix).
  const pairs = [];
  for (const [absUrl, local] of assetMap.entries()) {
    const noProto = absUrl.replace(/^https?:/, "");
    pairs.push([absUrl, local]);
    pairs.push([noProto, local]);
    if (absUrl.includes("&")) {
      pairs.push([absUrl.replace(/&/g, "&amp;"), local]);
    }
  }
  // Longest first to avoid partial overlaps.
  pairs.sort((a, b) => b[0].length - a[0].length);

  for (const local of localPaths) {
    const file = localToFile(root, local);
    let text;
    try {
      text = await readFile(file, "utf8");
    } catch {
      continue;
    }
    for (const [from, to] of pairs) {
      if (text.includes(from)) text = text.split(from).join(to);
    }
    // Normalize same-host absolute links to root-relative for nav.
    text = text.split(`https://${startHost}/`).join("/");
    text = text.split(`http://${startHost}/`).join("/");
    text = text.split(`//${startHost}/`).join("/");
    await writeFile(file, text, "utf8");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
