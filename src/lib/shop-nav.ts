import { getProductsByCollection } from "@/lib/products";

/** Shop collections linked in header / footer (excludes paused categories). */
export const shopNavCollections = [
  { key: "shopBeginner", collection: "beginner" },
  { key: "shopExtended", collection: "extended" },
  { key: "shopRare", collection: "rare" },
  { key: "shopBundles", collection: "bundles" },
  { key: "shopAccessories", collection: "accessories" },
] as const;

export function shopCollectionHref(collection: string): string {
  return `/collections/${collection}`;
}

export function isValidCollection(handle: string): boolean {
  return shopNavCollections.some((c) => c.collection === handle);
}

export function getCollectionLabelKey(
  collection: string
): (typeof shopNavCollections)[number]["key"] | null {
  return shopNavCollections.find((c) => c.collection === collection)?.key ?? null;
}

/** Representative product image for mega-menu thumbnails. */
export function getCollectionPreviewImage(collection: string): string | undefined {
  return getProductsByCollection(collection)[0]?.heroImageUrl;
}
