import mongoose, { Schema } from "mongoose";

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // AI Projects, Full Stack, Real-Time, Client Projects, Learning Projects
  techStack: [{ type: String }],
  githubLink: { type: String },
  liveLink: { type: String },
  heroImage: { type: String, required: true },
  gallery: [{ type: String }],
  features: [{ type: String }],
  challenges: [{ type: String }],
  learnings: [{ type: String }],
  featured: { type: Boolean, default: false },
}, { timestamps: true });

export const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);
