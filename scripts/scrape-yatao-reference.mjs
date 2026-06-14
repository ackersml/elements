/**
 * Playwright + Chrome DevTools Protocol scraper for Yatao (or any URL).
 * Extracts inspect-level data: Shopify.theme, matched CSS rules, computed
 * styles, section geometry, screenshots. Does NOT download Liquid theme files.
 *
 * Usage:
 *   npm run scrape:yatao
 *   node scripts/scrape-yatao-reference.mjs --url https://yataoshop.com --out reference/yatao
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const DEFAULT_URL = "https://yataoshop.com";
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const KEY_PROPERTIES = [
  "display",
  "position",
  "width",
  "height",
  "max-width",
  "margin",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
  "padding",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",
  "gap",
  "grid-template-columns",
  "flex-direction",
  "align-items",
  "justify-content",
  "font-family",
  "font-size",
  "font-weight",
  "line-height",
  "letter-spacing",
  "color",
  "background-color",
  "border",
  "border-radius",
  "box-shadow",
  "opacity",
  "z-index",
  "object-fit",
];

/** Heuristic selectors for common ecommerce sections on Shopify stores. */
const SECTION_SELECTORS = [
  { id: "header", selector: "header, [role='banner'], .header, #shopify-section-header" },
  { id: "hero", selector: "main section:first-of-type, .shopify-section:first-of-type, [id*='hero']" },
  { id: "trust", selector: "[class*='trust'], [class*='icon-bar'], section ul li svg" },
  { id: "product_card", selector: ".product-card, [class*='product-card'], .card-wrapper, .grid__item .card" },
  { id: "footer", selector: "footer, [role='contentinfo']" },
];

function parseArgs(argv) {
  const args = { url: DEFAULT_URL, out: "reference/yatao" };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--url" && argv[i + 1]) args.url = argv[++i];
    else if (argv[i] === "--out" && argv[i + 1]) args.out = argv[++i];
  }
  return args;
}

function pickStyles(computed) {
  const out = {};
  for (const prop of KEY_PROPERTIES) {
    const val = computed.getPropertyValue(prop);
    if (val && val !== "none" && val !== "normal" && val !== "auto") {
      out[prop] = val;
    }
  }
  return out;
}

async function getMatchedStylesSummary(cdp, nodeId) {
  try {
    const data = await cdp.send("CSS.getMatchedStylesForNode", { nodeId });
    const rules = [];
    for (const match of data.matchedCSSRules ?? []) {
      const rule = match.rule;
      if (!rule?.style?.cssProperties) continue;
      const selector =
        rule.selectorList?.selectors
          ?.map((s) => s.text)
          .filter(Boolean)
          .join(", ") ?? "(unknown)";
      const properties = {};
      for (const p of rule.style.cssProperties) {
        if (p.name && p.value && !p.disabled) properties[p.name] = p.value;
      }
      if (Object.keys(properties).length > 0) {
        rules.push({ selector, properties });
      }
    }
    return rules.slice(0, 40);
  } catch {
    return [];
  }
}

