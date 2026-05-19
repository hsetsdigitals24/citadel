import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const items = await prisma.teamMember.findMany({
      orderBy: [{ order: "asc" }, { name: "asc" }],
    });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json([]);
  }
}

const createSchema = z.object({
  name: z.string().min(2).max(120),
  qualifications: z.string().min(1).max(300),
  specialization: z.string().min(1).max(200),
  experience: z.string().min(1).max(120),
  bio: z.string().min(2).max(3000),
  photo: z.string().optional().nullable(),
  order: z.number().int().optional(),
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
  const member = await prisma.teamMember.create({
    data: {
      name: parsed.data.name,
      qualifications: parsed.data.qualifications,
      specialization: parsed.data.specialization,
      experience: parsed.data.experience,
      bio: parsed.data.bio,
      photo: parsed.data.photo ?? null,
      order: parsed.data.order ?? 0,
    },
  });
  return NextResponse.json(member);
}
