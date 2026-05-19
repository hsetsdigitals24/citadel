import { buildMeta } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { LegalBody } from "@/components/shared/LegalBody";

export const metadata = buildMeta("Cookie Policy", "How Citadel Global Dental Clinic uses cookies on this website.");

export default function CookiePolicyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Cookie Policy" description="Last updated May 2026." />
      <LegalBody>
        <h2>1. What cookies we use</h2>
        <p>Our website uses essential cookies required for the site to function, plus analytics cookies (Google Analytics) which help us understand usage.</p>
        <h2>2. Managing cookies</h2>
        <p>You can disable cookies via your browser settings. Disabling cookies may affect some site functionality.</p>
        <h2>3. Third-party services</h2>
        <p>Google Analytics, Google Maps and reCAPTCHA may set cookies under their own policies.</p>
      </LegalBody>
    </>
  );
}
