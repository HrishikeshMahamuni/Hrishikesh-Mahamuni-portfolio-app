import { MetadataRoute } from "next";
import { dataService } from "@/lib/dataService";

export const revalidate = 86400; // Cache sitemap for 24 hours

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hrushikeshmahamuni-portfolio.vercel.app";

  // Static routes
  const routes = [
    "",
    "/projects",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  try {
    // Dynamic project detail routes
    const projects = await dataService.getProjects();
    const projectRoutes = projects.map((project: any) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    return [...routes, ...projectRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return routes;
  }
}
