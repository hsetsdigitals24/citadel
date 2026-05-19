import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

async function getPosts() {
  try {
    return await prisma.blogPost.findMany({
      orderBy: [{ updatedAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export default async function AdminBlogPage() {
  const posts = await getPosts();
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="heading-md">Blog</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Create, edit, publish and delete posts.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-brand-700"
        >
          <PlusIcon className="h-4 w-4" />
          New post
        </Link>
      </header>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs uppercase tracking-[0.14em] text-ink-subtle">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Title</th>
              <th className="px-4 py-3 text-left font-medium">Category</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Updated</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-ink-muted">
                  No posts yet —{" "}
                  <Link href="/admin/blog/new" className="text-brand-700 underline">
                    create the first one
                  </Link>
                  .
                </td>
              </tr>
            )}
            {posts.map((p) => (
              <tr key={p.id} className="border-t border-brand-100">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/blog/${p.id}`}
                    className="font-medium text-foreground hover:text-brand-700"
                  >
                    {p.title}
                  </Link>
                  <div className="text-xs text-ink-subtle font-mono">/{p.slug}</div>
                </td>
                <td className="px-4 py-3 text-ink-muted">{p.category ?? "—"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                      p.published
                        ? "bg-green-50 text-green-700 ring-green-200"
                        : "bg-amber-50 text-amber-700 ring-amber-200"
                    }`}
                  >
                    {p.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink-muted whitespace-nowrap">
                  {formatDate(p.updatedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
