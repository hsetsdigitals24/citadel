import Link from "next/link";
import { prisma } from "@/lib/db";
import { ImportDefaultsButton } from "@/components/admin/ImportDefaultsButton";

async function getServices() {
  try {
    return await prisma.service.findMany({
      orderBy: [{ order: "asc" }, { name: "asc" }],
    });
  } catch {
    return [];
  }
}

export default async function AdminServicesPage() {
  const services = await getServices();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="heading-md">Services</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Manage service pages, ordering and publishing.
        </p>
      </header>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs uppercase tracking-[0.14em] text-ink-subtle">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Order</th>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Slug</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-ink-muted">
                  <div>No services yet.</div>
                  <ImportDefaultsButton />
                </td>
              </tr>
            )}
            {services.map((s) => (
              <tr key={s.id} className="border-t border-brand-100">
                <td className="px-4 py-3 text-ink-muted">{s.order}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/services/${s.id}`}
                    className="font-medium text-foreground hover:text-brand-700"
                  >
                    {s.name}
                  </Link>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-ink-subtle">
                  /{s.slug}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                      s.published
                        ? "bg-green-50 text-green-700 ring-green-200"
                        : "bg-amber-50 text-amber-700 ring-amber-200"
                    }`}
                  >
                    {s.published ? "Published" : "Hidden"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
