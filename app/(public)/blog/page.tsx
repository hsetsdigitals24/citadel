import Image from "next/image";
import Link from "next/link";
import { buildMeta } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { getBlogPosts, getBlogCategories } from "@/lib/queries";
import { resolveImageUrl } from "@/lib/r2";
import { formatDate } from "@/lib/utils";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";

export const metadata = buildMeta(
  "Blog",
  "Dental health tips, treatment guides and clinic news from Citadel Global Dental Clinic in Ilorin.",
  { path: "/blog" }
);

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string; page?: string };
}) {
  const page = Number(searchParams.page ?? 1);
  const [{ items, total, pageSize }, categories] = await Promise.all([
    getBlogPosts({
      q: searchParams.q,
      category: searchParams.category,
      page,
    }),
    getBlogCategories(),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const itemsWithCovers = await Promise.all(
    items.map(async (p) => ({
      ...p,
      coverUrl: await resolveImageUrl(p.coverImage),
    }))
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <PageHero
        eyebrow="Blog"
        title="Notes on dental health & care."
        description="Practical guides on braces, implants, whitening and everyday oral health — written by our clinical team."
      />

      <section className="section">
        <div className="container-tight">
          <BlogFilters
            categories={categories}
            initialQuery={searchParams.q ?? ""}
            initialCategory={searchParams.category ?? ""}
          />

          {items.length === 0 ? (
            <div className="rounded-2xl bg-surface p-12 text-center ring-1 ring-black/[0.04]">
              <h3 className="text-lg font-semibold">No posts yet</h3>
              <p className="mt-2 text-sm text-ink-muted">
                Our clinical team is preparing the first articles. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {itemsWithCovers.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 0.06}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.04] shadow-soft transition hover:-translate-y-1 hover:shadow-glow"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-brand-gradient">
                      {p.coverUrl ? (
                        <Image
                          src={p.coverUrl}
                          alt={p.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      {p.category && (
                        <span className="eyebrow">{p.category}</span>
                      )}
                      <h3 className="mt-3 text-lg font-semibold text-foreground line-clamp-2">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-sm text-ink-muted line-clamp-3">
                        {p.excerpt}
                      </p>
                      <div className="mt-4 text-xs text-ink-subtle">
                        {p.publishedAt ? formatDate(p.publishedAt) : ""}
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => {
                const n = i + 1;
                const isActive = n === page;
                return (
                  <Link
                    key={n}
                    href={`/blog?page=${n}${
                      searchParams.q ? `&q=${searchParams.q}` : ""
                    }`}
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium ${
                      isActive
                        ? "bg-brand-600 text-white"
                        : "bg-white text-ink-muted ring-1 ring-brand-100 hover:bg-brand-50"
                    }`}
                  >
                    {n}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
