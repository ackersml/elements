import type { MetadataRoute } from "next";
import { SITE_INDEXABLE } from "@/lib/site-visibility";

export default function robots(): MetadataRoute.Robots {
  // Pre-launch: keep the whole storefront out of search results.
  // See SITE_INDEXABLE in src/lib/site-visibility.ts.
  if (!SITE_INDEXABLE) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  const base = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    ...(base ? { sitemap: `${base}/sitemap.xml` } : {}),
  };
}
