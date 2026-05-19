"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon } from "@heroicons/react/24/solid";
import { SectionHeading } from "@/components/ui/SectionHeading";

type T = { id: string; patientName: string; quote: string; rating: number | null };

export function TestimonialsCarousel({ testimonials }: { testimonials: T[] }) {
  const [i, setI] = useState(0);
  const list = testimonials.length ? testimonials : [];

  useEffect(() => {
    if (list.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % list.length), 6500);
    return () => clearInterval(t);
  }, [list.length]);

  if (!list.length) return null;
  const t = list[i];

  return (
    <section className="section">
      <div className="container-tight">
        <SectionHeading
          align="center"
          eyebrow="Patient stories"
          title="Trusted by families across Kwara."
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <div className="relative min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={t.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl bg-white p-8 sm:p-10 ring-1 ring-black/[0.04] shadow-soft"
              >
                <div className="flex items-center gap-1 text-clinic-red">
                  {Array.from({ length: t.rating ?? 5 }).map((_, k) => (
                    <StarIcon key={k} className="h-4 w-4" />
                  ))}
                </div>
                <blockquote className="mt-5 text-xl sm:text-2xl font-medium text-foreground leading-snug text-balance">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm font-semibold text-ink-muted">
                  — {t.patientName}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {list.length > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {list.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Show testimonial ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === i ? "w-8 bg-brand-600" : "w-2 bg-brand-200"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
