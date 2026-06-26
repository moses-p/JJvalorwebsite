"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { getPublicPartners, type Partner } from "@/lib/api";
import { resolveImageUrl } from "@/lib/media";

export default function DynamicPartnersGrid() {
  const [partners, setPartners] = useState<Partner[]>([]);

  const load = useCallback(async () => {
    try {
      setPartners(await getPublicPartners(24));
    } catch {
      setPartners([]);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [load]);

  if (partners.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Partners</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Organizations and businesses working with J.J Valor to create lasting impact
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner) => {
            const card = (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col">
                <div className="h-20 flex items-center justify-center mb-4">
                  {partner.logo_url ? (
                    <img src={resolveImageUrl(partner.logo_url)} alt={partner.name} className="max-h-16 max-w-full object-contain" />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xl">
                      {partner.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{partner.name}</h3>
                {partner.description && <p className="text-sm text-gray-600 flex-1">{partner.description}</p>}
                <span className="inline-block mt-4 text-xs uppercase tracking-wide text-blue-600 font-semibold">{partner.partner_type}</span>
              </div>
            );

            return partner.website_url ? (
              <Link key={partner.id} href={partner.website_url} target="_blank" rel="noopener noreferrer" className="group">
                <div className="relative">
                  {card}
                  <ExternalLink className="absolute top-4 right-4 w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                </div>
              </Link>
            ) : (
              <div key={partner.id}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
