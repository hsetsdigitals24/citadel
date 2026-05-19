import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";

const updateSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  slug: z.string().optional(),
  excerpt: z.string().min(2).max(400).optional(),
  content: z.string().min(2).optional(),
  category: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  published: z.boolean().optional(),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const post = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const existing = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const data = parsed.data;
  let slug = existing.slug;
  if (data.slug && data.slug !== existing.slug) {
    slug = await uniqueSlug(slugify(data.slug), params.id);
  } else if (data.title && data.title !== existing.title && !data.slug) {
    // leave slug alone unless explicitly changed
  }

  const willPublish = data.published === true;
  const wasPublished = existing.published;

  const post = await prisma.blogPost.update({
    where: { id: params.id },
    data: {
      ...(data.title !== undefined ? { title: data.title } : {}),
      slug,
      ...(data.excerpt !== undefined ? { excerpt: data.excerpt } : {}),
      ...(data.content !== undefined ? { content: data.content } : {}),
      ...(data.category !== undefined ? { category: data.category } : {}),
      ...(data.coverImage !== undefined ? { coverImage: data.coverImage } : {}),
      ...(data.published !== undefined ? { published: data.published } : {}),
      publishedAt:
        willPublish && !wasPublished
          ? new Date()
          : data.published === false
          ? null
          : existing.publishedAt,
    },
  });
  return NextResponse.json(post);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await prisma.blogPost.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}

async function uniqueSlug(base: string, ignoreId: string) {
  let slug = base;
  let i = 2;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (!existing || existing.id === ignoreId) return slug;
    slug = `${base}-${i++}`;
  }
}
