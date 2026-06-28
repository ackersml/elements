/**
 * Studio demo videos (Google Drive). Mapped from Drive filenames to catalog slugs.
 * Files must be shared as "Anyone with the link can view".
 */
export const productVideoIds = {
  "sanctuary-b-amara-9": "104ayx2pSObQn0S_rLMRxzGrbrMIvIpGX", // B2 MYSTIC 9
  "trailhead-d-celtic-9": "1SM-H5lMcCiz7TlH8BVUu4OvxCn94iZys", // D AGEAN 18
  "ultimate-d-kurd-16": "1SOFTdl8TgUG2e7z4TukfHOJ7wFXm4WzA", // D ASHA 16
  "studio-handpan-d-kurd-10": "1X77dCJKa5h8ngmMVtWTap_1irDSFooQe", // D KURD 10
  "atelier-c-sharp-pygmy-17": "1mPcYmFfFu9GPjFrLg__XLgYly44rCMOJ", // D KURD 18
  "atelier-f-sharp-pygmy-17": "1m73Hv507yLUFP4hUZ9DE83Fq5LRRBfNA", // E AMARA 20
  "nordlys-f-sharp-15": "1fmg1rzCRSd4a4sEOuL5xliAoTzlkbRn6", // F# NORDLYS 15
  "sanctuary-c-minor-15": "1Ai7Kc1Z9ArrQpMz4Ytn4u5tPDDAde9nZ", // C MINOR 15
  "copper-veil-d-kurd-12": "1AH-qiSTmiffm6MVJROBLSic8phALoCsc", // D KURD 12
} as const;

export type ProductVideoSlug = keyof typeof productVideoIds;

export function isProductVideoSlug(slug: string): slug is ProductVideoSlug {
  return slug in productVideoIds;
}

/** Direct MP4 stream for HTML5 `<video>` (large Drive files need confirm=t). */
export function videoStreamUrl(slug: string): string | undefined {
  if (!isProductVideoSlug(slug)) return undefined;
  const fileId = productVideoIds[slug];
  return `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`;
}

export function videoDriveViewUrl(slug: string): string | undefined {
  if (!isProductVideoSlug(slug)) return undefined;
  return `https://drive.google.com/file/d/${productVideoIds[slug]}/view`;
}
