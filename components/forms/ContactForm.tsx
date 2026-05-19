"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(5),
});

type V = z.infer<typeof schema>;

const fieldCls =
  "w-full rounded-xl border border-brand-100 bg-white px-4 py-3 text-sm text-foreground placeholder:text-ink-subtle focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<V>({ resolver: zodResolver(schema) });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const onSubmit = async (data: V) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-foreground">Name</span>
          <input {...register("name")} className={`${fieldCls} mt-1.5`} placeholder="Your name" />
          {errors.name && <span className="text-xs text-red-600 mt-1 block">Required</span>}
        </label>
        <label className="block">
          <span className="text-sm font-medium text-foreground">Phone (optional)</span>
          <input {...register("phone")} className={`${fieldCls} mt-1.5`} placeholder="08123456789" />
        </label>
      </div>
      <label className="block">
        <span className="text-sm font-medium text-foreground">Email</span>
        <input type="email" {...register("email")} className={`${fieldCls} mt-1.5`} placeholder="you@example.com" />
        {errors.email && <span className="text-xs text-red-600 mt-1 block">Valid email required</span>}
      </label>
      <label className="block">
        <span className="text-sm font-medium text-foreground">Message</span>
        <textarea rows={5} {...register("message")} className={`${fieldCls} mt-1.5`} placeholder="How can we help?" />
        {errors.message && <span className="text-xs text-red-600 mt-1 block">Required</span>}
      </label>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 hover:shadow-glow disabled:opacity-70"
      >
        {isSubmitting ? "Sending…" : "Send message"}
      </button>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 rounded-xl bg-green-50 p-4 text-sm text-green-800 ring-1 ring-green-100"
          >
            <CheckCircleIcon className="h-5 w-5 mt-0.5 shrink-0" />
            Thanks — we will respond within working hours.
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-800 ring-1 ring-red-100"
          >
            <ExclamationTriangleIcon className="h-5 w-5 mt-0.5 shrink-0" />
            Something went wrong. Please try again.
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
