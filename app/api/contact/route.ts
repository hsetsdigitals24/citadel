import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, verifyRecaptcha } from "@/lib/recaptcha";
import { sendContactEnquiry } from "@/lib/email";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(5).max(2000),
  recaptchaToken: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "anonymous";
  if (!rateLimit(`contact:${ip}`, 10)) {
    return NextResponse.json(
      { error: "Too many requests." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  if (process.env.RECAPTCHA_SECRET_KEY) {
    const ok = await verifyRecaptcha(parsed.data.recaptchaToken);
    if (!ok) {
      return NextResponse.json({ error: "reCAPTCHA failed." }, { status: 400 });
    }
  }

  try {
    await sendContactEnquiry(parsed.data);
  } catch {
    // ignore mailer errors in dev
  }
  return NextResponse.json({ success: true });
}
