import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft , Sparkles, AlertCircle, ShieldAlert, Award } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { dataService } from "@/lib/dataService";

export const revalidate = 0; // Disable static caching so it always reflects CMS updates in real-time
export const dynamic = 'force-dynamic'; // Ensure page is rendered on each request

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  console.log('Generating metadata for slug:', slug);
  const project = await dataService.getProjectBySlug(slug);
  console.log('Project found for metadata:', project);

  return {
    title: project ? `${project.title} | Projects` : "Project Not Found",
    description: project ? project.shortDescription : "Project Details",
  };
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  console.log('Fetching project details for slug:', slug);
  const project = await dataService.getProjectBySlug(slug);
  console.log('Project data:', project);

  if (!project) {
    // Show a friendly message instead of 404 for debugging
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg text-white">
        <p>Project not found for slug "{slug}". Please check the slug value.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-gray-200 py-16">
      {/* Background glow elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
        </div>

        {/* Hero Banner Image */}
        <div className="relative rounded-3xl overflow-hidden aspect-[21/9] border border-white/5 shadow-2xl mb-10 bg-white/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.heroImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200"}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent" />
          
          {/* Category Tag overlay */}
          <span className="absolute bottom-6 left-6 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 border border-cyan-500/20 backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        {/* Title and Buttons Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-white/5">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              {project.title}
            </h1>
            
            {/* Tech Stack List */}
            <div className="flex flex-wrap gap-2 pt-1">
              {project.techStack?.map((tech: string) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-medium text-purple-300 bg-purple-500/5 border border-purple-500/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Call-to-actions */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-btn flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-all duration-300"
              >
                <FaGithub className="w-5 h-5" />
                GitHub Repo
              </a>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-btn flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300"
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Detailed Content splits */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          
          {/* Main info (Description) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white border-l-4 border-purple-500 pl-3">
                Project Overview
              </h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm md:text-base">
                {project.description}
              </p>
            </div>

            {/* Features List */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-4 pt-2">
                <h3 className="text-xl font-bold text-white border-l-4 border-purple-500 pl-3">
                  Key Features
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-1">
                  {project.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <Sparkles size={16} className="text-purple-400 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Challenges, Learnings & details */}
          <div className="space-y-8">
            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
                <h4 className="text-md font-bold text-white flex items-center gap-2">
                  <AlertCircle className="text-red-400 w-5 h-5" />
                  Challenges
                </h4>
                <ul className="space-y-3">
                  {project.challenges.map((challenge: string, idx: number) => (
                    <li key={idx} className="text-xs md:text-sm text-gray-400 leading-relaxed border-l-2 border-red-500/40 pl-3">
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Learnings */}
            {project.learnings && project.learnings.length > 0 && (
              <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
                <h4 className="text-md font-bold text-white flex items-center gap-2">
                  <Award className="text-emerald-400 w-5 h-5" />
                  Learnings
                </h4>
                <ul className="space-y-3">
                  {project.learnings.map((learning: string, idx: number) => (
                    <li key={idx} className="text-xs md:text-sm text-gray-400 leading-relaxed border-l-2 border-emerald-500/40 pl-3">
                      {learning}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>

        {/* Gallery Section */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-white/5">
            <h3 className="text-xl font-bold text-white border-l-4 border-purple-500 pl-3">
              Screenshots Gallery
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.gallery.map((img: string, idx: number) => (
                <div key={idx} className="relative rounded-2xl overflow-hidden aspect-video border border-white/5 bg-white/5 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/50 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
