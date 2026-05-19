import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { verifyRecaptcha, rateLimit } from "@/lib/recaptcha";
import {
  sendAppointmentNotification,
  sendAppointmentConfirmation,
} from "@/lib/email";

const schema = z.object({
  fullName: z.string().min(2).max(120),
  phone: z.string().min(7).max(30),
  email: z.string().email(),
  preferredDate: z.string().optional().nullable(),
  preferredTime: z.string().optional().nullable(),
  reason: z.string().min(5).max(1000),
  contactMethod: z.enum(["email", "whatsapp", "phone"]),
  recaptchaToken: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "anonymous";
  if (!rateLimit(`appt:${ip}`, 5)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }
  const data = parsed.data;

  if (process.env.RECAPTCHA_SECRET_KEY) {
    const ok = await verifyRecaptcha(data.recaptchaToken);
    if (!ok) {
      return NextResponse.json(
        { error: "Could not verify reCAPTCHA. Please try again." },
        { status: 400 }
      );
    }
  }

  try {
    await prisma.appointment.create({
      data: {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        preferredDate: data.preferredDate
          ? new Date(data.preferredDate)
          : null,
        preferredTime: data.preferredTime ?? null,
        reason: data.reason,
        contactMethod: data.contactMethod,
      },
    });
  } catch {
    // If the DB is not yet provisioned, still try to email so requests aren't lost.
  }

  try {
    await sendAppointmentNotification(data);
    await sendAppointmentConfirmation(data);
  } catch {
    // Email failures should not block the user-facing success.
  }

  return NextResponse.json({ success: true });
}
