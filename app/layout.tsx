/** All Rights Reserved - No part of this website or any of its contents may be reproduced, copied, modified or adapted,
without the prior written consent of the author, unless otherwise indicated for stand-alone materials.
<!-- @Leva_Palestina -->
<!-- @Free_Palestine -->
*/
/**
 * @file /app/layout.tsx
 * @created 2024-12-31 23:00:00
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 *
 *
 * @see @link https://www.coldbydefault.com for the live website.
 */
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import "@/styles/company-banner.css";
import React from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Navbar } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CookiesBanner } from "@/components/cookies";
import { BrowserTranslationNotice } from "@/components/languages";
import { ChatBot } from "@/components/chatbot";
import { NoSSR } from "@/components/NoSSR";
import { seoConfigEN, generateStructuredData } from "@/lib/seo";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Urbanist } from "next/font/google";
import Link from "next/link";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "fallback", 
  fallback: ["system-ui", "arial"],
  adjustFontFallback: false,
});

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
    card: seoConfigEN.twitter.cardType,
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
    google: "",
  },
};

const structuredData = generateStructuredData(seoConfigEN);

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const messages = await getMessages();
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content={seoConfigEN.author} />
        <meta name="keywords" content={seoConfigEN.keywords.join(", ")} />

        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta
          httpEquiv="Referrer-Policy"
          content="strict-origin-when-cross-origin"
        />
        <meta
          httpEquiv="Permissions-Policy"
          content="camera=(), microphone=(), geolocation=()"
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

        {/* DNS Prefetch and Preconnect for performance */}
        <link rel="dns-prefetch" href="https://api.github.com" />
        <link rel="dns-prefetch" href="https://avatars.githubusercontent.com" />
        <link rel="dns-prefetch" href="https://www.googleapis.com" />
        <link rel="dns-prefetch" href="https://vercel.com" />

        <link rel="preconnect" href="https://api.github.com" />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
        <link rel="preconnect" href="https://www.googleapis.com" />

        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/profileDark.jpg"
          as="image"
          type="image/jpeg"
        />

        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`${urbanist.variable} flex flex-col min-h-screen`}>
        {/* Skip to main content for accessibility */}
        <Link
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-[9999] focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Skip to main content
        </Link>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="System"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="flex-1" id="main-content">
              {children}
            </main>
            <Footer />
            <CookiesBanner />
            <BrowserTranslationNotice />
            <NoSSR>
              <ChatBot position="bottom-left" />
            </NoSSR>
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
