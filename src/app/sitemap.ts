import { getProducts } from "@/lib/products";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
    "http://localhost:3000";
  const products = getProducts();
  const lastModified = new Date();

  return [
    { url: base, lastModified },
    { url: `${base}/shop`, lastModified },
    { url: `${base}/handpan-scales`, lastModified },
    ...products.map((p) => ({
      url: `${base}/shop/${p.slug}`,
      lastModified,
    })),
  ];
}
