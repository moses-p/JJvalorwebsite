"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ContactMessage,
  getContactMessages,
  updateContactStatus,
} from "@/lib/api";
import { MessageSquare, RefreshCw } from "lucide-react";

export default function AdminContactPage() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await getContactMessages());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load messages");
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
      await updateContactStatus(id, status);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update message");
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm mb-2">
            <MessageSquare className="w-4 h-4" />
            Inbox
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Contact Messages</h1>
          <p className="text-slate-600 mt-1">Messages submitted through the contact form.</p>
        </div>
        <button type="button" onClick={load} disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm">{error}</div>}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="font-semibold text-slate-900">All Messages ({items.length})</h2>
        </div>
        <div className="p-6 overflow-x-auto">
          {loading ? (
            <p className="text-slate-500 text-sm">Loading...</p>
          ) : items.length === 0 ? (
            <p className="text-slate-500 text-sm">No contact messages yet.</p>
          ) : (
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b">
                  <th className="pb-2 pr-4">Name</th>
                  <th className="pb-2 pr-4">Email</th>
                  <th className="pb-2 pr-4">Phone</th>
                  <th className="pb-2 pr-4">Subject</th>
                  <th className="pb-2 pr-4">Message</th>
                  <th className="pb-2 pr-4">Status</th>
                  <th className="pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100 align-top">
                    <td className="py-3 pr-4 font-medium">{item.name}</td>
                    <td className="py-3 pr-4">{item.email}</td>
                    <td className="py-3 pr-4">{item.phone || "—"}</td>
                    <td className="py-3 pr-4">{item.subject || "—"}</td>
                    <td className="py-3 pr-4 max-w-xs">{item.message}</td>
                    <td className="py-3 pr-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-slate-100 capitalize">{item.status}</span>
                    </td>
                    <td className="py-3 space-x-2 whitespace-nowrap">
                      {item.status === "new" && (
                        <button type="button" onClick={() => setStatus(item.id, "read")} className="text-blue-600 hover:underline">
                          Mark read
                        </button>
                      )}
                      {item.status !== "archived" && (
                        <button type="button" onClick={() => setStatus(item.id, "archived")} className="text-slate-600 hover:underline">
                          Archive
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
