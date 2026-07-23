"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, GraduationCap, Calendar, Save } from "lucide-react";

interface EducationItem {
  _id?: string;
  id?: string;
  type: string;
  institute: string;
  college: string;
  degree: string;
  startYear: string;
  endYear: string;
  description?: string;
}

export default function AdminEducationPage() {
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modal / Form States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Form Fields
  const [type, setType] = useState("degree"); // degree, diploma, certificate, school
  const [institute, setInstitute] = useState("");
  const [degree, setDegree] = useState("");
  const [college, setCollege] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [description, setDescription] = useState("");

  const types = ["degree", "diploma", "certificate", "school"];

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/education");
      if (!res.ok) throw new Error("Failed to fetch education records");
      const data = await res.json();
      setEducation(data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditId(null);
    setType("degree");
    setInstitute("");
    setDegree("");
    setCollege("")
    setStartYear("");
    setEndYear("");
    setDescription("");
    setError("");
    setSuccess("");
    setIsFormOpen(true);
  };

  const openEditModal = (item: EducationItem) => {
    const itemId = item._id || item.id || "";
    setEditId(itemId);
    setType(item.type);
    setInstitute(item.institute);
    setCollege(item.college);
    setDegree(item.degree);
    setStartYear(item.startYear);
    setEndYear(item.endYear);
    setDescription(item.description || "");
    setError("");
    setSuccess("");
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this education record?")) return;
    try {
      const res = await fetch(`/api/education/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete record");
      setSuccess("Record deleted successfully");
      fetchEducation();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to delete");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!type || !institute || !college || !degree || !startYear || !endYear) {
      setError("Please fill out all required fields.");
      return;
    }

    const payload = { type, institute, college, degree, startYear, endYear, description };

    try {
      const url = editId ? `/api/education/${editId}` : "/api/education";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save record");

      setSuccess(`Education record ${editId ? "updated" : "added"} successfully!`);
      setIsFormOpen(false);
      fetchEducation();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Error saving record");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Manage Education</h1>
          <p className="text-sm text-gray-400 mt-1">
            Display or update academic records and achievements.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="glow-btn inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all duration-200 cursor-pointer"
        >
          <Plus size={16} />
          Add Record
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

      {/* Education Timeline Grid list */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-16 text-gray-400 text-sm">Loading records...</div>
        ) : education.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-sm">No education records found. Add one!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((item) => {
              const itemId = item._id || item.id || "";
              return (
                <div
                  key={itemId}
                  className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col justify-between gap-4 group hover:border-purple-500/20 transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/15">
                        <Calendar size={11} />
                        {item.startYear} - {item.endYear}
                      </span>
                      <span className="text-[10px] font-semibold text-gray-400 uppercase bg-white/5 px-2 py-0.5 rounded border border-white/5">
                        {item.type}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-bold text-white text-base flex items-center gap-2">
                        <GraduationCap size={16} className="text-purple-400" />
                        {item.degree}
                      </h4>
                      <p className="text-xs text-gray-300 pl-6">
                        {item.institute}</p>
                    </div>

                    <p className="text-xs text-gray-300 pl-6">
                      {item.college}
                    </p>

                    {item.description && (
                      <p className="text-xs text-gray-400 leading-relaxed pl-6 border-l border-white/5">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 border-t border-white/5 pt-3 mt-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 text-gray-400 hover:text-white bg-white/5 rounded border border-white/5 transition-all cursor-pointer"
                      title="Edit"
                    >
                      <Edit size={12} />
                    </button>
                    <button
                      onClick={() => handleDelete(itemId)}
                      className="p-1.5 text-red-400 hover:text-red-300 bg-red-500/5 rounded border border-red-500/10 transition-all cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
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
                {editId ? "Modify Qualification" : "New Academic Record"}
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Define school info and years of completion
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

            {/* School / College */}
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400">Institute / School Name</label>
                <input
                  type="text"
                  required
                  value={institute}
                  onChange={(e) => setInstitute(e.target.value)}
                  placeholder="Savitribai Phule Pune University"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500/60"
                />
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400">College</label>
                  <input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="College Name"
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500/60"
                  />
                </div>
            </div>

            {/* Degree Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400">Degree / Qualification</label>
              <input
                type="text"
                required
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="B.E. Computer Engineering"
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500/60"
              />
            </div>

            {/* Row 2: Type and Years */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400">Record Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-purple-500/60"
                >
                  {types.map((t) => (
                    <option key={t} value={t} className="bg-[#090720] text-white">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400">Start Year</label>
                  <input
                    type="text"
                    required
                    value={startYear}
                    onChange={(e) => setStartYear(e.target.value)}
                    placeholder="2021"
                    className="w-full px-2 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-center text-sm focus:outline-none focus:border-purple-500/60"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400">End Year</label>
                  <input
                    type="text"
                    required
                    value={endYear}
                    onChange={(e) => setEndYear(e.target.value)}
                    placeholder="2025"
                    className="w-full px-2 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-center text-sm focus:outline-none focus:border-purple-500/60"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400">Description (Optional)</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Highlight details (GPA, percentage, or core studies)..."
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-xs focus:outline-none focus:border-purple-500/60 resize-none"
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
                Save Record
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
