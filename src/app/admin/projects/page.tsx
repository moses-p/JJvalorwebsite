"use client";

import { useCallback, useEffect, useState } from "react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import {
  createProject,
  deleteProject,
  getProjects,
  Project,
  ProjectPayload,
  updateProject,
} from "@/lib/api";
import { resolveImageUrl } from "@/lib/media";
import { Briefcase, Plus, RefreshCw, Trash2 } from "lucide-react";

const emptyForm: ProjectPayload = {
  title: "",
  slug: "",
  description: "",
  content: "",
  image_url: "",
  status: "active",
  featured: false,
  progress: 0,
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function AdminProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectPayload>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems((await getProjects()) as Project[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function startEdit(item: Project) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      slug: item.slug,
      description: item.description || "",
      content: item.content || "",
      image_url: item.image_url || "",
      status: item.status,
      featured: item.featured,
      progress: item.progress,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = { ...form, slug: form.slug || slugify(form.title) };
      if (editingId) await updateProject(editingId, payload);
      else await createProject(payload);
      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save project");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      if (editingId === id) resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project");
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm mb-2"><Briefcase className="w-4 h-4" />Projects</div>
          <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
          <p className="text-slate-600 mt-1">Manage projects displayed on the projects page.</p>
        </div>
        <button type="button" onClick={load} disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />Refresh
        </button>
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm">{error}</div>}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">{editingId ? "Edit Project" : "Create Project"}{!editingId && <Plus className="w-4 h-4" />}</h2>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: editingId ? form.slug : slugify(e.target.value) })} className="w-full border border-slate-300 rounded-lg px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
            <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-2 min-h-[80px]" />
          </div>
          <ImageUploadField label="Cover image" value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} folder="projects" />
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-2">
                <option value="active">Active</option>
                <option value="planning">Planning</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Progress %</label>
              <input type="number" min={0} max={100} value={form.progress} onChange={(e) => setForm({ ...form, progress: Number(e.target.value) })} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm text-slate-700 pb-2">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                Featured
              </label>
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60">{saving ? "Saving..." : editingId ? "Save changes" : "Create project"}</button>
            {editingId && <button type="button" onClick={resetForm} className="px-4 py-2 border border-slate-300 rounded-lg">Cancel</button>}
          </div>
        </form>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50"><h2 className="font-semibold text-slate-900">All Projects ({items.length})</h2></div>
          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {loading ? <p className="p-6 text-slate-500 text-sm">Loading...</p> : items.length === 0 ? <p className="p-6 text-slate-500 text-sm">No projects yet.</p> : items.map((item) => (
              <div key={item.id} className="p-4 flex gap-4 hover:bg-slate-50">
                {item.image_url && <img src={resolveImageUrl(item.image_url)} alt={item.title} className="w-16 h-12 object-cover rounded-lg shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-500 capitalize">{item.status} · {item.progress}%</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button type="button" onClick={() => startEdit(item)} className="text-sm text-blue-600 hover:underline">Edit</button>
                  <button type="button" onClick={() => handleDelete(item.id)} className="text-red-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
