"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type Props = {
  categories: string[];
  initialQuery: string;
  initialCategory: string;
};

export function BlogFilters({
  categories,
  initialQuery,
  initialCategory,
}: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();

  const applyParams = (next: Record<string, string | null>) => {
    const sp = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v && v.length > 0) sp.set(k, v);
      else sp.delete(k);
    }
    sp.delete("page"); // reset pagination on filter change
    const qs = sp.toString();
    startTransition(() => {
      router.push(qs ? `/blog?${qs}` : "/blog");
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyParams({ q });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center"
    >
      <div className="relative flex-1">
        <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search posts…"
          className="w-full rounded-full border border-brand-100 bg-white pl-11 pr-5 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
      </div>

      {categories.length > 0 && (
        <select
          value={initialCategory}
          onChange={(e) => applyParams({ category: e.target.value || null })}
          className="rounded-full border border-brand-100 bg-white px-5 py-3 text-sm font-medium text-foreground focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          aria-label="Filter by category"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-70"
      >
        {isPending ? "…" : "Search"}
      </button>

      {(initialQuery || initialCategory) && (
        <button
          type="button"
          onClick={() => {
            setQ("");
            applyParams({ q: null, category: null });
          }}
          className="text-sm font-medium text-ink-muted hover:text-brand-700"
        >
          Clear
        </button>
      )}
    </form>
  );
}
