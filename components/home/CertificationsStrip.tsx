import {
  AcademicCapIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { SectionHeading } from "@/components/ui/SectionHeading";

const credentials = [
  {
    Icon: AcademicCapIcon,
    abbr: "BDS",
    name: "Bachelor of Dental Surgery",
    issuer: "University qualification",
  },
  {
    Icon: GlobeAltIcon,
    abbr: "USA",
    name: "Implantology Certification",
    issuer: "International Implant Academy",
  },
  {
    Icon: GlobeAltIcon,
    abbr: "Canada",
    name: "Implantology Certification",
    issuer: "Canadian Dental Association",
  },
  {
    Icon: ShieldCheckIcon,
    abbr: "NDA",
    name: "Nigerian Dental Association",
    issuer: "Federal Republic of Nigeria",
  },
  {
    Icon: ShieldCheckIcon,
    abbr: "WDC",
    name: "World Dental Council",
    issuer: "International affiliation",
  },
  {
    Icon: GlobeAltIcon,
    abbr: "FDI",
    name: "World Dental Federation",
    issuer: "International affiliation",
  },
  {
    Icon: AcademicCapIcon,
    abbr: "ICD",
    name: "International College of Dentist",
    issuer: "International affiliation",
  },
  {
    Icon: ShieldCheckIcon,
    abbr: "HMO",
    name: "Health Management Organization",
    issuer: "Nigerian accreditation",
  },
  {
    Icon: ShieldCheckIcon,
    abbr: "NHIS",
    name: "National Health Insurance Scheme",
    issuer: "Federal Government of Nigeria",
  },
  {
    Icon: ShieldCheckIcon,
    abbr: "FMoH",
    name: "Federal Ministry of Health",
    issuer: "Federal Government of Nigeria",
  },
  {
    Icon: ShieldCheckIcon,
    abbr: "KSMOH",
    name: "Kwara State Ministry of Health",
    issuer: "Kwara State Government",
  },
];

export function CertificationsStrip() {
  return (
    <section className="section bg-surface">
      <div className="container-tight">
        <SectionHeading
          align="center"
          eyebrow="Credentials & affiliations"
          title="Trained globally. Practising with precision."
        />

        <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {credentials.map((c) => (
            <div
              key={`${c.name}-${c.abbr}`}
              className="card p-5 flex flex-col items-center text-center gap-3"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                <c.Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
                  {c.abbr}
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {c.name}
                </p>
                <p className="mt-0.5 text-xs text-ink-muted">{c.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
