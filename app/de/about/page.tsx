/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import React from "react";

export const metadata = {
  title: "Über Mich",
  description:
    "Erfahren Sie mehr über Yazan Abo-Ayash, Full Stack Junior Entwickler und Informatik Student. Spezialisiert auf React, Next.js, Node.js, Python und moderne Webtechnologien.",
  keywords: [
    "Über mich",
    "Yazan Abo-Ayash",
    "ColdByDefault",
    "Full Stack Entwickler",
    "Informatik Student",
    "React Entwickler",
    "Webentwickler Deutschland",
    "Portfolio",
  ],
  openGraph: {
    title: "Über Mich - Yazan Abo-Ayash | ColdByDefault",
    description:
      "Erfahren Sie mehr über Yazan Abo-Ayash, Full Stack Junior Entwickler und Informatik Student spezialisiert auf moderne Webtechnologien.",
    url: "https://www.coldbydefault.com/de/about",
    images: [
      {
        url: "/og-image-de.jpg",
        width: 1200,
        height: 630,
        alt: "Über Yazan Abo-Ayash - ColdByDefault Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Über Mich - Yazan Abo-Ayash | ColdByDefault",
    description:
      "Erfahren Sie mehr über Yazan Abo-Ayash, Full Stack Junior Entwickler und Informatik Student.",
    creator: "@ColdByDefault",
    images: ["/og-image-de.jpg"],
  },
  alternates: {
    canonical: "https://www.coldbydefault.com/de/about",
    languages: {
      "en-US": "https://www.coldbydefault.com/about",
      en: "https://www.coldbydefault.com/about",
      "de-DE": "https://www.coldbydefault.com/de/about",
      de: "https://www.coldbydefault.com/de/about",
      "x-default": "https://www.coldbydefault.com/about",
    },
  },
};

export default function AboutPageDE() {
  return <div className="min-h-screen relative"></div>;
}
