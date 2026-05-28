import { buildMeta } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CTABanner } from "@/components/home/CTABanner";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import {
  CheckBadgeIcon,
  HandRaisedIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export const metadata = buildMeta(
  "About Us",
  "Founded in 2020 in Ilorin, Citadel Global Dental Clinic delivers world-class dentistry led by Dr. Chris Ejakpome — BDS, certified Implantologist (USA & Canada).",
  { path: "/about" }
);

const values = [
  {
    icon: CheckBadgeIcon,
    title: "Discipline",
    body: "Every procedure follows international clinical protocols — no shortcuts.",
  },
  {
    icon: HandRaisedIcon,
    title: "Hard Work",
    body: "We invest the time each case deserves, however complex.",
  },
  {
    icon: HeartIcon,
    title: "Dedication",
    body: "Patients are people first. Care is gentle, honest and personal.",
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <PageHero
        eyebrow="About the clinic"
        title="A clinic founded on global standards and local warmth."
        description="Citadel Global Dental Clinic & Braces Centre was founded in 2020 to bring internationally certified dentistry to families in Ilorin and across Kwara State."
      />

      <section className="section">
        <div className="container-tight grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <span className="eyebrow">Our story</span>
              <h2 className="heading-md mt-3 text-balance">
                From a single chair to a trusted name in Kwara.
              </h2>
              <div className="prose mt-6 max-w-none text-ink-muted leading-relaxed space-y-4">
                <p>
                  We opened our doors in 2020 with a simple promise: that
                  patients in Ilorin should never have to travel out of state —
                  or out of the country — for world-class dental care.
                </p>
                <p>
                  Today we are a multi-specialist clinic and proud home of the{" "}
                  <strong className="text-foreground">Best Braces Centre</strong>{" "}
                  in Kwara, treating thousands of patients each year across
                  orthodontics, implantology, cosmetic and family dentistry.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-surface p-8 ring-1 ring-black/[0.04]">
              <span className="eyebrow">Certifications</span>
              <ul className="mt-5 space-y-4 text-sm">
                {[
                  "Bachelor of Dental Surgery (BDS)",
                  "Certification in Implantology — USA",
                  "Certification in Implantology — Canada",
                  "Specialism in Oral & Maxillofacial Surgery",
                  "Member — World Dental Council (WDC)",
                  "Member — World Dental Federation (FDI)",
                  "Fellow — International College of Dentist (ICD)",
                  "Health Management Organization (HMO) Accredited",
                  "National Health Insurance Scheme (NHIS) Certified",
                  "Federal Ministry of Health Registered",
                  "Kwara State Ministry of Health Certified",
                ].map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-white text-xs">
                      ✓
                    </span>
                    <span className="text-foreground">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-tight">
          <Reveal>
            <span className="eyebrow">Our values</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="heading-md mt-3 max-w-xl text-balance">
              Discipline · Hard Work · Dedication.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <div className="card p-6 h-full">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <v.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
