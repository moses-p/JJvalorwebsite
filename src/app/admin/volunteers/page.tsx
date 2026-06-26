"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getVolunteers,
  updateVolunteerStatus,
  Volunteer,
} from "@/lib/api";
import { RefreshCw, Users } from "lucide-react";

export default function AdminVolunteersPage() {
  const [items, setItems] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await getVolunteers());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load volunteers");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function setStatus(id: number, status: string) {
    await updateVolunteerStatus(id, status);
    await load();
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm mb-2">
            <Users className="w-4 h-4" />
            Volunteers
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Volunteer Applications</h1>
          <p className="text-slate-600 mt-1">Review and approve volunteer sign-ups from the site.</p>
        </div>
        <button type="button" onClick={load} disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm">{error}</div>}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="font-semibold text-slate-900">Applications ({items.length})</h2>
        </div>
        <div className="p-6 overflow-x-auto">
          {loading ? (
            <p className="text-slate-500 text-sm">Loading...</p>
          ) : items.length === 0 ? (
            <p className="text-slate-500 text-sm">No volunteer applications yet.</p>
          ) : (
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b">
                  <th className="pb-2 pr-4">Name</th>
                  <th className="pb-2 pr-4">Email</th>
                  <th className="pb-2 pr-4">Phone</th>
                  <th className="pb-2 pr-4">Skills</th>
                  <th className="pb-2 pr-4">Availability</th>
                  <th className="pb-2 pr-4">Message</th>
                  <th className="pb-2 pr-4">Status</th>
                  <th className="pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100 align-top">
                    <td className="py-3 pr-4 font-medium">{item.full_name}</td>
                    <td className="py-3 pr-4">{item.email}</td>
                    <td className="py-3 pr-4">{item.phone || "—"}</td>
                    <td className="py-3 pr-4">{item.skills || "—"}</td>
                    <td className="py-3 pr-4">{item.availability || "—"}</td>
                    <td className="py-3 pr-4 max-w-xs">{item.message || "—"}</td>
                    <td className="py-3 pr-4 capitalize">{item.status}</td>
                    <td className="py-3 space-x-2 whitespace-nowrap">
                      {item.status === "pending" && (
                        <>
                          <button type="button" onClick={() => setStatus(item.id, "approved")} className="text-green-600 hover:underline">
                            Approve
                          </button>
                          <button type="button" onClick={() => setStatus(item.id, "rejected")} className="text-red-600 hover:underline">
                            Reject
                          </button>
                        </>
                      )}
                      {item.status === "approved" && (
                        <button type="button" onClick={() => setStatus(item.id, "inactive")} className="text-slate-600 hover:underline">
                          Mark inactive
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
