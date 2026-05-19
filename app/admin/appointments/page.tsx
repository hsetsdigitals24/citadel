import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { AppointmentStatusSelect } from "@/components/admin/AppointmentStatusSelect";

async function getAppointments() {
  try {
    return await prisma.appointment.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function AdminAppointmentsPage() {
  const rows = await getAppointments();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="heading-md">Appointments</h1>
        <p className="mt-1 text-sm text-ink-muted">
          All appointment requests, newest first.
        </p>
      </header>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs uppercase tracking-[0.14em] text-ink-subtle">
            <tr>
              <th className="px-4 py-3 text-left font-medium">When</th>
              <th className="px-4 py-3 text-left font-medium">Patient</th>
              <th className="px-4 py-3 text-left font-medium">Phone</th>
              <th className="px-4 py-3 text-left font-medium">Email</th>
              <th className="px-4 py-3 text-left font-medium">Reason</th>
              <th className="px-4 py-3 text-left font-medium">Method</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-ink-muted">
                  No appointments yet.
                </td>
              </tr>
            )}
            {rows.map((a) => (
              <tr key={a.id} className="border-t border-brand-100 align-top">
                <td className="px-4 py-3 text-ink-muted whitespace-nowrap">
                  {formatDate(a.createdAt)}
                </td>
                <td className="px-4 py-3 font-medium">{a.fullName}</td>
                <td className="px-4 py-3 text-ink-muted whitespace-nowrap">
                  {a.phone}
                </td>
                <td className="px-4 py-3 text-ink-muted">{a.email}</td>
                <td className="px-4 py-3 text-ink-muted max-w-sm">
                  <span className="line-clamp-2">{a.reason}</span>
                </td>
                <td className="px-4 py-3 text-ink-muted capitalize">
                  {a.contactMethod}
                </td>
                <td className="px-4 py-3">
                  <AppointmentStatusSelect id={a.id} initial={a.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
