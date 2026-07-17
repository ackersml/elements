/**
 * Generate a Shopify CSV that attaches product images to the already-imported
 * catalogue. Shopify matches on `Handle` and pulls each `Image Src` from the
 * live site, so the Shopify products end up with the same photos the storefront
 * shows.
 *
 * Run:  node scripts/generate-shopify-images-csv.mjs
 * Out:  docs/shopify/elements-product-images-shopify-import.csv
 *
 * Only Handle + image columns are emitted — every other product field is left
 * untouched by the importer.
 *
 * Mirrors the photoSlug mapping in src/lib/products.ts and the photo sets in
 * src/lib/product-photos.ts. Re-run after changing either.
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(
  __dirname,
  "../docs/shopify/elements-product-images-shopify-import.csv"
);

/** Live origin serving /public — Shopify fetches the images from here. */
const BASE = "https://elements-snowy.vercel.app";

/** from src/lib/product-photos.ts */
const photoSets = {
  "nordlys-f-sharp-15": 4,
  "trailhead-d-celtic-9": 3,
  "sanctuary-b-amara-9": 3,
  "copper-veil-d-kurd-12": 3,
  "sanctuary-c-minor-15": 3,
  "atelier-f-sharp-pygmy-17": 5,
  "ultimate-d-kurd-16": 5,
  "studio-handpan-d-kurd-10": 3,
  "road-case-carbon-weave": 5,
  "handpan-bag-black": 7,
};

/** Explicit file lists where the numbering isn't a simple 01..n order. */
const photoFiles = {
  "sanctuary-b-amara-9": [
    "sanctuary-b-amara-9-03.png",
    "sanctuary-b-amara-9-02.png",
    "sanctuary-b-amara-9-01.png",
  ],
};

function filesFor(slug) {
  if (photoFiles[slug]) return photoFiles[slug];
  return Array.from(
    { length: photoSets[slug] },
    (_, i) => `${slug}-${String(i + 1).padStart(2, "0")}.png`
  );
}

/** handle -> photoSlug, from src/lib/products.ts */
const productPhoto = [
  ["signature-d-kurd-10", "studio-handpan-d-kurd-10", "D Kurd 10"],
  ["signature-d-kurd-12", "copper-veil-d-kurd-12", "D Kurd 12"],
  ["signature-g-minor-14", "ultimate-d-kurd-16", "G Minor 14"],
  ["signature-c-minor-15", "sanctuary-c-minor-15", "C Minor 15"],
  ["signature-d-aegean-10", "trailhead-d-celtic-9", "D Aegean 10"],
  ["signature-f-sharp-nordlys-14", "nordlys-f-sharp-15", "F# Nordlys 14"],
  ["signature-f-sharp-low-pygmy-18", "atelier-f-sharp-pygmy-17", "F# Low Pygmy 18"],
  ["origins-d-kurd-10", "studio-handpan-d-kurd-10", "D Kurd 10"],
  ["origins-d-kurd-18", "ultimate-d-kurd-16", "D Kurd 18"],
  ["origins-f-low-pygmy-16", "atelier-f-sharp-pygmy-17", "F Low Pygmy 16"],
  ["origins-d-aegean-18", "trailhead-d-celtic-9", "D Aegean 18"],
  ["origins-f-sharp-nordlys-15", "nordlys-f-sharp-15", "F# Nordlys 15"],
  ["origins-f-sharp-low-pygmy-21", "atelier-f-sharp-pygmy-17", "F# Low Pygmy 21"],
  ["origins-e-amara-20", "sanctuary-b-amara-9", "E Amara 20"],
  ["origins-b2-mystic-9", "sanctuary-b-amara-9", "B2 Mystic 9"],
  ["origins-d-ashakarian-16", "trailhead-d-celtic-9", "D Ashakarian 16"],
  ["elements-softcase", "handpan-bag-black", "Elements Softcase"],
  ["elements-origins-hardcase", "handpan-bag-black", "Elements Origins Hardcase"],
  ["avaja-hardcase", "road-case-carbon-weave", "Avaja Hardcase"],
  ["hct-hardcase-technologies", "road-case-carbon-weave", "HCT Hardcase Technologies"],
];

const HEADERS = ["Handle", "Image Src", "Image Position", "Image Alt Text"];
const csvEscape = (v) => {
  const s = String(v ?? "");
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const rows = [];
for (const [handle, slug, title] of productPhoto) {
  filesFor(slug).forEach((file, i) => {
    rows.push({
      Handle: handle,
      "Image Src": `${BASE}/products/${file}`,
      "Image Position": i + 1,
      "Image Alt Text": `${title} — Elements Handpans`,
    });
  });
}

const lines = [HEADERS.join(",")];
for (const r of rows) lines.push(HEADERS.map((h) => csvEscape(r[h])).join(","));
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, lines.join("\r\n") + "\r\n", "utf8");

console.log(
  `Wrote ${rows.length} image rows across ${productPhoto.length} products to:`
);
console.log(`  ${OUT}`);
