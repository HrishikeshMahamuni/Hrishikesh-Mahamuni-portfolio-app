import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hrushikeshmahamuni-portfolio.vercel.app";
  
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/", // Keep admin panel pages clean from search index
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
