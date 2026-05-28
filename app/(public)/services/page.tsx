import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { buildMeta } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CTABanner } from "@/components/home/CTABanner";
import { getServices } from "@/lib/queries";
import { resolveImageUrl } from "@/lib/r2";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";

export const metadata = buildMeta(
  "Dental Services",
  "Braces, aligners, veneers, implants, cosmetic dental care, teeth whitening, family dentistry, grills, and more — in Ilorin, delivered with international standards of care.",
  { path: "/services" }
);

export default async function ServicesPage() {
  const services = await getServices();
  const items = await Promise.all(
    services.map(async (s: any) => ({
      ...s,
      imageUrl: await resolveImageUrl(s.image),
    }))
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />
      <PageHero
        eyebrow="Our services"
        title="Comprehensive dental care, under one roof."
        description="Each treatment is delivered with the same global standards — from a routine clean to advanced implant placement."
      />

      <section className="section">
        <div className="container-tight">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 0.06}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.04] shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
                >
                  {s.imageUrl ? (
                    <div className="relative aspect-[16/10] overflow-hidden bg-brand-gradient">
                      <Image
                        src={s.imageUrl}
                        alt={s.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-brand-50 transition-transform duration-500 group-hover:scale-150"
                    />
                  )}
                  <div className="relative flex flex-1 flex-col p-7">
                    <h3 className="text-xl font-semibold text-foreground">
                      {s.name}
                    </h3>
                    <p className="mt-3 text-sm text-ink-muted line-clamp-4">
                      {s.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                      Learn more
                      <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
