import Link from "next/link";
import { AuthSessionProvider } from "@/components/admin/SessionProvider";
import { AdminSignOut } from "@/components/admin/AdminSignOut";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/appointments", label: "Appointments" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/team", label: "Team" },
  { href: "/admin/settings", label: "Settings" },
];

export const metadata = { title: "Admin · Citadel Global Dental Clinic" };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthSessionProvider>
      <div className="min-h-screen bg-surface">
        <div className="flex">
          <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-brand-100 bg-white">
            <div className="px-6 py-6">
              <div className="text-sm font-semibold text-brand-700">
                Citadel Admin
              </div>
              <div className="text-xs text-ink-subtle">Content management</div>
            </div>
            <nav className="flex flex-col gap-1 px-3">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="rounded-lg px-3 py-2 text-sm text-ink-muted hover:bg-brand-50 hover:text-brand-700"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto p-4">
              <AdminSignOut />
            </div>
          </aside>
          <main className="flex-1 px-4 py-8 sm:px-8">{children}</main>
        </div>
      </div>
    </AuthSessionProvider>
  );
}
