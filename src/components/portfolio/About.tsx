"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface AboutProps {
  data: {
    name: string;
    title: string;
    description: string;
    profileImage: string;
    technologies: string[];
  };
}

export default function About({ data }: AboutProps) {
  // Animation variants
  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const tagContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-dark-bg/60 border-y border-white/5">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">My Biography</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">About Me</h3>
          <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Profile Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group max-w-[320px] sm:max-w-[360px]">
              {/* Outer decorative borders */}
              <div className="absolute -inset-4 rounded-2xl border border-dashed border-purple-500/20 group-hover:border-purple-500/40 transition-colors duration-300 pointer-events-none" />
              
              {/* Glow background effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />
              
              {/* Main Image frame */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-dark-bg p-2 group-hover:border-purple-500/30 transition-all duration-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data?.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600"}
                  alt={data?.name || "Hrushikesh Mahamuni"}
                  className="w-full h-full object-cover rounded-lg aspect-square filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Floating Stat card */}
              {/* <div className="absolute -bottom-6 -right-6 glass-panel p-4 rounded-xl border border-white/10 flex items-center gap-3 shadow-lg">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                  <Sparkles size={20} />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">4+ Years</div>
                  <div className="text-xs text-gray-400">Coding Journey</div>
                </div>
              </div> */}
            </div>
          </motion.div>

          {/* Right Column: About Description & Tags */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            <div className="space-y-3">
              <h4 className="text-xl font-semibold text-white">
                I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-bold">{data?.name}</span>, a professional {data?.title}
              </h4>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm md:text-base">
                {data?.description}
              </p>
            </div>

            {/* Core Technologies tags */}
            <div className="space-y-3 pt-2">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Technologies I work with</h5>
              <motion.div
                variants={tagContainerVariants}
                className="flex flex-wrap gap-2.5"
              >
                {data?.technologies?.map((tech) => (
                  <motion.span
                    key={tech}
                    variants={tagVariants}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-purple-300 bg-purple-500/5 border border-purple-500/15 hover:border-purple-400/40 hover:bg-purple-500/10 transition-colors duration-200"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
