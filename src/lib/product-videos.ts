/**
 * Studio demo videos (Google Drive). Mapped from Drive filenames to catalog slugs.
 * Files must be shared as "Anyone with the link can view".
 */
export const productVideoIds = {
  // Signature Series
  "signature-d-kurd-10": "1X77dCJKa5h8ngmMVtWTap_1irDSFooQe",
  "signature-d-kurd-12": "1AH-qiSTmiffm6MVJROBLSic8phALoCsc",
  "signature-c-minor-15": "1Ai7Kc1Z9ArrQpMz4Ytn4u5tPDDAde9nZ",
  "signature-d-aegean-10": "1SM-H5lMcCiz7TlH8BVUu4OvxCn94iZys",
  "signature-f-sharp-nordlys-14": "1fmg1rzCRSd4a4sEOuL5xliAoTzlkbRn6",
  // Origins
  "origins-d-kurd-10": "1X77dCJKa5h8ngmMVtWTap_1irDSFooQe",
  "origins-d-kurd-18": "1mPcYmFfFu9GPjFrLg__XLgYly44rCMOJ",
  "origins-d-aegean-18": "1SM-H5lMcCiz7TlH8BVUu4OvxCn94iZys",
  "origins-f-sharp-nordlys-15": "1fmg1rzCRSd4a4sEOuL5xliAoTzlkbRn6",
  "origins-e-amara-20": "1m73Hv507yLUFP4hUZ9DE83Fq5LRRBfNA",
  "origins-b2-mystic-9": "104ayx2pSObQn0S_rLMRxzGrbrMIvIpGX",
  "origins-d-ashakarian-16": "1SOFTdl8TgUG2e7z4TukfHOJ7wFXm4WzA",
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
