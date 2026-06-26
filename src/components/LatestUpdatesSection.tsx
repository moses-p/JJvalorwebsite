"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Megaphone, RefreshCw } from "lucide-react";
import { getPublicUpdates, type SiteUpdate } from "@/lib/api";

const categoryColors: Record<string, string> = {
  program: "bg-green-100 text-green-800",
  news: "bg-blue-100 text-blue-800",
  event: "bg-purple-100 text-purple-800",
  announcement: "bg-orange-100 text-orange-800",
  milestone: "bg-yellow-100 text-yellow-800",
};

function formatDate(value?: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-UG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function LatestUpdatesSection() {
  const [updates, setUpdates] = useState<SiteUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPublicUpdates({ limit: 6 });
      setUpdates(data);
    } catch {
      setUpdates([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [load]);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm mb-3">
              <Megaphone className="w-4 h-4" />
              Live Updates
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Programs &amp; News
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl">
              Stay current with J.J Valor programs, partnerships, events, and community impact — updated from our admin panel.
            </p>
          </div>
          <button
            type="button"
            onClick={load}
            disabled={loading}
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {loading && updates.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-48 rounded-2xl bg-white/70 animate-pulse" />
            ))}
          </div>
        ) : updates.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center text-gray-500">
            No updates published yet. Check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {updates.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100 flex flex-col"
              >
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                      categoryColors[item.category] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(item.published_at || item.created_at)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{item.message}</p>
                {item.link_url && (
                  <Link
                    href={item.link_url}
                    className="inline-flex items-center gap-2 mt-5 text-blue-600 font-medium text-sm hover:gap-3 transition-all"
                  >
                    {item.link_label || "Learn more"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
