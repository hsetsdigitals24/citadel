import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { getUploadUrl } from "@/lib/r2";

const schema = z.object({
  key: z.string().min(3).max(200),
  contentType: z.string().regex(/^image\//),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const url = await getUploadUrl(parsed.data.key, parsed.data.contentType);
    return NextResponse.json({ url });
  } catch {
    return NextResponse.json(
      { error: "Storage not configured" },
      { status: 500 }
    );
  }
}
