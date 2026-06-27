"use client";

import { useCallback, useEffect, useState } from "react";
import {
  API_BASE_URL,
  ApiError,
  ContactMessage,
  Donation,
  Volunteer,
  getApiHealth,
  getBlogPosts,
  getContactMessages,
  getDonations,
  getJobs,
  getProducts,
  getProjects,
  getVolunteers,
  getAdminUpdates,
} from "@/lib/api";
import { RefreshCw, Server, AlertCircle, Megaphone } from "lucide-react";
import Link from "next/link";

type SectionId = "contact" | "volunteers" | "donations" | "projects" | "blog" | "products" | "users";

function Section({
  id,
  title,
  children,
}: {
  id: SectionId;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      </div>
      <div className="p-6 overflow-x-auto">{children}</div>
    </section>
  );
}

function EmptyRow({ message }: { message: string }) {
  return <p className="text-slate-500 text-sm">{message}</p>;
}

export default function AdminDashboardPage() {
  const [health, setHealth] = useState("checking");
  const [cmsReady, setCmsReady] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contact, setContact] = useState<ContactMessage[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [projects, setProjects] = useState<unknown[]>([]);
  const [blog, setBlog] = useState<unknown[]>([]);
  const [jobs, setJobs] = useState<unknown[]>([]);
  const [products, setProducts] = useState<unknown[]>([]);
  const [updatesCount, setUpdatesCount] = useState(0);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const healthResponse = await getApiHealth();
      setHealth(healthResponse.status);
      setCmsReady(healthResponse.cms_ready !== false);

      const [
        contactData,
        volunteerData,
        donationData,
        projectData,
        blogData,
        jobData,
        productData,
        updatesData,
      ] = await Promise.all([
        getContactMessages(),
        getVolunteers(),
        getDonations(),
        getProjects(),
        getBlogPosts(),
        getJobs(),
        getProducts(),
        getAdminUpdates(),
      ]);

      setContact(contactData);
      setVolunteers(volunteerData);
      setDonations(donationData);
      setProjects(projectData);
      setBlog(blogData);
      setJobs(jobData);
      setProducts(productData);
      setUpdatesCount(updatesData.length);
    } catch (err) {
      setHealth("offline");
      if (err instanceof ApiError && err.status === 401) {
        setError("Session expired. Please log in again.");
      } else {
        setError(err instanceof Error ? err.message : "Failed to load admin data.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const totalRecords =
    contact.length +
    volunteers.length +
    donations.length +
    projects.length +
    blog.length +
    jobs.length +
    products.length +
    updatesCount;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">Manage submissions and content from the backend API.</p>
        </div>
        <button
          type="button"
          onClick={loadData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 flex gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Could not load admin data</p>
            <p className="text-sm mt-1">{error}</p>
            <p className="text-sm mt-2">
              Make sure the API is running at <code className="bg-white px-1 rounded">{API_BASE_URL}</code>
            </p>
          </div>
        </div>
      )}

      {!cmsReady && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900 flex gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Backend needs a restart</p>
            <p className="text-sm mt-1">
              The API is running old code without gallery, upload, and CMS routes. Stop the backend (Ctrl+C) and run{" "}
              <code className="bg-white px-1 rounded">python main.py</code> again from the <code className="bg-white px-1 rounded">backend</code> folder.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-2 text-slate-600 mb-2">
            <Server className="w-4 h-4" />
            <span className="text-sm">API Status</span>
          </div>
          <p className="text-2xl font-bold capitalize text-slate-900">{health}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-600 mb-2">Total Records</p>
          <p className="text-2xl font-bold text-slate-900">{loading ? "—" : totalRecords}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-600 mb-2">New Contact Messages</p>
          <p className="text-2xl font-bold text-slate-900">
            {loading ? "—" : contact.filter((m) => m.status === "new").length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-600 mb-2">Published Updates</p>
          <p className="text-2xl font-bold text-slate-900">{loading ? "—" : updatesCount}</p>
          <Link href="/admin/updates" className="text-sm text-blue-600 hover:underline mt-2 inline-flex items-center gap-1">
            <Megaphone className="w-3.5 h-3.5" />
            Manage updates
          </Link>
        </div>
      </div>

      <Section id="contact" title={`Contact Messages (${contact.length})`}>
        <div className="flex items-center justify-between gap-4 mb-4">
          <p className="text-sm text-slate-600">Review messages from the contact form.</p>
          <Link href="/admin/contact" className="text-sm text-blue-600 hover:underline font-medium">View all →</Link>
        </div>
        {contact.length === 0 ? (
          <EmptyRow message="No contact messages yet." />
        ) : (
          <p className="text-sm text-slate-700">
            {contact.filter((m) => m.status === "new").length} new · {contact.length} total
          </p>
        )}
      </Section>

      <Section id="volunteers" title={`Volunteer Applications (${volunteers.length})`}>
        <div className="flex items-center justify-between gap-4 mb-4">
          <p className="text-sm text-slate-600">Approve or reject volunteer applications.</p>
          <Link href="/admin/volunteers" className="text-sm text-blue-600 hover:underline font-medium">Manage volunteers →</Link>
        </div>
        {volunteers.length === 0 ? (
          <EmptyRow message="No volunteer applications yet." />
        ) : (
          <p className="text-sm text-slate-700">
            {volunteers.filter((v) => v.status === "pending").length} pending · {volunteers.length} total
          </p>
        )}
      </Section>

      <Section id="donations" title={`Donations (${donations.length})`}>
        <div className="flex items-center justify-between gap-4 mb-4">
          <p className="text-sm text-slate-600">Confirm and track donation records.</p>
          <Link href="/admin/donations" className="text-sm text-blue-600 hover:underline font-medium">Manage donations →</Link>
        </div>
        {donations.length === 0 ? (
          <EmptyRow message="No donations recorded yet." />
        ) : (
          <p className="text-sm text-slate-700">
            {donations.filter((d) => d.status === "pending").length} pending · {donations.length} total
          </p>
        )}
      </Section>

      <Section id="projects" title={`Projects (${projects.length})`}>
        <div className="flex items-center justify-between gap-4 mb-4">
          <p className="text-sm text-slate-600">Manage project portfolio content on the site.</p>
          <Link href="/admin/projects" className="text-sm text-blue-600 hover:underline font-medium">Manage projects →</Link>
        </div>
        {projects.length === 0 ? (
          <EmptyRow message="No projects yet." />
        ) : (
          <p className="text-sm text-slate-700">{projects.length} project(s) in the database.</p>
        )}
      </Section>

      <Section id="blog" title={`Blog Posts (${blog.length})`}>
        <div className="flex items-center justify-between gap-4 mb-4">
          <p className="text-sm text-slate-600">Publish and edit blog articles.</p>
          <Link href="/admin/blog" className="text-sm text-blue-600 hover:underline font-medium">Manage blog →</Link>
        </div>
        {blog.length === 0 ? (
          <EmptyRow message="No blog posts yet." />
        ) : (
          <p className="text-sm text-slate-700">{blog.length} post(s) in the database.</p>
        )}
      </Section>

      <Section id="products" title={`Products (${products.length})`}>
        <div className="flex items-center justify-between gap-4 mb-4">
          <p className="text-sm text-slate-600">Manage marketplace products.</p>
          <Link href="/admin/products" className="text-sm text-blue-600 hover:underline font-medium">Manage products →</Link>
        </div>
        {products.length === 0 ? (
          <EmptyRow message="No products yet." />
        ) : (
          <p className="text-sm text-slate-700">{products.length} product(s) in the database.</p>
        )}
      </Section>

      <Section id="users" title="User Management">
        <div className="flex items-center justify-between gap-4 mb-4">
          <p className="text-sm text-slate-600">Create and manage admin users with specific privileges.</p>
          <Link href="/admin/users" className="text-sm text-blue-600 hover:underline font-medium">Manage users →</Link>
        </div>
        <p className="text-sm text-slate-700">Control who can access the admin panel and what they can do.</p>
      </Section>
    </div>
  );
}
