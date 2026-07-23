import mongoose, { Schema } from "mongoose";

const AboutSchema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  profileImage: { type: String, required: true },
  resumeUrl: { type: String },
  technologies: [{ type: String }],
}, { timestamps: true });

export const About = mongoose.models.About || mongoose.model("About", AboutSchema);
