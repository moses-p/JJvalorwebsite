"use client";

import { useCallback, useEffect, useState } from "react";
import { Building2 } from "lucide-react";
import { getPublicProjects, type Project } from "@/lib/api";
import { resolveImageUrl } from "@/lib/media";

const statusLabels: Record<string, string> = {
  active: "Ongoing",
  planning: "Planning",
  completed: "Completed",
};

export default function DynamicProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setProjects(await getPublicProjects());
    } catch {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [load]);

  if (loading) {
    return <p className="text-center text-gray-500 py-12">Loading projects...</p>;
  }

  if (projects.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <div key={project.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
          {project.image_url ? (
            <img src={resolveImageUrl(project.image_url)} alt={project.title} className="w-full h-44 object-cover" />
          ) : (
            <div className="w-full h-44 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <Building2 className="w-12 h-12 text-white" />
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                {statusLabels[project.status] || project.status}
              </span>
              <span className="text-sm font-bold text-gray-900">{project.progress}%</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
            {project.description && <p className="text-gray-600 text-sm mb-4">{project.description}</p>}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 h-2 rounded-full transition-all" style={{ width: `${project.progress}%` }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
