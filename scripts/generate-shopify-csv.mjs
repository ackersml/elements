/**
 * Generate a Shopify product-import CSV from the finalized 2026 Elements catalogue.
 *
 * Run:  node scripts/generate-shopify-csv.mjs
 * Out:  docs/shopify/elements-products-shopify-import.csv
 *
 * This is the "load the 16 instruments + cases" launch artifact (Week 1 of the
 * scope doc). It needs no Shopify account to author — import it in Shopify admin
 * under Products → Import once the store exists.
 *
 * DATA IS A SNAPSHOT MIRROR of src/lib/products.ts. There is no TS runner
 * (tsx/ts-node) in this repo, so the catalogue rows are inlined here. If you
 * change prices / specs / descriptions in products.ts, mirror them here and
 * re-run. The two files are cross-checked against the same 2026 catalogue.
 *
 * Deliberately omitted (added in Shopify admin, or blocked on Dany):
 *   - Image Src: final product photos live in the shared Drive; upload per
 *     product in admin. (Placeholder site renders are not final assets.)
 *   - Origins steel grade: marked "to confirm" in the catalogue (Dany item 7).
 *   - Metafields: kept out to guarantee an error-free import; key specs are
 *     baked into the Body HTML spec list and Tags instead.
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../docs/shopify/elements-products-shopify-import.csv");

const VENDOR = "Elements Handpans";
const INCLUDED =
  "Elements softcase, 1-year warranty, pre-shipment inspection, tuning check and a free course bundle worth EUR 99 (Introduction to Handpan, 3 Patterns to Get You Flowing, Art of Improvisation).";

const ELEMENT_LABEL = {
  fire: "Fire",
  earth: "Earth",
  water: "Water",
  air: "Air",
  space: "Space / Ether",
};

const LEVEL_LABEL = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  professional: "Professional",
  advanced: "Advanced",
};

/** Handpans — mirror of the Signature + Origins arrays in src/lib/products.ts */
const handpans = [
  // —— Elements Signature Series (Amir Raga · Iran) — high-grade stainless steel ——
  { id: "sig-d-kurd-10", slug: "signature-d-kurd-10", scale: "D Kurd", notes: 10, priceEur: 1300, series: "Signature Series", maker: "Amir Raga · Iran", element: "fire", levels: ["beginner", "professional"], moods: ["Grounded", "Emotional", "Warm", "Direct"], steel: "High-grade stainless steel", description: "A versatile D minor world with immediate emotional access. The D Kurd 10 gives the player a stable centre, strong melodic movement and enough harmonic depth for meditation, songwriting and live performance." },
  { id: "sig-d-kurd-12", slug: "signature-d-kurd-12", scale: "D Kurd", notes: 12, priceEur: 1400, series: "Signature Series", maker: "Amir Raga · Iran", element: "fire", levels: ["beginner", "professional"], moods: ["Expressive", "Stable", "Warm", "Melodic"], steel: "High-grade stainless steel", description: "The extended D Kurd 12 keeps the familiar emotional language of D minor while opening more melodic routes in the upper register. Forgiving for beginners and spacious for experienced improvisation." },
  { id: "sig-g-minor-14", slug: "signature-g-minor-14", scale: "G Minor", notes: 14, priceEur: 3000, series: "Signature Series", maker: "Amir Raga · Iran", element: "earth", levels: ["intermediate", "professional"], moods: ["Dark", "Earthy", "Powerful", "Ceremonial"], steel: "High-grade stainless steel", description: "A low, grounded minor instrument with a more physical bass presence than standard D-root pans. Suited to ritual intensity, weight and a strong emotional foundation with clear melodic paths." },
  { id: "sig-c-minor-15", slug: "signature-c-minor-15", scale: "C Minor", notes: 15, priceEur: 2800, series: "Signature Series", maker: "Amir Raga · Iran", element: "space", levels: ["intermediate", "professional"], moods: ["Mystical", "Contemplative", "Deep", "Spacious"], steel: "High-grade stainless steel", description: "A broad C minor soundscape designed for inner work, ambient composition and deep listening. The extended range creates a wide emotional arc from shadowed bass tones into clear upper melodies." },
  { id: "sig-d-aegean-10", slug: "signature-d-aegean-10", scale: "D Aegean", notes: 10, priceEur: 1300, series: "Signature Series", maker: "Amir Raga · Iran", element: "water", levels: ["beginner", "intermediate"], moods: ["Open", "Bright", "Flowing", "Serene"], steel: "High-grade stainless steel", description: "D Aegean offers a luminous alternative to darker minor scales. Its open Lydian colour gives a floating, Mediterranean quality—excellent for peaceful improvisation and uplifting sound baths." },
  { id: "sig-f-sharp-nordlys-14", slug: "signature-f-sharp-nordlys-14", scale: "F# Nordlys", notes: 14, priceEur: 3400, series: "Signature Series", maker: "Amir Raga · Iran", element: "space", levels: ["advanced"], moods: ["Cosmic", "Rare", "Suspended", "Cinematic"], steel: "High-grade stainless steel", description: "Nordlys has a rare northern-light character: spacious, glassy and slightly mysterious. Built for cinematic ambience, experimental melody and a sound beyond the standard handpan vocabulary." },
  { id: "sig-f-sharp-low-pygmy-18", slug: "signature-f-sharp-low-pygmy-18", scale: "F# Low Pygmy", notes: 18, priceEur: 3400, series: "Signature Series", maker: "Amir Raga · Iran", element: "air", levels: ["intermediate", "professional"], moods: ["Floating", "Ancient", "Hypnotic", "Emotional"], steel: "High-grade stainless steel", description: "F# Low Pygmy expands the classic pentatonic feeling into a much wider field, allowing hypnotic ostinatos, long floating melodies and deep harmonic movement without becoming heavy." },

  // —— Elements Origins (Xi · China) — stainless steel, final supplier grade to confirm ——
  { id: "orig-d-kurd-10", slug: "origins-d-kurd-10", scale: "D Kurd", notes: 10, priceEur: 1200, series: "Origins", maker: "Xi · China", element: "fire", levels: ["beginner", "professional"], moods: ["Grounded", "Emotional", "Direct", "Warm"], steel: "Stainless steel (final supplier grade to confirm)", description: "The Origins D Kurd 10 is the accessible foundation of the collection. Classic emotional pull of D minor with simple navigation—a strong choice for teaching, first-time buyers and daily practice." },
  { id: "orig-d-kurd-18", slug: "origins-d-kurd-18", scale: "D Kurd", notes: 18, priceEur: 2800, series: "Origins", maker: "Xi · China", element: "fire", levels: ["intermediate", "professional"], moods: ["Rich", "Expressive", "Grounded", "Expansive"], steel: "Stainless steel (final supplier grade to confirm)", description: "A full extended D Kurd for players who want the classic minor language with a wider performance range. Bottom tones add body and grounding; upper notes give more melodic completion." },
  { id: "orig-f-low-pygmy-16", slug: "origins-f-low-pygmy-16", scale: "F Low Pygmy", notes: 16, priceEur: 3000, series: "Origins", maker: "Xi · China", element: "earth", levels: ["intermediate", "professional"], moods: ["Earthy", "Ancient", "Hypnotic", "Warm"], steel: "Stainless steel (final supplier grade to confirm)", description: "F Low Pygmy has a primal, earthy character with steady forward movement. Hypnotic quality that works especially well for trance-like playing, ceremony and deep meditative sound." },
  { id: "orig-d-aegean-18", slug: "origins-d-aegean-18", scale: "D Aegean", notes: 18, priceEur: 3000, series: "Origins", maker: "Xi · China", element: "water", levels: ["intermediate", "professional"], moods: ["Luminous", "Flowing", "Open", "Elegant"], steel: "Stainless steel (final supplier grade to confirm)", description: "The extended D Aegean is a wide, flowing instrument with an uplifting, almost oceanic quality. Bass extensions create a powerful foundation while upper notes keep the sound bright and open." },
  { id: "orig-f-sharp-nordlys-15", slug: "origins-f-sharp-nordlys-15", scale: "F# Nordlys", notes: 15, priceEur: 3000, series: "Origins", maker: "Xi · China", element: "space", levels: ["advanced"], moods: ["Northern", "Celestial", "Suspended", "Rare"], steel: "Stainless steel (final supplier grade to confirm)", description: "F# Nordlys 15 is for players who want a more unusual harmonic world. Airy and cosmic, with bass depth and upper shimmer—less standard song scale, more sonic environment." },
  { id: "orig-f-sharp-low-pygmy-21", slug: "origins-f-sharp-low-pygmy-21", scale: "F# Low Pygmy", notes: 21, priceEur: 3000, series: "Origins", maker: "Xi · China", element: "air", levels: ["professional"], moods: ["Immersive", "Floating", "Emotional", "Infinite"], steel: "Stainless steel (final supplier grade to confirm)", description: "A large-range F# Low Pygmy designed for serious exploration. Twenty-one notes give a full melodic landscape while keeping the ancient, hypnotic identity of the Pygmy family." },
  { id: "orig-e-amara-20", slug: "origins-e-amara-20", scale: "E Amara", notes: 20, priceEur: 3000, series: "Origins", maker: "Xi · China", element: "air", levels: ["intermediate", "professional"], moods: ["Gentle", "Uplifting", "Emotional", "Flowing"], steel: "Stainless steel (final supplier grade to confirm)", description: "E Amara 20 is an expanded Celtic minor world that feels both emotional and accessible. Naturally song-like—friendly for voice, melody writing and teaching." },
  { id: "orig-b2-mystic-9", slug: "origins-b2-mystic-9", scale: "B2 Mystic", notes: 9, priceEur: 1200, series: "Origins", maker: "Xi · China", element: "fire", levels: ["beginner", "intermediate"], moods: ["Dark", "Primal", "Focused", "Meditative"], steel: "Stainless steel (final supplier grade to confirm)", description: "B2 Mystic 9 is a compact low-register instrument with a deep, inward pull. Dark and focused without overwhelming—ideal for grounding rituals and intimate meditative settings." },
  { id: "orig-d-ashakarian-16", slug: "origins-d-ashakarian-16", scale: "D Ashakarian", notes: 16, priceEur: 3000, series: "Origins", maker: "Xi · China", element: "air", levels: ["intermediate", "professional"], moods: ["Hopeful", "Open", "Bright", "Uplifting"], steel: "Stainless steel (final supplier grade to confirm)", description: "D Ashakarian moves into a major, uplifting colour—open, optimistic and slightly emotional. Strong for breath-led playing, melodic storytelling and brighter ceremonial music." },
];

