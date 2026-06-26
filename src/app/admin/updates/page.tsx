"use client";

import { useCallback, useEffect, useState } from "react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import {
  createSiteUpdate,
  deleteSiteUpdate,
  getAdminUpdates,
  SiteUpdate,
  SiteUpdatePayload,
  updateSiteUpdate,
} from "@/lib/api";
import { resolveImageUrl } from "@/lib/media";
import { Megaphone, Plus, RefreshCw, Trash2 } from "lucide-react";

const emptyForm: SiteUpdatePayload = {
  title: "",
  message: "",
  category: "news",
  link_url: "",
  link_label: "",
  image_url: "",
  show_in_marquee: true,
  is_published: true,
  priority: 0,
};

export default function AdminUpdatesPage() {
  const [updates, setUpdates] = useState<SiteUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<SiteUpdatePayload>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setUpdates(await getAdminUpdates());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load updates");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function startEdit(item: SiteUpdate) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      message: item.message,
      category: item.category,
      link_url: item.link_url || "",
      link_label: item.link_label || "",
      image_url: item.image_url || "",
      show_in_marquee: item.show_in_marquee,
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
      const payload = {
        ...form,
        link_url: form.link_url || undefined,
        link_label: form.link_label || undefined,
        image_url: form.image_url || undefined,
      };
      if (editingId) {
        await updateSiteUpdate(editingId, payload);
      } else {
        await createSiteUpdate(payload);
      }
      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save update");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this update?")) return;
    try {
      await deleteSiteUpdate(id);
      if (editingId === id) resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete update");
    }
  }

  async function togglePublished(item: SiteUpdate) {
    await updateSiteUpdate(item.id, {
      title: item.title,
      message: item.message,
      category: item.category,
      link_url: item.link_url || undefined,
      link_label: item.link_label || undefined,
      image_url: item.image_url || undefined,
      show_in_marquee: item.show_in_marquee,
      is_published: !item.is_published,
      priority: item.priority,
    });
    await load();
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm mb-2">
            <Megaphone className="w-4 h-4" />
            Site Content
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Updates &amp; Marquee</h1>
          <p className="text-slate-600 mt-1">
            Publish programs, news, and announcements. Items with images appear in the image marquee on the homepage.
          </p>
        </div>
        <button
          type="button"
          onClick={load}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            {editingId ? "Edit Update" : "Create Update"}
            {!editingId && <Plus className="w-4 h-4" />}
          </h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 min-h-[100px]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2"
              >
                <option value="program">Program</option>
                <option value="news">News</option>
                <option value="event">Event</option>
                <option value="announcement">Announcement</option>
                <option value="milestone">Milestone</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
              <input
                type="number"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: Number(e.target.value) })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <ImageUploadField
            label="Marquee image"
            value={form.image_url}
            onChange={(url) => setForm({ ...form, image_url: url })}
            folder="updates"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Link URL</label>
              <input
                value={form.link_url}
                onChange={(e) => setForm({ ...form, link_url: e.target.value })}
                placeholder="/orphanage"
                className="w-full border border-slate-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Link Label</label>
              <input
                value={form.link_label}
                onChange={(e) => setForm({ ...form, link_label: e.target.value })}
                placeholder="Learn more"
                className="w-full border border-slate-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.show_in_marquee}
                onChange={(e) => setForm({ ...form, show_in_marquee: e.target.checked })}
              />
              Show in image marquee
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
              />
              Published on site
            </label>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Saving..." : editingId ? "Save changes" : "Publish update"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="px-4 py-2 border border-slate-300 rounded-lg">
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h2 className="font-semibold text-slate-900">All Updates ({updates.length})</h2>
          </div>
          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {loading ? (
              <p className="p-6 text-slate-500 text-sm">Loading...</p>
            ) : updates.length === 0 ? (
              <p className="p-6 text-slate-500 text-sm">No updates yet. Create your first one.</p>
            ) : (
              updates.map((item) => (
                <div key={item.id} className="p-4 hover:bg-slate-50">
                  <div className="flex items-start justify-between gap-3">
                    {item.image_url && (
                      <img src={resolveImageUrl(item.image_url)} alt={item.title} className="w-16 h-12 object-cover rounded-lg shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-semibold text-slate-900">{item.title}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 capitalize">{item.category}</span>
                        {!item.is_published && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">Draft</span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-2">{item.message}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        Priority {item.priority}
                        {item.show_in_marquee ? " · Marquee" : ""}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => togglePublished(item)}
                        className="text-sm text-slate-600 hover:underline"
                      >
                        {item.is_published ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
