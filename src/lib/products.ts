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

/** Product photography: PNG cutouts from `scripts/process-product-pngs.py` (rembg). */
const PHOTO = (file: string) =>
  `/products/${file.replace(/\.jpe?g$/i, ".png")}`;

/** Seed catalog — replace with CMS when wired */
export const products: Product[] = [
  {
    id: "p1",
    title: "Studio Handpan — D Kurd 10",
    slug: "studio-handpan-d-kurd-10",
    priceCents: 110_000,
    compareAtPriceCents: null,
    currency: "eur",
    images: [PHOTO("d-kurd-10.jpg"), PHOTO("d-kurd-10-back.jpg")],
    heroImageUrl: PHOTO("d-kurd-10.jpg"),
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
    title: "Sanctuary — B Amara 9",
    slug: "sanctuary-b-amara-9",
    priceCents: 125_000,
    compareAtPriceCents: 132_000,
    currency: "eur",
    images: [PHOTO("b-amara-9.jpg"), PHOTO("b-amara-9-back.jpg")],
    heroImageUrl: PHOTO("b-amara-9.jpg"),
    modelUrl: null,
    audioSamples: [],
    scale: "B Amara",
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
      "B Amara colouring with a singing sustain—built for slow melodic playing and ceremony.",
  },
  {
    id: "p3",
    title: "Copper Veil — D Kurd 12",
    slug: "copper-veil-d-kurd-12",
    priceCents: 189_000,
    compareAtPriceCents: null,
    currency: "eur",
    images: [PHOTO("d-kurd-12.jpg"), PHOTO("d-kurd-12-back.jpg")],
    heroImageUrl: PHOTO("d-kurd-12.jpg"),
    modelUrl: null,
    audioSamples: [],
    scale: "D Kurd",
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
      "Extended D Kurd compass with stable fundamentals for ensemble work and composition.",
  },
  {
    id: "p4",
    title: "Trailhead — D Celtic 9",
    slug: "trailhead-d-celtic-9",
    priceCents: 108_000,
    compareAtPriceCents: null,
    currency: "eur",
    images: [PHOTO("f-sharp-pygmy-17.jpg"), PHOTO("f-sharp-pygmy-17-back.jpg")],
    heroImageUrl: PHOTO("f-sharp-pygmy-17.jpg"),
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
    images: [PHOTO("handpan-bag.jpg"), PHOTO("d-kurd-10.jpg")],
    heroImageUrl: PHOTO("handpan-bag.jpg"),
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
    images: [PHOTO("handpan-bag.jpg"), PHOTO("d-kurd-10-back.jpg")],
    heroImageUrl: PHOTO("handpan-bag.jpg"),
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
    id: "p9",
    title: "Atelier — C# Pygmy 17",
    slug: "atelier-c-sharp-pygmy-17",
    priceCents: 195_000,
    compareAtPriceCents: null,
    currency: "eur",
    images: [PHOTO("c-sharp-pygmy-17.jpg"), PHOTO("c-sharp-pygmy-17-back.jpg")],
    heroImageUrl: PHOTO("c-sharp-pygmy-17.jpg"),
    modelUrl: null,
    audioSamples: [],
    scale: "C# Pygmy",
    noteCount: 17,
    maker: "Elements Rare",
    weightKg: 4.6,
    dimensionsCm: "56 × 26 cm",
    supplierSku: null,
    leadTimeDays: 28,
    stockStatus: "in_stock",
    tags: ["extended", "rare"],
    collections: ["rare", "extended"],
    description:
      "Wide chromatic layout in Pygmy colour—suited to modal improvisation and filmic textures.",
  },
  {
    id: "p10",
    title: "Atelier — F# Pygmy 17",
    slug: "atelier-f-sharp-pygmy-17",
    priceCents: 195_000,
    compareAtPriceCents: null,
    currency: "eur",
    images: [PHOTO("f-sharp-pygmy-17.jpg"), PHOTO("f-sharp-pygmy-17-back.jpg")],
    heroImageUrl: PHOTO("f-sharp-pygmy-17.jpg"),
    modelUrl: null,
    audioSamples: [],
    scale: "F# Pygmy",
    noteCount: 17,
    maker: "Elements Rare",
    weightKg: 4.6,
    dimensionsCm: "56 × 26 cm",
    supplierSku: null,
    leadTimeDays: 28,
    stockStatus: "preorder",
    tags: ["extended", "rare"],
    collections: ["rare", "extended"],
    description:
      "F# Pygmy voicing across seventeen fields—warm fundamentals with controlled bloom.",
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
