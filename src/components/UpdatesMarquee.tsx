"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Megaphone } from "lucide-react";
import { getPublicUpdates, type SiteUpdate } from "@/lib/api";
import { resolveImageUrl } from "@/lib/media";

export default function UpdatesMarquee() {
  const [items, setItems] = useState<SiteUpdate[]>([]);

  const load = useCallback(async () => {
    try {
      const data = await getPublicUpdates({ marqueeOnly: true, limit: 12 });
      setItems(data);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [load]);

  if (items.length === 0) return null;

  const doubled = [...items, ...items];

  return (
    <div className="relative z-20 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-y border-slate-800 overflow-hidden shadow-2xl">
      <div className="flex items-center gap-4 px-4 py-4">
        <div className="hidden sm:flex items-center gap-2 shrink-0 bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-1.5 rounded-full text-white text-xs font-semibold uppercase tracking-wide hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl animate-pulse">
          <Megaphone className="w-3.5 h-3.5 animate-bounce" />
          Latest
        </div>
        <div className="overflow-hidden flex-1">
          <div className="flex animate-marquee gap-6">
            {doubled.map((item, index) => {
              const content = (
                <div className="relative w-72 h-40 shrink-0 overflow-hidden rounded-xl group hover:scale-105 transition-transform duration-500 hover:shadow-2xl shadow-lg">
                  <img
                    src={resolveImageUrl(item.image_url)}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-500 group-hover:translate-y-[-4px]">
                    <p className="text-xs uppercase tracking-wide text-blue-300 mb-1 group-hover:text-blue-200 transition-colors duration-300">{item.category}</p>
                    <p className="text-white font-semibold text-sm line-clamp-1 group-hover:text-blue-100 transition-colors duration-300">{item.title}</p>
                    <p className="text-slate-200 text-xs line-clamp-2 mt-1 group-hover:text-slate-100 transition-colors duration-300">{item.message}</p>
                  </div>
                </div>
              );

              return item.link_url ? (
                <Link key={`${item.id}-${index}`} href={item.link_url} className="shrink-0 hover:scale-105 transition-transform duration-300">
                  {content}
                </Link>
              ) : (
                <div key={`${item.id}-${index}`} className="shrink-0">
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
