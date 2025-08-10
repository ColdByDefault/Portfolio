/**
 * Dynamic SEO Head component with language support
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import Head from "next/head";
import { useLanguage } from "@/hooks/use-language";
import {
  seoConfigEN,
  seoConfigDE,
  generateStructuredData,
  type SEOConfig,
} from "@/lib/seo";

interface SEOHeadProps {
  pageTitle?: string;
  pageDescription?: string;
  pageKeywords?: string[];
  pagePath?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export default function SEOHead({
  pageTitle,
  pageDescription,
  pageKeywords = [],
  pagePath = "",
}: SEOHeadProps) {
  const { language } = useLanguage();

  const config: SEOConfig = language === "de" ? seoConfigDE : seoConfigEN;

  const title = pageTitle ? `${pageTitle} | ${config.siteName}` : config.title;

  const description = pageDescription || config.description;
  const keywords = [...config.keywords, ...pageKeywords];
  const canonicalUrl = `${config.siteUrl}${pagePath}`;


  const structuredData = generateStructuredData(config);

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="author" content={config.author} />
      <meta name="language" content={config.locale} />

      {/* Canonical and Alternate Language URLs */}
      <link rel="canonical" href={canonicalUrl} />
      <link
        rel="alternate"
        hrefLang="en"
        href={`${config.siteUrl}${pagePath}`}
      />
      <link
        rel="alternate"
        hrefLang="de"
        href={`${config.siteUrl}${pagePath}?lang=de`}
      />
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${config.siteUrl}${pagePath}`}
      />

      {/* Open Graph */}
      <meta property="og:title" content={config.openGraph.title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={config.openGraph.type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta
        property="og:image"
        content={`${config.siteUrl}${config.openGraph.image}`}
      />
      <meta property="og:image:alt" content={config.openGraph.imageAlt} />
      <meta property="og:site_name" content={config.siteName} />
      <meta property="og:locale" content={config.locale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={config.twitter.cardType} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={`${config.siteUrl}${config.openGraph.image}`}
      />
      <meta name="twitter:creator" content={config.twitter.handle} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Robots */}
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content={config.siteName} />

      {/* Geo Tags for German SEO */}
      {language === "de" && (
        <>
          <meta name="geo.region" content="DE" />
          <meta name="geo.placename" content="Deutschland" />
          <meta name="ICBM" content="51.1657, 10.4515" />
        </>
      )}
    </Head>
  );
}
