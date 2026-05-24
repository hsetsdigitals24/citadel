import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? undefined;
  const category = searchParams.get("category") ?? undefined;

  const where = {
    ...(session ? {} : { published: true }),
    ...(category ? { category } : {}),
    ...(q ? { title: { contains: q, mode: "insensitive" as const } } : {}),
  };

  try {
    const items = await prisma.blogPost.findMany({
      where,
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json([]);
  }
}

const createSchema = z.object({
  title: z.string().max(200).optional().default(""),
  slug: z.string().optional(),
  excerpt: z.string().max(400).optional().default(""),
  content: z.string().optional().default(""),
  category: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  published: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", fields: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  const data = parsed.data;
  const baseSlug = (data.slug && data.slug.length ? data.slug : slugify(data.title)) || "untitled";
  const slug = await uniqueSlug(baseSlug);

  const post = await prisma.blogPost.create({
    data: {
      title: data.title,
      slug,
      excerpt: data.excerpt,
      content: data.content,
      category: data.category ?? null,
      coverImage: data.coverImage ?? null,
      published: data.published ?? false,
      publishedAt: data.published ? new Date() : null,
    },
  });
  return NextResponse.json(post);
}

async function uniqueSlug(base: string) {
  let slug = base;
  let i = 2;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (!existing) return slug;
    slug = `${base}-${i++}`;
  }
}
