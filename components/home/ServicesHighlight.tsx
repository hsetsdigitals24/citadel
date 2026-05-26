"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import {
  SparklesIcon,
  FaceSmileIcon,
  BeakerIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

type Service = {
  id: string;
  slug: string;
  name: string;
  description: string;
};

const accents = [
  { Icon: SparklesIcon, image: "/images/service-braces.jpg", tint: "from-brand-600/80 to-brand-900/80" },
  { Icon: FaceSmileIcon, image: "/images/service-implants.jpg", tint: "from-clinic-red/80 to-brand-900/80" },
  { Icon: BeakerIcon, image: "/images/service-whitening.jpg", tint: "from-brand-500/80 to-brand-800/80" },
  { Icon: ShieldCheckIcon, image: "/images/service-cleaning.jpg", tint: "from-brand-700/80 to-brand-900/80" },
];

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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((s, i) => {
            const a = accents[i % accents.length];
            return (
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
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.05] shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow hover:ring-brand-200"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={a.image}
                      alt={s.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${a.tint} mix-blend-multiply opacity-70`} />
                    <span className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 text-brand-700 shadow-soft backdrop-blur">
                      <a.Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold text-foreground">
                      {s.name}
                    </h3>
                    <p className="mt-2 text-sm text-ink-muted line-clamp-3 leading-relaxed">
                      {s.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                      Learn more
                      <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
