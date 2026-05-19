import type { Metadata } from "next";

export function buildMeta(title: string, description: string): Metadata {
  return {
    title: `${title} | Citadel Global Dental Clinic`,
    description,
    openGraph: {
      title,
      description,
      siteName: "Citadel Global Dental Clinic",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
