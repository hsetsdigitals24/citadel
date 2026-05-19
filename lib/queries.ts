import { prisma } from "@/lib/db";
import {
  fallbackServices,
  fallbackTeam,
  fallbackTestimonials,
} from "@/lib/content";
import { SITE } from "@/lib/utils";

export type Settings = {
  workingHours: string;
  facebookUrl: string;
  instagramUrl: string;
  address: string;
};

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

const defaultSettings: Settings = {
  workingHours: SITE.hours,
  facebookUrl: SITE.facebookUrl,
  instagramUrl: SITE.instagramUrl,
  address: SITE.addressShort,
};

export async function getSettings(): Promise<Settings> {
  return safe(async () => {
    const row = await prisma.siteSettings.findUnique({
      where: { id: "singleton" },
    });
    if (!row) return defaultSettings;
    return {
      workingHours: row.workingHours || defaultSettings.workingHours,
      facebookUrl: row.facebookUrl || defaultSettings.facebookUrl,
      instagramUrl: row.instagramUrl || defaultSettings.instagramUrl,
      address: row.address || defaultSettings.address,
    };
  }, defaultSettings);
}

export async function getServices() {
  return safe(
    async () => {
      const rows = await prisma.service.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
      });
      if (!rows.length) return fallbackServices as unknown as typeof rows;
      return rows;
    },
    fallbackServices as unknown as Awaited<ReturnType<typeof prisma.service.findMany>>
  );
}

export async function getService(slug: string) {
  return safe(
    async () => {
      const row = await prisma.service.findUnique({ where: { slug } });
      if (row) return row as any;
      return (fallbackServices.find((s) => s.slug === slug) ?? null) as any;
    },
    (fallbackServices.find((s) => s.slug === slug) ?? null) as any
  );
}

export async function getTeam() {
  return safe(
    async () => {
      const rows = await prisma.teamMember.findMany({
        orderBy: { order: "asc" },
      });
      if (!rows.length) return fallbackTeam as unknown as typeof rows;
      return rows;
    },
    fallbackTeam as unknown as Awaited<ReturnType<typeof prisma.teamMember.findMany>>
  );
}

export async function getTestimonials() {
  return safe(
    async () => {
      const rows = await prisma.testimonial.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
      });
      if (!rows.length) return fallbackTestimonials as unknown as typeof rows;
      return rows;
    },
    fallbackTestimonials as unknown as Awaited<ReturnType<typeof prisma.testimonial.findMany>>
  );
}

export async function getBlogPosts(params: {
  q?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}) {
  return safe(
    async () => {
      const pageSize = params.pageSize ?? 10;
      const page = Math.max(1, params.page ?? 1);
      const where = {
        published: true,
        ...(params.category ? { category: params.category } : {}),
        ...(params.q
          ? { title: { contains: params.q, mode: "insensitive" as const } }
          : {}),
      };
      const [items, total] = await Promise.all([
        prisma.blogPost.findMany({
          where,
          orderBy: { publishedAt: "desc" },
          skip: (page - 1) * pageSize,
          take: pageSize,
        }),
        prisma.blogPost.count({ where }),
      ]);
      return { items, total, page, pageSize };
    },
    { items: [], total: 0, page: 1, pageSize: 10 }
  );
}
