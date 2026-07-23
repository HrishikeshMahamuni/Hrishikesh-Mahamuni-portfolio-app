"use client";

import { useState, useEffect } from "react";
import { Save, Upload, X, CheckCircle, AlertCircle } from "lucide-react";

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form Fields
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  
  // Technologies Tags array
  const [techInput, setTechInput] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  useEffect(() => {
    fetchAboutDetails();
  }, []);

  const fetchAboutDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/about");
      if (!res.ok) throw new Error("Failed to fetch biography details");
      const data = await res.json();
      
      setName(data.name || "");
      setTitle(data.title || "");
      setDescription(data.description || "");
      setProfileImage(data.profileImage || "");
      setResumeUrl(data.resumeUrl || "");
      setTechnologies(data.technologies || []);
    } catch (err: any) {
      setError(err.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setProfileImage(data.url);
    } catch (err: any) {
      alert(`Image upload error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleResumeUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    setUploadingResume(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setResumeUrl(data.url);
    } catch (err: any) {
      alert(`Resume upload error: ${err.message}`);
    } finally {
      setUploadingResume(false);
    }
  };

  const addTech = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput("");
    }
  };

  const removeTech = (tag: string) => {
    setTechnologies(technologies.filter((t) => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    const payload = { name, title, description, profileImage, resumeUrl, technologies };

    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save changes");
      
      setSuccess("Profile details saved successfully!");
      setTimeout(() => setSuccess(""), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">Edit Profile (About Me)</h1>
        <p className="text-sm text-gray-400 mt-1">
          Update the profile details, picture, and tech chips displayed on the biography card.
        </p>
      </div>

      {success && (
        <div className="px-4 py-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle size={16} />
          {success}
        </div>
      )}
      {error && (
        <div className="px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/5 text-red-300 text-xs font-semibold flex items-center gap-2">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-16 text-gray-400 text-sm">Loading details...</div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-3xl border border-white/5 space-y-6 shadow-2xl">
          {/* Row 1: Name and Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400">Public Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="E.g. Hrushikesh Mahamuni"
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500/60"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400">Professional Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g. MERN Stack Developer"
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500/60"
              />
            </div>
          </div>

          {/* Row 2: Profile Image URL & Upload */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400">Profile Image URL</label>
            <div className="flex gap-4 items-center">
              {profileImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profileImage}
                  alt="profile thumbnail"
                  className="w-16 h-16 object-cover rounded-xl border border-white/10 bg-white/5 flex-shrink-0"
                />
              )}
              
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  required
                  value={profileImage}
                  onChange={(e) => setProfileImage(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500/60"
                />
                
                <div className="relative">
                  <input
                    type="file"
                    id="profile-img"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                    className="hidden"
                  />
                  <label
                    htmlFor="profile-img"
                    className="inline-flex items-center gap-1.5 px-4.5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs cursor-pointer transition-all h-full"
                  >
                    <Upload size={14} />
                    {uploading ? "Saving..." : "Upload"}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2.5: Resume PDF URL & Upload */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400">Resume PDF URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                placeholder="https://... (or upload PDF)"
                className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500/60"
              />
              
              <div className="relative">
                <input
                  type="file"
                  id="resume-pdf"
                  accept="application/pdf"
                  onChange={(e) => e.target.files?.[0] && handleResumeUpload(e.target.files[0])}
                  className="hidden"
                />
                <label
                  htmlFor="resume-pdf"
                  className="inline-flex items-center gap-1.5 px-4.5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs cursor-pointer transition-all h-full"
                >
                  <Upload size={14} />
                  {uploadingResume ? "Saving..." : "Upload PDF"}
                </label>
              </div>
            </div>
          </div>

          {/* Row 3: Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400">Biography Summary</label>
            <textarea
              required
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell visitors about your background, interests, and skill strengths..."
              className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500/60 resize-none leading-relaxed"
            />
          </div>

          {/* Row 4: Technology chips */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400">Technology Tags (Featured in Bio)</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                placeholder="Add technology (e.g. Next.js) and press Enter"
                className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-xs focus:outline-none focus:border-purple-500/60"
              />
              <button
                type="button"
                onClick={addTech}
                className="px-4.5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold cursor-pointer"
              >
                Add Tag
              </button>
            </div>
            
            <div className="flex flex-wrap gap-1.5 pt-1.5">
              {technologies.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-medium"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTech(tag)}
                    className="text-purple-400 hover:text-purple-200"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="border-t border-white/5 pt-6 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="glow-btn inline-flex items-center gap-1.5 px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-200 cursor-pointer disabled:opacity-75"
            >
              <Save size={14} />
              {saving ? "Saving Changes..." : "Save Profile Details"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
