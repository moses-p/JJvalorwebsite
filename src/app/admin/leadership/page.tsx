"use client";

import { useCallback, useEffect, useState } from "react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import {
  createLeadershipMember,
  deleteLeadershipMember,
  getAdminLeadership,
  LeadershipMember,
  LeadershipPayload,
  updateLeadershipMember,
} from "@/lib/api";
import { resolveImageUrl } from "@/lib/media";
import { Plus, RefreshCw, Trash2, Users } from "lucide-react";

const emptyForm: LeadershipPayload = {
  name: "",
  role: "",
  bio: "",
  photo_url: "",
  email: "",
  sort_order: 0,
  is_published: true,
};

export default function AdminLeadershipPage() {
  const [items, setItems] = useState<LeadershipMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<LeadershipPayload>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await getAdminLeadership());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load leadership team");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function startEdit(item: LeadershipMember) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      role: item.role,
      bio: item.bio || "",
      photo_url: item.photo_url || "",
      email: item.email || "",
      sort_order: item.sort_order,
      is_published: item.is_published,
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
      const payload = { ...form, email: form.email || undefined, photo_url: form.photo_url || undefined };
      if (editingId) await updateLeadershipMember(editingId, payload);
      else await createLeadershipMember(payload);
      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save member");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Remove this team member?")) return;
    try {
      await deleteLeadershipMember(id);
      if (editingId === id) resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete member");
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm mb-2"><Users className="w-4 h-4" />Team</div>
          <h1 className="text-3xl font-bold text-slate-900">Leadership Team</h1>
          <p className="text-slate-600 mt-1">Manage leadership profiles shown on the about page.</p>
        </div>
        <button type="button" onClick={load} disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />Refresh
        </button>
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm">{error}</div>}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">{editingId ? "Edit Member" : "Add Member"}{!editingId && <Plus className="w-4 h-4" />}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
              <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-2" required />
            </div>
          </div>
          <ImageUploadField label="Photo" value={form.photo_url} onChange={(url) => setForm({ ...form, photo_url: url })} folder="leadership" />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
            <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-2 min-h-[100px]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Sort order</label>
              <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} />
            Published on site
          </label>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60">{saving ? "Saving..." : editingId ? "Save changes" : "Add member"}</button>
            {editingId && <button type="button" onClick={resetForm} className="px-4 py-2 border border-slate-300 rounded-lg">Cancel</button>}
          </div>
        </form>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50"><h2 className="font-semibold text-slate-900">Team ({items.length})</h2></div>
          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {loading ? <p className="p-6 text-slate-500 text-sm">Loading...</p> : items.map((item) => (
              <div key={item.id} className="p-4 flex gap-4 hover:bg-slate-50">
                <img src={resolveImageUrl(item.photo_url)} alt={item.name} className="w-14 h-14 object-cover rounded-full shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.role}</p>
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
