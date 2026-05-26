"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ImageUpload } from "./ImageUpload";
import { StringList, StepList, FaqList, type StepValue, type FaqValue } from "./RepeatableList";
import { slugify } from "@/lib/utils";

type Service = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  benefits: string[];
  steps: StepValue[];
  faqs: FaqValue[];
  image: string | null;
  order: number;
  published: boolean;
};

const empty: Service = {
  name: "",
  slug: "",
  description: "",
  benefits: [""],
  steps: [{ title: "", detail: "" }],
  faqs: [],
  image: null,
  order: 0,
  published: true,
};

const fieldCls =
  "w-full rounded-xl border border-brand-100 bg-white px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition";

export function ServiceEditor({ initial }: { initial?: Service }) {
  const router = useRouter();
  const isNew = !initial?.id;
  const [s, setS] = useState<Service>(initial ?? empty);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(!!initial?.slug);

  const set = <K extends keyof Service>(k: K, v: Service[K]) =>
    setS((p) => ({ ...p, [k]: v }));

  const onNameChange = (v: string) => {
    set("name", v);
    if (!slugTouched) set("slug", slugify(v));
  };

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const body = {
        name: s.name,
        slug: s.slug || slugify(s.name),
        description: s.description,
        benefits: s.benefits.map((b) => b.trim()).filter(Boolean),
        steps: s.steps
          .map((st) => ({ title: st.title.trim(), detail: st.detail.trim() }))
          .filter((st) => st.title && st.detail),
        faqs: s.faqs
          .map((f) => ({ question: f.question.trim(), answer: f.answer.trim() }))
          .filter((f) => f.question && f.answer),
        image: s.image,
        order: Number(s.order) || 0,
        published: s.published,
      };
      const res = await fetch(isNew ? "/api/services" : `/api/services/${s.id}`, {
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
        router.push(`/admin/services/${saved.id}`);
        router.refresh();
      } else {
        setS((p) => ({ ...p, ...saved, steps: saved.steps ?? p.steps, faqs: saved.faqs ?? p.faqs }));
        router.refresh();
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!s.id) return;
    if (!confirm("Delete this service? This cannot be undone.")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/services/${s.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      router.push("/admin/services");
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
          href="/admin/services"
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-brand-700"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to services
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
            {saving ? "Saving…" : isNew ? "Create service" : "Save"}
          </button>
        </div>
      </header>

      {error && (
        <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-100">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <input
            value={s.name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Service name"
            className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-ink-subtle focus:outline-none"
          />
          <textarea
            value={s.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Short description shown on the listing card and at the top of the service page."
            rows={4}
            className={fieldCls}
          />

          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
              Benefits
            </h3>
            <StringList
              values={s.benefits}
              onChange={(v) => set("benefits", v)}
              placeholder="e.g. Personalised treatment plan"
            />
          </section>

          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
              Procedure steps
            </h3>
            <StepList values={s.steps} onChange={(v) => set("steps", v)} />
          </section>

          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
              FAQs
            </h3>
            <p className="text-xs text-ink-subtle">
              These appear as an accordion on the public service page and as FAQPage JSON-LD for Google rich results.
            </p>
            <FaqList values={s.faqs} onChange={(v) => set("faqs", v)} />
          </section>
        </div>

        <aside className="space-y-5">
          <div className="card p-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
              Publishing
            </h3>
            <label className="flex items-center justify-between text-sm">
              <span className="font-medium">Published</span>
              <button
                type="button"
                onClick={() => set("published", !s.published)}
                role="switch"
                aria-checked={s.published}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  s.published ? "bg-brand-600" : "bg-brand-100"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                    s.published ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </label>
            <label className="block">
              <span className="text-sm font-medium">Order</span>
              <input
                type="number"
                value={s.order}
                onChange={(e) => set("order", Number(e.target.value))}
                className={`${fieldCls} mt-1.5`}
              />
              <p className="mt-1 text-xs text-ink-subtle">
                Lower numbers appear first.
              </p>
            </label>
          </div>

          <div className="card p-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
              Image
            </h3>
            <ImageUpload
              prefix="services"
              value={s.image}
              onChange={(key) => set("image", key)}
            />
          </div>

          <div className="card p-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
              URL
            </h3>
            <label className="block">
              <span className="text-sm font-medium">Slug</span>
              <input
                value={s.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  set("slug", slugify(e.target.value));
                }}
                placeholder="my-service"
                className={`${fieldCls} mt-1.5`}
              />
              <p className="mt-1 text-xs text-ink-subtle">
                /services/<span className="font-mono">{s.slug || "…"}</span>
              </p>
            </label>
          </div>
        </aside>
      </div>
    </div>
  );
}
