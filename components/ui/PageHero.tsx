"use client";

import { motion } from "framer-motion";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: Props) {
  return (
    <section className="relative overflow-hidden bg-brand-gradient text-white">
      <div
        className="absolute inset-0 opacity-[0.08]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <motion.div
        aria-hidden
        className="absolute -top-32 -right-20 h-[380px] w-[380px] rounded-full bg-clinic-red/25 blur-3xl"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container-tight relative py-20 sm:py-24 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 ring-1 ring-white/20">
              {eyebrow}
            </span>
          )}
          <h1 className="heading-xl mt-6 text-white text-balance">{title}</h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg text-white/80 text-pretty">
              {description}
            </p>
          )}
        </motion.div>
      </div>
      <svg viewBox="0 0 1440 60" className="block w-full text-background" aria-hidden preserveAspectRatio="none">
        <path fill="currentColor" d="M0,30 C320,60 720,0 1440,30 L1440,60 L0,60 Z" />
      </svg>
    </section>
  );
}
