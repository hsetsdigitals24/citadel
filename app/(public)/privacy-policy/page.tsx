import { buildMeta } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { LegalBody } from "@/components/shared/LegalBody";

export const metadata = buildMeta("Privacy Policy", "How Citadel Global Dental Clinic collects, uses and protects your information.");

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" description="Last updated May 2026." />
      <LegalBody>
        <h2>1. Information we collect</h2>
        <p>When you book an appointment, send a contact enquiry or otherwise interact with our website, we may collect your name, phone number, email, preferred appointment date/time and the reason for your visit.</p>
        <h2>2. How we use your information</h2>
        <p>We use your information solely to respond to your enquiry, schedule your visit, deliver clinical care, and improve our services. We do not sell your data.</p>
        <h2>3. Storage and security</h2>
        <p>Submissions are stored securely in our database. Access is restricted to authorised clinic staff.</p>
        <h2>4. Cookies and analytics</h2>
        <p>We may use Google Analytics to understand how visitors use our site. See our <a href="/cookie-policy">Cookie Policy</a>.</p>
        <h2>5. Your rights</h2>
        <p>You may request access to, correction of, or deletion of your personal data at any time by emailing citadelglobaldentalclinic@gmail.com.</p>
      </LegalBody>
    </>
  );
}
