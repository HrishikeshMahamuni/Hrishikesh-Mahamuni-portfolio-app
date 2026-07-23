"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, BookOpen, Landmark } from "lucide-react";

interface EducationItem {
  id?: string;
  _id?: string;
  type: string;
  college: string;
  institute: string;
  degree: string;
  startYear: string;
  endYear: string;
  description?: string;
}

interface EducationProps {
  education: EducationItem[];
}

export default function Education({ education }: EducationProps) {
  // Sort education items by startYear descending
  const sortedEdu = [...education].sort(
    (a, b) => parseInt(b.startYear) - parseInt(a.startYear)
  );

  return (
    <section id="education" className="py-24 relative bg-dark-bg">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-[450px] h-[450px] bg-indigo-950/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">My Qualifications</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">Education Timeline</h3>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-dashed border-white/10 md:border-l-0 max-w-4xl mx-auto">
          
          {/* Vertical Center Line for Desktop */}
          <motion.div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-cyan-500 to-transparent hidden md:block origin-top" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} />

          <div className="space-y-12 md:space-y-16">
            {sortedEdu.map((item, idx) => {
              const eduId = item._id || item.id || idx.toString();
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={eduId}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? "md:flex-row-reverse" : ""}`}
                >
                  
                  {/* timeline dot */}
                  <div className="absolute left-4 md:left-1/2 md:-ml-2.5 z-20 flex items-center justify-center w-5 h-5 rounded-full bg-dark-bg border-2 border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-pulse" />

                  {/* Spacer or Card content depending on index */}
                  <div className={`w-full md:w-1/2 pl-6 md:px-0 ${isEven ? "md:pr-10 ml-16" : "md:pl-10 mr-16"}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, type: "spring" }}
                      className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/5 shadow-md flex flex-col gap-4 relative"
                    >
                      {/* Year badge & Icon */}
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 border border-cyan-500/20">
                          <Calendar size={11} />
                          {item.startYear} - {item.endYear}
                        </span>
                        
                        <span className="text-[10px] font-semibold tracking-wider text-purple-400 uppercase bg-purple-500/5 px-2 py-0.5 rounded border border-purple-500/10">
                          {item.type}
                        </span>
                      </div>

                      {/* Header info */}
                      <div className="space-y-1">
                        <h4 className="text-lg font-bold text-white flex items-center gap-2">
                          <GraduationCap className="text-purple-400 w-5 h-5 shrink-0" />
                          {item.degree}
                        </h4>

                        <p className="text-sm font-semibold text-gray-300 flex items-center gap-1.5 pl-7 px-2">
                          <Landmark className="text-gray-500 w-4 h-4" />
                          {item.college}
                        </p>
  
                        <p className="text-sm font-semibold text-gray-300 flex items-center gap-1.5 pl-7 px-2">
                          <BookOpen className="text-gray-500 w-4 h-4" />
                          {item.institute}
                        </p>
                      </div>

                      {/* Description */}
                      {item.description && (
                        <p className="text-xs md:text-sm text-gray-400 leading-relaxed pl-7 border-l border-white/5">
                          {item.description}
                        </p>
                      )}

                    </motion.div>
                  </div>

                  {/* Empty Spacer Column for Desktop alignment */}
                  <div className="hidden md:block md:w-1/2" />

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
