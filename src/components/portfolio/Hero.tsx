"use client";

import { motion, Variants } from "framer-motion";
import {  Mail, ArrowUpRight, Sparkles, Database, Atom, Cpu, Radio, Layers } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";



export default function Hero() {
  // Stagger variants for text animations
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Technologies in the orbit
  const orbitTechs = [
    { name: "React", 
      devicon: "devicon-react-original colored",
      icon: Atom, 
      color: "text-sky-400 border-sky-400/20 shadow-sky-500/10"
    },
    { 
      name: "Nextjs",
      devicon: "devicon-css3-plain colored", 
      icon: Layers, 
      color: "text-white border-white/20 shadow-white/10" 
    },
    { name: "nodejs", 
      devicon: "devicon-tailwindcss-original colored",
      icon: Cpu, 
      color: "text-emerald-400 border-emerald-400/20 shadow-emerald-500/10" 
    },
    { name: "mongodb", 
      devicon: "devicon-mongodb-plain colored",
      icon: Database, 
      color: "text-green-500 border-green-500/20 shadow-green-500/10"
    },
    { name: "html5", 
      devicon: "devicon-html5-plain colored",
      icon: Radio, 
      color: "text-indigo-400 border-indigo-400/20 shadow-indigo-500/10" 
    },
    { name: "javascript", 
      devicon: "devicon-javascript-plain colored",
      icon: Sparkles, 
      color: "text-fuchsia-400 border-fuchsia-400/20 shadow-fuchsia-500/10" 
    },
  ];

  return (
    <section id="home" 
    className="relative min-h-screen sm:text-center flex items-center justify-center pt-24 overflow-hidden bg-dark-bg text-center">
      {/* Background radial glow effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-purple-900/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-indigo-900/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-cyan-900/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center justify-items-center z-10 py-12">
        
        {/* Left Side: Professional Information */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center space-y-4 text-center lg:text-left order-2 lg:order-1"
        >
          <motion.div 
            variants={itemVariants} 
            className="inline-flex items-center gap-2 self-center lg:self-start px-3 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-300 text-xs font-semibold tracking-wide">
              <Sparkles size={12} className="animate-pulse" />
              Open for Opportunities
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <h3 className="text-lg md:text-xl font-medium text-gray-400">Hi, I'm</h3>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
              Hrishikesh Mahamuni
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 glow-text">
              MERN Stack Developer
            </h2>
          </motion.div>

          <motion.p variants={itemVariants} className="text-gray-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
            I craft high-performance full-stack web applications, blending robust backend architectures with beautiful, interactive user interfaces. Specializing in modern React, Next.js, and real-time AI-powered services.
          </motion.p>

          {/* Call to Actions */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <a
              href="#projects"
              className="glow-btn flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300"
            >
              View Projects
              <ArrowUpRight size={18} />
            </a>
            <a
              href="#contact"
              className="flex items-center justify-center w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all duration-300"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-5 pt-4">
            <a
              href="https://github.com/HrishikeshMahamuni"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/hrishikeshmahamuni/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:hrushikeshn12@gmail.com"
              className="p-3 rounded-full border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Professional Image and Orbit Animation */}
        <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2 py-8 min-h-[400px] md:min-h-[500px]">
          <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
            {/* Central Profile Image (static, behind icons) */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-full p-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400 shadow-[0_0_40px_rgba(139,92,246,0.3)] animate-[pulse_6s_ease-in-out_infinite]">
                <div className="w-full h-full rounded-full overflow-hidden bg-dark-bg flex items-center justify-center relative">
                  {/* Fallback avatar */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    // src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
                    src="https://res.cloudinary.com/kyyyyr6x/image/upload/v1784123727/IMG_20260428_124333-Photoroom-Photoroom_gvjr25.png"
                    alt="Hrushikesh Mahamuni"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/40 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Rotating orbit overlay (icons + circles) */}
            <div className="absolute inset-0 flex items-center justify-center orbit-ring z-10">
              {/* Outer Orbit Path Circle */}
              <div className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-white/10" />
              {/* Mid Orbit Path Circle */}
              <div className="absolute w-[100%] h-[100%] rounded-full border border-dashed border-white/5" />

              {/* Orbiting Technology Icons */}
              {orbitTechs.map((tech, idx) => {
                const angle = (idx * 360) / orbitTechs.length;
                const transformStyle = {
                  transform: `rotate(${angle}deg) translate(clamp(130px, 15vw, 175px)) rotate(-${angle}deg)`,
                };
                const Icon = tech.icon;
                return (
                  <div
                    key={tech.name}
                    style={transformStyle}
                    className="absolute z-20 flex items-center justify-center w-11 h-11 md:w-14 md:h-14   backdrop-blur-md shadow-[0_0_15px_var(--tw-shadow-color)] transition-all duration-300 hover:scale-115 hover:border-purple-400"
                  >
                    <div className={`flex flex-col items-center justify-center orbit-icon  ${tech.color}`}
                     
                    >
                      {/* <Icon className="w-5 h-5 md:w-6 md:h-6" /> */}
                      {/* <i className={tech.icon}></i> */}
                      <i className={`${tech.devicon} text-4xl border rounded-full p-3.5`}></i>
                      <span className="sr-only ">{tech.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Small decorative rings */}
            <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full border border-purple-500/20 bg-purple-500/5 animate-[ping_4s_ease-in-out_infinite]" />
            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full border border-cyan-500/20 bg-cyan-500/5 animate-[ping_6s_ease-in-out_infinite]" />
          </div>
        </div>

      </div>
    </section>
  );
}
