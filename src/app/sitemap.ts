import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jjvalor.com";

  const routes = [
    "",
    "/about",
    "/about/history",
    "/about/founder",
    "/about/vision",
    "/about/media",
    "/about/blog",
    "/services",
    "/services/agriculture",
    "/services/education",
    "/services/food-supply",
    "/services/tours-travel",
    "/services/marketplace",
    "/orphanage",
    "/orphanage/donate",
    "/orphanage/volunteer",
    "/orphanage/sponsorship",
    "/projects",
    "/projects/portfolio",
    "/projects/impact",
    "/careers",
    "/careers/jobs",
    "/careers/volunteer",
    "/partners",
    "/contact",
    "/marketplace",
    "/blog",
    "/academy",
    "/media",
    "/food-supply",
    "/tours-travel",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : route.split("/").length > 2 ? 0.7 : 0.8,
  }));
}
