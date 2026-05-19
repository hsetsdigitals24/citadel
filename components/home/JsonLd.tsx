import { SITE } from "@/lib/utils";
import { getSettings } from "@/lib/queries";

export async function JsonLd() {
  const settings = await getSettings();

  const id = `${SITE.url}/#clinic`;
  const address = {
    "@type": "PostalAddress",
    streetAddress: "221 Ibrahim Taiwo Street",
    addressLocality: "Ilorin",
    addressRegion: "Kwara State",
    addressCountry: "NG",
  };
  const geo = {
    "@type": "GeoCoordinates",
    latitude: 8.4966,
    longitude: 4.5421,
  };
  const sameAs = [settings.facebookUrl, settings.instagramUrl].filter(
    (u): u is string => !!u && /^https?:\/\//i.test(u)
  );
  const opens = {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "08:00",
    closes: "16:00",
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Dentist", "MedicalOrganization", "LocalBusiness"],
        "@id": id,
        name: SITE.name,
        alternateName: SITE.brand,
        url: SITE.url,
        telephone: SITE.phone1Intl,
        email: SITE.email,
        address,
        geo,
        openingHours: "Mo-Su 08:00-16:00",
        openingHoursSpecification: [opens],
        ...(sameAs.length ? { sameAs } : {}),
        medicalSpecialty: [
          "Dentistry",
          "Orthodontics",
          "OralAndMaxillofacialSurgery",
        ],
        priceRange: "$$",
        areaServed: { "@type": "City", name: "Ilorin" },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        publisher: { "@id": id },
        inLanguage: "en-NG",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
