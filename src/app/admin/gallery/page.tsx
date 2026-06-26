"use client";

import { useCallback, useEffect, useState } from "react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import {
  createGalleryImage,
  deleteGalleryImage,
  GalleryImage,
  GalleryImagePayload,
  getAdminGallery,
  updateGalleryImage,
} from "@/lib/api";
import { resolveImageUrl } from "@/lib/media";
import { ImageIcon, Plus, RefreshCw, Trash2 } from "lucide-react";

const emptyForm: GalleryImagePayload = {
  title: "",
  alt_text: "",
  image_url: "",
  category: "General",
  is_published: true,
  priority: 0,
};

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<GalleryImagePayload>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await getAdminGallery());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load gallery");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function startEdit(item: GalleryImage) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      alt_text: item.alt_text || "",
      image_url: item.image_url,
      category: item.category,
      is_published: item.is_published,
      priority: item.priority,
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
      if (editingId) await updateGalleryImage(editingId, form);
      else await createGalleryImage(form);
      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save image");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this gallery image?")) return;
    try {
      await deleteGalleryImage(id);
      if (editingId === id) resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete image");
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm mb-2">
            <ImageIcon className="w-4 h-4" />
            Media
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Photo Gallery</h1>
          <p className="text-slate-600 mt-1">Manage photos shown on the homepage, media center, and about pages.</p>
        </div>
        <button type="button" onClick={load} disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm">{error}</div>}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            {editingId ? "Edit Image" : "Add Image"}
            {!editingId && <Plus className="w-4 h-4" />}
          </h2>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-2" required />
          </div>
          <ImageUploadField label="Image" value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} folder="gallery" />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Alt text</label>
            <input value={form.alt_text} onChange={(e) => setForm({ ...form, alt_text: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
              <input type="number" value={form.priority} onChange={(e) => setForm({ ...form, priority: Number(e.target.value) })} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} />
            Published on site
          </label>
          <div className="flex gap-3">
            <button type="submit" disabled={saving || !form.image_url} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60">
              {saving ? "Saving..." : editingId ? "Save changes" : "Add to gallery"}
            </button>
            {editingId && <button type="button" onClick={resetForm} className="px-4 py-2 border border-slate-300 rounded-lg">Cancel</button>}
          </div>
        </form>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h2 className="font-semibold text-slate-900">Gallery ({items.length})</h2>
          </div>
          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {loading ? (
              <p className="p-6 text-slate-500 text-sm">Loading...</p>
            ) : items.length === 0 ? (
              <p className="p-6 text-slate-500 text-sm">No images yet.</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="p-4 flex gap-4 hover:bg-slate-50">
                  <img src={resolveImageUrl(item.image_url)} alt={item.title} className="w-20 h-16 object-cover rounded-lg shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.category} · Priority {item.priority}</p>
                    {!item.is_published && <span className="text-xs text-amber-700">Draft</span>}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button type="button" onClick={() => startEdit(item)} className="text-sm text-blue-600 hover:underline">Edit</button>
                    <button type="button" onClick={() => handleDelete(item.id)} className="text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
