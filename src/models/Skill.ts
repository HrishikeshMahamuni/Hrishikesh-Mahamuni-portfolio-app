import mongoose, { Schema } from "mongoose";

const SkillSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // Frontend, Backend, Database, AI & APIs, Tools
  icon: { type: String, required: true }, // Lucide icon name
}, { timestamps: true });

export const Skill = mongoose.models.Skill || mongoose.model("Skill", SkillSchema);
