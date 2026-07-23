import fs from "fs";
import path from "path";
import { dbConnect } from "./db";
import { About } from "@/models/About";
import { Skill } from "@/models/Skill";
import { Project } from "@/models/Project";
import { Education } from "@/models/Education";

// Path to fallback local database file
const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

function serialize<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

// Ensure data directory exists and return default seeded DB
function getInitialData() {
  return {
    about: {
      name: "Hrushikesh Mahamuni",
      title: "MERN Stack Developer",
      description: "I build robust, scalable, and premium web applications using the MERN stack and next-generation frameworks like Next.js 15. Passionate about AI integrations, real-time communications, and creating flawless user experiences.",
      profileImage: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=600&auto=format&fit=crop",
      resumeUrl: "",
      technologies: ["React", "Next.js", "Node.js", "MongoDB", "Socket.IO", "Google GenAI"]
    },
    skills: [
      { id: "s1", name: "React", category: "Frontend", icon: "devicon-react-original colored" },
      { id: "s2", name: "Next.js", category: "Frontend", icon: "devicon-nextjs-original colored" },
      { id: "s3", name: "TailwindCSS", category: "Frontend", icon: "devicon-tailwindcss-original colored" },
      { id: "s4", name: "JavaScript", category: "Frontend", icon: "devicon-javascript-plain colored" },
      { id: "s5", name: "TypeScript", category: "Frontend", icon: "devicon-typescript-plain colored" },
      { id: "s6", name: "Node.js", category: "Backend", icon: "devicon-nodejs-plain colored" },
      { id: "s7", name: "Express.js", category: "Backend", icon: "Terminal" },
      { id: "s8", name: "Socket.IO", category: "Backend", icon: "devicon-linux-plain colored" },
      { id: "s9", name: "MongoDB", category: "Database", icon: "devicon-mongodb-plain colored" },
      { id: "s10", name: "Google GenAI", category: "AI & APIs", icon: "devicon-docker-plain colored" },
      { id: "s11", name: "TMDB API", category: "AI & APIs", icon: "" },
      { id: "s12", name: "EmailJS", category: "AI & APIs", icon: "devicon-vercel-original" },
      { id: "s13", name: "Git", category: "Tools", icon: "devicon-firebase-plain colored" },
      { id: "s14", name: "GitHub", category: "Tools", icon: "devicon-firebase-plain colored" },
      { id: "s15", name: "Postman", category: "Tools", icon: "devicon-postman-plain colored" },
      { id: "s16", name: "VS Code", category: "Tools", icon: "devicon-vscode-plain colored" }
    ],
    education: [
      {
        id: "e1",
        type: "degree",
        institute: "Savitribai Phule Pune University",
        college: "Shri Chhatrapati Shivajiraje College of Engineering",
        degree: "B.E Computer Engineering",
        startYear: "2021",
        endYear: "2025",
        description: "Focusing on advanced algorithms, software engineering principles, and full-stack web applications. Maintained an aggregate GPA of 8.9/10."
      },
      {
        id: "e2",
        type: "diploma",
        institute: "MSBTE",
        college: "Shri Chhatrapati Sambhajiraje Polytechnic",
        degree: "Diploma Computer Engineering",
        startYear: "2018",
        endYear: "2021",
        description: "Introduced to computer architecture, networking, database management, and object-oriented programming. Graduated with 88.5%."
      }
    ],
    projects: [
      {
        id: "p1",
        title: "AI E-commerce Search",
        slug: "ai-ecommerce-search",
        shortDescription: "Next-gen search engine for e-commerce powered by Gemini API, offering semantic search, visual suggestions, and auto-completions.",
        description: "AI E-commerce Search is a sophisticated search microservice and frontend built to demonstrate semantic search capabilities in online shopping. By leveraging Google GenAI (Gemini) text embedding models, the project indexes product catalogs into a vector space and performs semantic matches rather than simple keyword matches. Features an interactive UI with auto-suggestions, category filters, and detailed product comparisons.",
        category: "AI Projects",
        techStack: ["Next.js", "MongoDB", "Google GenAI", "TailwindCSS"],
        githubLink: "https://github.com/hrushikesh-mahamuni/ai-ecommerce-search",
        liveLink: "https://ai-search-demo.vercel.app",
        heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200",
        gallery: ["https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600"],
        features: ["Semantic text search via vector embeddings", "Fast auto-completion and spell check corrections", "Product recommendation based on browsing history", "Interactive dashboard with query performance analytics"],
        challenges: ["Handling high-dimensional vector spaces in real-time.", "Optimizing API call counts to Gemini to stay within free-tier rate limits."],
        learnings: ["Deep understanding of vector embeddings and cosine similarity.", "Building robust caching mechanisms to store search responses."],
        featured: true
      },
      {
        id: "p2",
        title: "Chat Application",
        slug: "chat-application",
        shortDescription: "Real-time chat platform with channels, direct messaging, typing indicators, and file sharing using Socket.IO.",
        description: "A high-performance real-time messaging application designed for teams. Features multi-room channels, instant direct messages, user presence status, live typing indicators, and image/file attachment sharing. The backend is optimized to scale with persistent Redis pub/sub messaging and MongoDB for history.",
        category: "Real-Time",
        techStack: ["React", "Node.js", "Socket.IO", "MongoDB", "TailwindCSS"],
        githubLink: "https://github.com/hrushikesh-mahamuni/socket-chat",
        liveLink: "https://socket-chat-live.vercel.app",
        heroImage: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=1200",
        gallery: ["https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=600", "https://images.unsplash.com/photo-1577563906417-46451dbbe1a5?q=80&w=600"],
        features: ["Real-time message delivery under 50ms", "Room creator & channel moderation tools", "Full emoji selector support and markdown previews", "File sharing and profile image customization"],
        challenges: ["Synchronizing user status (online/offline) during network drops.", "Optimizing message history queries so scroll-to-load remains instantaneous."],
        learnings: ["Mastering WebSockets state management on the client side.", "Configuring Redis adapter for Socket.IO horizontal scaling."],
        featured: true
      },
      {
        id: "p3",
        title: "MovieMax",
        slug: "moviemax",
        shortDescription: "A gorgeous movie database interface featuring trending media lists, custom watchlists, reviews, and trailer embedding.",
        description: "MovieMax is a responsive, feature-rich movie and TV series explorer. Using the TMDB API, it displays up-to-date data for trending content, top-rated media, and user reviews. Built with smooth page transitions using Framer Motion and persistent client-side states for user watchlists.",
        category: "Full Stack",
        techStack: ["Next.js", "TailwindCSS", "TMDB API", "Framer Motion"],
        githubLink: "https://github.com/hrushikesh-mahamuni/moviemax",
        liveLink: "https://moviemax-app.vercel.app",
        heroImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200",
        gallery: ["https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600", "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600"],
        features: ["Infinite scrolling catalog with category filters", "Embedded high-definition trailers using YouTube player api", "Dynamic user watchlist synced to local storage and DB", "Rich rating system with user reviews section"],
        challenges: ["Implementing clean, nested Framer Motion page transition layouts in Next.js App Router.", "Optimizing image loading times for hundreds of movie posters."],
        learnings: ["Leveraging Next.js image loading properties for lazy loading optimization.", "Handling nested routes and search query states elegantly."],
        featured: false
      },
      {
        id: "p4",
        title: "Karan Enterprises",
        slug: "karan-enterprises",
        shortDescription: "Production-grade ERP & inventory management system for a manufacturing client, built to handle billing, stock, and vendor tracking.",
        description: "A custom-built B2B Enterprise Resource Planning software tailored for Karan Enterprises. The platform streamlines their warehouse inventory levels, automates client invoice generation in PDF, records vendor transactions, and outputs monthly financial analytics.",
        category: "Client Projects",
        techStack: ["Next.js", "Express.js", "MongoDB", "TailwindCSS"],
        githubLink: "https://github.com/hrushikesh-mahamuni/karan-enterprises-erp",
        liveLink: "https://karan-enterprises.vercel.app",
        heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200",
        gallery: ["https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600", "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600"],
        features: ["Automated dynamic PDF invoice generator client-side", "Inventory alerts for low-stock manufacturing elements", "Vendor transaction logs with search & date filters", "Role-based authentication for manager and staff users"],
        challenges: ["Migrating large amounts of legacy Excel ledger files to the SQL schema.", "Generating accurate financial statistics reports with heavy transactions."],
        learnings: ["Writing optimized aggregate pipeline queries in MongoDB and group-by SQL statements.", "Handling direct developer-to-client requirement gathering and project scoping."],
        featured: true
      }
    ]
  };
}

