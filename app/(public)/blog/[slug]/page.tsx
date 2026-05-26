import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { buildMeta } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { CTABanner } from "@/components/home/CTABanner";
import { resolveImageUrl } from "@/lib/r2";
import { formatDate, SITE } from "@/lib/utils";
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
} from "@/components/seo/StructuredData";

async function getPost(slug: string) {
  try {
    return await prisma.blogPost.findFirst({
      where: { slug, published: true },
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const p = await getPost(params.slug);
  if (!p) {
    return buildMeta(
      "Blog post",
      "Read the latest from Citadel Global Dental Clinic.",
      { path: `/blog/${params.slug}`, robots: { index: false, follow: true } }
    );
  }
  const cover = await resolveImageUrl(p.coverImage);
  return buildMeta(p.title, p.excerpt.slice(0, 155), {
    path: `/blog/${p.slug}`,
    image: cover ?? undefined,
    type: "article",
    publishedTime: p.publishedAt
      ? new Date(p.publishedAt).toISOString()
      : undefined,
    modifiedTime: p.updatedAt
      ? new Date(p.updatedAt).toISOString()
      : undefined,
    keywords: p.category ? [p.category, `${p.category} Ilorin`] : undefined,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const coverUrl = await resolveImageUrl(post.coverImage);
  const articleUrl = `${SITE.url.replace(/\/$/, "")}/blog/${post.slug}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        url={articleUrl}
        image={coverUrl}
        datePublished={
          post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined
        }
        dateModified={
          post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined
        }
        category={post.category}
      />
      <PageHero
        eyebrow={post.category ?? "Blog"}
        title={post.title}
        description={post.excerpt}
      />

      <article className="section">
        <div className="container-tight max-w-3xl">
          {coverUrl && (
            <div className="relative -mt-24 mb-10 aspect-[16/9] overflow-hidden rounded-3xl ring-1 ring-black/[0.04] shadow-glow">
              <Image
                src={coverUrl}
                alt={post.title}
                fill
                sizes="(min-width: 768px) 720px, 100vw"
                priority
                className="object-cover"
              />
            </div>
          )}
          {post.publishedAt && (
            <p className="text-xs uppercase tracking-[0.14em] text-ink-subtle">
              {formatDate(post.publishedAt)}
            </p>
          )}
          <div
            className="prose prose-lg mt-6 max-w-none text-foreground prose-headings:font-display prose-headings:tracking-tight prose-a:text-brand-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
      <CTABanner />
    </>
  );
}
