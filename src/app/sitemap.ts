import { getProducts } from "@/lib/products";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
    "http://localhost:3000";
  const products = getProducts();
  const lastModified = new Date();

  const staticPaths = [
    "",
    "/shop",
    "/handpan-scales",
    "/journal",
    "/showrooms",
    "/shipping",
    "/returns",
    "/privacy",
    "/contact",
    "/track",
  ];

  return [
    ...staticPaths.map((path) => ({
      url: `${base}${path}`,
      lastModified,
    })),
    ...products.map((p) => ({
      url: `${base}/shop/${p.slug}`,
      lastModified,
    })),
  ];
}
