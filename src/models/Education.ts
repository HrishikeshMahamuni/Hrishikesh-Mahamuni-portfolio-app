import mongoose, { Schema } from "mongoose";

const EducationSchema = new Schema({
  type: { type: String, required: true }, // e.g. "degree" or "diploma"
  institute: { type: String, required: true },
  college: { type: String, required: true },
  degree: { type: String, required: true },
  startYear: { type: String, required: true },
  endYear: { type: String, required: true },
  description: { type: String },
}, { timestamps: true });

export const Education = mongoose.models.Education || mongoose.model("Education", EducationSchema);
