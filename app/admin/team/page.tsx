import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { prisma } from "@/lib/db";

async function getTeam() {
  try {
    return await prisma.teamMember.findMany({
      orderBy: [{ order: "asc" }, { name: "asc" }],
    });
  } catch {
    return [];
  }
}

export default async function AdminTeamPage() {
  const team = await getTeam();
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="heading-md">Team</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Add or update team member profiles and photos.
          </p>
        </div>
        <Link
          href="/admin/team/new"
          className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-brand-700"
        >
          <PlusIcon className="h-4 w-4" />
          Add member
        </Link>
      </header>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs uppercase tracking-[0.14em] text-ink-subtle">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Order</th>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Specialization</th>
              <th className="px-4 py-3 text-left font-medium">Experience</th>
            </tr>
          </thead>
          <tbody>
            {team.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-ink-muted">
                  No team members yet —{" "}
                  <Link href="/admin/team/new" className="text-brand-700 underline">
                    add the first one
                  </Link>
                  .
                </td>
              </tr>
            )}
            {team.map((m) => (
              <tr key={m.id} className="border-t border-brand-100">
                <td className="px-4 py-3 text-ink-muted">{m.order}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/team/${m.id}`}
                    className="font-medium text-foreground hover:text-brand-700"
                  >
                    {m.name}
                  </Link>
                  <div className="text-xs text-ink-subtle">{m.qualifications}</div>
                </td>
                <td className="px-4 py-3 text-ink-muted">{m.specialization}</td>
                <td className="px-4 py-3 text-ink-muted whitespace-nowrap">
                  {m.experience}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
