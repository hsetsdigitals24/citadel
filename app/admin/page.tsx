import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

async function getStats() {
  try {
    const [total, pending, recent] = await Promise.all([
      prisma.appointment.count(),
      prisma.appointment.count({ where: { status: "pending" } }),
      prisma.appointment.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
    ]);
    return { total, pending, recent };
  } catch {
    return { total: 0, pending: 0, recent: [] as any[] };
  }
}

export default async function AdminDashboard() {
  const { total, pending, recent } = await getStats();
  return (
    <div className="space-y-8">
      <header>
        <h1 className="heading-md">Dashboard</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Overview of recent activity at the clinic.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard label="Total appointments" value={total} />
        <StatCard label="Pending review" value={pending} accent />
      </div>

      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-brand-100 px-6 py-4">
          <h2 className="text-sm font-semibold">Recent appointments</h2>
          <Link
            href="/admin/appointments"
            className="text-sm font-medium text-brand-700 hover:underline"
          >
            View all
          </Link>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs uppercase tracking-[0.14em] text-ink-subtle">
            <tr>
              <th className="px-6 py-3 text-left font-medium">When</th>
              <th className="px-6 py-3 text-left font-medium">Patient</th>
              <th className="px-6 py-3 text-left font-medium">Phone</th>
              <th className="px-6 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {recent.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-ink-muted">
                  No appointments yet.
                </td>
              </tr>
            )}
            {recent.map((a) => (
              <tr key={a.id} className="border-t border-brand-100">
                <td className="px-6 py-3 text-ink-muted">
                  {formatDate(a.createdAt)}
                </td>
                <td className="px-6 py-3 font-medium">{a.fullName}</td>
                <td className="px-6 py-3 text-ink-muted">{a.phone}</td>
                <td className="px-6 py-3">
                  <StatusBadge status={a.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className={`card p-6 ${accent ? "bg-brand-gradient text-white" : ""}`}>
      <div
        className={`text-xs uppercase tracking-[0.14em] ${
          accent ? "text-white/70" : "text-ink-subtle"
        }`}
      >
        {label}
      </div>
      <div
        className={`mt-2 text-4xl font-semibold ${
          accent ? "text-white" : "text-foreground"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 ring-amber-200",
    confirmed: "bg-green-50 text-green-700 ring-green-200",
    cancelled: "bg-red-50 text-red-700 ring-red-200",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
        map[status] ?? "bg-surface text-ink-muted ring-brand-100"
      }`}
    >
      {status}
    </span>
  );
}
