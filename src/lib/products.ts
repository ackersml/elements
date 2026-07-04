import type { BrandElementId } from "@/lib/brand/elements-brand";
import { heroFor, photosFor, type ProductPhotoSlug } from "@/lib/product-photos";
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
  /** Brand kit elemental association (PDF product cards) */
  element?: BrandElementId;
  /** Editorial mood tags for Canva product cards */
  moods?: string[];
};

/** Elemental scene art for collection grids (from brand imagery). */
const COLLECTION_SCENE_BY_ELEMENT: Partial<Record<BrandElementId, string>> = {
  air: "/images/canva/elements/air.webp",
  fire: "/images/canva/elements/fire.webp",
  earth: "/images/canva/elements/earth.webp",
  water: "/images/canva/elements/water.webp",
  space: "/images/canva/elements/space.webp",
};

export function getCollectionSceneUrl(product: Product): string | undefined {
  if (!product.element) return undefined;
  return COLLECTION_SCENE_BY_ELEMENT[product.element];
}

const HANDPAN_DEFAULTS = {
  weightKg: 4.5,
  dimensionsCm: "53 × 26 cm",
  leadTimeDays: 21,
  stockStatus: "in_stock" as StockStatus,
  currency: "eur" as CheckoutCurrency,
  compareAtPriceCents: null,
  modelUrl: null,
  audioSamples: [] as AudioSample[],
  supplierSku: null,
};

type CatalogHandpanInput = {
  id: string;
  slug: string;
  scale: string;
  noteCount: number;
  priceEur: number;
  maker: string;
  collection: "signature" | "origins";
  element: BrandElementId;
  tags: string[];
  description: string;
  photoSlug: ProductPhotoSlug;
  moods?: string[];
};

function handpan({
  id,
  slug,
  scale,
  noteCount,
  priceEur,
  maker,
  collection,
  element,
  tags,
  description,
  photoSlug,
  moods,
}: CatalogHandpanInput): Product {
  const title = `${scale} ${noteCount}`;
  return {
    id,
    title,
    slug,
    priceCents: priceEur * 100,
    ...HANDPAN_DEFAULTS,
    images: [...photosFor(photoSlug)],
    heroImageUrl: heroFor(photoSlug),
    scale,
    noteCount,
    maker,
    collections: [collection],
    element,
    tags,
    description,
    moods,
  };
}

