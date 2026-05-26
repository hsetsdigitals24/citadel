"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import { whatsappLink } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed background photo */}
      <Image
        src="/images/hero-dentist.jpg"
        alt="Dr. Chris Ejakpome and the Citadel Global Dental Clinic team caring for a patient in Ilorin."
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      {/* Dark overlay — slightly heavier on the left for text legibility */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/55 to-black/35" />

      <div className="container-tight relative pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32">
        <div className="flex">

          {/* Copy + CTAs — constrained width so text doesn't stretch over the full image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl text-white"
          >
            {/* Eyebrow pill */}
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.09] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/75 backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              Ilorin&apos;s Premier Dental &amp; Braces Centre
            </motion.span>

            {/* Headline — patient outcome focused */}
            <h1 className="heading-xl mt-6 text-white text-balance">
              Get the smile{" "}
              <span className="text-[#599fe7]">you deserve</span>
              {" "}— from Ilorin&apos;s most certified dental team.
            </h1>

            {/* Body copy */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-6 max-w-xl text-lg sm:text-xl text-white/70 leading-relaxed text-pretty"
            >
              Led by{" "}
              <span className="font-semibold text-white">Dr. Chris Ejakpome</span>
              {" "}— BDS, Implantology certified (USA &amp; Canada) — we combine global
              expertise with genuine care. Braces, implants, whitening, and family
              dentistry, all under one roof in Ilorin.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3"
            >
              {/* Primary: Book appointment */}
              <Link
                href="/appointments"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-clinic-red px-8 py-4 text-base font-semibold text-white shadow-lg shadow-clinic-red/30 ring-2 ring-clinic-red/40 transition hover:bg-clinic-red-hover hover:shadow-clinic-red/40"
              >
                Book an appointment
                <span aria-hidden className="transition group-hover:translate-x-1">→</span>
              </Link>

              {/* Secondary: WhatsApp */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/[0.2] bg-white/[0.1] px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/[0.18] hover:border-white/[0.32]"
              >
                {/* WhatsApp SVG icon */}
                <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0 fill-[#25D366]" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/60"
            >
              <span className="inline-flex items-center gap-1.5">
                <CheckBadgeIcon className="h-4 w-4 text-white/80" />
                Internationally certified
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheckIcon className="h-4 w-4 text-white/80" />
                Hospital-grade sterile clinic
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                Open daily · 8 AM – 4 PM
              </span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
