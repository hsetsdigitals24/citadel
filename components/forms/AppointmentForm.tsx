"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { whatsappLink } from "@/lib/utils";

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  reason: z.string().min(5, "Tell us briefly why you'd like to visit"),
  contactMethod: z.enum(["email", "whatsapp", "phone"]),
});

type FormValues = z.infer<typeof schema>;

const fieldCls =
  "w-full rounded-xl border border-brand-100 bg-white px-4 py-3 text-sm text-foreground placeholder:text-ink-subtle focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition";

const labelCls = "text-sm font-medium text-foreground";

export function AppointmentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { contactMethod: "whatsapp" },
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    setStatus("idle");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      reset();
      if (data.contactMethod === "whatsapp") {
        window.open(whatsappLink, "_blank");
      }
    } catch (e: any) {
      setStatus("error");
      setErrorMsg(e.message);
    }
  };

  const contactMethod = watch("contactMethod");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.fullName?.message}>
          <input {...register("fullName")} className={fieldCls} placeholder="Jane Doe" />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input {...register("phone")} className={fieldCls} placeholder="08123456789" />
        </Field>
      </div>

      <Field label="Email" error={errors.email?.message}>
        <input
          type="email"
          {...register("email")}
          className={fieldCls}
          placeholder="you@example.com"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Preferred date" error={errors.preferredDate?.message}>
          <input type="date" {...register("preferredDate")} className={fieldCls} />
        </Field>
        <Field label="Preferred time" error={errors.preferredTime?.message}>
          <input type="time" {...register("preferredTime")} className={fieldCls} />
        </Field>
      </div>

      <Field label="Reason for visit" error={errors.reason?.message}>
        <textarea
          rows={4}
          {...register("reason")}
          className={fieldCls}
          placeholder="Tell us what brings you in (e.g., braces consult, cleaning, tooth pain)…"
        />
      </Field>

      <div>
        <span className={labelCls}>Preferred contact method</span>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {(["whatsapp", "email", "phone"] as const).map((m) => (
            <label
              key={m}
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-3 text-sm font-medium capitalize transition ${
                contactMethod === m
                  ? "border-brand-600 bg-brand-50 text-brand-700"
                  : "border-brand-100 bg-white text-ink-muted hover:bg-surface"
              }`}
            >
              <input
                type="radio"
                value={m}
                {...register("contactMethod")}
                className="sr-only"
              />
              {m}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-full bg-clinic-red px-6 py-3.5 text-base font-semibold text-white shadow-soft transition hover:bg-clinic-red-hover hover:shadow-glow disabled:opacity-70"
      >
        {isSubmitting ? "Sending…" : "Request appointment"}
      </button>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 rounded-xl bg-green-50 p-4 text-sm text-green-800 ring-1 ring-green-100"
          >
            <CheckCircleIcon className="h-5 w-5 mt-0.5 shrink-0" />
            <span>
              Thank you — we have received your request and will be in touch soon during working hours.
            </span>
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-800 ring-1 ring-red-100"
          >
            <ExclamationTriangleIcon className="h-5 w-5 mt-0.5 shrink-0" />
            <span>{errorMsg ?? "Something went wrong. Please try again."}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && (
        <span className="mt-1 block text-xs text-red-600">{error}</span>
      )}
    </label>
  );
}
