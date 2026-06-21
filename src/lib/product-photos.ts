/** Studio imports from scripts/import-photo-archive.py */
export const PHOTO_ASSET_VERSION = "20260620";

export const productPhotoSets = {
  "nordlys-f-sharp-15": [
    "/products/nordlys-f-sharp-15-01.png",
    "/products/nordlys-f-sharp-15-02.png",
    "/products/nordlys-f-sharp-15-03.png",
    "/products/nordlys-f-sharp-15-04.png",
  ],
  "trailhead-d-celtic-9": [
    "/products/trailhead-d-celtic-9-01.png",
    "/products/trailhead-d-celtic-9-02.png",
    "/products/trailhead-d-celtic-9-03.png",
  ],
  "sanctuary-b-amara-9": [
    "/products/sanctuary-b-amara-9-01.png",
    "/products/sanctuary-b-amara-9-02.png",
    "/products/sanctuary-b-amara-9-03.png",
  ],
  "copper-veil-d-kurd-12": [
    "/products/copper-veil-d-kurd-12-01.png",
    "/products/copper-veil-d-kurd-12-02.png",
    "/products/copper-veil-d-kurd-12-03.png",
  ],
  "sanctuary-c-minor-15": [
    "/products/sanctuary-c-minor-15-01.png",
    "/products/sanctuary-c-minor-15-02.png",
    "/products/sanctuary-c-minor-15-03.png",
  ],
  "atelier-c-sharp-pygmy-17": [
    "/products/atelier-c-sharp-pygmy-17-01.png",
    "/products/atelier-c-sharp-pygmy-17-02.png",
    "/products/atelier-c-sharp-pygmy-17-03.png",
  ],
  "atelier-f-sharp-pygmy-17": [
    "/products/atelier-f-sharp-pygmy-17-01.png",
    "/products/atelier-f-sharp-pygmy-17-02.png",
    "/products/atelier-f-sharp-pygmy-17-03.png",
    "/products/atelier-f-sharp-pygmy-17-04.png",
    "/products/atelier-f-sharp-pygmy-17-05.png",
  ],
  "ultimate-d-kurd-16": [
    "/products/ultimate-d-kurd-16-01.png",
    "/products/ultimate-d-kurd-16-02.png",
    "/products/ultimate-d-kurd-16-03.png",
    "/products/ultimate-d-kurd-16-04.png",
    "/products/ultimate-d-kurd-16-05.png",
  ],
  "studio-handpan-d-kurd-10": [
    "/products/studio-handpan-d-kurd-10-01.png",
    "/products/studio-handpan-d-kurd-10-02.png",
    "/products/studio-handpan-d-kurd-10-03.png",
  ],
  "road-case-carbon-weave": [
    "/products/road-case-carbon-weave-01.png",
    "/products/road-case-carbon-weave-02.png",
    "/products/road-case-carbon-weave-03.png",
    "/products/road-case-carbon-weave-04.png",
    "/products/road-case-carbon-weave-05.png",
  ],
  "handpan-bag-black": [
    "/products/handpan-bag-black-01.png",
    "/products/handpan-bag-black-02.png",
    "/products/handpan-bag-black-03.png",
    "/products/handpan-bag-black-04.png",
    "/products/handpan-bag-black-05.png",
    "/products/handpan-bag-black-06.png",
    "/products/handpan-bag-black-07.png",
  ],
} as const;

export type ProductPhotoSlug = keyof typeof productPhotoSets;

export function isProductPhotoSlug(slug: string): slug is ProductPhotoSlug {
  return slug in productPhotoSets;
}

export function productPhotoPath(src: string): string {
  return src.split("?")[0] ?? src;
}

export function photosFor(slug: ProductPhotoSlug): readonly string[] {
  return productPhotoSets[slug];
}

export function heroFor(slug: ProductPhotoSlug): string {
  return productPhotoSets[slug][0];
}

/** Primary (top) and hover (side) for product cards. */
export function cardPhotosFor(slug: ProductPhotoSlug): {
  primary: string;
  hover: string;
} {
  const photos = productPhotoSets[slug];
  return {
    primary: photos[0],
    hover: photos[1] ?? photos[0],
  };
}
