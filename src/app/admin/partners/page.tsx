"use client";

import { useCallback, useEffect, useState } from "react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import {
  createPartner,
  deletePartner,
  getAdminPartners,
  Partner,
  PartnerPayload,
  updatePartner,
} from "@/lib/api";
import { resolveImageUrl } from "@/lib/media";
import { Handshake, Plus, RefreshCw, Trash2 } from "lucide-react";

const emptyForm: PartnerPayload = {
  name: "",
  description: "",
  logo_url: "",
  website_url: "",
  partner_type: "Corporate",
  is_published: true,
  priority: 0,
};

export default function AdminPartnersPage() {
  const [items, setItems] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<PartnerPayload>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await getAdminPartners());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load partners");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function startEdit(item: Partner) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      description: item.description || "",
      logo_url: item.logo_url || "",
      website_url: item.website_url || "",
      partner_type: item.partner_type,
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
      const payload = { ...form, website_url: form.website_url || undefined, logo_url: form.logo_url || undefined };
      if (editingId) await updatePartner(editingId, payload);
      else await createPartner(payload);
      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save partner");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this partner?")) return;
    try {
      await deletePartner(id);
      if (editingId === id) resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete partner");
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm mb-2"><Handshake className="w-4 h-4" />Partners</div>
          <h1 className="text-3xl font-bold text-slate-900">Partners</h1>
          <p className="text-slate-600 mt-1">Manage partner logos and details shown on the partners page.</p>
        </div>
        <button type="button" onClick={load} disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />Refresh
        </button>
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm">{error}</div>}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">{editingId ? "Edit Partner" : "Add Partner"}{!editingId && <Plus className="w-4 h-4" />}</h2>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-2 min-h-[80px]" />
          </div>
          <ImageUploadField label="Logo" value={form.logo_url} onChange={(url) => setForm({ ...form, logo_url: url })} folder="partners" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
              <input value={form.partner_type} onChange={(e) => setForm({ ...form, partner_type: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
              <input type="number" value={form.priority} onChange={(e) => setForm({ ...form, priority: Number(e.target.value) })} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Website URL</label>
            <input value={form.website_url} onChange={(e) => setForm({ ...form, website_url: e.target.value })} placeholder="https://..." className="w-full border border-slate-300 rounded-lg px-3 py-2" />
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} />
            Published on site
          </label>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60">{saving ? "Saving..." : editingId ? "Save changes" : "Add partner"}</button>
            {editingId && <button type="button" onClick={resetForm} className="px-4 py-2 border border-slate-300 rounded-lg">Cancel</button>}
          </div>
        </form>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50"><h2 className="font-semibold text-slate-900">All Partners ({items.length})</h2></div>
          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {loading ? <p className="p-6 text-slate-500 text-sm">Loading...</p> : items.map((item) => (
              <div key={item.id} className="p-4 flex gap-4 hover:bg-slate-50">
                {item.logo_url ? <img src={resolveImageUrl(item.logo_url)} alt={item.name} className="w-14 h-14 object-contain rounded-lg bg-slate-50 shrink-0" /> : <div className="w-14 h-14 bg-slate-100 rounded-lg shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.partner_type}</p>
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
