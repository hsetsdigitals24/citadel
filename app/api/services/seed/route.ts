import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { fallbackServices } from "@/lib/content";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let inserted = 0;
  for (const s of fallbackServices) {
    const existing = await prisma.service.findUnique({ where: { slug: s.slug } });
    if (existing) continue;
    await prisma.service.create({
      data: {
        name: s.name,
        slug: s.slug,
        description: s.description,
        benefits: s.benefits,
        steps: s.steps,
        order: s.order,
        published: true,
      },
    });
    inserted++;
  }

  const total = await prisma.service.count();
  return NextResponse.json({ inserted, total });
}