/** Cases & accessories — mirror of the accessories array in src/lib/products.ts */
const cases = [
  { id: "acc-softcase", slug: "elements-softcase", title: "Elements Softcase", priceEur: 0, weightKg: 1.4, dims: "55 × 25 cm", kind: "Included with every instrument", protection: "Daily carrying, storage and light transport.", description: "Included with every handpan purchase. Padded soft-case with reinforced base and backpack straps for daily carrying, storage and light transport." },
  { id: "acc-origins-hardcase", slug: "elements-origins-hardcase", title: "Elements Origins Hardcase", priceEur: 100, weightKg: 3.0, dims: "58 × 35 × 35 cm", kind: "Upgrade", protection: "Waterproof, airline-travel protection, backpack transport.", description: "Waterproof hardcase upgrade with airline-travel protection and backpack transport. Select at checkout when ordering your instrument." },
  { id: "acc-avaja-hardcase", slug: "avaja-hardcase", title: "Avaja Hardcase", priceEur: 150, weightKg: 3.2, dims: "58 × 35 × 35 cm", kind: "Upgrade", protection: "Waterproof, airline-travel protection, premium exterior protection.", description: "Premium waterproof hardcase with airline-travel protection and reinforced exterior. Upgrade option for frequent travel." },
  { id: "acc-hct-hardcase", slug: "hct-hardcase-technologies", title: "HCT Hardcase Technologies", priceEur: 200, weightKg: 3.5, dims: "58 × 35 × 35 cm", kind: "Upgrade", protection: "Waterproof, airline-travel protection, maximum travel-focused protection.", description: "Maximum travel-focused protection—waterproof, airline-ready hardcase from HCT Hardcase Technologies. The top-tier upgrade for touring musicians." },
];

