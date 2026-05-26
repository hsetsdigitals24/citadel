import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { buildMeta } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { SITE, LOCATIONS } from "@/lib/utils";
import { getSettings } from "@/lib/queries";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";

export const metadata = buildMeta(
  "Contact Us",
  "Get in touch with Citadel Global Dental Clinic in Ilorin — phone, WhatsApp, email and map.",
  { path: "/contact" }
);

export default async function ContactPage() {
  const settings = await getSettings();
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <PageHero
        eyebrow="Contact"
        title="We’d love to hear from you."
        description="Questions, feedback, or just want to say hello — reach us any of these ways."
      />

      <section className="section">
        <div className="container-tight grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            {LOCATIONS.map((loc, i) => (
              <Reveal key={loc.id} delay={i * 0.03}>
                <InfoRow
                  icon={MapPinIcon}
                  title={loc.name}
                  body={loc.address}
                />
              </Reveal>
            ))}
            <Reveal delay={0.05}>
              <InfoRow
                icon={PhoneIcon}
                title="Call us"
                body={
                  <>
                    <a className="hover:underline" href={`tel:${SITE.phone1}`}>
                      {SITE.phone1}
                    </a>{" "}
                    ·{" "}
                    <a className="hover:underline" href={`tel:${SITE.phone2}`}>
                      {SITE.phone2}
                    </a>
                  </>
                }
              />
            </Reveal>
            <Reveal delay={0.1}>
              <InfoRow
                icon={EnvelopeIcon}
                title="Email"
                body={
                  <a className="hover:underline" href={`mailto:${SITE.email}`}>
                    {SITE.email}
                  </a>
                }
              />
            </Reveal>
            <Reveal delay={0.15}>
              <InfoRow icon={ClockIcon} title="Working hours" body={settings.workingHours} />
            </Reveal>
            {(settings.facebookUrl || settings.instagramUrl) && (
              <Reveal delay={0.18}>
                <div className="flex items-center gap-3 rounded-2xl bg-white p-5 ring-1 ring-black/[0.04] shadow-soft">
                  <span className="text-sm font-semibold text-foreground">
                    Follow us:
                  </span>
                  {settings.facebookUrl && (
                    <a
                      href={settings.facebookUrl}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-700 hover:bg-brand-100"
                      aria-label="Facebook"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2v-2.9h2v-2.2c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2v1.9h2.3l-.4 2.9h-1.9v7A10 10 0 0 0 22 12z"/></svg>
                    </a>
                  )}
                  {settings.instagramUrl && (
                    <a
                      href={settings.instagramUrl}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-700 hover:bg-brand-100"
                      aria-label="Instagram"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                    </a>
                  )}
                </div>
              </Reveal>
            )}

            {LOCATIONS.map((loc, i) => (
              <Reveal key={loc.id} delay={0.2 + i * 0.05}>
                <div className="overflow-hidden rounded-2xl ring-1 ring-black/[0.04] shadow-soft">
                  <div className="bg-white px-5 py-3 text-sm font-semibold text-foreground">
                    {loc.name}
                  </div>
                  <iframe
                    title={`${loc.name} location`}
                    className="h-64 w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(loc.address)}&output=embed`}
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.05}>
            <div className="card p-6 sm:p-8">
              <h2 className="heading-md text-balance">Send us a message</h2>
              <p className="mt-2 text-sm text-ink-muted">
                We respond within working hours.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function InfoRow({
  icon: Icon,
  title,
  body,
}: {
  icon: any;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-black/[0.04] shadow-soft">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <div className="text-sm font-semibold text-foreground">{title}</div>
        <div className="mt-1 text-sm text-ink-muted">{body}</div>
      </div>
    </div>
  );
}
