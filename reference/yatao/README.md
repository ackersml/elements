# Yatao design reference (Playwright scrape)

This folder holds **inspect-level** extracts from [yataoshop.com](https://yataoshop.com), not a copy of Shopify theme files.

## What Playwright can extract (same as DevTools Inspect)

| Data | Method |
|------|--------|
| `Shopify.theme` name / id | `page.evaluate(() => Shopify.theme)` |
| Computed styles per element | `getComputedStyle` via `page.evaluate` |
| Matched CSS rules (Styles panel) | CDP `CSS.getMatchedStylesForNode` |
| Box model | CDP `DOM.getBoxModel` |
| CSS variables on `:root` | `getComputedStyle(document.documentElement)` |
| Section HTML preview | `outerHTML` snippets |
| Full-page screenshots | `page.screenshot({ fullPage: true })` |
| Theme asset URLs | Network responses to `cdn.shopify.com` |

## What it cannot extract

- `.liquid` template source
- Theme settings / `config/settings_schema.json`
- Shopify app logic (reviews, cart apps) beyond rendered HTML
- Licensed theme zip (must buy from Theme Store or agency)

## Run the scraper

```bash
npm install
npx playwright install chromium
npm run scrape:yatao
```

Custom URL or output dir:

```bash
node scripts/scrape-yatao-reference.mjs --url https://yataoshop.com --out reference/yatao
```

Outputs:

- `inspect-report.json` � full structured dump
- `inspect-report.md` � human-readable summary
- `screenshot-desktop.png`, `screenshot-mobile.png`

Use these to tune Elements components (`ProductCard`, `SiteHeader`, section spacing) without copying Yatao assets or copy.