/** Seed catalog aligned with Elements Handpans Product Catalogue 2026 */
export const products: Product[] = [
  // —— Elements Signature Series (Amir Raga · Iran) ——
  handpan({
    id: "sig-d-kurd-10",
    slug: "signature-d-kurd-10",
    scale: "D Kurd",
    noteCount: 10,
    priceEur: 1300,
    maker: "Amir Raga · Signature Series",
    collection: "signature",
    element: "fire",
    tags: ["beginner", "professional"],
    photoSlug: "studio-handpan-d-kurd-10",
    description:
      "A versatile D minor world with immediate emotional access. The D Kurd 10 gives the player a stable centre, strong melodic movement and enough harmonic depth for meditation, songwriting and live performance.",
    moods: ["Hopeful", "Uplifting", "Melancholic"],
  }),
  handpan({
    id: "sig-d-kurd-12",
    slug: "signature-d-kurd-12",
    scale: "D Kurd",
    noteCount: 12,
    priceEur: 1400,
    maker: "Amir Raga · Signature Series",
    collection: "signature",
    element: "fire",
    tags: ["beginner", "professional"],
    photoSlug: "copper-veil-d-kurd-12",
    description:
      "The extended D Kurd 12 keeps the familiar emotional language of D minor while opening more melodic routes in the upper register. Forgiving for beginners and spacious for experienced improvisation.",
  }),
  handpan({
    id: "sig-g-minor-14",
    slug: "signature-g-minor-14",
    scale: "G Minor",
    noteCount: 14,
    priceEur: 3000,
    maker: "Amir Raga · Signature Series",
    collection: "signature",
    element: "earth",
    tags: ["intermediate", "professional"],
    photoSlug: "ultimate-d-kurd-16",
    description:
      "A low, grounded minor instrument with a more physical bass presence than standard D-root pans. Suited to ritual intensity, weight and a strong emotional foundation with clear melodic paths.",
  }),
  handpan({
    id: "sig-c-minor-15",
    slug: "signature-c-minor-15",
    scale: "C Minor",
    noteCount: 15,
    priceEur: 2800,
    maker: "Amir Raga · Signature Series",
    collection: "signature",
    element: "space",
    tags: ["intermediate", "professional"],
    photoSlug: "sanctuary-c-minor-15",
    description:
      "A broad C minor soundscape designed for inner work, ambient composition and deep listening. The extended range creates a wide emotional arc from shadowed bass tones into clear upper melodies.",
  }),
  handpan({
    id: "sig-d-aegean-10",
    slug: "signature-d-aegean-10",
    scale: "D Aegean",
    noteCount: 10,
    priceEur: 1300,
    maker: "Amir Raga · Signature Series",
    collection: "signature",
    element: "water",
    tags: ["beginner", "intermediate"],
    photoSlug: "trailhead-d-celtic-9",
    description:
      "D Aegean offers a luminous alternative to darker minor scales. Its open Lydian colour gives a floating, Mediterranean quality—excellent for peaceful improvisation and uplifting sound baths.",
  }),
  handpan({
    id: "sig-f-sharp-nordlys-14",
    slug: "signature-f-sharp-nordlys-14",
    scale: "F# Nordlys",
    noteCount: 14,
    priceEur: 3400,
    maker: "Amir Raga · Signature Series",
    collection: "signature",
    element: "space",
    tags: ["advanced"],
    photoSlug: "nordlys-f-sharp-15",
    description:
      "Nordlys has a rare northern-light character: spacious, glassy and slightly mysterious. Built for cinematic ambience, experimental melody and a sound beyond the standard handpan vocabulary.",
  }),
  handpan({
    id: "sig-f-sharp-low-pygmy-18",
    slug: "signature-f-sharp-low-pygmy-18",
    scale: "F# Low Pygmy",
    noteCount: 18,
    priceEur: 3400,
    maker: "Amir Raga · Signature Series",
    collection: "signature",
    element: "air",
    tags: ["intermediate", "professional"],
    photoSlug: "atelier-f-sharp-pygmy-17",
    description:
      "F# Low Pygmy expands the classic pentatonic feeling into a much wider field, allowing hypnotic ostinatos, long floating melodies and deep harmonic movement without becoming heavy.",
  }),

  // —— Elements Origins (Xi · China) ——
  handpan({
    id: "orig-d-kurd-10",
    slug: "origins-d-kurd-10",
    scale: "D Kurd",
    noteCount: 10,
    priceEur: 1200,
    maker: "Xi · Origins",
    collection: "origins",
    element: "fire",
    tags: ["beginner", "professional"],
    photoSlug: "studio-handpan-d-kurd-10",
    description:
      "The Origins D Kurd 10 is the accessible foundation of the collection. Classic emotional pull of D minor with simple navigation—a strong choice for teaching, first-time buyers and daily practice.",
  }),
  handpan({
    id: "orig-d-kurd-18",
    slug: "origins-d-kurd-18",
    scale: "D Kurd",
    noteCount: 18,
    priceEur: 2800,
    maker: "Xi · Origins",
    collection: "origins",
    element: "fire",
    tags: ["intermediate", "professional"],
    photoSlug: "ultimate-d-kurd-16",
    description:
      "A full extended D Kurd for players who want the classic minor language with a wider performance range. Bottom tones add body and grounding; upper notes give more melodic completion.",
  }),
  handpan({
    id: "orig-f-low-pygmy-16",
    slug: "origins-f-low-pygmy-16",
    scale: "F Low Pygmy",
    noteCount: 16,
    priceEur: 3000,
    maker: "Xi · Origins",
    collection: "origins",
    element: "earth",
    tags: ["intermediate", "professional"],
    photoSlug: "atelier-f-sharp-pygmy-17",
    description:
      "F Low Pygmy has a primal, earthy character with steady forward movement. Hypnotic quality that works especially well for trance-like playing, ceremony and deep meditative sound.",
  }),
  handpan({
    id: "orig-d-aegean-18",
    slug: "origins-d-aegean-18",
    scale: "D Aegean",
    noteCount: 18,
    priceEur: 3000,
    maker: "Xi · Origins",
    collection: "origins",
    element: "water",
    tags: ["intermediate", "professional"],
    photoSlug: "trailhead-d-celtic-9",
    description:
      "The extended D Aegean is a wide, flowing instrument with an uplifting, almost oceanic quality. Bass extensions create a powerful foundation while upper notes keep the sound bright and open.",
  }),
  handpan({
    id: "orig-f-sharp-nordlys-15",
    slug: "origins-f-sharp-nordlys-15",
    scale: "F# Nordlys",
    noteCount: 15,
    priceEur: 3000,
    maker: "Xi · Origins",
    collection: "origins",
    element: "space",
    tags: ["advanced"],
    photoSlug: "nordlys-f-sharp-15",
    description:
      "F# Nordlys 15 is for players who want a more unusual harmonic world. Airy and cosmic, with bass depth and upper shimmer—less standard song scale, more sonic environment.",
    moods: ["Spacey", "Dreamy", "Atmospheric"],
  }),
  handpan({
    id: "orig-f-sharp-low-pygmy-21",
    slug: "origins-f-sharp-low-pygmy-21",
    scale: "F# Low Pygmy",
    noteCount: 21,
    priceEur: 3000,
    maker: "Xi · Origins",
    collection: "origins",
    element: "air",
    tags: ["professional"],
    photoSlug: "atelier-f-sharp-pygmy-17",
    description:
      "A large-range F# Low Pygmy designed for serious exploration. Twenty-one notes give a full melodic landscape while keeping the ancient, hypnotic identity of the Pygmy family.",
  }),
  handpan({
    id: "orig-e-amara-20",
    slug: "origins-e-amara-20",
    scale: "E Amara",
    noteCount: 20,
    priceEur: 3000,
    maker: "Xi · Origins",
    collection: "origins",
    element: "air",
    tags: ["intermediate", "professional"],
    photoSlug: "sanctuary-b-amara-9",
    description:
      "E Amara 20 is an expanded Celtic minor world that feels both emotional and accessible. Naturally song-like—friendly for voice, melody writing and teaching.",
  }),
  handpan({
    id: "orig-b2-mystic-9",
    slug: "origins-b2-mystic-9",
    scale: "B2 Mystic",
    noteCount: 9,
    priceEur: 1200,
    maker: "Xi · Origins",
    collection: "origins",
    element: "fire",
    tags: ["beginner", "intermediate"],
    photoSlug: "sanctuary-b-amara-9",
    description:
      "B2 Mystic 9 is a compact low-register instrument with a deep, inward pull. Dark and focused without overwhelming—ideal for grounding rituals and intimate meditative settings.",
  }),
  handpan({
    id: "orig-d-ashakarian-16",
    slug: "origins-d-ashakarian-16",
    scale: "D Ashakarian",
    noteCount: 16,
    priceEur: 3000,
    maker: "Xi · Origins",
    collection: "origins",
    element: "air",
    tags: ["intermediate", "professional"],
    photoSlug: "trailhead-d-celtic-9",
    description:
      "D Ashakarian moves into a major, uplifting colour—open, optimistic and slightly emotional. Strong for breath-led playing, melodic storytelling and brighter ceremonial music.",
  }),

  // —— Cases & accessories ——
  {
    id: "acc-softcase",
    title: "Elements Softcase",
    slug: "elements-softcase",
    priceCents: 0,
    compareAtPriceCents: null,
    currency: "eur",
    images: [...photosFor("handpan-bag-black")],
    heroImageUrl: heroFor("handpan-bag-black"),
    modelUrl: null,
    audioSamples: [],
    scale: "—",
    noteCount: 0,
    maker: "Elements Accessories",
    weightKg: 1.4,
    dimensionsCm: "55 × 25 cm",
    supplierSku: null,
    leadTimeDays: 0,
    stockStatus: "in_stock",
    tags: ["accessory", "case", "included"],
    collections: ["accessories"],
    element: "earth",
    description:
      "Included with every handpan purchase. Padded soft-case with reinforced base and backpack straps for daily carrying, storage and light transport.",
  },
  {
    id: "acc-origins-hardcase",
    title: "Elements Origins Hardcase",
    slug: "elements-origins-hardcase",
    priceCents: 100_00,
    compareAtPriceCents: null,
    currency: "eur",
    images: [...photosFor("handpan-bag-black")],
    heroImageUrl: heroFor("handpan-bag-black"),
    modelUrl: null,
    audioSamples: [],
    scale: "—",
    noteCount: 0,
    maker: "Elements Accessories",
    weightKg: 3.0,
    dimensionsCm: "58 × 35 × 35 cm",
    supplierSku: null,
    leadTimeDays: 7,
    stockStatus: "in_stock",
    tags: ["accessory", "case", "upgrade"],
    collections: ["accessories"],
    element: "earth",
    description:
      "Waterproof hardcase upgrade with airline-travel protection and backpack transport. Select at checkout when ordering your instrument.",
  },
  {
    id: "acc-avaja-hardcase",
    title: "Avaja Hardcase",
    slug: "avaja-hardcase",
    priceCents: 150_00,
    compareAtPriceCents: null,
    currency: "eur",
    images: [...photosFor("road-case-carbon-weave")],
    heroImageUrl: heroFor("road-case-carbon-weave"),
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
    tags: ["accessory", "case", "upgrade"],
    collections: ["accessories"],
    element: "earth",
    description:
      "Premium waterproof hardcase with airline-travel protection and reinforced exterior. Upgrade option for frequent travel.",
  },
  {
    id: "acc-hct-hardcase",
    title: "HCT Hardcase Technologies",
    slug: "hct-hardcase-technologies",
    priceCents: 200_00,
    compareAtPriceCents: null,
    currency: "eur",
    images: [...photosFor("road-case-carbon-weave")],
    heroImageUrl: heroFor("road-case-carbon-weave"),
    modelUrl: null,
    audioSamples: [],
    scale: "—",
    noteCount: 0,
    maker: "Elements Accessories",
    weightKg: 3.5,
    dimensionsCm: "58 × 35 × 35 cm",
    supplierSku: null,
    leadTimeDays: 7,
    stockStatus: "in_stock",
    tags: ["accessory", "case", "upgrade"],
    collections: ["accessories"],
    element: "earth",
    description:
      "Maximum travel-focused protection—waterproof, airline-ready hardcase from HCT Hardcase Technologies. The top-tier upgrade for touring musicians.",
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
  const found = getProductBySlug("signature-d-kurd-10");
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

/** Homepage collection row — signature and origins highlights. */
const COLLECTION_SHOWCASE_SLUGS = [
  "signature-d-aegean-10",
  "signature-d-kurd-10",
  "origins-b2-mystic-9",
] as const;

export function getCollectionShowcaseProducts(): Product[] {
  return COLLECTION_SHOWCASE_SLUGS.map((slug) => getProductBySlug(slug)).filter(
    (p): p is Product => Boolean(p)
  );
}
