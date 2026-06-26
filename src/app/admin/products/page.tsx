"use client";

import { useCallback, useEffect, useState } from "react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import {
  createProduct,
  deleteProduct,
  getProducts,
  Product,
  ProductPayload,
  updateProduct,
} from "@/lib/api";
import { Package, Plus, RefreshCw, Trash2 } from "lucide-react";

const emptyForm: ProductPayload = {
  name: "",
  slug: "",
  description: "",
  price: 0,
  currency: "UGX",
  stock_quantity: 0,
  category: "General",
  images: "",
  featured: false,
  status: "active",
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function AdminProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<ProductPayload>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems((await getProducts()) as Product[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function startEdit(item: Product) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      slug: item.slug,
      description: item.description || "",
      price: item.price,
      currency: item.currency,
      stock_quantity: item.stock_quantity,
      category: item.category || "General",
      images: item.images || "",
      featured: item.featured,
      status: item.status,
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
      const payload = { ...form, slug: form.slug || slugify(form.name) };
      if (editingId) await updateProduct(editingId, payload);
      else await createProduct(payload);
      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save product");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      if (editingId === id) resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm mb-2"><Package className="w-4 h-4" />Marketplace</div>
          <h1 className="text-3xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-600 mt-1">Manage products shown on the marketplace page.</p>
        </div>
        <button type="button" onClick={load} disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />Refresh
        </button>
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm">{error}</div>}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">{editingId ? "Edit Product" : "Add Product"}{!editingId && <Plus className="w-4 h-4" />}</h2>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: editingId ? form.slug : slugify(e.target.value) })} className="w-full border border-slate-300 rounded-lg px-3 py-2" required />
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
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-2 min-h-[80px]" />
          </div>
          <ImageUploadField label="Product image URL" value={form.images} onChange={(url) => setForm({ ...form, images: url })} folder="products" />
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Price</label>
              <input type="number" min={0} value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="w-full border border-slate-300 rounded-lg px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Currency</label>
              <input value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Stock</label>
              <input type="number" min={0} value={form.stock_quantity} onChange={(e) => setForm({ ...form, stock_quantity: Number(e.target.value) })} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="border border-slate-300 rounded-lg px-2 py-1 text-sm">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60">{saving ? "Saving..." : editingId ? "Save changes" : "Add product"}</button>
            {editingId && <button type="button" onClick={resetForm} className="px-4 py-2 border border-slate-300 rounded-lg">Cancel</button>}
          </div>
        </form>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50"><h2 className="font-semibold text-slate-900">All Products ({items.length})</h2></div>
          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {loading ? <p className="p-6 text-slate-500 text-sm">Loading...</p> : items.length === 0 ? <p className="p-6 text-slate-500 text-sm">No products yet.</p> : items.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50">
                <div>
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.currency} {item.price.toLocaleString()} · {item.status}</p>
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
