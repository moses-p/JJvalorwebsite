"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/api";
import { clearAdminSession, getAdminUser, verifyAdminSession } from "@/lib/auth";
import BrandLogo from "@/components/BrandLogo";
import { LayoutDashboard, LogOut, MessageSquare, Users, Heart, Briefcase, FileText, Package, Megaphone, ImageIcon, Handshake, UserCircle } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/updates", label: "Updates & Marquee", icon: Megaphone },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/partners", label: "Partners", icon: Handshake },
  { href: "/admin/leadership", label: "Leadership", icon: UserCircle },
  { href: "/admin/projects", label: "Projects", icon: Briefcase },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/contact", label: "Contact", icon: MessageSquare },
  { href: "/admin/volunteers", label: "Volunteers", icon: Users },
  { href: "/admin/donations", label: "Donations", icon: Heart },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    let cancelled = false;

    async function checkAuth() {
      setReady(false);
      const authenticated = await verifyAdminSession(API_BASE_URL);

      if (cancelled) return;

      if (isLoginPage) {
        if (authenticated) {
          router.replace("/admin");
          return;
        }
        setReady(true);
        return;
      }

      if (!authenticated) {
        clearAdminSession();
        router.replace("/admin/login");
        return;
      }

      setReady(true);
    }

    checkAuth();

    return () => {
      cancelled = true;
    };
  }, [isLoginPage, pathname, router]);

  function handleLogout() {
    clearAdminSession();
    router.replace("/admin/login");
  }

  if (!ready) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-300">
        Loading admin...
      </div>
    );
  }

  if (isLoginPage) {
    return <div className="min-h-screen bg-slate-950">{children}</div>;
  }

  const user = getAdminUser();

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="hidden lg:flex w-64 bg-slate-950 text-white flex-col">
        <div className="p-6 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-3">
            <BrandLogo className="h-12 w-auto" />
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400">J.J Valor</p>
              <h1 className="text-lg font-bold">Admin Panel</h1>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <p className="text-sm text-slate-300 truncate">{user?.full_name || user?.username}</p>
          <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="lg:hidden bg-slate-950 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrandLogo className="h-10 w-auto" />
            <span className="font-semibold">J.J Valor Admin</span>
          </div>
          <button type="button" onClick={handleLogout} className="text-sm text-slate-300">
            Log out
          </button>
        </header>
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
