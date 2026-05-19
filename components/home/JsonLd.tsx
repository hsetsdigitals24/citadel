import { SITE } from "@/lib/utils";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: SITE.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: "221 Ibrahim Taiwo Street",
      addressLocality: "Ilorin",
      addressRegion: "Kwara State",
      addressCountry: "NG",
    },
    telephone: SITE.phone1Intl,
    email: SITE.email,
    openingHours: "Mo-Su 08:00-16:00",
    url: SITE.url,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