async function scrapeViewport(page, cdp, viewport, outDir) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.goto(page.url(), { waitUntil: "networkidle", timeout: 90_000 });
  await page.waitForTimeout(1500);

  const screenshotPath = path.join(outDir, `screenshot-${viewport.name}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });

  const shopifyTheme = await page.evaluate(() => {
    const w = /** @type {any} */ (window);
    if (!w.Shopify?.theme) return null;
    const t = w.Shopify.theme;
    return {
      name: t.name ?? null,
      id: t.id ?? null,
      role: t.role ?? null,
      theme_store_id: t.theme_store_id ?? null,
    };
  });

  const cssVariables = await page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const vars = {};
    for (let i = 0; i < root.length; i++) {
      const name = root[i];
      if (name.startsWith("--")) vars[name] = root.getPropertyValue(name).trim();
    }
    return vars;
  });

  const sections = await page.evaluate(
    ({ selectors, props }) => {
      function pick(el) {
        const cs = getComputedStyle(el);
        const styles = {};
        for (const p of props) {
          const v = cs.getPropertyValue(p);
          if (v && v !== "none" && v !== "normal" && v !== "auto") styles[p] = v;
        }
        return styles;
      }

      return selectors.map(({ id, selector }) => {
        const candidates = selector
          .split(",")
          .map((s) => s.trim())
          .flatMap((s) => Array.from(document.querySelectorAll(s)).slice(0, 3));

        const el = candidates[0];
        if (!el) return { id, found: false, selector };

        const rect = el.getBoundingClientRect();
        return {
          id,
          found: true,
          selector,
          tag: el.tagName.toLowerCase(),
          className: typeof el.className === "string" ? el.className.slice(0, 200) : "",
          rect: {
            x: Math.round(rect.x),
            y: Math.round(rect.y),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          },
          computed: pick(el),
          htmlPreview: el.outerHTML.slice(0, 1200),
        };
      });
    },
    { selectors: SECTION_SELECTORS, props: KEY_PROPERTIES },
  );

  await cdp.send("DOM.enable");
  await cdp.send("CSS.enable");
  const doc = await cdp.send("DOM.getDocument", { depth: -1 });

  const inspectSamples = [];
  for (const section of sections.filter((s) => s.found)) {
    const firstSelector = section.selector.split(",")[0].trim();
    const { nodeId } = await cdp.send("DOM.querySelector", {
      nodeId: doc.root.nodeId,
      selector: firstSelector,
    });
    if (!nodeId) continue;

    const matchedRules = await getMatchedStylesSummary(cdp, nodeId);
    let boxModel = null;
    try {
      const box = await cdp.send("DOM.getBoxModel", { nodeId });
      boxModel = box.model;
    } catch {
      /* display:none etc. */
    }

    inspectSamples.push({
      id: section.id,
      selector: firstSelector,
      matchedRules,
      boxModel,
    });
  }

  return {
    viewport: viewport.name,
    dimensions: { width: viewport.width, height: viewport.height },
    screenshot: path.basename(screenshotPath),
    shopifyTheme,
    cssVariableCount: Object.keys(cssVariables).length,
    cssVariables,
    sections,
    inspectSamples,
  };
}

async function main() {
  const { url, out } = parseArgs(process.argv);
  const outDir = path.resolve(out);
  await mkdir(outDir, { recursive: true });

  const assetUrls = new Set();
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch {
    console.log("Bundled Chromium missing � falling back to installed Google Chrome.");
    browser = await chromium.launch({ headless: true, channel: "chrome" });
  }
  const context = await browser.newContext();
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);

  page.on("response", (res) => {
    const u = res.url();
    if (u.includes("cdn.shopify.com") || u.includes("/assets/")) {
      assetUrls.add(u.split("?")[0]);
    }
  });

  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 90_000 });

  const results = [];
  for (const viewport of VIEWPORTS) {
    console.log(`Scraping ${viewport.name} (${viewport.width}x${viewport.height})...`);
    results.push(await scrapeViewport(page, cdp, viewport, outDir));
  }

  const report = {
    scrapedAt: new Date().toISOString(),
    url,
    note:
      "Inspect-level reference only. Liquid templates, theme settings JSON, and app source are not in the DOM.",
    viewports: results,
    shopifyAssets: [...assetUrls].sort().slice(0, 120),
  };

  const jsonPath = path.join(outDir, "inspect-report.json");
  await writeFile(jsonPath, JSON.stringify(report, null, 2));

  const md = buildMarkdown(report);
  await writeFile(path.join(outDir, "inspect-report.md"), md);

  await browser.close();
  console.log(`Wrote ${jsonPath}`);
  console.log(`Wrote ${path.join(outDir, "inspect-report.md")}`);
}

function buildMarkdown(report) {
  const lines = [
    `# Yatao inspect scrape`,
    ``,
    `URL: ${report.url}`,
    `Scraped: ${report.scrapedAt}`,
    ``,
    `## Shopify theme (from page JS)`,
    ``,
  ];

  const theme = report.viewports[0]?.shopifyTheme;
  if (theme) {
    lines.push(`| Field | Value |`);
    lines.push(`|-------|-------|`);
    for (const [k, v] of Object.entries(theme)) {
      lines.push(`| ${k} | ${v ?? "�"} |`);
    }
  } else {
    lines.push(`No \`Shopify.theme\` object found (headless or stripped).`);
  }

  lines.push(``, `## Sections (computed styles)`, ``);
  for (const vp of report.viewports) {
    lines.push(`### ${vp.viewport}`, ``);
    for (const s of vp.sections.filter((x) => x.found)) {
      lines.push(`#### ${s.id}`, ``);
      lines.push(`- Selector: \`${s.selector.split(",")[0].trim()}\``);
      lines.push(`- Size: ${s.rect.width}�${s.rect.height}px at (${s.rect.x}, ${s.rect.y})`);
      lines.push(`- Key styles:`);
      lines.push("```json");
      lines.push(JSON.stringify(s.computed, null, 2));
      lines.push("```", "");
    }
  }

  lines.push(`## CDN assets (sample)`, ``);
  for (const u of report.shopifyAssets.slice(0, 30)) {
    lines.push(`- ${u}`);
  }
  if (report.shopifyAssets.length > 30) {
    lines.push(`- � and ${report.shopifyAssets.length - 30} more in inspect-report.json`);
  }

  return lines.join("\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
