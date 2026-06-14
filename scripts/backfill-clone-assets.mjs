/**
 * Backfill pass for the static clone.
 *
 * Scans the cloned HTML/CSS for same-host asset references that point to files
 * which were not captured during crawl (e.g. served from browser cache, so the
 * response body was unavailable). Fetches each missing asset directly and saves
 * it at the local path the markup already expects. Fast; no browser needed.
 *
 * Usage:
 *   npm run clone:backfill
 *   node scripts/backfill-clone-assets.mjs --host yataoshop.com --dir reference/yatao/clone
 */

import { readFile, writeFile, mkdir, readdir, stat, access } from "node:fs/promises";
import path from "node:path";

const DEFAULT_HOST = "yataoshop.com";
const DEFAULT_DIR = "reference/yatao/clone";

const ASSET_EXT = new Set([
  ".css",
  ".js",
  ".mjs",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".svg",
  ".ico",
  ".woff",
  ".woff2",
  ".ttf",
  ".otf",
  ".eot",
  ".avif",
  ".mp4",
  ".webm",
]);

function parseArgs(argv) {
  const args = { host: DEFAULT_HOST, dir: DEFAULT_DIR };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--host" && argv[i + 1]) args.host = argv[++i];
    else if (argv[i] === "--dir" && argv[i + 1]) args.dir = argv[++i];
  }
  return args;
}

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

function extractRefs(text) {
  const refs = new Set();
  const attrRe = /(?:src|href)\s*=\s*"([^"]+)"/gi;
  const srcsetRe = /srcset\s*=\s*"([^"]+)"/gi;
  const cssUrlRe = /url\(\s*(['"]?)([^'")]+)\1\s*\)/gi;
  let m;
  while ((m = attrRe.exec(text))) refs.add(m[1]);
  while ((m = srcsetRe.exec(text))) {
    for (const part of m[1].split(",")) {
      const url = part.trim().split(/\s+/)[0];
      if (url) refs.add(url);
    }
  }
  while ((m = cssUrlRe.exec(text))) refs.add(m[2]);
  return refs;
}

/** Normalize a markup ref to { localPath, fetchUrl } for same-host assets only. */
function resolveRef(ref, host) {
  let raw = ref.replace(/&amp;/g, "&").trim();
  if (!raw || raw.startsWith("data:") || raw.startsWith("#")) return null;

  let urlObj;
  if (raw.startsWith("//")) urlObj = safeUrl(`https:${raw}`);
  else if (/^https?:\/\//i.test(raw)) urlObj = safeUrl(raw);
  else if (raw.startsWith("/")) urlObj = safeUrl(`https://${host}${raw}`);
  else return null;

  if (!urlObj || urlObj.host !== host) return null;

  const ext = path.extname(urlObj.pathname).toLowerCase();
  if (!ASSET_EXT.has(ext)) return null;

  return {
    localPath: urlObj.pathname,
    fetchUrl: `https://${host}${urlObj.pathname}${urlObj.search}`,
  };
}

function safeUrl(u) {
  try {
    return new URL(u);
  } catch {
    return null;
  }
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const { host, dir } = parseArgs(process.argv);
  const root = path.resolve(dir);

  const files = await walk(root);
  const textFiles = files.filter((f) => /\.(html?|css)$/i.test(f));

  const wanted = new Map(); // localPath -> fetchUrl
  for (const f of textFiles) {
    const text = await readFile(f, "utf8").catch(() => "");
    for (const ref of extractRefs(text)) {
      const r = resolveRef(ref, host);
      if (r && !wanted.has(r.localPath)) wanted.set(r.localPath, r.fetchUrl);
    }
  }

  const missing = [];
  for (const [localPath, fetchUrl] of wanted) {
    const file = path.join(root, localPath.replace(/^\//, ""));
    if (!(await exists(file))) missing.push({ localPath, fetchUrl, file });
  }

  console.log(`Referenced same-host assets: ${wanted.size}`);
  console.log(`Missing on disk: ${missing.length}`);

  let ok = 0;
  let fail = 0;
  let bytes = 0;
  const concurrency = 8;
  for (let i = 0; i < missing.length; i += concurrency) {
    const batch = missing.slice(i, i + concurrency);
    await Promise.all(
      batch.map(async ({ fetchUrl, file }) => {
        try {
          const res = await fetch(fetchUrl, {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/134.0 Safari/537.36",
            },
          });
          if (!res.ok) {
            fail++;
            return;
          }
          const buf = Buffer.from(await res.arrayBuffer());
          await mkdir(path.dirname(file), { recursive: true });
          await writeFile(file, buf);
          ok++;
          bytes += buf.length;
        } catch {
          fail++;
        }
      }),
    );
    process.stdout.write(`\r  fetched ${ok}, failed ${fail} (${(bytes / 1e6).toFixed(1)} MB)`);
  }
  process.stdout.write("\n");
  console.log(`Backfill complete: ${ok} saved, ${fail} failed.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
