import Link from "next/link";
import { PlusIcon, StarIcon } from "@heroicons/react/24/solid";
import { prisma } from "@/lib/db";

async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function AdminTestimonialsPage() {
  const items = await getTestimonials();
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="heading-md">Testimonials</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Manage patient reviews shown on the website.
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-brand-700"
        >
          <PlusIcon className="h-4 w-4" />
          Add testimonial
        </Link>
      </header>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs uppercase tracking-[0.14em] text-ink-subtle">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Rating</th>
              <th className="px-4 py-3 text-left font-medium">Patient</th>
              <th className="px-4 py-3 text-left font-medium">Quote</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-ink-muted">
                  No testimonials yet —{" "}
                  <Link
                    href="/admin/testimonials/new"
                    className="text-brand-700 underline"
                  >
                    add the first one
                  </Link>
                  .
                </td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item.id} className="border-t border-brand-100">
                <td className="px-4 py-3">
                  <span className="flex items-center gap-0.5 text-clinic-red">
                    {item.rating ? (
                      Array.from({ length: item.rating }).map((_, i) => (
                        <StarIcon key={i} className="h-3.5 w-3.5" />
                      ))
                    ) : (
                      <span className="text-ink-subtle">—</span>
                    )}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/testimonials/${item.id}`}
                    className="font-medium text-foreground hover:text-brand-700"
                  >
                    {item.patientName}
                  </Link>
                </td>
                <td className="px-4 py-3 text-ink-muted max-w-xs truncate">
                  {item.quote.length > 60
                    ? `${item.quote.slice(0, 60)}…`
                    : item.quote}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      item.published
                        ? "bg-green-50 text-green-700 ring-1 ring-green-100"
                        : "bg-amber-50 text-amber-700 ring-1 ring-amber-100"
                    }`}
                  >
                    {item.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink-muted whitespace-nowrap">
                  {new Date(item.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
