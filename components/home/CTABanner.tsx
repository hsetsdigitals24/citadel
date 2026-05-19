"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/utils";

export function CTABanner() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-24">
      <div className="container-tight">
        <div className="relative overflow-hidden rounded-3xl bg-brand-gradient px-8 py-14 sm:px-14 sm:py-20 text-white">
          <motion.div
            aria-hidden
            className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-clinic-red/30 blur-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative max-w-2xl">
            <Reveal>
              <h2 className="heading-lg text-white text-balance">
                Ready to smile with confidence?
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-4 text-white/80 text-lg text-pretty">
                Book your appointment today, or call us directly — we will get back to you within working hours.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/appointments"
                  className="inline-flex items-center justify-center rounded-full bg-clinic-red px-6 py-3.5 text-base font-semibold text-white shadow-glow transition hover:bg-clinic-red-hover"
                >
                  Book an appointment
                </Link>
                <a
                  href={`tel:${SITE.phone1}`}
                  className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-3.5 text-base font-semibold text-white ring-1 ring-inset ring-white/20 backdrop-blur transition hover:bg-white/20"
                >
                  Call {SITE.phone1}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
