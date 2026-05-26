import { StarIcon } from "@heroicons/react/24/solid";
import { buildMeta } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CTABanner } from "@/components/home/CTABanner";
import { getTestimonials } from "@/lib/queries";

export const metadata = buildMeta(
  "Testimonials",
  "What patients are saying about Citadel Global Dental Clinic & Best Braces Centre in Ilorin.",
  { path: "/testimonials" }
);

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  return (
    <>
      <PageHero
        eyebrow="Patient stories"
        title="Smiles that speak for themselves."
        description="Real words from real patients — across braces, implants, whitening and family dentistry."
      />

      <section className="section">
        <div className="container-tight">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={(i % 3) * 0.06}>
                <figure className="card flex h-full flex-col p-6">
                  <div className="flex items-center gap-1 text-clinic-red">
                    {Array.from({ length: t.rating ?? 5 }).map((_, k) => (
                      <StarIcon key={k} className="h-4 w-4" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-base text-foreground leading-relaxed text-pretty">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 text-sm font-semibold text-ink-muted">
                    — {t.patientName}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
