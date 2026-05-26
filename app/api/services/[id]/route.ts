import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";

const stepSchema = z.object({
  title: z.string().min(1),
  detail: z.string().min(1),
});

const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

const updateSchema = z.object({
  name: z.string().min(2).max(120).optional(),
  slug: z.string().optional(),
  description: z.string().min(2).max(2000).optional(),
  benefits: z.array(z.string()).optional(),
  steps: z.array(stepSchema).optional(),
  faqs: z.array(faqSchema).optional(),
  image: z.string().optional().nullable(),
  order: z.number().int().optional(),
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
  const service = await prisma.service.findUnique({ where: { id: params.id } });
  if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(service);
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
  const existing = await prisma.service.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const data = parsed.data;
  let slug = existing.slug;
  if (data.slug && data.slug !== existing.slug) {
    slug = await uniqueSlug(slugify(data.slug), params.id);
  }

  const service = await prisma.service.update({
    where: { id: params.id },
    data: {
      ...(data.name !== undefined ? { name: data.name } : {}),
      slug,
      ...(data.description !== undefined ? { description: data.description } : {}),
      ...(data.benefits !== undefined ? { benefits: data.benefits } : {}),
      ...(data.steps !== undefined ? { steps: data.steps } : {}),
      ...(data.faqs !== undefined ? { faqs: data.faqs } : {}),
      ...(data.image !== undefined ? { image: data.image } : {}),
      ...(data.order !== undefined ? { order: data.order } : {}),
      ...(data.published !== undefined ? { published: data.published } : {}),
    },
  });
  return NextResponse.json(service);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await prisma.service.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}

async function uniqueSlug(base: string, ignoreId: string) {
  let slug = base;
  let i = 2;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await prisma.service.findUnique({ where: { slug } });
    if (!existing || existing.id === ignoreId) return slug;
    slug = `${base}-${i++}`;
  }
}
