import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { putObject, resolveImageUrl } from "@/lib/r2";

const REQUIRED_ENV = [
  "R2_ACCOUNT_ID",
  "R2_ACCESS_KEY_ID",
  "R2_SECRET_ACCESS_KEY",
  "R2_BUCKET_NAME",
] as const;

const ALLOWED_PREFIXES = new Set(["blog", "team", "services"]);
const MAX_BYTES = 10 * 1024 * 1024;
const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const missing = REQUIRED_ENV.filter((k) => !process.env[k]);
  if (missing.length) {
    return NextResponse.json(
      { error: `R2 not configured — missing env: ${missing.join(", ")}` },
      { status: 500 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { error: "Expected multipart/form-data body" },
      { status: 400 }
    );
  }

  const file = form.get("file");
  const prefix = String(form.get("prefix") ?? "").trim();

  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: "Missing 'file' field" }, { status: 400 });
  }
  if (!ALLOWED_PREFIXES.has(prefix)) {
    return NextResponse.json(
      { error: `Invalid 'prefix' — must be one of ${Array.from(ALLOWED_PREFIXES).join(", ")}` },
      { status: 400 }
    );
  }
  const contentType = file.type;
  const ext = EXT_BY_TYPE[contentType];
  if (!ext) {
    return NextResponse.json(
      { error: `Unsupported image type: ${contentType || "unknown"}` },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `File too large (${file.size} bytes). Max ${MAX_BYTES} bytes.` },
      { status: 400 }
    );
  }

  const key = `${prefix}/${crypto.randomUUID()}.${ext}`;

  try {
    const buf = Buffer.from(await file.arrayBuffer());
    await putObject(key, buf, contentType);
    const publicUrl = await resolveImageUrl(key);
    return NextResponse.json({ key, publicUrl });
  } catch (e: any) {
    return NextResponse.json(
      { error: `Upload to R2 failed: ${e?.message ?? "unknown error"}` },
      { status: 500 }
    );
  }
}
