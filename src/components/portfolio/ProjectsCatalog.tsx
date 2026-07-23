"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, ArrowLeft, ArrowRight, Film, Code, Sparkles, Radio } from "lucide-react";
import { FaGithub } from "react-icons/fa";


interface ProjectItem {
  id?: string;
  _id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  techStack: string[];
  githubLink?: string;
  liveLink?: string;
  heroImage: string;
  category: string;
  featured: boolean;
}

interface ProjectsCatalogProps {
  initialProjects: ProjectItem[];
}

export default function ProjectsCatalog({ initialProjects }: ProjectsCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "AI Projects", "Full Stack", "Real-Time", "Client Projects", "Learning Projects"];

  // Filter and search
  const filteredProjects = initialProjects.filter((project) => {
    const matchesCategory =
      activeCategory === "All" ||
      project.category.toLowerCase() === activeCategory.toLowerCase();
    
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-dark-bg text-gray-200 py-16 text-center">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        {/* Glow Effects */}
        <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Back navigation */}
        <div className="mb-10 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        {/* Page Title */}
        <div className="text-center md:text-left mb-12 relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            All Projects
          </h1>
          <p className="text-gray-400 mt-3 text-sm md:text-base max-w-xl">
            A directory of applications I've built, ranging from professional client portals to interactive AI experiments and tools.
          </p>
        </div>

        {/* Search and Filters panel */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 mb-12 relative z-10">
          
          {/* Categories select tabs */}
          <div className="flex flex-wrap gap-2 order-2 md:order-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide border transition-all duration-200 cursor-pointer ${
                  activeCategory === category
                    ? "text-white bg-purple-600 border-purple-500 shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                    : "text-gray-400 hover:text-white border-white/5 bg-white/5 hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:max-w-xs order-1 md:order-2">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search project, stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 text-xs md:text-sm focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/20 transition-all duration-200"
            />
          </div>

        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center relative z-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const projectId = project._id || project.id || project.slug;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={projectId}
                  className="glass-panel rounded-2xl overflow-hidden flex flex-col justify-between group border border-white/5 hover:border-purple-500/20 transition-all duration-300"
                >
                  {/* Card Image */}
                  <div className="relative overflow-hidden aspect-video bg-white/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.heroImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/85 via-dark-bg/10 to-transparent" />
                    
                    {/* Project Category Tag */}
                    <span className="absolute top-4 left-4 px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider text-purple-300 bg-purple-950/80 border border-purple-500/30 backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                    <div className="space-y-3">
                      <Link href={`/projects/${project.slug}`}>
                        <h4 className="text-xl font-bold text-white hover:text-purple-300 transition-colors duration-200 line-clamp-1">
                          {project.title}
                        </h4>
                      </Link>
                      <p className="text-xs md:text-sm text-gray-400 line-clamp-3 leading-relaxed">
                        {project.shortDescription}
                      </p>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.techStack?.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[9px] font-semibold text-gray-400 bg-white/5 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Buttons & Links */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 group-hover:gap-2 transition-all duration-200"
                      >
                        View Details
                        <ArrowRight size={14} />
                      </Link>
                      
                      <div className="flex items-center gap-3">
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors duration-200"
                            aria-label="GitHub Repo"
                          >
                            <FaGithub className="w-5 h-5" />
                          </a>
                        )}
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors duration-200"
                            aria-label="Live Demo"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty search results state */}
          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-400 text-base">
                No projects found matching your query or filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-4 text-purple-400 hover:text-purple-300 text-sm font-semibold underline underline-offset-4 cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
