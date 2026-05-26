import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

const updateSchema = z.object({
  name: z.string().min(2).max(120).optional(),
  qualifications: z.string().min(1).max(300).optional(),
  specialization: z.string().min(1).max(200).optional(),
  experience: z.string().min(1).max(120).optional(),
  bio: z.string().min(2).max(3000).optional(),
  photo: z.string().optional().nullable(),
  order: z.number().int().optional(),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const m = await prisma.teamMember.findUnique({ where: { id: params.id } });
  if (!m) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(m);
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
  const m = await prisma.teamMember.update({
    where: { id: params.id },
    data: parsed.data,
  });
  return NextResponse.json(m);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await prisma.teamMember.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
