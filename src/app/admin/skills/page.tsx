"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Save, HelpCircle } from "lucide-react";


interface SkillItem {
  _id?: string;
  id?: string;
  name: string;
  category: string;
  icon: string;
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modal / Form States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Frontend");
  const [icon, setIcon] = useState("Code2");

  const categories = ["Frontend", "Backend", "Database", "AI & APIs", "Tools"];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/skills");
      if (!res.ok) throw new Error("Failed to fetch skills");
      const data = await res.json();
      setSkills(data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditId(null);
    setName("");
    setCategory("Frontend");
    setIcon("Code");
    setError("");
    setSuccess("");
    setIsFormOpen(true);
  };

  const openEditModal = (skill: SkillItem) => {
    const skillId = skill._id || skill.id || "";
    setEditId(skillId);
    setName(skill.name);
    setCategory(skill.category);
    setIcon(skill.icon);
    setError("");
    setSuccess("");
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete skill");
      setSuccess("Skill deleted successfully");
      fetchSkills();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to delete");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !category || !icon) {
      setError("Please fill out all required fields.");
      return;
    }

    const payload = { name, category, icon };

    try {
      const url = editId ? `/api/skills/${editId}` : "/api/skills";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save skill");

      setSuccess(`Skill ${editId ? "updated" : "added"} successfully!`);
      setIsFormOpen(false);
      fetchSkills();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Error saving skill");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Manage Skills</h1>
          <p className="text-sm text-gray-400 mt-1">
            Display or catalog your technical stack skills items.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="glow-btn inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all duration-200 cursor-pointer"
        >
          <Plus size={16} />
          Add Skill
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

      {/* Skills Grouped by Category */}
      <div className="space-y-8">
        {loading ? (
          <div className="text-center py-16 text-gray-400 text-sm">Loading skills...</div>
        ) : skills.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-sm">No skills found. Add some stack items!</div>
        ) : (
          categories.map((cat) => {
            const catSkills = skills.filter(
              (s) => s.category.toLowerCase() === cat.toLowerCase()
            );

            if (catSkills.length === 0) return null;

            return (
              <div key={cat} className="space-y-4">
                <h3 className="text-md font-bold text-white pl-1 border-l-2 border-purple-500">
                  {cat} ({catSkills.length})
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {catSkills.map((skill) => {
                    const skillId = skill._id || skill.id || "";
                    return (
                      <div
                        key={skillId}
                        className="glass-panel p-4 rounded-xl border border-white/5 flex items-center justify-between group hover:border-purple-500/25 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-purple-400 text-xs font-mono bg-purple-500/5 px-2 py-1 rounded border border-purple-500/10">
                            {skill.icon}
                          </span>
                          <span className="font-semibold text-white text-sm">
                            {skill.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => openEditModal(skill)}
                            className="p-1.5 text-gray-400 hover:text-white bg-white/5 rounded border border-white/5"
                            title="Edit"
                          >
                            <Edit size={12} />
                          </button>
                          <button
                            onClick={() => handleDelete(skillId)}
                            className="p-1.5 text-red-400 hover:text-red-300 bg-red-500/5 rounded border border-red-500/10"
                            title="Delete"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Form Dialog Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center items-center p-6">
          <form
            onSubmit={handleSubmit}
            className="glass-panel w-full max-w-md p-8 rounded-3xl border border-white/5 flex flex-col gap-5 shadow-2xl relative"
          >
            {/* Header */}
            <div>
              <h2 className="text-xl font-bold text-white">
                {editId ? "Modify Skill details" : "Add New Skill"}
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Define the skill name and select categories
              </p>
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="absolute top-6 right-6 p-1.5 text-gray-400 hover:text-white bg-white/5 rounded-xl border border-white/5"
            >
              <X size={16} />
            </button>

            {/* Skill Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400">Skill Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="E.g. React, Docker, Python"
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500/60"
              />
            </div>

            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400">Category</label>
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

            {/* Icon Name (Lucide string name) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 flex items-center gap-1">
                Lucide Icon Name
                <span className="text-[10px] text-gray-500 font-normal hover:text-purple-400 cursor-pointer flex items-center gap-0.5">
                  <HelpCircle size={10} />
                  (Lucide icon string)
                </span>
              </label>
              <input
                type="text"
                required
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="Code2, Cpu, Terminal, Palette, Database..."
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500/60"
              />
            </div>

            {/* Save Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-white/10 bg-transparent text-gray-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="glow-btn px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold cursor-pointer"
              >
                Save Skill
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
