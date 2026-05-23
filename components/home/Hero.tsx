"use client";

// import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  SparklesIcon,
  PhoneIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/solid";
import { SITE } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/hero-dentist.jpg')" }}>
      {/* Background */}
      <div className="absolute inset-0 -z-100 bg-black/40" />
      <div
        className="absolute inset-0 -z-100 opacity-[0.1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
        aria-hidden
      />
      <motion.div
        aria-hidden
        className="absolute -top-40 -right-40 -z-10 h-[520px] w-[520px] rounded-full bg-clinic-red/25 blur-3xl"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-40 -left-32 -z-10 h-[460px] w-[460px] rounded-full bg-brand-400/25 blur-3xl"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-tight relative pt-14 pb-20 sm:pt-20 sm:pb-28 lg:pt-28 lg:pb-36">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* LEFT — Copy + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 text-white"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/20 backdrop-blur">
              <SparklesIcon className="h-3.5 w-3.5" />
              Home of the Best Braces Centre · Ilorin
            </span>

            <h1 className="heading-xl mt-6 text-white text-balance">
              Confident smiles,{" "}
              <span className="relative inline-block">
                <span className="relative z-10">built on world-class care.</span>
                {/* <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-0 bottom-1 -z-0 h-3 origin-left rounded-full bg-clinic-red/70"
                /> */}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-6 max-w-2xl text-lg sm:text-xl text-white/85 leading-relaxed text-pretty"
            >
              Braces, implants, whitening and family dentistry — led by Dr. Chris
              Ejakpome (BDS, Implantology USA &amp; Canada). Modern care, global
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
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-clinic-red px-7 py-4 text-base font-semibold text-white shadow-glow ring-2 ring-clinic-red/30 transition hover:bg-clinic-red-hover hover:ring-clinic-red/50"
              >
                Book an appointment
                <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
              </Link>
              <a
                href={`tel:${SITE.phone1}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-brand-700 shadow-soft transition hover:bg-white/90"
              >
                <PhoneIcon className="h-4 w-4" />
                Call {SITE.phone1}
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/80"
            >
              <span className="inline-flex items-center gap-1.5">
                <CheckBadgeIcon className="h-4 w-4 text-white" />
                Certified · BDS, Implantology
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheckIcon className="h-4 w-4 text-white" />
                Sterile, hospital-grade
              </span>
              {/* <span className="inline-flex items-center gap-1.5">
                <StarIcon className="h-4 w-4 text-amber-300" />
                <StarIcon className="-ml-2 h-4 w-4 text-amber-300" />
                <StarIcon className="-ml-2 h-4 w-4 text-amber-300" />
                <StarIcon className="-ml-2 h-4 w-4 text-amber-300" />
                <StarIcon className="-ml-2 h-4 w-4 text-amber-300" />
                3,500+ smiles cared for
              </span> */}
            </motion.div>
          </motion.div>

          {/* RIGHT — Image */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:col-span-5"
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] shadow-glow ring-1 ring-white/20">
              <Image
                src="/images/hero-dentist.jpg"
                alt="Dr. Chris Ejakpome with a smiling patient at Citadel Global Dental Clinic"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 480px"
                className="object-cover"
              />
            
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-900/50 to-transparent" />
            </div>

           
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute -left-4 bottom-8 hidden sm:flex card items-center gap-3 bg-white/95 backdrop-blur p-4 pr-5"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-green-500/70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-foreground">Open today</div>
                <div className="text-xs text-ink-muted">8:00 AM – 4:00 PM</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="absolute -right-2 top-6 hidden md:flex card items-center gap-3 bg-white/95 backdrop-blur p-4 pr-5"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <ShieldCheckIcon className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-foreground">Internationally certified</div>
                <div className="text-xs text-ink-muted">Implantology · USA &amp; Canada</div>
              </div>
            </motion.div>
          </motion.div> */}
        </div>
      </div>

      {/* Wave separator */}
      {/* <svg
        viewBox="0 0 1440 80"
        className="block w-full text-background absolute bottom-0 left-0 -z-10 h-20"
        aria-hidden
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,40 C320,80 720,0 1440,40 L1440,80 L0,80 Z"
        />
      </svg> */}
    </section>
  );
}
