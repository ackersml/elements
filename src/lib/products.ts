import {
  formatMoney,
  stripeAmountFromEurCents,
  type CheckoutCurrency,
} from "@/lib/currency";

export type StockStatus = "in_stock" | "preorder" | "sold_out";

export type { CheckoutCurrency } from "@/lib/currency";
export { checkoutCurrencies } from "@/lib/currency";

export type AudioSample = {
  label: string;
  url: string;
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  priceCents: number;
  compareAtPriceCents: number | null;
  currency: CheckoutCurrency;
  images: string[];
  modelUrl: string | null;
  audioSamples: AudioSample[];
  scale: string;
  noteCount: number;
  maker: string;
  weightKg: number;
  dimensionsCm: string;
  supplierSku: string | null;
  leadTimeDays: number;
  stockStatus: StockStatus;
  tags: string[];
  collections: string[];
  description: string;
  heroImageUrl: string;
};

/** Brand PDF extractions: `public/brand/from-pdf/` (resized for web). */
const HS = (n: string) => `/brand/from-pdf/handpan-store/hs-${n}.png`;
const SH = (n: string) => `/brand/from-pdf/sound-healing/sh-${n}.png`;

/** Seed catalog — replace with CMS when wired */
export const products: Product[] = [
  {
    id: "p1",
    title: "Studio Handpan — D Kurd 10",
    slug: "studio-handpan-d-kurd-10",
    priceCents: 110_000,
    compareAtPriceCents: null,
    currency: "eur",
    images: [HS("002"), HS("003")],
    heroImageUrl: HS("002"),
    modelUrl: null,
    audioSamples: [],
    scale: "D Kurd",
    noteCount: 10,
    maker: "Elements Studio",
    weightKg: 4.2,
    dimensionsCm: "53 × 25 cm",
    supplierSku: null,
    leadTimeDays: 14,
    stockStatus: "in_stock",
    tags: ["beginner", "studio"],
    collections: ["beginner", "extended"],
    description:
      "Hand-tuned steel handpan in a balanced D Kurd layout. Suited to first instruments and daily practice. Insured delivery; post-sale tuning guidance included.",
  },
  {
    id: "p2",
    title: "Sanctuary — E Amara 9",
    slug: "sanctuary-e-amara-9",
    priceCents: 125_000,
    compareAtPriceCents: 132_000,
    currency: "eur",
    images: [HS("004"), HS("006")],
    heroImageUrl: HS("004"),
    modelUrl: null,
    audioSamples: [],
    scale: "E Amara",
    noteCount: 9,
    maker: "Elements Forge",
    weightKg: 4.0,
    dimensionsCm: "52 × 24 cm",
    supplierSku: null,
    leadTimeDays: 21,
    stockStatus: "preorder",
    tags: ["extended", "meditative"],
    collections: ["extended"],
    description:
      "Soft minor colour with a singing sustain—built for slow melodic playing and ceremony.",
  },
  {
    id: "p3",
    title: "Copper Veil — C Major 12",
    slug: "copper-veil-c-major-12",
    priceCents: 189_000,
    compareAtPriceCents: null,
    currency: "eur",
    images: [HS("007"), HS("008")],
    heroImageUrl: HS("007"),
    modelUrl: null,
    audioSamples: [],
    scale: "C Major",
    noteCount: 12,
    maker: "Elements Rare",
    weightKg: 4.5,
    dimensionsCm: "56 × 26 cm",
    supplierSku: null,
    leadTimeDays: 30,
    stockStatus: "in_stock",
    tags: ["rare", "extended"],
    collections: ["rare"],
    description:
      "Extended compass with stable fundamentals for ensemble work and composition.",
  },
  {
    id: "p4",
    title: "Trailhead — D Celtic 9",
    slug: "trailhead-d-celtic-9",
    priceCents: 108_000,
    compareAtPriceCents: null,
    currency: "eur",
    images: [HS("009"), HS("010")],
    heroImageUrl: HS("009"),
    modelUrl: null,
    audioSamples: [],
    scale: "D Celtic",
    noteCount: 9,
    maker: "Elements Studio",
    weightKg: 4.1,
    dimensionsCm: "52 × 24 cm",
    supplierSku: null,
    leadTimeDays: 14,
    stockStatus: "in_stock",
    tags: ["beginner"],
    collections: ["beginner"],
    description:
      "Compact lay-out with clear voice leading—ideal if you want Celtic colours without overtones fighting.",
  },
  {
    id: "p5",
    title: "Bundle — Studio + Case + Stand",
    slug: "bundle-studio-case-stand",
    priceCents: 132_000,
    compareAtPriceCents: 142_000,
    currency: "eur",
    images: [HS("011"), HS("012")],
    heroImageUrl: HS("011"),
    modelUrl: null,
    audioSamples: [],
    scale: "D Kurd",
    noteCount: 10,
    maker: "Elements",
    weightKg: 7.0,
    dimensionsCm: "Case 58 × 35 × 35 cm",
    supplierSku: null,
    leadTimeDays: 18,
    stockStatus: "in_stock",
    tags: ["bundle"],
    collections: ["bundles"],
    description:
      "Studio-tier instrument with road case and wooden stand—ready for travel and session work.",
  },
  {
    id: "p6",
    title: "Road Case — Carbon Weave",
    slug: "road-case-carbon-weave",
    priceCents: 280_00,
    compareAtPriceCents: null,
    currency: "eur",
    images: [HS("013")],
    heroImageUrl: HS("013"),
    modelUrl: null,
    audioSamples: [],
    scale: "—",
    noteCount: 0,
    maker: "Elements Accessories",
    weightKg: 3.2,
    dimensionsCm: "58 × 35 × 35 cm",
    supplierSku: null,
    leadTimeDays: 7,
    stockStatus: "in_stock",
    tags: ["accessory", "case"],
    collections: ["accessories"],
    description:
      "Rigid shell, padded interior, humidity-stable lining for checked and cabin routes.",
  },
  {
    id: "p7",
    title: "Tongue Drum — C Major 11",
    slug: "tongue-drum-c-major-11",
    priceCents: 420_00,
    compareAtPriceCents: null,
    currency: "eur",
    images: [HS("014"), HS("000")],
    heroImageUrl: HS("014"),
    modelUrl: null,
    audioSamples: [],
    scale: "C Major",
    noteCount: 11,
    maker: "Elements Percussion",
    weightKg: 2.4,
    dimensionsCm: "30 × 12 cm",
    supplierSku: null,
    leadTimeDays: 10,
    stockStatus: "in_stock",
    tags: ["tongue-drum"],
    collections: ["tongue-drums"],
    description:
      "Compact tongue drum for travel kits and teaching rooms—pairs with handpan arrangements.",
  },
  {
    id: "p8",
    title: "Aura Bowl — 12\" Planetary",
    slug: "aura-bowl-12-planetary",
    priceCents: 180_00,
    compareAtPriceCents: null,
    currency: "eur",
    images: [SH("002"), SH("003")],
    heroImageUrl: SH("002"),
    modelUrl: null,
    audioSamples: [],
    scale: "Planetary set",
    noteCount: 1,
    maker: "Elements Sound",
    weightKg: 1.1,
    dimensionsCm: "30 × 8 cm",
    supplierSku: null,
    leadTimeDays: 5,
    stockStatus: "in_stock",
    tags: ["sound-healing"],
    collections: ["sound-healing"],
    description:
      "Cast bronze singing bowl for layering sustain beds beneath handpan recordings.",
  },
];

/** Legacy helper — amount is smallest-unit for non-IDR (cents); IDR is whole rupiah when passed through formatMoney only */
export function formatPrice(cents: number, currency: string): string {
  const cur = currency.toLowerCase();
  if (cur === "idr") {
    return formatMoney(cents, "idr");
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

export function formatProductDisplay(
  priceEurCents: number,
  displayCurrency: CheckoutCurrency
): string {
  const smallest = stripeAmountFromEurCents(priceEurCents, displayCurrency);
  return formatMoney(smallest, displayCurrency);
}

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Default listing used by legacy single-product flows */
export function getDefaultProduct(): Product {
  const found = getProductBySlug("studio-handpan-d-kurd-10");
  if (!found) {
    throw new Error("Default product missing from catalog");
  }
  return found;
}

export function getProductsByCollection(collection: string): Product[] {
  return products.filter((p) => p.collections.includes(collection));
}

export function getProductsByTag(tag: string): Product[] {
  return products.filter((p) => p.tags.includes(tag));
}
