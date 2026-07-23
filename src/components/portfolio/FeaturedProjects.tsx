"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import {  ExternalLink, ArrowRight } from "lucide-react";
import { FaGithub, } from "react-icons/fa";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
  featured: boolean;
}

interface FeaturedProjectsProps {
  projects: ProjectItem[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  // Filter for featured projects
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-dark-bg/40 border-y border-white/5 text-center">
      {/* Glow backgrounds */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">My Showcase</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">Featured Projects</h3>
          <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Swiper Slider */}
        <div className="mb-14 px-2 flex justify-center">
          {featured.length > 0 ? (
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={true}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="pb-16"
            >
              {featured.map((project) => {
                const projectId = project._id || project.id || project.slug;
                return (
                  <SwiperSlide key={projectId} className="h-auto">
                    <div className="glass-panel rounded-2xl overflow-hidden h-full flex flex-col group border border-white/5 hover:border-purple-500/20 transition-all duration-300">
                      
                      {/* Project Image Card */}
                      <div className="relative overflow-hidden aspect-video bg-white/5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={project.heroImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600"}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-dark-bg/10 to-transparent" />
                        
                        {/* Project Category Tag */}
                        <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider text-purple-300 bg-purple-950/80 border border-purple-500/30 backdrop-blur-sm">
                          Featured
                        </span>
                      </div>

                      {/* Project content */}
                      <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                        <div className="space-y-3">
                          <Link href={`/projects/${project.slug}`}>
                            <h4 className="text-xl font-bold text-white hover:text-purple-300 transition-colors duration-200 line-clamp-1">
                              {project.title}
                            </h4>
                          </Link>
                          <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
                            {project.shortDescription}
                          </p>
                        </div>

                        {/* Tech Stack Chips */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {project.techStack?.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded text-[10px] font-semibold text-gray-400 bg-white/5 border border-white/5"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack?.length > 4 && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold text-purple-400 bg-purple-500/5 border border-purple-500/10">
                              +{project.techStack.length - 4} more
                            </span>
                          )}
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

                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No featured projects available.
            </div>
          )}
        </div>

        {/* Explore All Link Button */}
        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10 hover:border-purple-500/60 text-sm font-semibold text-white transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
          >
            Explore All Projects
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}
