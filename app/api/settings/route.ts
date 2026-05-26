import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

const schema = z.object({
  workingHours: z.string().min(1).max(200),
  facebookUrl: z.string().max(300).default(""),
  instagramUrl: z.string().max(300).default(""),
});

export async function GET() {
  try {
    const settings =
      (await prisma.siteSettings.findUnique({ where: { id: "singleton" } })) ??
      (await prisma.siteSettings.create({ data: { id: "singleton" } }));
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json(null);
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const settings = await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: parsed.data,
    create: { id: "singleton", ...parsed.data },
  });
  return NextResponse.json(settings);
}
