import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { fallbackServices } from "@/lib/content";
import { SITE } from "@/lib/utils";

export const revalidate = 3600; // 1h

const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/team", changeFrequency: "monthly", priority: 0.6 },
  { path: "/appointments", changeFrequency: "monthly", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/testimonials", changeFrequency: "monthly", priority: 0.5 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
  { path: "/cookie-policy", changeFrequency: "yearly", priority: 0.2 },
];

async function safeServices() {
  try {
    const rows = await prisma.service.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    if (rows.length) return rows.map((r) => ({ slug: r.slug, updatedAt: r.updatedAt }));
    return fallbackServices.map((s) => ({ slug: s.slug, updatedAt: new Date() }));
  } catch {
    return fallbackServices.map((s) => ({ slug: s.slug, updatedAt: new Date() }));
  }
}

async function safeBlogPosts() {
  try {
    return await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true, publishedAt: true },
    });
  } catch {
    return [] as { slug: string; updatedAt: Date; publishedAt: Date | null }[];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${base}${r.path === "/" ? "" : r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const [services, posts] = await Promise.all([safeServices(), safeBlogPosts()]);

  const serviceEntries: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: s.updatedAt ?? now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.updatedAt ?? p.publishedAt ?? now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...serviceEntries, ...blogEntries];
}
