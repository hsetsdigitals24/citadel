"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  SparklesIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { SITE } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-brand-gradient" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
        aria-hidden
      />
      <motion.div
        aria-hidden
        className="absolute -top-32 -right-32 -z-10 h-[480px] w-[480px] rounded-full bg-clinic-red/30 blur-3xl"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-32 -left-24 -z-10 h-[420px] w-[420px] rounded-full bg-brand-400/30 blur-3xl"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-tight relative pt-16 pb-24 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl text-white"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 ring-1 ring-white/20 backdrop-blur">
            <SparklesIcon className="h-3.5 w-3.5" />
            Home of the Best Braces Centre · Ilorin
          </span>

          <h1 className="heading-xl mt-6 text-white text-balance">
            World-class dentistry,{" "}
            <span className="relative inline-block">
              <span className="relative z-10">delivered with warmth.</span>
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 bottom-1 -z-0 h-3 origin-left rounded-full bg-clinic-red/70"
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 max-w-2xl text-lg text-white/80 leading-relaxed text-pretty"
          >
            Braces, implants, whitening and family dentistry — led by Dr. Chris
            Ejakpome (BDS, Implantology USA & Canada). Modern care, global
            standards, right here in Ilorin.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/appointments"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-clinic-red px-6 py-3.5 text-base font-semibold text-white shadow-glow transition hover:bg-clinic-red-hover"
            >
              Book an appointment
            </Link>
            <a
              href={`tel:${SITE.phone1}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3.5 text-base font-semibold text-white ring-1 ring-inset ring-white/20 backdrop-blur transition hover:bg-white/20"
            >
              <PhoneIcon className="h-4 w-4" />
              Call {SITE.phone1}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 max-w-xl"
          >
            <Stat label="Years of practice" value="10+" />
            <Stat label="Patients cared for" value="3,500+" />
            <Stat label="Open every day" value="8am – 4pm" />
          </motion.div>
        </motion.div>

        {/* Floating card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none hidden lg:block absolute right-8 top-24 w-80"
        >
          <div className="pointer-events-auto card p-5 bg-white/95 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <ShieldCheckIcon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  Certified expertise
                </div>
                <div className="text-xs text-ink-muted">
                  BDS · Implantology USA & Canada
                </div>
              </div>
            </div>
            <div className="hairline my-4" />
            <p className="text-sm text-ink-muted leading-relaxed">
              Our clinic is led by Dr. Chris Ejakpome with international
              certification and over a decade of clinical practice.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="pointer-events-auto card mt-4 ml-12 p-4 bg-white/95 backdrop-blur w-64"
          >
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-green-500" />
              <div>
                <div className="text-sm font-semibold text-foreground">
                  Open now
                </div>
                <div className="text-xs text-ink-muted">
                  Walk-ins welcome · 8:00 AM – 4:00 PM
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Wave separator */}
      <svg
        viewBox="0 0 1440 80"
        className="block w-full text-background"
        aria-hidden
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,40 C320,80 720,0 1440,40 L1440,80 L0,80 Z"
        />
      </svg>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="text-xs uppercase tracking-[0.14em] text-white/60">
        {label}
      </div>
    </div>
  );
}
