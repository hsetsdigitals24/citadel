"use client";

import { motion } from "framer-motion";
import {
  AcademicCapIcon,
  ShieldCheckIcon,
  GlobeAmericasIcon,
  UserGroupIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const items = [
  { Icon: AcademicCapIcon, label: "BDS Qualified" },
  { Icon: GlobeAmericasIcon, label: "Implantology · USA & Canada" },
  { Icon: ShieldCheckIcon, label: "Sterile, Hospital-Grade" },
  { Icon: UserGroupIcon, label: "3,500+ Patients" },
  { Icon: StarIcon, label: "10+ Years Practising" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-brand-100 bg-surface">
      <div className="container-tight py-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-ink-muted">
          {items.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="inline-flex items-center gap-2"
            >
              <it.Icon className="h-5 w-5 text-brand-600" />
              <span>{it.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
