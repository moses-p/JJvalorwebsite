"use client";

import { useCallback, useEffect, useState } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { getPublicBlogPosts, type BlogPost } from "@/lib/api";
import { resolveImageUrl } from "@/lib/media";

function formatDate(dateStr?: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function DynamicBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setPosts(await getPublicBlogPosts());
    } catch {
      setPosts([]);
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
    return <p className="text-center text-gray-500 py-12">Loading articles...</p>;
  }

  if (posts.length === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-12 text-center">
        <p className="text-gray-600">New articles coming soon. Check back for updates from J.J Valor.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post) => (
        <article key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
          {post.featured_image && (
            <img src={resolveImageUrl(post.featured_image)} alt={post.title} className="w-full h-48 object-cover" />
          )}
          <div className="p-8">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              {post.category && <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">{post.category}</span>}
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.published_at || post.created_at)}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{post.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt || post.content.slice(0, 160)}</p>
            <span className="text-blue-600 font-medium flex items-center gap-1">
              Read More <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
