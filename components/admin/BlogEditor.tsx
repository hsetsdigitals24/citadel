"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { RichTextEditor } from "./RichTextEditor";
import { ImageUpload } from "./ImageUpload";
import { slugify } from "@/lib/utils";

type Post = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string | null;
  coverImage: string | null;
  published: boolean;
};

const empty: Post = {
  title: "",
  slug: "",
  excerpt: "",
  content: "<p>Start writing…</p>",
  category: "",
  coverImage: null,
  published: false,
};

const fieldCls =
  "w-full rounded-xl border border-brand-100 bg-white px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition";

export function BlogEditor({ initial }: { initial?: Post }) {
  const router = useRouter();
  const isNew = !initial?.id;
  const [post, setPost] = useState<Post>(initial ?? empty);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(!!initial?.slug);

  const update = <K extends keyof Post>(key: K, value: Post[K]) =>
    setPost((p) => ({ ...p, [key]: value }));

  const onTitleChange = (v: string) => {
    update("title", v);
    if (!slugTouched) update("slug", slugify(v));
  };

  const save = async (publish?: boolean) => {
    setSaving(true);
    setError(null);
    try {
      const body = {
        title: post.title,
        slug: post.slug || slugify(post.title),
        excerpt: post.excerpt,
        content: post.content,
        category: post.category || null,
        coverImage: post.coverImage,
        published: publish ?? post.published,
      };
      const res = await fetch(isNew ? "/api/blog" : `/api/blog/${post.id}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        const fields = j.fields as Record<string, string[] | undefined> | undefined;
        const fieldMsgs = fields
          ? Object.entries(fields)
              .filter(([, msgs]) => msgs && msgs.length)
              .map(
                ([name, msgs]) =>
                  `${name.charAt(0).toUpperCase() + name.slice(1)}: ${msgs!.join(", ")}`
              )
              .join(" • ")
          : "";
        const msg = [j.error, fieldMsgs].filter(Boolean).join(" — ") || "Save failed";
        throw new Error(msg);
      }
      const saved = await res.json();
      if (isNew) {
        router.push(`/admin/blog/${saved.id}`);
        router.refresh();
      } else {
        setPost((p) => ({ ...p, ...saved }));
        router.refresh();
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!post.id) return;
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/blog/${post.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      router.push("/admin/blog");
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
          href="/admin/blog"
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-brand-700"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to posts
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
            onClick={() => save(false)}
            disabled={saving}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-brand-700 ring-1 ring-brand-200 hover:bg-brand-50 disabled:opacity-60"
          >
            {saving ? "Saving…" : post.published ? "Unpublish" : "Save draft"}
          </button>
          <button
            type="button"
            onClick={() => save(true)}
            disabled={saving}
            className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-brand-700 disabled:opacity-60"
          >
            {post.published ? "Update & publish" : "Publish"}
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
            value={post.title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Post title"
            className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-ink-subtle focus:outline-none"
          />
          <textarea
            value={post.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
            placeholder="Short excerpt — shown on listing cards and used for SEO."
            rows={2}
            className={fieldCls}
          />
          <RichTextEditor
            value={post.content}
            onChange={(html) => update("content", html)}
          />
        </div>

        <aside className="space-y-5">
          <div className="card p-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
              Publishing
            </h3>
            <label className="flex items-center justify-between text-sm">
              <span className="font-medium">Status</span>
              <span
                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                  post.published
                    ? "bg-green-50 text-green-700 ring-green-200"
                    : "bg-amber-50 text-amber-700 ring-amber-200"
                }`}
              >
                {post.published ? "Published" : "Draft"}
              </span>
            </label>
          </div>

          <div className="card p-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
              Cover image
            </h3>
            <ImageUpload
              prefix="blog"
              value={post.coverImage}
              onChange={(key) => update("coverImage", key)}
            />
          </div>

          <div className="card p-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
              Metadata
            </h3>
            <label className="block">
              <span className="text-sm font-medium">Slug</span>
              <input
                value={post.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  update("slug", slugify(e.target.value));
                }}
                placeholder="my-post"
                className={`${fieldCls} mt-1.5`}
              />
              <p className="mt-1 text-xs text-ink-subtle">
                URL: /blog/<span className="font-mono">{post.slug || "…"}</span>
              </p>
            </label>
            <label className="block">
              <span className="text-sm font-medium">Category</span>
              <input
                value={post.category ?? ""}
                onChange={(e) => update("category", e.target.value)}
                placeholder="e.g. Oral Health"
                className={`${fieldCls} mt-1.5`}
              />
            </label>
          </div>
        </aside>
      </div>
    </div>
  );
}
