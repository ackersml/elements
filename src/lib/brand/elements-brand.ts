/**
 * Elements Handpan Store — branding kit.
 * Light Yatao commerce shell; forest/bronze identity accents.
 */

export const brandColors = {
  background: "#ffffff",
  card: "#faf9f7",
  surfaceAccent: "#fff7f2",
  foreground: "#0b0b0b",
  foregroundMuted: "#3e3e3e",
  accent: "#d4b98a",
  accentCommerce: "#a8624f",
  forest: "#2f3a2e",
  forestMoss: "#3e4a3c",
  sandstone: "#e8decf",
  deepSoil: "#31251c",
  mossMid: "#656e63",
  mossLight: "#8b928a",
  mossPale: "#b2b7b1",
  accentLight: "#e2d3b0",
  accentPale: "#f5f1e8",
  hairline: "#f7f7f7",
} as const;

export const brandFonts = {
  display: '"Cinzel", ui-serif, Georgia, serif',
  body: '"Open Sans", ui-sans-serif, system-ui, sans-serif',
  label: '"Space Mono", ui-monospace, monospace',
} as const;

export const brandLockup = {
  wordmark: "ELEMENTS",
  subtitle: "HANDPAN STORE",
  logomarkSrc: "/brand/elements-logomark.svg",
} as const;

export const brandTaglines = {
  primary: "Sound · Presence · Source",
  primarySeparator: " · ",
  category: "Handpan & sound healing",
  location: "Bali, Indonesia",
  locationExtended: "Ubud, Gianyar · Bali, Indonesia",
} as const;

export const brandVision =
  "To create one of the world's most emotionally resonant, spiritually grounded, and visually refined handpan brands, merging craftsmanship, sound healing, and elemental symbolism.";

export const brandMission = [
  "Offer high-quality handpans accessible to a global audience",
  "Create meaning through elements, sound, and story",
  "Build long-term trust through education, transparency, and artistry",
] as const;

export type BrandElementId = "earth" | "water" | "fire" | "air" | "space";

export type BrandElement = {
  id: BrandElementId;
  name: string;
  keywords: [string, string, string];
};

export const brandElements: BrandElement[] = [
  { id: "earth", name: "Earth", keywords: ["Grounding", "Trust", "Steadiness"] },
  { id: "water", name: "Water", keywords: ["Flow", "Sensitivity", "Emotional truth"] },
  { id: "fire", name: "Fire", keywords: ["Pulse", "Expression", "Aliveness"] },
  { id: "air", name: "Air", keywords: ["Breath", "Openness", "Clarity"] },
  { id: "space", name: "Space", keywords: ["Silence", "Presence", "Source"] },
];

export const brandHero = {
  headline: "Reconnect with yourself through sound & vibration",
  sub: "Discover handpans and sound healing instruments crafted to bring calm, clarity, and balance—gently guiding you into a deeper state of presence.",
  ctaPrimary: "Enter a state",
  ctaSecondary: "Shop instruments",
} as const;

export const brandCollection = {
  title: "Our collection",
  eyebrow: "Our handpicked instruments",
  handpanBlurb:
    "Our handpan collection features instruments with rich, resonant tones and balanced playability. Each piece is crafted for intuitive expression, supporting both meditative flow and musical depth.",
} as const;

export const brandWhyChoose = [
  "Premium, carefully selected instruments",
  "Transparent craftsmanship and sourcing",
  "Guidance for every level of practice",
  "A growing community of sound practitioners",
] as const;

export const brandCampaign = {
  soundAsState: "Sound as state",
  soundAsStateSub: "The body listens first. Thought slows. Speech disappears.",
  returnToBalance: "A return to balance",
  returnToBalanceSub:
    "Shaped by the balance of nature, each piece is designed to support clarity, stillness, and intuitive flow.",
  handpanStillness: "Handpan · Sound · Stillness",
  bodyListens: "The body listens first",
  soundNotHeard: "Sound is not heard, it is felt.",
  enterCalm: "Enter a deeper state of calm",
} as const;

export const brandThankYou = {
  title: "Thank you for choosing Elements.",
  line1: "Each tone carries a quiet intention—to soften, to ground, and to restore.",
  line2: "May it resonate with you, in moments both heard and felt.",
} as const;

export const brandContact = {
  founderName: "Dany Rud",
  founderTitle: "Owner",
  email: "info@elements.com",
  website: "elements.com",
  businessName: "Elements — Handpan & Sound Healing",
} as const;

export const brandProductTemplateDKurd10 = {
  element: "fire" as BrandElementId,
  description:
    "The D Kurd 10 is defined by its rich, emotive tone and fluid, expressive scale. Balanced and intuitive, it allows melodies to unfold naturally, offering a warm, immersive playing experience for those seeking depth and sensitivity.",
};

export function getBrandElement(id: BrandElementId): BrandElement {
  const el = brandElements.find((e) => e.id === id);
  if (!el) throw new Error(`Unknown element: ${id}`);
  return el;
}

export function formatElementLabel(id: BrandElementId): string {
  return `Element : ${getBrandElement(id).name}`;
}

export function formatElementKeywords(id: BrandElementId): string {
  const { keywords } = getBrandElement(id);
  return keywords.join(" · ");
}
