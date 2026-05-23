import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EmergencyBanner } from "@/components/layout/EmergencyBanner";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { MobileStickyBar } from "@/components/shared/MobileStickyBar";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Citadel Global Dental Clinic & Best Braces Centre — Ilorin",
    template: "%s | Citadel Global Dental Clinic",
  },
  description:
    "World-class dental care in Ilorin, Kwara State. Braces, implants, whitening and family dentistry — led by Dr. Chris Ejakpome (BDS, Implantology USA/Canada).",
  keywords: [
    "dentist in Ilorin",
    "dental clinic in Ilorin",
    "best braces centre Nigeria",
    "braces in Ilorin",
    "dental implants Ilorin",
    "teeth whitening Ilorin",
    "Citadel Global Dental Clinic",
  ],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased pb-[68px] md:pb-0">
        <EmergencyBanner />
        <Header />
        <main className="pt-0">{children}</main>
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
      </body>
    </html>
  );
}
