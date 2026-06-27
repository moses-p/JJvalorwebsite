import { getAdminToken, clearAdminSession } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function handleUnauthorized() {
  if (typeof window === "undefined") return;
  clearAdminSession();
  if (!window.location.pathname.startsWith("/admin/login")) {
    window.location.href = "/admin/login";
  }
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function apiRequest<T>(path: string, options?: RequestInit, auth = false): Promise<T> {
  const headers: Record<string, string> = {
    ...(options?.headers as Record<string, string>),
  };

  const isFormData = typeof FormData !== "undefined" && options?.body instanceof FormData;
  if (!isFormData && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  if (auth) {
    const token = getAdminToken();
    if (!token) {
      handleUnauthorized();
      throw new ApiError("Not authenticated", 401);
    }
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = `API request failed (${response.status})`;
    try {
      const data = await response.json();
      const detail = data.detail ?? data.message;
      if (Array.isArray(detail)) {
        message = detail.map((item: { msg?: string; loc?: string[] }) => item.msg || JSON.stringify(item)).join("; ");
      } else if (detail) {
        message = typeof detail === "string" ? detail : JSON.stringify(detail);
      }
    } catch {
      const text = await response.text();
      if (text) message = text;
    }
    if (response.status === 401 && auth) {
      handleUnauthorized();
    }
    throw new ApiError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
};

export type VolunteerPayload = {
  full_name: string;
  email: string;
  phone?: string;
  skills?: string;
  availability?: string;
  message?: string;
};

export type DonationPayload = {
  donor_name?: string;
  donor_email?: string;
  donor_phone?: string;
  amount: number;
  currency?: string;
  payment_method?: string;
  message?: string;
};

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  status: string;
  created_at: string;
};

export type Volunteer = {
  id: number;
  full_name: string;
  email: string;
  phone?: string | null;
  skills?: string | null;
  availability?: string | null;
  message?: string | null;
  status: string;
  created_at: string;
};

export type Donation = {
  id: number;
  donor_name?: string | null;
  donor_email?: string | null;
  amount: number;
  currency: string;
  status: string;
  payment_reference?: string | null;
  created_at: string;
};

export type LoginResponse = {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    email: string;
    username: string;
    full_name?: string | null;
    is_admin: boolean;
    is_active: boolean;
    can_manage_content?: boolean;
    can_manage_users?: boolean;
    can_view_analytics?: boolean;
  };
};

export async function loginAdmin(username: string, password: string) {
  return apiRequest<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function getAdminProfile() {
  return apiRequest<LoginResponse["user"]>("/api/auth/me", undefined, true);
}

export async function getApiHealth() {
  return apiRequest<{ status: string; cms_ready?: boolean }>("/health");
}

export async function submitContactMessage(payload: ContactPayload) {
  return apiRequest("/api/contact/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function submitVolunteerApplication(payload: VolunteerPayload) {
  return apiRequest("/api/volunteers/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function submitDonation(payload: DonationPayload) {
  return apiRequest("/api/donations/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getContactMessages() {
  return apiRequest<ContactMessage[]>("/api/contact/", undefined, true);
}

export async function getVolunteers() {
  return apiRequest<Volunteer[]>("/api/volunteers/", undefined, true);
}

export async function getDonations() {
  return apiRequest<Donation[]>("/api/donations/", undefined, true);
}

export async function getProjects() {
  return apiRequest<unknown[]>("/api/projects/", undefined, true);
}

export async function getBlogPosts() {
  return apiRequest<unknown[]>("/api/blog/?published_only=false", undefined, true);
}

export async function getJobs() {
  return apiRequest<unknown[]>("/api/jobs/", undefined, true);
}

export async function getProducts() {
  return apiRequest<unknown[]>("/api/products/", undefined, true);
}

export async function updateContactStatus(id: number, status: string) {
  return apiRequest(`/api/contact/${id}/status?status=${encodeURIComponent(status)}`, {
    method: "PUT",
  }, true);
}

export async function updateVolunteerStatus(id: number, status: string) {
  return apiRequest(`/api/volunteers/${id}/status?status=${encodeURIComponent(status)}`, {
    method: "PUT",
  }, true);
}

export async function updateDonationStatus(id: number, status: string) {
  return apiRequest(`/api/donations/${id}/status?status=${encodeURIComponent(status)}`, {
    method: "PUT",
  }, true);
}

export type SiteUpdate = {
  id: number;
  title: string;
  message: string;
  category: string;
  link_url?: string | null;
  link_label?: string | null;
  image_url?: string | null;
  show_in_marquee: boolean;
  is_published: boolean;
  priority: number;
  published_at?: string | null;
  created_at: string;
  updated_at?: string | null;
};

export type SiteUpdatePayload = {
  title: string;
  message: string;
  category?: string;
  link_url?: string;
  link_label?: string;
  image_url?: string;
  show_in_marquee?: boolean;
  is_published?: boolean;
  priority?: number;
};

export type GalleryImage = {
  id: number;
  title: string;
  alt_text?: string | null;
  image_url: string;
  category: string;
  is_published: boolean;
  priority: number;
  created_at: string;
};

export type GalleryImagePayload = {
  title: string;
  alt_text?: string;
  image_url: string;
  category?: string;
  is_published?: boolean;
  priority?: number;
};

export type Partner = {
  id: number;
  name: string;
  description?: string | null;
  logo_url?: string | null;
  website_url?: string | null;
  partner_type: string;
  is_published: boolean;
  priority: number;
  created_at: string;
};

export type PartnerPayload = {
  name: string;
  description?: string;
  logo_url?: string;
  website_url?: string;
  partner_type?: string;
  is_published?: boolean;
  priority?: number;
};

export type LeadershipMember = {
  id: number;
  name: string;
  role: string;
  bio?: string | null;
  photo_url?: string | null;
  email?: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
};

export type LeadershipPayload = {
  name: string;
  role: string;
  bio?: string;
  photo_url?: string;
  email?: string;
  sort_order?: number;
  is_published?: boolean;
};

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  featured_image?: string | null;
  category?: string | null;
  published: boolean;
  published_at?: string | null;
  created_at: string;
};

export type BlogPostPayload = {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  category?: string;
  published?: boolean;
};

export type Project = {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  content?: string | null;
  image_url?: string | null;
  status: string;
  featured: boolean;
  progress: number;
  created_at: string;
};

export type ProjectPayload = {
  title: string;
  slug: string;
  description?: string;
  content?: string;
  image_url?: string;
  status?: string;
  featured?: boolean;
  progress?: number;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  currency: string;
  stock_quantity: number;
  category?: string | null;
  images?: string | null;
  featured: boolean;
  status: string;
  created_at: string;
};

export type ProductPayload = {
  name: string;
  slug: string;
  description?: string;
  price: number;
  currency?: string;
  stock_quantity?: number;
  category?: string;
  images?: string;
  featured?: boolean;
  status?: string;
};

export async function getPublicUpdates(options?: { marqueeOnly?: boolean; limit?: number }) {
  const params = new URLSearchParams();
  if (options?.marqueeOnly) params.set("marquee_only", "true");
  if (options?.limit) params.set("limit", String(options.limit));
  const query = params.toString();
  return apiRequest<SiteUpdate[]>(`/api/updates/public${query ? `?${query}` : ""}`);
}

export async function getAdminUpdates() {
  return apiRequest<SiteUpdate[]>("/api/updates/", undefined, true);
}

export async function createSiteUpdate(payload: SiteUpdatePayload) {
  return apiRequest<SiteUpdate>("/api/updates/", {
    method: "POST",
    body: JSON.stringify(payload),
  }, true);
}

export async function updateSiteUpdate(id: number, payload: SiteUpdatePayload) {
  return apiRequest<SiteUpdate>(`/api/updates/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  }, true);
}

export async function deleteSiteUpdate(id: number) {
  return apiRequest(`/api/updates/${id}`, { method: "DELETE" }, true);
}

export async function uploadMedia(file: File, folder = "content") {
  const token = getAdminToken();
  if (!token) throw new ApiError("Not authenticated", 401);
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(`${API_BASE_URL}/api/media/upload?folder=${encodeURIComponent(folder)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!response.ok) {
    let message = `Upload failed (${response.status})`;
    try {
      const data = await response.json();
      message = typeof data.detail === "string" ? data.detail : message;
    } catch {
      const text = await response.text();
      if (text) message = text;
    }
    if (response.status === 401) {
      handleUnauthorized();
    }
    throw new ApiError(message, response.status);
  }
  return response.json() as Promise<{ url: string }>;
}

export async function getPublicGallery(limit = 50) {
  return apiRequest<GalleryImage[]>(`/api/gallery/public?limit=${limit}`);
}

export async function getAdminGallery() {
  return apiRequest<GalleryImage[]>("/api/gallery/", undefined, true);
}

export async function createGalleryImage(payload: GalleryImagePayload) {
  return apiRequest<GalleryImage>("/api/gallery/", { method: "POST", body: JSON.stringify(payload) }, true);
}

export async function updateGalleryImage(id: number, payload: GalleryImagePayload) {
  return apiRequest<GalleryImage>(`/api/gallery/${id}`, { method: "PUT", body: JSON.stringify(payload) }, true);
}

export async function deleteGalleryImage(id: number) {
  return apiRequest(`/api/gallery/${id}`, { method: "DELETE" }, true);
}

export async function getPublicPartners(limit = 50) {
  return apiRequest<Partner[]>(`/api/partners/public?limit=${limit}`);
}

export async function getAdminPartners() {
  return apiRequest<Partner[]>("/api/partners/", undefined, true);
}

export async function createPartner(payload: PartnerPayload) {
  return apiRequest<Partner>("/api/partners/", { method: "POST", body: JSON.stringify(payload) }, true);
}

export async function updatePartner(id: number, payload: PartnerPayload) {
  return apiRequest<Partner>(`/api/partners/${id}`, { method: "PUT", body: JSON.stringify(payload) }, true);
}

export async function deletePartner(id: number) {
  return apiRequest(`/api/partners/${id}`, { method: "DELETE" }, true);
}

export async function getPublicLeadership(limit = 50) {
  return apiRequest<LeadershipMember[]>(`/api/leadership/public?limit=${limit}`);
}

export async function getAdminLeadership() {
  return apiRequest<LeadershipMember[]>("/api/leadership/", undefined, true);
}

export async function createLeadershipMember(payload: LeadershipPayload) {
  return apiRequest<LeadershipMember>("/api/leadership/", { method: "POST", body: JSON.stringify(payload) }, true);
}

export async function updateLeadershipMember(id: number, payload: LeadershipPayload) {
  return apiRequest<LeadershipMember>(`/api/leadership/${id}`, { method: "PUT", body: JSON.stringify(payload) }, true);
}

export async function deleteLeadershipMember(id: number) {
  return apiRequest(`/api/leadership/${id}`, { method: "DELETE" }, true);
}

export async function getPublicBlogPosts() {
  return apiRequest<BlogPost[]>("/api/blog/public");
}

export async function createBlogPost(payload: BlogPostPayload) {
  return apiRequest<BlogPost>("/api/blog/", { method: "POST", body: JSON.stringify(payload) }, true);
}

export async function updateBlogPost(id: number, payload: BlogPostPayload) {
  return apiRequest<BlogPost>(`/api/blog/${id}`, { method: "PUT", body: JSON.stringify(payload) }, true);
}

export async function deleteBlogPost(id: number) {
  return apiRequest(`/api/blog/${id}`, { method: "DELETE" }, true);
}

export async function getPublicProjects() {
  return apiRequest<Project[]>("/api/projects/public");
}

export async function createProject(payload: ProjectPayload) {
  return apiRequest<Project>("/api/projects/", { method: "POST", body: JSON.stringify(payload) }, true);
}

export async function updateProject(id: number, payload: ProjectPayload) {
  return apiRequest<Project>(`/api/projects/${id}`, { method: "PUT", body: JSON.stringify(payload) }, true);
}

export async function deleteProject(id: number) {
  return apiRequest(`/api/projects/${id}`, { method: "DELETE" }, true);
}

export async function getPublicProducts() {
  return apiRequest<Product[]>("/api/products/public");
}

export async function createProduct(payload: ProductPayload) {
  return apiRequest<Product>("/api/products/", { method: "POST", body: JSON.stringify(payload) }, true);
}

export async function updateProduct(id: number, payload: ProductPayload) {
  return apiRequest<Product>(`/api/products/${id}`, { method: "PUT", body: JSON.stringify(payload) }, true);
}

export async function deleteProduct(id: number) {
  return apiRequest(`/api/products/${id}`, { method: "DELETE" }, true);
}

export { API_BASE_URL };
