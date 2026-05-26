"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ImportDefaultsButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/services/seed", { method: "POST" });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Import failed");
      }
      router.refresh();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-brand-700 disabled:opacity-60"
      >
        {loading ? "Importing…" : "Import default services"}
      </button>
      {error && <span className="text-xs text-red-700">{error}</span>}
    </div>
  );
}
