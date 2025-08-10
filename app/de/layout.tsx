/**
 * German Language Layout
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import { Orbitron } from "next/font/google";
import React from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/footer/Footer";
import { CookiesBanner } from "@/components/cookies/cookies-banner";
import { seoConfigDE, generateStructuredData } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL("https://www.coldbydefault.com"),
  title: {
    default: seoConfigDE.title,
    template: `%s | ${seoConfigDE.siteName}`,
  },
  description: seoConfigDE.description,
  keywords: seoConfigDE.keywords,
  authors: [{ name: seoConfigDE.author }],
  creator: seoConfigDE.author,
  publisher: seoConfigDE.author,
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
    locale: seoConfigDE.locale,
    url: `${seoConfigDE.siteUrl}/de`,
    title: seoConfigDE.openGraph.title,
    description: seoConfigDE.openGraph.description,
    siteName: seoConfigDE.siteName,
    images: [
      {
        url: seoConfigDE.openGraph.image,
        width: 1200,
        height: 630,
        alt: seoConfigDE.openGraph.imageAlt,
      },
    ],
  },
  twitter: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    card: seoConfigDE.twitter.cardType as any,
    title: seoConfigDE.openGraph.title,
    description: seoConfigDE.openGraph.description,
    creator: seoConfigDE.twitter.handle,
    images: [seoConfigDE.openGraph.image],
  },
  alternates: {
    canonical: `${seoConfigDE.siteUrl}/de`,
    languages: {
      "en-US": seoConfigDE.siteUrl,
      en: seoConfigDE.siteUrl,
      "de-DE": `${seoConfigDE.siteUrl}/de`,
      de: `${seoConfigDE.siteUrl}/de`,
      "x-default": seoConfigDE.siteUrl,
    },
  },
};

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-orbitron",
});

interface GermanLayoutProps {
  children: React.ReactNode;
}

export default function GermanLayout({ children }: GermanLayoutProps) {
  const structuredData = generateStructuredData(seoConfigDE);

  return (
    <html lang="de" className={`${orbitron.variable}`} suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content={seoConfigDE.author} />
        <meta name="keywords" content={seoConfigDE.keywords.join(", ")} />

        {/* Language and Canonical URLs */}
        <link rel="canonical" href={`${seoConfigDE.siteUrl}/de`} />
        <link rel="alternate" hrefLang="en-US" href={seoConfigDE.siteUrl} />
        <link rel="alternate" hrefLang="en" href={seoConfigDE.siteUrl} />
        <link
          rel="alternate"
          hrefLang="de-DE"
          href={`${seoConfigDE.siteUrl}/de`}
        />
        <link
          rel="alternate"
          hrefLang="de"
          href={`${seoConfigDE.siteUrl}/de`}
        />
        <link rel="alternate" hrefLang="x-default" href={seoConfigDE.siteUrl} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body suppressHydrationWarning>
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
