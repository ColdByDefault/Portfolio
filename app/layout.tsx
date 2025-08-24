// All Rights Reserved - No part of this website or any of its contents may be reproduced, copied, modified or adapted,
// without the prior written consent of the author, unless otherwise indicated for stand-alone materials.
// <!-- Leve Palestina -->
// <!-- Free Palestine -->
/**
 * RootLayout component serves as the main layout wrapper for the application.
 * It includes global metadata, styles, and shared components such as Navbar and Footer.
 *
 * @ file /app/layout.tsx
 * @ created 2024-12-31 23:00:00
 * @ author ColdByDefault
 * @ copyright 2024 ColdByDefault. All Rights Reserved.
 *
 * @ remarks
 * This layout component sets up the HTML structure, including the `<head>` section
 * with metadata for SEO and social sharing, and the `<body>` section with shared UI components.
 * It also integrates Vercel Analytics and Speed Insights for performance monitoring.
 *
 * @ see {@ link https://www.coldbydefault.com} for the live website.
 *
 * @ param {RootLayoutProps} props - The props object containing the children to be rendered.
 * @ param {React.ReactNode} props.children - The child components to be rendered within the layout.
 *
 * @ returns {JSX.Element} The RootLayout component.
 */
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Orbitron } from "next/font/google";
import React from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/footer/Footer";
import { CookiesBanner } from "@/components/cookies/cookies-banner";
import { seoConfigEN, generateStructuredData } from "@/lib/seo";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export const metadata = {
  metadataBase: new URL("https://www.coldbydefault.com"),
  title: {
    default: seoConfigEN.title,
    template: `%s | ${seoConfigEN.siteName}`,
  },
  description: seoConfigEN.description,
  keywords: seoConfigEN.keywords,
  authors: [{ name: seoConfigEN.author }],
  creator: seoConfigEN.author,
  publisher: seoConfigEN.author,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: seoConfigEN.locale,
    url: seoConfigEN.siteUrl,
    title: seoConfigEN.openGraph.title,
    description: seoConfigEN.openGraph.description,
    siteName: seoConfigEN.siteName,
    images: [
      {
        url: seoConfigEN.openGraph.image,
        width: 1200,
        height: 630,
        alt: seoConfigEN.openGraph.imageAlt,
      },
    ],
  },
  twitter: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    card: seoConfigEN.twitter.cardType as any,
    title: seoConfigEN.openGraph.title,
    description: seoConfigEN.openGraph.description,
    creator: seoConfigEN.twitter.handle,
    images: [seoConfigEN.openGraph.image],
  },
  alternates: {
    canonical: seoConfigEN.siteUrl,
    languages: {
      "en-US": seoConfigEN.siteUrl,
      en: seoConfigEN.siteUrl,
      "de-DE": `${seoConfigEN.siteUrl}/de`,
      de: `${seoConfigEN.siteUrl}/de`,
      "x-default": seoConfigEN.siteUrl,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

// Generate structured data once to avoid hydration mismatches
const structuredData = generateStructuredData(seoConfigEN);

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-orbitron",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const messages = await getMessages();
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      className={`${orbitron.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content={seoConfigEN.author} />
        <meta name="keywords" content={seoConfigEN.keywords.join(", ")} />

        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta
          httpEquiv="Referrer-Policy"
          content="strict-origin-when-cross-origin"
        />
        <meta
          httpEquiv="Permissions-Policy"
          content="camera=(), microphone=(), geolocation=()"
        />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self' https://api.github.com https://vitals.vercel-analytics.com;"
        />

        {/* Language and Canonical URLs */}
        <link rel="canonical" href={seoConfigEN.siteUrl} />
        <link rel="alternate" hrefLang="en-US" href={seoConfigEN.siteUrl} />
        <link rel="alternate" hrefLang="en" href={seoConfigEN.siteUrl} />
        <link
          rel="alternate"
          hrefLang="de-DE"
          href={`${seoConfigEN.siteUrl}/de`}
        />
        <link
          rel="alternate"
          hrefLang="de"
          href={`${seoConfigEN.siteUrl}/de`}
        />
        <link rel="alternate" hrefLang="x-default" href={seoConfigEN.siteUrl} />

        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Footer />
            <CookiesBanner />
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
