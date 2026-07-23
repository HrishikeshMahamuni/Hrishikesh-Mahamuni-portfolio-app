import { dataService } from "@/lib/dataService";
import ProjectsCatalog from "@/components/portfolio/ProjectsCatalog";

export const revalidate = 0; // Disable static caching so it always reflects CMS updates in real-time

export const metadata = {
  title: "Projects | Hrushikesh Portfolio CMS",
  description: "Browse Hrushikesh's full portfolio of development projects, including AI, full stack, real-time messaging, and client solutions.",
};

export default async function ProjectsPage() {
  const projects = await dataService.getProjects();

  return <ProjectsCatalog initialProjects={projects} />;
}
