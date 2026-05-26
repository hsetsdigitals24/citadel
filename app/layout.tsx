import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EmergencyBanner } from "@/components/layout/EmergencyBanner";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { MobileStickyBar } from "@/components/shared/MobileStickyBar";
import { SITE } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#1B3E6F",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Citadel Global Dental Clinic & Best Braces Centre — Ilorin",
    template: "%s | Citadel Global Dental Clinic",
  },
  description:
    "World-class dental care in Ilorin, Kwara State. Braces, implants, whitening and family dentistry — led by Dr. Chris Ejakpome (BDS, Implantology USA/Canada).",
  applicationName: SITE.name,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Health & Medical",
  keywords: [
    "dentist in Ilorin",
    "dental clinic in Ilorin",
    "best braces centre Nigeria",
    "braces in Ilorin",
    "dental implants Ilorin",
    "teeth whitening Ilorin",
    "orthodontist near me",
    "scaling and polishing Ilorin",
    "Citadel Global Dental Clinic",
    "Dr. Chris Ejakpome",
    "Oral and Maxillofacial Surgery Ilorin",
  ],
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "Citadel Global Dental Clinic & Best Braces Centre — Ilorin",
    description:
      "World-class dental care in Ilorin, Kwara State. Braces, implants, whitening and family dentistry — led by Dr. Chris Ejakpome (BDS, Implantology USA/Canada).",
    url: SITE.url,
    locale: "en_NG",
    images: [
      {
        url: "/images/hero-dentist.jpg",
        width: 1200,
        height: 630,
        alt: "Citadel Global Dental Clinic, Ilorin — world-class dental care.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Citadel Global Dental Clinic & Best Braces Centre — Ilorin",
    description:
      "Braces, implants, whitening and family dentistry in Ilorin. Internationally certified care led by Dr. Chris Ejakpome.",
    images: ["/images/hero-dentist.jpg"],
  },
  robots: {
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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  verification: {
    // Replace with the verification tokens issued by each tool.
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en-NG" className={inter.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased pb-[68px] md:pb-0 font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <EmergencyBanner />
        <Header />
        <main id="main-content" className="pt-0">{children}</main>
        <Footer />
        <WhatsAppButton />
        <MobileStickyBar />

        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}</Script>
          </>
        ) : null}
        <Analytics/>
      </body>
    </html>
  );
}
