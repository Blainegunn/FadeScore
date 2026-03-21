import type { MetadataRoute } from "next";
import { getCitySlugsWithData } from "@/data/cities";
import { getAllBarberSlugs, getAllShopSlugs } from "@/data/barbers";
import { CUT_TYPE_ROUTES, HAIR_TYPE_ROUTES } from "@/lib/seo";

const BASE = "https://fadescore.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const citySlugs = await getCitySlugsWithData();
  const barberSlugs = await getAllBarberSlugs();
  const shopSlugs = await getAllShopSlugs();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/search`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/hidden-gem-barbers`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/compare`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${BASE}/how-we-rank`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const cityPages: MetadataRoute.Sitemap = citySlugs.flatMap((slug) => [
    { url: `${BASE}/best-barbers-in/${slug}`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE}/best-fade-barbers-in/${slug}`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE}/cheap-barbers-in/${slug}`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE}/top-rated-barbers-in/${slug}`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE}/hidden-gem-barbers-in/${slug}`, changeFrequency: "weekly" as const, priority: 0.7 },
  ]);

  // Cut-type specialty pages (13 specialties × N cities)
  const cutTypePages: MetadataRoute.Sitemap = citySlugs.flatMap((citySlug) =>
    CUT_TYPE_ROUTES.map((route) => ({
      url: `${BASE}/best-${route.slug}-in/${citySlug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  );

  // Hair-type pages (3 hair types × N cities)
  const hairTypePages: MetadataRoute.Sitemap = citySlugs.flatMap((citySlug) =>
    HAIR_TYPE_ROUTES.map((route) => ({
      url: `${BASE}/best-barbers-for-${route.slug}-in/${citySlug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  );

  const barberPages: MetadataRoute.Sitemap = barberSlugs.map((slug) => ({
    url: `${BASE}/barber/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const shopPages: MetadataRoute.Sitemap = shopSlugs.map((slug) => ({
    url: `${BASE}/shop/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...cityPages, ...cutTypePages, ...hairTypePages, ...barberPages, ...shopPages];
}
