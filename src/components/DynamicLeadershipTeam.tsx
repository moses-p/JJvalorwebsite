"use client";

import { useCallback, useEffect, useState } from "react";
import { getPublicLeadership, type LeadershipMember } from "@/lib/api";
import { resolveImageUrl } from "@/lib/media";

export default function DynamicLeadershipTeam() {
  const [members, setMembers] = useState<LeadershipMember[]>([]);

  const load = useCallback(async () => {
    try {
      setMembers(await getPublicLeadership(20));
    } catch {
      setMembers([]);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [load]);

  if (members.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The people guiding J.J Valor&apos;s vision and operations
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <article key={member.id} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <img
                src={resolveImageUrl(member.photo_url)}
                alt={member.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-blue-600 font-medium mt-1">{member.role}</p>
                {member.bio && <p className="text-gray-600 mt-4 text-sm leading-relaxed">{member.bio}</p>}
                {member.email && (
                  <a href={`mailto:${member.email}`} className="inline-block mt-4 text-sm text-blue-600 hover:underline">
                    {member.email}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
