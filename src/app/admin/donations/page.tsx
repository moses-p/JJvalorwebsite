"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Donation,
  getDonations,
  updateDonationStatus,
} from "@/lib/api";
import { Heart, RefreshCw } from "lucide-react";

export default function AdminDonationsPage() {
  const [items, setItems] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await getDonations());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load donations");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function setStatus(id: number, status: string) {
    setError(null);
    try {
      await updateDonationStatus(id, status);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update donation");
    }
  }

  const totalAmount = items
    .filter((d) => d.status === "completed")
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm mb-2">
            <Heart className="w-4 h-4" />
            Donations
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Donations</h1>
          <p className="text-slate-600 mt-1">Track and confirm donations submitted through the site.</p>
        </div>
        <button type="button" onClick={load} disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-600 mb-1">Total donations</p>
          <p className="text-2xl font-bold text-slate-900">{loading ? "—" : items.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-600 mb-1">Pending</p>
          <p className="text-2xl font-bold text-amber-600">{loading ? "—" : items.filter((d) => d.status === "pending").length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-600 mb-1">Completed total</p>
          <p className="text-2xl font-bold text-green-700">{loading ? "—" : `UGX ${totalAmount.toLocaleString()}`}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="font-semibold text-slate-900">All Donations ({items.length})</h2>
        </div>
        <div className="p-6 overflow-x-auto">
          {loading ? (
            <p className="text-slate-500 text-sm">Loading...</p>
          ) : items.length === 0 ? (
            <p className="text-slate-500 text-sm">No donations recorded yet.</p>
          ) : (
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b">
                  <th className="pb-2 pr-4">Donor</th>
                  <th className="pb-2 pr-4">Email</th>
                  <th className="pb-2 pr-4">Amount</th>
                  <th className="pb-2 pr-4">Reference</th>
                  <th className="pb-2 pr-4">Date</th>
                  <th className="pb-2 pr-4">Status</th>
                  <th className="pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100">
                    <td className="py-3 pr-4">{item.donor_name || "Anonymous"}</td>
                    <td className="py-3 pr-4">{item.donor_email || "—"}</td>
                    <td className="py-3 pr-4 font-medium">
                      {item.amount.toLocaleString()} {item.currency}
                    </td>
                    <td className="py-3 pr-4">{item.payment_reference || "—"}</td>
                    <td className="py-3 pr-4">{new Date(item.created_at).toLocaleDateString()}</td>
                    <td className="py-3 pr-4 capitalize">{item.status}</td>
                    <td className="py-3 space-x-2 whitespace-nowrap">
                      {item.status === "pending" && (
                        <button type="button" onClick={() => setStatus(item.id, "completed")} className="text-green-600 hover:underline">
                          Mark completed
                        </button>
                      )}
                      {item.status !== "cancelled" && item.status !== "completed" && (
                        <button type="button" onClick={() => setStatus(item.id, "cancelled")} className="text-red-600 hover:underline">
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
