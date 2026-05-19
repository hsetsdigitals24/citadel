"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

type Service = {
  id: string;
  slug: string;
  name: string;
  description: string;
};

const icons = ["✦", "◐", "◇", "✚"];

export function ServicesHighlight({ services }: { services: Service[] }) {
  const shown = services.slice(0, 4);
  return (
    <section className="section">
      <div className="container-tight">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Our services"
            title="Care for every smile, at every age."
            description="From routine cleanings to advanced implantology — delivered with hospital-grade precision and a gentle touch."
          />
          <Reveal delay={0.1}>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              View all services
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={`/services/${s.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-black/[0.04] shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-50 transition-all duration-500 group-hover:scale-150"
                />
                <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-lg text-white shadow-soft">
                  {icons[i % icons.length]}
                </span>
                <h3 className="relative mt-5 text-lg font-semibold text-foreground">
                  {s.name}
                </h3>
                <p className="relative mt-2 text-sm text-ink-muted line-clamp-3">
                  {s.description}
                </p>
                <span className="relative mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                  Learn more
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
