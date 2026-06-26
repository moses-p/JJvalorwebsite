import { getAdminToken } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function apiRequest<T>(path: string, options?: RequestInit, auth = false): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string>),
  };

  if (auth) {
    const token = getAdminToken();
    if (!token) {
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
      message = data.detail || data.message || message;
    } catch {
      const text = await response.text();
      if (text) message = text;
    }
    throw new ApiError(typeof message === "string" ? message : JSON.stringify(message), response.status);
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
  return apiRequest<{ status: string }>("/health");
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

export { API_BASE_URL };
