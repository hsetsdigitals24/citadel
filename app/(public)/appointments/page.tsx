import {
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { buildMeta } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { SITE, whatsappLink } from "@/lib/utils";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";

export const metadata = buildMeta(
  "Book an Appointment",
  "Request a dental appointment at Citadel Global Dental Clinic in Ilorin. Open 8am–4pm daily. Emergency line available.",
  { path: "/appointments" }
);

export default function AppointmentsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Appointments", path: "/appointments" },
        ]}
      />
      <PageHero
        eyebrow="Appointments"
        title="Book a visit in under a minute."
        description="Fill out the form and our team will confirm your slot during working hours via your preferred contact method."
      />

      <section className="section">
        <div className="container-tight grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Reveal>
              <div className="card p-6 sm:p-8">
                <AppointmentForm />
              </div>
            </Reveal>
          </div>

          <aside className="lg:col-span-2 space-y-5">
            <Reveal>
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Working hours
                </h3>
                <div className="mt-3 flex items-center gap-3 text-sm text-ink-muted">
                  <ClockIcon className="h-5 w-5 text-brand-600" />
                  {SITE.hours}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="card p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Prefer to talk first?
                </h3>
                <a
                  href={`tel:${SITE.phone1}`}
                  className="flex items-center gap-3 rounded-xl bg-surface p-3 text-sm font-medium text-foreground hover:bg-brand-50"
                >
                  <PhoneIcon className="h-5 w-5 text-brand-600" />
                  Call {SITE.phone1}
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl bg-surface p-3 text-sm font-medium text-foreground hover:bg-brand-50"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#25D366]" fill="currentColor">
                    <path d="M19 5A10 10 0 0 0 4 18l-1 4 4-1A10 10 0 1 0 19 5z" />
                  </svg>
                  WhatsApp us
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 rounded-xl bg-surface p-3 text-sm font-medium text-foreground hover:bg-brand-50"
                >
                  <EnvelopeIcon className="h-5 w-5 text-brand-600" />
                  Email the clinic
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl bg-clinic-red/[0.06] p-6 ring-1 ring-clinic-red/20">
                <div className="flex items-center gap-2 text-sm font-semibold text-clinic-red">
                  <ExclamationCircleIcon className="h-5 w-5" />
                  Dental emergency?
                </div>
                <p className="mt-2 text-sm text-ink-muted">
                  Don’t wait — call us directly any time on{" "}
                  <a
                    href={`tel:${SITE.phone1}`}
                    className="font-semibold text-clinic-red"
                  >
                    {SITE.phone1}
                  </a>
                  .
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
