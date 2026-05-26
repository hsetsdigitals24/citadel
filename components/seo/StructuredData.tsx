import { SITE, LOCATIONS } from "@/lib/utils";

type Json = Record<string, unknown> | unknown[];

function emit(data: Json) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const baseUrl = SITE.url.replace(/\/$/, "");
const primaryLocationId = `${baseUrl}/#${LOCATIONS[0].id}`;

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${baseUrl}${item.path}`,
    })),
  };
  return emit(data);
}

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
  category,
}: {
  title: string;
  description: string;
  url: string;
  image?: string | null;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  category?: string | null;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: title,
    description,
    image: image ? [image] : undefined,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Organization",
      name: authorName ?? SITE.name,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    ...(category ? { articleSection: category } : {}),
  };
  return emit(data);
}

export function ServiceJsonLd({
  name,
  description,
  slug,
  image,
}: {
  name: string;
  description: string;
  slug: string;
  image?: string | null;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name,
    description,
    url: `${baseUrl}/services/${slug}`,
    image: image || undefined,
    procedureType: "Dental",
    bodyLocation: "Mouth",
    provider: {
      "@type": ["Dentist", "MedicalOrganization"],
      "@id": primaryLocationId,
      name: SITE.name,
      url: baseUrl,
      telephone: SITE.phone1Intl,
      address: {
        "@type": "PostalAddress",
        streetAddress: "221 Ibrahim Taiwo Road",
        addressLocality: "Ilorin",
        addressRegion: "Kwara State",
        addressCountry: "NG",
      },
      areaServed: { "@type": "City", name: "Ilorin" },
    },
  };
  return emit(data);
}

export function PersonJsonLd({
  member,
  photoUrl,
  isPrimary = false,
}: {
  member: {
    name: string;
    qualifications: string;
    specialization: string;
    bio: string;
  };
  photoUrl?: string | null;
  isPrimary?: boolean;
}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.specialization,
    description: member.bio,
    hasCredential: member.qualifications,
    worksFor: {
      "@type": "Dentist",
      "@id": primaryLocationId,
      name: SITE.name,
      url: baseUrl,
    },
    ...(photoUrl ? { image: photoUrl } : {}),
    ...(isPrimary
      ? {
          telephone: SITE.phone1Intl,
          sameAs: [`${baseUrl}/team`],
        }
      : {}),
  };
  return emit(data);
}

export function FAQJsonLd({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
  return emit(data);
}
