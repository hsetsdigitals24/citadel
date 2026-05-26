"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";

type Testimonial = {
  id?: string;
  patientName: string;
  quote: string;
  rating: number | null;
  published: boolean;
};

const empty: Testimonial = {
  patientName: "",
  quote: "",
  rating: null,
  published: false,
};

const fieldCls =
  "w-full rounded-xl border border-brand-100 bg-white px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition";

export function TestimonialEditor({ initial }: { initial?: Testimonial }) {
  const router = useRouter();
  const isNew = !initial?.id;
  const [t, setT] = useState<Testimonial>(initial ?? empty);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const set = <K extends keyof Testimonial>(k: K, v: Testimonial[K]) =>
    setT((p) => ({ ...p, [k]: v }));

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(
        isNew ? "/api/testimonials" : `/api/testimonials/${t.id}`,
        {
          method: isNew ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(t),
        }
      );
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Save failed");
      }
      const saved = await res.json();
      if (isNew) {
        router.push(`/admin/testimonials/${saved.id}`);
        router.refresh();
      } else {
        setT((p) => ({ ...p, ...saved }));
        router.refresh();
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!t.id) return;
    if (!confirm("Delete this testimonial? This cannot be undone.")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/testimonials/${t.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      router.push("/admin/testimonials");
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
          href="/admin/testimonials"
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-brand-700"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to testimonials
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
              {deleting ? "Deleting…" : "Delete"}
            </button>
          )}
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-brand-700 disabled:opacity-60"
          >
            {saving ? "Saving…" : isNew ? "Add testimonial" : "Save"}
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
          <label className="block">
            <span className="text-sm font-medium">Patient name</span>
            <input
              value={t.patientName}
              onChange={(e) => set("patientName", e.target.value)}
              placeholder="e.g. Aisha M."
              className={`${fieldCls} mt-1.5`}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Quote</span>
            <textarea
              rows={5}
              value={t.quote}
              onChange={(e) => set("quote", e.target.value)}
              placeholder="Patient's review in their own words…"
              className={`${fieldCls} mt-1.5`}
            />
          </label>
        </div>

        <aside className="space-y-5">
          <div className="card p-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
              Rating
            </h3>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const filled = star <= (hovered ?? t.rating ?? 0);
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => set("rating", star === t.rating ? null : star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(null)}
                    className="text-clinic-red transition-transform hover:scale-110"
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                  >
                    {filled ? (
                      <StarSolid className="h-7 w-7" />
                    ) : (
                      <StarOutline className="h-7 w-7 text-brand-200" />
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-ink-subtle">
              {t.rating
                ? `${t.rating} star${t.rating > 1 ? "s" : ""}`
                : "No rating set"}{" "}
              · Click the selected star to clear.
            </p>
          </div>

          <div className="card p-5 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
              Visibility
            </h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={t.published}
                onChange={(e) => set("published", e.target.checked)}
                className="h-4 w-4 rounded border-brand-200 text-brand-600 focus:ring-brand-500"
              />
              <span className="text-sm font-medium">Published</span>
            </label>
            <p className="text-xs text-ink-subtle">
              Only published testimonials appear on the website.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
