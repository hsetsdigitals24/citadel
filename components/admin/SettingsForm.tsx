"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

type Settings = {
  workingHours: string;
  facebookUrl: string;
  instagramUrl: string;
};

const fieldCls =
  "w-full rounded-xl border border-brand-100 bg-white px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition";

export function SettingsForm({ initial }: { initial: Settings }) {
  const router = useRouter();
  const [v, setV] = useState<Settings>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof Settings>(k: K, val: Settings[K]) =>
    setV((p) => ({ ...p, [k]: val }));

  const save = async () => {
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Save failed");
      }
      setSaved(true);
      router.refresh();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card p-6 sm:p-8 space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-sm font-medium">Working hours</span>
          <input
            value={v.workingHours}
            onChange={(e) => set("workingHours", e.target.value)}
            placeholder="8:00 AM – 4:00 PM daily"
            className={`${fieldCls} mt-1.5`}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Facebook URL</span>
          <input
            type="url"
            value={v.facebookUrl}
            onChange={(e) => set("facebookUrl", e.target.value)}
            placeholder="https://facebook.com/…"
            className={`${fieldCls} mt-1.5`}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Instagram URL</span>
          <input
            type="url"
            value={v.instagramUrl}
            onChange={(e) => set("instagramUrl", e.target.value)}
            placeholder="https://instagram.com/…"
            className={`${fieldCls} mt-1.5`}
          />
        </label>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-100">
          {error}
        </div>
      )}

      <div className="flex items-center justify-end gap-3">
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm text-green-700">
            <CheckCircleIcon className="h-4 w-4" />
            Saved
          </span>
        )}
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-brand-700 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save settings"}
        </button>
      </div>
    </div>
  );
}
