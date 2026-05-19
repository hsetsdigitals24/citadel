import { prisma } from "@/lib/db";
import { SettingsForm } from "@/components/admin/SettingsForm";

async function getSettings() {
  try {
    return (
      (await prisma.siteSettings.findUnique({ where: { id: "singleton" } })) ??
      (await prisma.siteSettings.create({ data: { id: "singleton" } }))
    );
  } catch {
    return null;
  }
}

export default async function AdminSettingsPage() {
  const s = await getSettings();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="heading-md">Settings</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Clinic contact information, hours and social links shown across the
          website.
        </p>
      </header>

      {s ? (
        <SettingsForm
          initial={{
            workingHours: s.workingHours,
            facebookUrl: s.facebookUrl,
            instagramUrl: s.instagramUrl,
            address: s.address,
          }}
        />
      ) : (
        <div className="card p-8 text-center text-ink-muted">
          Settings are unavailable — the database isn’t reachable yet.
        </div>
      )}
    </div>
  );
}
