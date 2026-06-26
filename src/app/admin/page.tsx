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
  updateContactStatus,
  updateDonationStatus,
  updateVolunteerStatus,
} from "@/lib/api";
import { RefreshCw, Server, AlertCircle } from "lucide-react";

type SectionId = "contact" | "volunteers" | "donations" | "projects" | "blog" | "products";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contact, setContact] = useState<ContactMessage[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [projects, setProjects] = useState<unknown[]>([]);
  const [blog, setBlog] = useState<unknown[]>([]);
  const [jobs, setJobs] = useState<unknown[]>([]);
  const [products, setProducts] = useState<unknown[]>([]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const healthResponse = await getApiHealth();
      setHealth(healthResponse.status);

      const [
        contactData,
        volunteerData,
        donationData,
        projectData,
        blogData,
        jobData,
        productData,
      ] = await Promise.all([
        getContactMessages(),
        getVolunteers(),
        getDonations(),
        getProjects(),
        getBlogPosts(),
        getJobs(),
        getProducts(),
      ]);

      setContact(contactData);
      setVolunteers(volunteerData);
      setDonations(donationData);
      setProjects(projectData);
      setBlog(blogData);
      setJobs(jobData);
      setProducts(productData);
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

  async function markContactRead(id: number) {
    await updateContactStatus(id, "read");
    loadData();
  }

  async function approveVolunteer(id: number) {
    await updateVolunteerStatus(id, "approved");
    loadData();
  }

  async function completeDonation(id: number) {
    await updateDonationStatus(id, "completed");
    loadData();
  }

  const totalRecords =
    contact.length +
    volunteers.length +
    donations.length +
    projects.length +
    blog.length +
    jobs.length +
    products.length;

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </div>

      <Section id="contact" title={`Contact Messages (${contact.length})`}>
        {contact.length === 0 ? (
          <EmptyRow message="No contact messages yet." />
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b">
                <th className="pb-2 pr-4">Name</th>
                <th className="pb-2 pr-4">Email</th>
                <th className="pb-2 pr-4">Subject</th>
                <th className="pb-2 pr-4">Status</th>
                <th className="pb-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {contact.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 align-top">
                  <td className="py-3 pr-4 font-medium">{item.name}</td>
                  <td className="py-3 pr-4">{item.email}</td>
                  <td className="py-3 pr-4">{item.subject || "—"}</td>
                  <td className="py-3 pr-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-slate-100">{item.status}</span>
                  </td>
                  <td className="py-3">
                    {item.status === "new" && (
                      <button
                        type="button"
                        onClick={() => markContactRead(item.id)}
                        className="text-blue-600 hover:underline"
                      >
                        Mark read
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Section>

      <Section id="volunteers" title={`Volunteer Applications (${volunteers.length})`}>
        {volunteers.length === 0 ? (
          <EmptyRow message="No volunteer applications yet." />
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b">
                <th className="pb-2 pr-4">Name</th>
                <th className="pb-2 pr-4">Email</th>
                <th className="pb-2 pr-4">Skills</th>
                <th className="pb-2 pr-4">Status</th>
                <th className="pb-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((item) => (
                <tr key={item.id} className="border-b border-slate-100">
                  <td className="py-3 pr-4 font-medium">{item.full_name}</td>
                  <td className="py-3 pr-4">{item.email}</td>
                  <td className="py-3 pr-4">{item.skills || "—"}</td>
                  <td className="py-3 pr-4">{item.status}</td>
                  <td className="py-3">
                    {item.status === "pending" && (
                      <button
                        type="button"
                        onClick={() => approveVolunteer(item.id)}
                        className="text-blue-600 hover:underline"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Section>

      <Section id="donations" title={`Donations (${donations.length})`}>
        {donations.length === 0 ? (
          <EmptyRow message="No donations recorded yet." />
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b">
                <th className="pb-2 pr-4">Donor</th>
                <th className="pb-2 pr-4">Amount</th>
                <th className="pb-2 pr-4">Reference</th>
                <th className="pb-2 pr-4">Status</th>
                <th className="pb-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((item) => (
                <tr key={item.id} className="border-b border-slate-100">
                  <td className="py-3 pr-4">{item.donor_name || item.donor_email || "Anonymous"}</td>
                  <td className="py-3 pr-4">
                    {item.amount.toLocaleString()} {item.currency}
                  </td>
                  <td className="py-3 pr-4">{item.payment_reference || "—"}</td>
                  <td className="py-3 pr-4">{item.status}</td>
                  <td className="py-3">
                    {item.status === "pending" && (
                      <button
                        type="button"
                        onClick={() => completeDonation(item.id)}
                        className="text-blue-600 hover:underline"
                      >
                        Mark completed
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Section>

      <Section id="projects" title={`Projects (${projects.length})`}>
        {projects.length === 0 ? (
          <EmptyRow message="No projects yet. Create projects via the API docs." />
        ) : (
          <pre className="text-xs bg-slate-50 p-4 rounded-lg overflow-auto">{JSON.stringify(projects, null, 2)}</pre>
        )}
      </Section>

      <Section id="blog" title={`Blog Posts (${blog.length})`}>
        {blog.length === 0 ? (
          <EmptyRow message="No blog posts yet. Create posts via the API docs." />
        ) : (
          <pre className="text-xs bg-slate-50 p-4 rounded-lg overflow-auto">{JSON.stringify(blog, null, 2)}</pre>
        )}
      </Section>

      <Section id="products" title={`Products (${products.length})`}>
        {products.length === 0 ? (
          <EmptyRow message="No products yet. Create products via the API docs." />
        ) : (
          <pre className="text-xs bg-slate-50 p-4 rounded-lg overflow-auto">{JSON.stringify(products, null, 2)}</pre>
        )}
      </Section>
    </div>
  );
}
