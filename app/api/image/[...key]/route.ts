import { NextRequest, NextResponse } from "next/server";
import { getObject } from "@/lib/r2";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { key: string[] } }
) {
  const key = params.key.map(decodeURIComponent).join("/");
  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }

  try {
    const obj = await getObject(key);
    const body = obj.Body;
    if (!body) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return new NextResponse(body.transformToWebStream(), {
      status: 200,
      headers: {
        "Content-Type": obj.ContentType ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
        ...(obj.ContentLength
          ? { "Content-Length": String(obj.ContentLength) }
          : {}),
      },
    });
  } catch (e: any) {
    const status = e?.$metadata?.httpStatusCode === 404 ? 404 : 500;
    return NextResponse.json(
      { error: e?.message ?? "Failed to fetch image" },
      { status }
    );
  }
}
