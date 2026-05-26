import type { Metadata } from "next";
import { SITE } from "@/lib/utils";

type BuildMetaOptions = {
  /**
   * Absolute path on this site (e.g. "/about"). Used to set canonical + OG URL.
   * Omit for the homepage.
   */
  path?: string;
  /** Override the default OG image (absolute or root-relative). */
  image?: string;
  /** Index/follow controls. Defaults to indexable. */
  robots?: Metadata["robots"];
  /** Additional keywords merged with the site defaults. */
  keywords?: string[];
  /** Content type — defaults to "website". Use "article" for blog posts. */
  type?: "website" | "article";
  /** Article-specific OG fields. */
  publishedTime?: string;
  modifiedTime?: string;
};

const DEFAULT_KEYWORDS = [
  "dentist in Ilorin",
  "dental clinic in Ilorin",
  "best braces centre Nigeria",
  "braces in Ilorin",
  "dental implants Ilorin",
  "teeth whitening Ilorin",
  "orthodontist near me",
  "scaling and polishing Ilorin",
  "Citadel Global Dental Clinic",
];

const DEFAULT_OG_IMAGE = "/opengraph-image";

export function buildMeta(
  title: string,
  description: string,
  options: BuildMetaOptions = {}
): Metadata {
  const path = options.path ?? "/";
  const canonical = path === "/" ? "/" : path.replace(/\/+$/, "") || "/";
  const image = options.image ?? DEFAULT_OG_IMAGE;
  const ogType = options.type ?? "website";

  const meta: Metadata = {
    title,
    description,
    keywords: [...DEFAULT_KEYWORDS, ...(options.keywords ?? [])],
    alternates: { canonical },
    robots: options.robots ?? {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description,
      siteName: SITE.name,
      type: ogType,
      url: canonical,
      locale: "en_NG",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(ogType === "article"
        ? {
            publishedTime: options.publishedTime,
            modifiedTime: options.modifiedTime,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };

  return meta;
}
