"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const photos = [
  { src: "/images/clinic-reception.jpg", alt: "Citadel Global Dental Clinic reception", className: "row-span-2 aspect-[3/4]" },
  { src: "/images/clinic-treatment.jpg", alt: "Modern dental treatment room", className: "aspect-[4/3]" },
  { src: "/images/clinic-team.jpg", alt: "Our care team", className: "aspect-[4/3]" },
  { src: "/images/clinic-equipment.jpg", alt: "Advanced dental equipment", className: "aspect-[4/3]" },
  { src: "/images/clinic-smile.jpg", alt: "A happy patient with a new smile", className: "aspect-[4/3]" },
];

export function ClinicGallery() {
  return (
    <section className="section bg-surface">
      <div className="container-tight">
        <SectionHeading
          align="center"
          eyebrow="Inside our clinic"
          title="A calm, modern space designed for your comfort."
          description="Step into a hospital-grade environment built for precision, safety and quiet reassurance."
        />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:grid-rows-2">
          {photos.map((p, i) => (
            <motion.div
              key={p.src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-soft ${p.className}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
