"use client";

import { useCallback, useEffect, useState } from "react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import {
  createBlogPost,
  deleteBlogPost,
  getBlogPosts,
  BlogPost,
  BlogPostPayload,
  updateBlogPost,
} from "@/lib/api";
import { resolveImageUrl } from "@/lib/media";
import { FileText, Plus, RefreshCw, Trash2 } from "lucide-react";

const emptyForm: BlogPostPayload = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featured_image: "",
  category: "News",
  published: true,
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function AdminBlogPage() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<BlogPostPayload>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems((await getBlogPosts()) as BlogPost[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function startEdit(item: BlogPost) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt || "",
      content: item.content,
      featured_image: item.featured_image || "",
      category: item.category || "News",
      published: item.published,
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
      if (editingId) await updateBlogPost(editingId, payload);
      else await createBlogPost(payload);
      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this blog post?")) return;
    try {
      await deleteBlogPost(id);
      if (editingId === id) resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete post");
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm mb-2"><FileText className="w-4 h-4" />Blog</div>
          <h1 className="text-3xl font-bold text-slate-900">Blog Posts</h1>
          <p className="text-slate-600 mt-1">Publish articles and stories on the blog pages.</p>
        </div>
        <button type="button" onClick={load} disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />Refresh
        </button>
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm">{error}</div>}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">{editingId ? "Edit Post" : "New Post"}{!editingId && <Plus className="w-4 h-4" />}</h2>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: editingId ? form.slug : slugify(e.target.value) })} className="w-full border border-slate-300 rounded-lg px-3 py-2" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Excerpt</label>
            <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-2 min-h-[60px]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-2 min-h-[120px]" required />
          </div>
          <ImageUploadField label="Featured image" value={form.featured_image} onChange={(url) => setForm({ ...form, featured_image: url })} folder="blog" />
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            Published on site
          </label>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60">{saving ? "Saving..." : editingId ? "Save changes" : "Publish post"}</button>
            {editingId && <button type="button" onClick={resetForm} className="px-4 py-2 border border-slate-300 rounded-lg">Cancel</button>}
          </div>
        </form>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50"><h2 className="font-semibold text-slate-900">All Posts ({items.length})</h2></div>
          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {loading ? <p className="p-6 text-slate-500 text-sm">Loading...</p> : items.length === 0 ? <p className="p-6 text-slate-500 text-sm">No posts yet.</p> : items.map((item) => (
              <div key={item.id} className="p-4 flex gap-4 hover:bg-slate-50">
                {item.featured_image && <img src={resolveImageUrl(item.featured_image)} alt={item.title} className="w-16 h-12 object-cover rounded-lg shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-500">{item.category}{!item.published && " · Draft"}</p>
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
