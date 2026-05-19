"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ImageUpload } from "./ImageUpload";

type Member = {
  id?: string;
  name: string;
  qualifications: string;
  specialization: string;
  experience: string;
  bio: string;
  photo: string | null;
  order: number;
};

const empty: Member = {
  name: "",
  qualifications: "",
  specialization: "",
  experience: "",
  bio: "",
  photo: null,
  order: 0,
};

const fieldCls =
  "w-full rounded-xl border border-brand-100 bg-white px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition";

export function TeamMemberEditor({ initial }: { initial?: Member }) {
  const router = useRouter();
  const isNew = !initial?.id;
  const [m, setM] = useState<Member>(initial ?? empty);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof Member>(k: K, v: Member[K]) =>
    setM((p) => ({ ...p, [k]: v }));

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const body = { ...m, order: Number(m.order) || 0 };
      const res = await fetch(isNew ? "/api/team" : `/api/team/${m.id}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Save failed");
      }
      const saved = await res.json();
      if (isNew) {
        router.push(`/admin/team/${saved.id}`);
        router.refresh();
      } else {
        setM((p) => ({ ...p, ...saved }));
        router.refresh();
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!m.id) return;
    if (!confirm("Remove this team member? This cannot be undone.")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/team/${m.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      router.push("/admin/team");
      router.refresh();
    } catch (e: any) {
      setError(e.message);
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <Link
          href="/admin/team"
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-brand-700"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to team
        </Link>
        <div className="flex items-center gap-2">
          {!isNew && (
            <button
              type="button"
              onClick={remove}
              disabled={deleting}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-red-600 ring-1 ring-red-100 hover:bg-red-50 disabled:opacity-60"
            >
              <TrashIcon className="h-4 w-4" />
              {deleting ? "Removing…" : "Remove"}
            </button>
          )}
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-brand-700 disabled:opacity-60"
          >
            {saving ? "Saving…" : isNew ? "Add member" : "Save"}
          </button>
        </div>
      </header>

      {error && (
        <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-100">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          <input
            value={m.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Full name (e.g. Dr. Chris Ejakpome)"
            className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-ink-subtle focus:outline-none"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium">Qualifications</span>
              <input
                value={m.qualifications}
                onChange={(e) => set("qualifications", e.target.value)}
                placeholder="e.g. BDS, Implantology (USA & Canada)"
                className={`${fieldCls} mt-1.5`}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Specialization</span>
              <input
                value={m.specialization}
                onChange={(e) => set("specialization", e.target.value)}
                placeholder="e.g. Oral & Maxillofacial Surgery"
                className={`${fieldCls} mt-1.5`}
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium">Experience</span>
            <input
              value={m.experience}
              onChange={(e) => set("experience", e.target.value)}
              placeholder="e.g. 2014 – present"
              className={`${fieldCls} mt-1.5`}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Bio</span>
            <textarea
              rows={6}
              value={m.bio}
              onChange={(e) => set("bio", e.target.value)}
              placeholder="A short biography shown on the team page."
              className={`${fieldCls} mt-1.5`}
            />
          </label>
        </div>

        <aside className="space-y-5">
          <div className="card p-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
              Photo
            </h3>
            <ImageUpload
              prefix="team"
              value={m.photo}
              onChange={(key) => set("photo", key)}
            />
          </div>
          <div className="card p-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
              Order
            </h3>
            <label className="block">
              <span className="text-sm font-medium">Position</span>
              <input
                type="number"
                value={m.order}
                onChange={(e) => set("order", Number(e.target.value))}
                className={`${fieldCls} mt-1.5`}
              />
              <p className="mt-1 text-xs text-ink-subtle">
                Lower numbers appear first on the team page.
              </p>
            </label>
          </div>
        </aside>
      </div>
    </div>
  );
}
