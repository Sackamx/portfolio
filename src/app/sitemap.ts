import { LOCALES } from "@/dict/dict";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: `https://ksaczek.vercel.app/${locale}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 1,
  }));
}
