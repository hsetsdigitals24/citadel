import { SITE, LOCATIONS } from "@/lib/utils";
import { getSettings } from "@/lib/queries";

export async function JsonLd() {
  const settings = await getSettings();

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
    opens: "00:00",
    closes: "23:59",
  };

  const businesses = LOCATIONS.map((loc) => {
    const street = loc.address.split(",")[0]?.trim() || loc.address;
    return {
      "@type": ["Dentist", "MedicalOrganization", "LocalBusiness"],
      "@id": `${SITE.url}/#${loc.id}`,
      name: loc.name,
      url: SITE.url,
      telephone: SITE.phone1Intl,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: street,
        addressLocality: "Ilorin",
        addressRegion: "Kwara State",
        addressCountry: "NG",
      },
      openingHours: "Mo-Su 00:00-23:59",
      openingHoursSpecification: [opens],
      ...(sameAs.length ? { sameAs } : {}),
      medicalSpecialty: [
        "Dentistry",
        "Orthodontics",
        "OralAndMaxillofacialSurgery",
      ],
      priceRange: "$$",
      areaServed: { "@type": "City", name: "Ilorin" },
    };
  });

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      ...businesses,
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        publisher: { "@id": `${SITE.url}/#${LOCATIONS[0].id}` },
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
