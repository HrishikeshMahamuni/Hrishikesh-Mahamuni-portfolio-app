"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, ExternalLink, Star, Upload, Save, HelpCircle } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface ProjectItem {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  techStack: string[];
  githubLink?: string;
  liveLink?: string;
  heroImage: string;
  gallery: string[];
  features: string[];
  challenges: string[];
  learnings: string[];
  featured: boolean;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modal/Form States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Full Stack");
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [featured, setFeatured] = useState(false);

  // Array states
  const [techInput, setTechInput] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  
  const [featureInput, setFeatureInput] = useState("");
  const [features, setFeatures] = useState<string[]>([]);

  const [challengeInput, setChallengeInput] = useState("");
  const [challenges, setChallenges] = useState<string[]>([]);

  const [learningInput, setLearningInput] = useState("");
  const [learnings, setLearnings] = useState<string[]>([]);

  const [galleryInput, setGalleryInput] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);

  // File Upload states
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const categories = ["AI Projects", "Full Stack", "Real-Time", "Client Projects", "Learning Projects"];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditId(null);
    setTitle("");
    setSlug("");
    setShortDescription("");
    setDescription("");
    setCategory("Full Stack");
    setGithubLink("");
    setLiveLink("");
    setHeroImage("");
    setFeatured(false);
    setTechStack([]);
    setFeatures([]);
    setChallenges([]);
    setLearnings([]);
    setGallery([]);
    setError("");
    setSuccess("");
    setIsFormOpen(true);
  };

  const openEditModal = (project: ProjectItem) => {
    const projId = project._id || project.id || "";
    setEditId(projId);
    setTitle(project.title);
    setSlug(project.slug);
    setShortDescription(project.shortDescription);
    setDescription(project.description);
    setCategory(project.category);
    setGithubLink(project.githubLink || "");
    setLiveLink(project.liveLink || "");
    setHeroImage(project.heroImage);
    setFeatured(project.featured);
    setTechStack(project.techStack || []);
    setFeatures(project.features || []);
    setChallenges(project.challenges || []);
    setLearnings(project.learnings || []);
    setGallery(project.gallery || []);
    setError("");
    setSuccess("");
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete project");
      setSuccess("Project deleted successfully");
      fetchProjects();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to delete");
    }
  };

  // Upload handler
  const handleImageUpload = async (file: File, target: "hero" | "gallery") => {
    const formData = new FormData();
    formData.append("file", file);

    if (target === "hero") setUploadingHero(true);
    else setUploadingGallery(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      if (target === "hero") {
        setHeroImage(data.url);
      } else {
        setGallery([...gallery, data.url]);
      }
    } catch (err: any) {
      alert(`Upload error: ${err.message}`);
    } finally {
      if (target === "hero") setUploadingHero(false);
      else setUploadingGallery(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !shortDescription || !description || !category || !heroImage) {
      setError("Please fill out all required fields.");
      return;
    }

    const payload = {
      title,
      slug,
      shortDescription,
      description,
      category,
      githubLink,
      liveLink,
      heroImage,
      featured,
      techStack,
      features,
      challenges,
      learnings,
      gallery,
    };

    try {
      const url = editId ? `/api/projects/${editId}` : "/api/projects";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save project");

      setSuccess(`Project ${editId ? "updated" : "created"} successfully!`);
      setIsFormOpen(false);
      fetchProjects();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err: any) {
      setError(err.message || "Error saving project");
    }
  };

  // Helper push handlers
  const addTech = () => {
    if (techInput.trim() && !techStack.includes(techInput.trim())) {
      setTechStack([...techStack, techInput.trim()]);
      setTechInput("");
    }
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  const addChallenge = () => {
    if (challengeInput.trim()) {
      setChallenges([...challenges, challengeInput.trim()]);
      setChallengeInput("");
    }
  };

  const addLearning = () => {
    if (learningInput.trim()) {
      setLearnings([...learnings, learningInput.trim()]);
      setLearningInput("");
    }
  };

  const addGalleryUrl = () => {
    if (galleryInput.trim()) {
      setGallery([...gallery, galleryInput.trim()]);
      setGalleryInput("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Manage Projects</h1>
          <p className="text-sm text-gray-400 mt-1">
            Create, update, or remove portfolio showcase items.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="glow-btn inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all duration-200 cursor-pointer"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {success && (
        <div className="px-4 py-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-300 text-xs font-semibold">
          {success}
        </div>
      )}
      {error && (
        <div className="px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/5 text-red-300 text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Projects Table List */}
      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-gray-400 text-sm">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-sm">No projects found. Add one to get started!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/2 text-gray-400 text-[10px] font-bold tracking-wider uppercase">
                  <th className="py-4 px-6">Project</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Tech Stack</th>
                  <th className="py-4 px-6 text-center">Featured</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {projects.map((project) => {
                  const projId = project._id || project.id || "";
                  return (
                    <tr key={projId} className="hover:bg-white/1 transition-colors">
                      <td className="py-4 px-6 flex items-center gap-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={project.heroImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=150"}
                          alt={project.title}
                          className="w-16 h-10 object-cover rounded-lg border border-white/10"
                        />
                        <div>
                          <div className="font-bold text-white line-clamp-1">{project.title}</div>
                          <div className="text-xs text-gray-500 line-clamp-1">/{project.slug}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-gray-300">
                          {project.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1 max-w-[200px] sm:max-w-xs">
                          {project.techStack?.slice(0, 3).map((tech) => (
                            <span key={tech} className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/5 text-purple-300 border border-purple-500/10">
                              {tech}
                            </span>
                          ))}
                          {project.techStack?.length > 3 && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-500">
                              +{project.techStack.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        {project.featured ? (
                          <span className="inline-flex text-yellow-400 justify-center">
                            <Star size={16} fill="currentColor" />
                          </span>
                        ) : (
                          <span className="inline-flex text-gray-600 justify-center">
                            <Star size={16} />
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEditModal(project)}
                            className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-xl border border-white/5 hover:border-white/15 transition-all duration-200 cursor-pointer"
                            title="Edit project"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(projId)}
                            className="p-2 text-red-400 hover:text-red-300 bg-red-500/5 rounded-xl border border-red-500/10 hover:border-red-500/25 transition-all duration-200 cursor-pointer"
                            title="Delete project"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Slide-out Panel / Modal for Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-end">
          <div
            className="w-full max-w-2xl bg-[#090720] border-l border-white/10 h-full p-8 overflow-y-auto flex flex-col justify-between"
          >
            {/* Form Header */}
            <div className="flex justify-between items-center pb-6 border-b border-white/5 mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {editId ? "Modify Showcase" : "New Portfolio Project"}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Enter detailed fields about your technical build
                </p>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-xl border border-white/5"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="flex-1 space-y-5">
              {/* Row 1: Title and Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400">
                    Project Title <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="E.g. AI E-commerce Search"
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500/60"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                    URL Slug
                    <span className="text-[10px] text-gray-500 font-normal">(auto-generated if blank)</span>
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="ai-ecommerce-search"
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500/60"
                  />
                </div>
              </div>

              {/* Row 2: Category and Featured toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400">
                    Category <span className="text-purple-400">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-purple-500/60"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-[#090720] text-white">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-6 pl-1">
                  <input
                    type="checkbox"
                    id="feat"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-white/10 bg-white/5 accent-purple-600 focus:outline-none"
                  />
                  <label htmlFor="feat" className="text-sm font-semibold text-gray-300 cursor-pointer">
                    Feature on Home page slider
                  </label>
                </div>
              </div>

              {/* Row 3: Short Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400">
                  Short Catalog Description <span className="text-purple-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="One sentence description shown on list cards"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500/60"
                />
              </div>

              {/* Row 4: Full Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400">
                  Full Project Summary <span className="text-purple-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide details about architecture, user journeys, or project specifications"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500/60 resize-none"
                />
              </div>

              {/* Row 5: Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400">GitHub Repository URL</label>
                  <input
                    type="url"
                    value={githubLink}
                    onChange={(e) => setGithubLink(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500/60"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400">Live Deployment URL</label>
                  <input
                    type="url"
                    value={liveLink}
                    onChange={(e) => setLiveLink(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500/60"
                  />
                </div>
              </div>

              {/* Row 6: Hero screenshot upload & field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400">
                  Hero Image URL <span className="text-purple-400">*</span>
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    required
                    value={heroImage}
                    onChange={(e) => setHeroImage(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500/60"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      id="hero-file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], "hero")}
                      className="hidden"
                    />
                    <label
                      htmlFor="hero-file"
                      className="inline-flex items-center gap-1.5 px-4.5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs cursor-pointer transition-all h-full"
                    >
                      <Upload size={14} />
                      {uploadingHero ? "Saving..." : "Upload"}
                    </label>
                  </div>
                </div>
              </div>

              {/* Row 7: Tech Stack tags array */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400">Tech Stack Tags</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                    placeholder="Type and press Enter (e.g. Next.js)"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-xs focus:outline-none focus:border-purple-500/60"
                  />
                  <button
                    type="button"
                    onClick={addTech}
                    className="px-4.5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-medium"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => setTechStack(techStack.filter((t) => t !== tech))}
                        className="text-purple-400 hover:text-purple-200"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Row 8: Features list */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400">Key Features List</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                    placeholder="Feature item (e.g. Real-time updates with websockets)"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-xs focus:outline-none focus:border-purple-500/60"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4.5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>
                <ul className="space-y-1 pl-1 pt-1">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex justify-between items-center text-xs text-gray-300 bg-white/2 py-1 px-2.5 rounded-lg border border-white/5">
                      <span className="line-clamp-1">{feature}</span>
                      <button
                        type="button"
                        onClick={() => setFeatures(features.filter((_, fIdx) => fIdx !== idx))}
                        className="text-red-400 hover:text-red-300 ml-2"
                      >
                        <X size={12} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Row 9: Challenges */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400">Technical Challenges</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={challengeInput}
                    onChange={(e) => setChallengeInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addChallenge())}
                    placeholder="Challenge (e.g. Handling edge caching constraints)"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-xs focus:outline-none focus:border-purple-500/60"
                  />
                  <button
                    type="button"
                    onClick={addChallenge}
                    className="px-4.5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>
                <ul className="space-y-1 pl-1 pt-1">
                  {challenges.map((challenge, idx) => (
                    <li key={idx} className="flex justify-between items-center text-xs text-gray-300 bg-white/2 py-1 px-2.5 rounded-lg border border-white/5">
                      <span className="line-clamp-1">{challenge}</span>
                      <button
                        type="button"
                        onClick={() => setChallenges(challenges.filter((_, cIdx) => cIdx !== idx))}
                        className="text-red-400 hover:text-red-300 ml-2"
                      >
                        <X size={12} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Row 10: Learnings */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400">Learnings & takeaways</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={learningInput}
                    onChange={(e) => setLearningInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addLearning())}
                    placeholder="Takeaway (e.g. How to structure large Mongoose models)"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-xs focus:outline-none focus:border-purple-500/60"
                  />
                  <button
                    type="button"
                    onClick={addLearning}
                    className="px-4.5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>
                <ul className="space-y-1 pl-1 pt-1">
                  {learnings.map((learning, idx) => (
                    <li key={idx} className="flex justify-between items-center text-xs text-gray-300 bg-white/2 py-1 px-2.5 rounded-lg border border-white/5">
                      <span className="line-clamp-1">{learning}</span>
                      <button
                        type="button"
                        onClick={() => setLearnings(learnings.filter((_, lIdx) => lIdx !== idx))}
                        className="text-red-400 hover:text-red-300 ml-2"
                      >
                        <X size={12} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Row 11: Gallery List & upload */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400">Gallery Screenshots</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={galleryInput}
                    onChange={(e) => setGalleryInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addGalleryUrl())}
                    placeholder="Or enter image URL directly"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-xs focus:outline-none focus:border-purple-500/60"
                  />
                  <button
                    type="button"
                    onClick={addGalleryUrl}
                    className="px-4.5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold"
                  >
                    Add
                  </button>
                  <div className="relative">
                    <input
                      type="file"
                      id="gallery-file"
                      accept="image/*"
                      multiple
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], "gallery")}
                      className="hidden"
                    />
                    <label
                      htmlFor="gallery-file"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs cursor-pointer transition-all h-full"
                    >
                      <Upload size={13} />
                      {uploadingGallery ? "Saving..." : "Upload"}
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2.5 pt-1.5">
                  {gallery.map((img, idx) => (
                    <div key={idx} className="relative rounded-lg overflow-hidden aspect-video border border-white/10 bg-white/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt="screenshot" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setGallery(gallery.filter((_, gIdx) => gIdx !== idx))}
                        className="absolute top-1 right-1 p-1 bg-red-600 hover:bg-red-500 rounded text-white"
                        title="Delete screenshot"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </form>

            {/* Form Footer Save Actions */}
            <div className="border-t border-white/5 pt-6 mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-6 py-3 rounded-xl border border-white/10 bg-transparent text-gray-300 hover:bg-white/5 text-xs font-semibold transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="glow-btn inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-[0_0_15px_rgba(139,92,246,0.25)] transition-all duration-200 cursor-pointer"
              >
                <Save size={14} />
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
