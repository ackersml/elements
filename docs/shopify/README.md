# Shopify product import — Elements Handpans 2026

`elements-products-shopify-import.csv` is a ready-to-import product file for the
full 2026 catalogue: **16 instruments + 4 cases = 20 products**. Generated from
the finalized catalogue by [`scripts/generate-shopify-csv.mjs`](../../scripts/generate-shopify-csv.mjs).

Regenerate after any catalogue change:

```bash
node scripts/generate-shopify-csv.mjs
```

## How to import

1. Shopify admin → **Products** → **Import**.
2. Upload `elements-products-shopify-import.csv`, review the preview, **Import products**.
3. Each product lands as **active**, single-variant, price in EUR, weight in kg.
   Inventory is **untracked** (dropship: always purchasable) — change per product
   if you'd rather track stock.
4. Specs (scale, notes, element, level, mood, tuning, dimensions, steel, what's
   included) are baked into each product's **Body (HTML)** as a spec list, and
   also mirrored in **Tags** for automated collections.

## Suggested collections (build in admin after import)

Tags are set up so you can drive **automated collections**:

- **Signature Series** / **Origins** — tag `Signature Series` / `Origins`
- By element — tag `Element: Fire` … `Element: Space / Ether`
- By level — tag `Beginner` / `Intermediate` / `Professional` / `Advanced`
- **Cases & accessories** — type `Case`

## Not in the CSV — handled separately

- **Product images** — final photos live in the shared Drive; upload per product
  in admin. The site's placeholder renders are not final assets, so no image URLs
  are written into the CSV.
- **Origins steel grade** — the catalogue marks the Origins final supplier steel
  grade *"to confirm"* (Dany item 7). Bodies currently read
  *"Stainless steel (final supplier grade to confirm)"* — update and re-run once
  confirmed.
- **Metafields** — deliberately omitted to guarantee an error-free first import.
  Add structured metafields later if the storefront needs them beyond Tags.

## Prices (reference)

| Series | Instruments | Price range (EUR) |
|---|---|---|
| Signature (Amir Raga · Iran) | 7 | 1,300 – 3,400 |
| Origins (Xi · China) | 9 | 1,200 – 3,000 |
| Cases | Softcase (incl.), Origins 100, Avaja 150, HCT 200 | 0 – 200 |

Every instrument includes: softcase, 1-year warranty, pre-shipment inspection,
tuning check, and the free course bundle (worth EUR 99).
