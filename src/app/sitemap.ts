import type { MetadataRoute } from "next";
import { products } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const routes = ["", "/shop", "/support", "/auth/login"].map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: "daily" as const, priority: route === "" ? 1 : .8 }));
  return [...routes, ...products.map((product) => ({ url: `${base}/product/${product.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: .9 }))];
}