const HEADERS = [
  "Handle", "Title", "Body (HTML)", "Vendor", "Type", "Tags", "Published",
  "Option1 Name", "Option1 Value",
  "Variant SKU", "Variant Grams", "Variant Inventory Tracker",
  "Variant Inventory Policy", "Variant Fulfillment Service",
  "Variant Price", "Variant Requires Shipping", "Variant Taxable",
  "Variant Weight Unit", "Gift Card", "SEO Title", "SEO Description", "Status",
];

const sku = (id) => "EH-" + id.toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-|-$/g, "");
const csvEscape = (v) => {
  const s = String(v ?? "");
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

function specList(rows) {
  const li = rows
    .filter(([, v]) => v != null && v !== "")
    .map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`)
    .join("");
  return `<ul>${li}</ul>`;
}

function handpanBody(p) {
  const level = p.levels.map((l) => LEVEL_LABEL[l]).join(" to ");
  const specs = specList([
    ["Scale", `${p.scale} ${p.notes}`],
    ["Notes", p.notes],
    ["Element", ELEMENT_LABEL[p.element]],
    ["Level", level],
    ["Mood", p.moods.join(", ")],
    ["Series", `${p.series} — crafted by ${p.maker}`],
    ["Tuning", "440 Hz standard · 432 Hz on request"],
    ["Dimensions", "Approx. 53 × 26 cm"],
    ["Weight", "Approx. 4.5 kg"],
    ["Steel", p.steel],
    ["Included", INCLUDED],
  ]);
  return `<p>${p.description}</p>${specs}`;
}

function caseBody(c) {
  const specs = specList([
    ["Type", c.kind],
    ["Protection", c.protection],
    ["Dimensions", c.dims],
    ["Weight", `Approx. ${c.weightKg} kg`],
  ]);
  return `<p>${c.description}</p>${specs}`;
}

const rows = [];

for (const p of handpans) {
  const level = p.levels.map((l) => LEVEL_LABEL[l]).join(" to ");
  const tags = [
    "Handpan",
    p.series,
    `Element: ${ELEMENT_LABEL[p.element]}`,
    `Scale: ${p.scale}`,
    ...p.levels.map((l) => LEVEL_LABEL[l]),
    ...p.moods,
  ].join(", ");
  rows.push({
    Handle: p.slug,
    Title: `${p.scale} ${p.notes}`,
    "Body (HTML)": handpanBody(p),
    Vendor: VENDOR,
    Type: "Handpan",
    Tags: tags,
    Published: "TRUE",
    "Option1 Name": "Title",
    "Option1 Value": "Default Title",
    "Variant SKU": sku(p.id),
    "Variant Grams": 4500,
    "Variant Inventory Tracker": "",
    "Variant Inventory Policy": "continue",
    "Variant Fulfillment Service": "manual",
    "Variant Price": p.priceEur,
    "Variant Requires Shipping": "TRUE",
    "Variant Taxable": "TRUE",
    "Variant Weight Unit": "kg",
    "Gift Card": "FALSE",
    "SEO Title": `${p.scale} ${p.notes} Handpan — Elements ${p.series}`,
    "SEO Description": `${p.scale} ${p.notes} — ${p.moods.join(", ")}. ${level}. ${p.series} handpan by Elements, EUR ${p.priceEur}.`,
    Status: "active",
  });
}

for (const c of cases) {
  rows.push({
    Handle: c.slug,
    Title: c.title,
    "Body (HTML)": caseBody(c),
    Vendor: VENDOR,
    Type: "Case",
    Tags: ["Case", "Accessory", c.kind].join(", "),
    Published: "TRUE",
    "Option1 Name": "Title",
    "Option1 Value": "Default Title",
    "Variant SKU": sku(c.id),
    "Variant Grams": Math.round(c.weightKg * 1000),
    "Variant Inventory Tracker": "",
    "Variant Inventory Policy": "continue",
    "Variant Fulfillment Service": "manual",
    "Variant Price": c.priceEur,
    "Variant Requires Shipping": "TRUE",
    "Variant Taxable": "TRUE",
    "Variant Weight Unit": "kg",
    "Gift Card": "FALSE",
    "SEO Title": `${c.title} — Elements Handpans`,
    "SEO Description": `${c.title} — ${c.protection}`,
    Status: "active",
  });
}

const lines = [HEADERS.join(",")];
for (const r of rows) lines.push(HEADERS.map((h) => csvEscape(r[h])).join(","));
const csv = lines.join("\r\n") + "\r\n";

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, csv, "utf8");

console.log(`Wrote ${rows.length} products (${handpans.length} instruments + ${cases.length} cases) to:`);
console.log(`  ${OUT}`);
