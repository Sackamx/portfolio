import { LOCALES } from "@/dict/dict";
import { PROJECTS } from "@/lib/const";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap(
    (locale) =>
      [
        {
          url: `https://ksaczek.vercel.app/${locale}`,
          lastModified: new Date(),
          changeFrequency: "yearly",
          priority: 1,
        },
        ...PROJECTS.map((slug) => ({
          url: `https://ksaczek.vercel.app/${locale}/projects/${slug}`,
          lastModified: new Date(),
          changeFrequency: "yearly",
          priority: 1,
        })),
      ] as MetadataRoute.Sitemap
  );
}
