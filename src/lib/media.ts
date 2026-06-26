import { API_BASE_URL } from "./api";

export function resolveImageUrl(path?: string | null): string {
  if (!path) return "/images/hero.jpg";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/uploads/")) return `${API_BASE_URL}${path}`;
  return path;
}
