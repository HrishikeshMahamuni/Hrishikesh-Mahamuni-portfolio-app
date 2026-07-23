import { dataService } from "@/lib/dataService";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import FeaturedProjects from "@/components/portfolio/FeaturedProjects";
import Education from "@/components/portfolio/Education";
import Contact from "@/components/portfolio/Contact";

export const revalidate = 0; // Disable static caching so it always reflects CMS updates in real-time

export default async function Home() {
  // Fetch details from either MongoDB Atlas or the JSON file database fallback
  const about = await dataService.getAbout();
  const skills = await dataService.getSkills();
  const projects = await dataService.getProjects();
  const education = await dataService.getEducation();

  return (
    <div className="flex flex-col mx-4 min-h-screen bg-dark-bg text-gray-200 overflow-x-hidden">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <About data={about} />
        <Skills skills={skills} />
        <FeaturedProjects projects={projects} />
        <Education education={education} />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 bg-dark-bg/80 text-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Hrushikesh Mahamuni. All rights reserved.</p>
          <p>
            Designed & Built with <span className="text-purple-400">♥</span> using Next.js 15 & Tailwind
          </p>
        </div>
      </footer>
    </div>
  );
}
