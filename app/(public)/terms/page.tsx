import { buildMeta } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { LegalBody } from "@/components/shared/LegalBody";

export const metadata = buildMeta(
  "Terms & Conditions",
  "Terms governing the use of the Citadel Global Dental Clinic website.",
  { path: "/terms" }
);

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" description="Last updated May 2026." />
      <LegalBody>
        <h2>1. Use of this website</h2>
        <p>By accessing this website you agree to these terms. Content is provided for general information only and is not a substitute for professional clinical advice.</p>
        <h2>2. Appointment requests</h2>
        <p>Appointment requests submitted via this website are not confirmed until our team contacts you. Working hours apply.</p>
        <h2>3. Intellectual property</h2>
        <p>All content, branding and imagery on this website are the property of Citadel Global Dental Clinic and may not be reproduced without permission.</p>
        <h2>4. Limitation of liability</h2>
        <p>We accept no liability for any loss arising from reliance on the information provided on this website.</p>
      </LegalBody>
    </>
  );
}
