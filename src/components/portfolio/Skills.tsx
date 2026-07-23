"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import * as LucideIcons from "lucide-react";
import * as TechIcons from "react-icons/si";



// Mapping of technology names to SVG logo URLs (using Simple Icons CDN)



// Helper to render icon dynamically by string name
const renderIcon = (iconName: string): React.ReactNode => {
  // Try to render from react-icons/si first
  const TechIconComponent = (TechIcons as any)[iconName];
  if (TechIconComponent) {
    return <TechIconComponent className="w-6 h-6" />;
  }
  // Then try lucide-react icons
  const LucideIcon = (LucideIcons as any)[iconName];
  if (LucideIcon) {
    return <LucideIcon className="w-6 h-6" />;
  }
  // Fallback to Devicon CDN image
  //const src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName.toLowerCase()}/${iconName.toLowerCase()}-original.svg`;
  // return <img src={src} alt={iconName} className="w-6 h-6" loading="lazy" />;
  return <i className={iconName} style={{ fontSize: "30px" }}></i>
};


interface SkillItem {
  id?: string;
  _id?: string;
  name: string;
  category: string;
  icon: string;
}

interface SkillsProps {
  skills: SkillItem[];
}

export default function Skills({ skills }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Frontend", "Backend", "Database", "AI & APIs", "Tools"];

  // Filter skills based on selection
  const filteredSkills = activeCategory === "All"
    ? skills
    : skills.filter(skill => skill.category.toLowerCase() === activeCategory.toLowerCase());



  return (
    <section id="skills" className="py-24 relative bg-dark-bg">
      {/* Glow backgrounds */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">My Expertise</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">Skills & Technologies</h3>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2.5 md:gap-3.5 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 ${
                activeCategory === category
                  ? "text-white bg-purple-600 shadow-[0_0_15px_rgba(139,92,246,0.35)]"
                  : "text-gray-400 hover:text-white border border-white/5 bg-white/5 hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const skillId = skill._id || skill.id || skill.name;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  key={skillId}
                  className="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-4 group"
                >
                  {/* Glowing Icon Container */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-gray-400 group-hover:text-purple-400 group-hover:bg-purple-500/5 group-hover:border-purple-500/20 transition-all duration-300">
                    {renderIcon(skill.icon)}
                  </div>
                  
                  <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors duration-200">
                    {skill.name}
                  </span>
                  
                  {/* Category label */}
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 group-hover:text-purple-400/80 transition-colors duration-200">
                    {skill.category}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