function readLocalDb(): any {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    const data = getInitialData();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
    return data;
  }
  try {
    const content = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error reading local db file, resetting to seed data:", error);
    const data = getInitialData();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
    return data;
  }
}

function writeLocalDb(data: any) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// Check MongoDB connection status
async function isMongoConnected() {
  if (!process.env.MONGODB_URI) return false;
  try {
    const conn = await dbConnect();
    return conn !== null;
  } catch (e) {
    console.error("MongoDB Connection Failed, using local DB:", e);
    return false;
  }
}

export const dataService = {
  // About Management
  async getAbout() {
    if (await isMongoConnected()) {
      let about = await About.findOne().lean();
      if (!about) {
        // Seed about in MongoDB if empty
        const initial = getInitialData().about;
        about = await About.create(initial);
      }
      return serialize(about);
    } else {
      const db = readLocalDb();
      return db.about;
    }
  },

  async updateAbout(data: any) {
    if (await isMongoConnected()) {
      let about = await About.findOne();
      if (about) {
        Object.assign(about, data);
        await about.save();
      } else {
        about = await About.create(data);
      }
      return about;
    } else {
      const db = readLocalDb();
      db.about = { ...db.about, ...data };
      writeLocalDb(db);
      return db.about;
    }
  },

  // Skills Management
  async getSkills() {
    if (await isMongoConnected()) {
      let skills = await Skill.find().sort({ createdAt: 1 }).lean();
      if (skills.length === 0) {
        // Seed skills in MongoDB if empty
        const initial = getInitialData().skills.map(s => {
          const { id, ...rest } = s;
          return rest;
        });
        skills = await Skill.insertMany(initial);
      }
      return serialize(skills);
    } else {
      const db = readLocalDb();
      return db.skills;
    }
  },

  async createSkill(data: any) {
    if (await isMongoConnected()) {
      return await Skill.create(data);
    } else {
      const db = readLocalDb();
      const newSkill = { id: `s_${Date.now()}`, ...data };
      db.skills.push(newSkill);
      writeLocalDb(db);
      return newSkill;
    }
  },

  async updateSkill(id: string, data: any) {
    if (await isMongoConnected()) {
      return await Skill.findByIdAndUpdate(id, data, { 
        new: true
       });
    } else {
      const db = readLocalDb();
      const idx = db.skills.findIndex((s: any) => s.id === id);
      if (idx !== -1) {
        db.skills[idx] = { ...db.skills[idx], ...data };
        writeLocalDb(db);
        return db.skills[idx];
      }
      return null;
    }
  },

  async deleteSkill(id: string) {
    if (await isMongoConnected()) {
      await Skill.findByIdAndDelete(id);
      return true;
    } else {
      const db = readLocalDb();
      db.skills = db.skills.filter((s: any) => s.id !== id);
      writeLocalDb(db);
      return true;
    }
  },

  // Projects Management
  async getProjects() {
    if (await isMongoConnected()) {
      let projects = await Project.find().sort({ createdAt: -1 }).lean();
      if (projects.length === 0) {
        // Seed projects in MongoDB if empty
        const initial = getInitialData().projects.map(p => {
          const { id, ...rest } = p;
          return rest;
        });
        projects = await Project.insertMany(initial);
      }
      return serialize(projects);
    } else {
      const db = readLocalDb();
      return db.projects;
    }
  },

  async getProjectBySlug(slug: string) {
    if (await isMongoConnected()) {
      return await Project.findOne({ slug }).lean();
    } else {
      const db = readLocalDb();
      return db.projects.find((p: any) => p.slug === slug) || null;
    }
  },

  async createProject(data: any) {
    if (await isMongoConnected()) {
      return await Project.create(data);
    } else {
      const db = readLocalDb();
      const newProject = { id: `p_${Date.now()}`, ...data };
      db.projects.push(newProject);
      writeLocalDb(db);
      return newProject;
    }
  },

  async updateProject(id: string, data: any) {
    if (await isMongoConnected()) {
      return await Project.findByIdAndUpdate(id, data, { new: true });
    } else {
      const db = readLocalDb();
      const idx = db.projects.findIndex((p: any) => p.id === id || p._id === id);
      if (idx !== -1) {
        db.projects[idx] = { ...db.projects[idx], ...data };
        writeLocalDb(db);
        return db.projects[idx];
      }
      return null;
    }
  },

  async deleteProject(id: string) {
    if (await isMongoConnected()) {
      await Project.findByIdAndDelete(id);
      return true;
    } else {
      const db = readLocalDb();
      db.projects = db.projects.filter((p: any) => p.id !== id && p._id !== id);
      writeLocalDb(db);
      return true;
    }
  },

  // Education Management
  async getEducation() {
    if (await isMongoConnected()) {
      let educations = await Education.find().sort({ startYear: -1 }).lean();
      if (educations.length === 0) {
        // Seed education in MongoDB if empty
        const initial = getInitialData().education.map(e => {
          const { id, ...rest } = e;
          return rest;
        });
        educations = await Education.insertMany(initial);
      }
     return serialize(educations);
    } else {
      const db = readLocalDb();
      return db.education;
    }
  },

  async createEducation(data: any) {
    if (await isMongoConnected()) {
      return await Education.create(data);
    } else {
      const db = readLocalDb();
      const newEdu = { id: `e_${Date.now()}`, ...data };
      db.education.push(newEdu);
      writeLocalDb(db);
      return newEdu;
    }
  },

  async updateEducation(id: string, data: any) {
    if (await isMongoConnected()) {
      return await Education.findByIdAndUpdate(id, data, { new: true });
    } else {
      const db = readLocalDb();
      const idx = db.education.findIndex((e: any) => e.id === id);
      if (idx !== -1) {
        db.education[idx] = { ...db.education[idx], ...data };
        writeLocalDb(db);
        return db.education[idx];
      }
      return null;
    }
  },

  async deleteEducation(id: string) {
    if (await isMongoConnected()) {
      await Education.findByIdAndDelete(id);
      return true;
    } else {
      const db = readLocalDb();
      db.education = db.education.filter((e: any) => e.id !== id);
      writeLocalDb(db);
      return true;
    }
  }
};
