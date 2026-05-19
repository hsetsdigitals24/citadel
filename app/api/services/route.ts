import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function GET() {
  const session = await getServerSession(authOptions);
  try {
    const items = await prisma.service.findMany({
      where: session ? {} : { published: true },
      orderBy: [{ order: "asc" }, { name: "asc" }],
    });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json([]);
  }
}

const stepSchema = z.object({
  title: z.string().min(1),
  detail: z.string().min(1),
});

const createSchema = z.object({
  name: z.string().min(2).max(120),
  slug: z.string().optional(),
  description: z.string().min(2).max(2000),
  benefits: z.array(z.string()).default([]),
  steps: z.array(stepSchema).default([]),
  image: z.string().optional().nullable(),
  order: z.number().int().optional(),
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
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const data = parsed.data;
  const baseSlug =
    (data.slug && data.slug.length ? data.slug : slugify(data.name)) || "service";
  const slug = await uniqueSlug(baseSlug);

  const service = await prisma.service.create({
    data: {
      name: data.name,
      slug,
      description: data.description,
      benefits: data.benefits,
      steps: data.steps,
      image: data.image ?? null,
      order: data.order ?? 0,
      published: data.published ?? true,
    },
  });
  return NextResponse.json(service);
}

async function uniqueSlug(base: string) {
  let slug = base;
  let i = 2;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await prisma.service.findUnique({ where: { slug } });
    if (!existing) return slug;
    slug = `${base}-${i++}`;
  }
}
