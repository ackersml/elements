/** Shop collections linked in header / footer (excludes paused categories). */
export const shopNavCollections = [
  { key: "shopBeginner", collection: "beginner" },
  { key: "shopExtended", collection: "extended" },
  { key: "shopRare", collection: "rare" },
  { key: "shopBundles", collection: "bundles" },
  { key: "shopAccessories", collection: "accessories" },
] as const;

export function shopCollectionHref(collection: string): string {
  return `/shop?collection=${collection}`;
}
