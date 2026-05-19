"use client";

import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  AcademicCapIcon,
  HeartIcon,
  BeakerIcon,
  ClockIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyChooseUs } from "@/lib/content";

const icons = [
  AcademicCapIcon,
  ShieldCheckIcon,
  HeartIcon,
  BeakerIcon,
  ClockIcon,
  UserGroupIcon,
];

export function WhyChooseUs() {
  return (
    <section className="section bg-surface">
      <div className="container-tight">
        <SectionHeading
          align="center"
          eyebrow="Why patients choose us"
          title="A clinic built on discipline, hard work and dedication."
          description="We combine globally certified expertise with the warmth of a family-run practice — so every visit feels safe, simple and human."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((w, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group rounded-2xl bg-white p-6 ring-1 ring-black/[0.04] transition hover:shadow-soft"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold text-foreground">
                  {w.title}
                </h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                  {w.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
