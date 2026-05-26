import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const items = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json([]);
  }
}

const createSchema = z.object({
  patientName: z.string().min(2).max(120),
  quote: z.string().min(5).max(2000),
  rating: z.number().int().min(1).max(5).optional().nullable(),
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
  const testimonial = await prisma.testimonial.create({
    data: {
      patientName: data.patientName,
      quote: data.quote,
      rating: data.rating ?? null,
      published: data.published ?? false,
    },
  });
  return NextResponse.json(testimonial);
}
