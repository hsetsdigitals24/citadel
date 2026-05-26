"use client";

import { useRef, useState } from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  value: string | null;
  onChange: (key: string | null) => void;
  prefix: string; // e.g. "blog"
};

export function ImageUpload({ value, onChange, prefix }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFile = async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("prefix", prefix);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `Upload failed (${res.status})`);
      }
      const { key } = await res.json();
      onChange(key);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
      {value ? (
        <div className="flex items-center gap-3 rounded-xl border border-brand-100 bg-white p-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
            <PhotoIcon className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-foreground truncate">
              {value}
            </div>
            <div className="text-xs text-ink-subtle">Stored in R2</div>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-muted hover:bg-red-50 hover:text-red-600"
            aria-label="Remove"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-brand-200 bg-white px-4 py-6 text-sm font-medium text-ink-muted hover:border-brand-500 hover:bg-brand-50 hover:text-brand-700 transition disabled:opacity-60"
        >
          <PhotoIcon className="h-5 w-5" />
          {uploading ? "Uploading…" : "Upload image"}
        </button>
      )}
      {error && (
        <p className="mt-2 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
