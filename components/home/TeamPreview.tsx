"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Reveal } from "@/components/ui/Reveal";

type Member = {
  id: string;
  name: string;
  qualifications: string;
  specialization: string;
  experience: string;
  bio: string;
  photoUrl?: string | null;
};

export function TeamPreview({ member }: { member: Member }) {
  return (
    <section className="section">
      <div className="container-tight grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-brand-gradient"
            >
              {member.photoUrl ? (
                <Image
                  src={member.photoUrl}
                  alt={member.name}
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-end justify-center pb-10 text-white/60">
                  <svg viewBox="0 0 200 200" className="h-2/3 w-2/3" fill="none">
                    <circle cx="100" cy="70" r="38" fill="rgba(255,255,255,0.15)" />
                    <path
                      d="M30 200 C 30 140 60 110 100 110 C 140 110 170 140 170 200 Z"
                      fill="rgba(255,255,255,0.15)"
                    />
                  </svg>
                </div>
              )}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.18), transparent 60%)",
                }}
                aria-hidden
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="absolute -bottom-6 -right-4 sm:-right-8 w-64 card p-5"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-700">
                <CheckBadgeIcon className="h-5 w-5" />
                Certified Implantologist
              </div>
              <div className="mt-2 text-sm text-ink-muted">
                Trained in the USA & Canada, practising in Ilorin since 2014.
              </div>
            </motion.div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-6 bg-brand-600" />
              Meet your dentist
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="heading-lg mt-4 text-balance">{member.name}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-3 flex flex-wrap gap-2">
              {[member.qualifications, member.specialization, member.experience].map(
                (t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-100"
                  >
                    {t}
                  </span>
                )
              )}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 lede text-pretty">{member.bio}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              href="/team"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800 group"
            >
              Meet the whole team
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
