import Link from "next/link";
import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { Logo } from "@/components/shared/Logo";
import { SITE, LOCATIONS } from "@/lib/utils";
import { getSettings } from "@/lib/queries";

const cols = [
  {
    title: "Explore",
    links: [
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/team", label: "Our team" },
      { href: "/testimonials", label: "Testimonials" },
      { href: "/blog", label: "Blog" },
      { href: "/admin", label: "Management" },
    ],
  },
  {
    title: "Patients",
    links: [
      { href: "/appointments", label: "Book appointment" },
      { href: "/contact", label: "Contact us" },
      { href: "/services/orthodontics-braces", label: "Braces" },
      { href: "/services/dental-implants", label: "Implants" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy policy" },
      { href: "/terms", label: "Terms & conditions" },
      { href: "/cookie-policy", label: "Cookie policy" },
    ],
  },
];

export async function Footer() {
  const settings = await getSettings();
  return (
    <footer className="relative mt-24 overflow-hidden bg-brand-gradient text-white">
      <div className="absolute inset-0 bg-noise opacity-30" aria-hidden />
      <div className="container-tight relative grid gap-12 py-16 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-10" />
            <div className="leading-tight">
              <div className="text-base font-semibold">Citadel Global</div>
              <div className="text-xs uppercase tracking-[0.18em] text-white/60">
                Dental Clinic
              </div>
            </div>
          </div>
          <p className="text-sm text-white/70 max-w-sm leading-relaxed">
            World-class dentistry delivered with warmth — home to the {SITE.brand} in Ilorin, Kwara State.
          </p>
          <div className="space-y-3 text-sm">
            {LOCATIONS.map((loc) => (
              <div key={loc.id} className="flex items-start gap-3 text-white/80">
                <MapPinIcon className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  <span className="block font-medium text-white">{loc.name}</span>
                  <span className="block text-white/70">{loc.address}</span>
                </span>
              </div>
            ))}
            <a
              href={`tel:${SITE.phone1}`}
              className="flex items-center gap-3 text-white/80 hover:text-white"
            >
              <PhoneIcon className="h-4 w-4" />
              <span>{SITE.phone1} · {SITE.phone2}</span>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-3 text-white/80 hover:text-white"
            >
              <EnvelopeIcon className="h-4 w-4" />
              <span>{SITE.email}</span>
            </a>
            <div className="flex items-center gap-3 text-white/80">
              <ClockIcon className="h-4 w-4" />
              <span>{settings.workingHours}</span>
            </div>
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              {col.title}
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/80 transition hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-tight flex flex-col-reverse gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 text-xs text-white/60 sm:flex-row sm:items-center sm:gap-3">
            <p>
              © {new Date().getFullYear()} Citadel Global Dental Clinic & Braces Centre. All rights reserved.
            </p>
            <span className="hidden sm:inline text-white/30" aria-hidden>·</span>
            <p>
              Designed & developed by{" "}
              <a
                href="https://h-sets.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white/80 underline-offset-2 transition hover:text-white hover:underline"
              >
                H-SETS
              </a>
            </p>
          </div>
          <div className="flex items-center gap-3 text-white/60">
            <a href={settings.facebookUrl || "#"} target="_blank" rel="noopener" aria-label="Facebook" className="hover:text-white">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2v-2.9h2v-2.2c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2v1.9h2.3l-.4 2.9h-1.9v7A10 10 0 0 0 22 12z"/></svg>
            </a>
            <a href={settings.instagramUrl || "#"} target="_blank" rel="noopener" aria-label="Instagram" className="hover:text-white">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
