/**
 * German Language Layout
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import "../globals.css";
import { Orbitron } from "next/font/google";
import React from "react";

export const metadata = {
  metadataBase: new URL("https://www.coldbydefault.com"),
  title: {
    default:
      "Yazan Abo-Ayash | Full Stack Entwickler Portfolio - ColdByDefault",
    template: "%s | ColdByDefault Portfolio",
  },
  description:
    "Full Stack Junior Entwickler & Informatik Student. Spezialisiert auf React, Next.js, Node.js, Python und moderne Webtechnologien. Erfahren in der Entwicklung responsiver Webanwendungen und RESTful APIs.",
  keywords: [
    "Full Stack Entwickler",
    "React Entwickler",
    "Next.js Entwickler",
    "Node.js Entwickler",
    "Python Entwickler",
    "Web Entwickler",
    "Informatik Student",
    "ColdByDefault",
    "Yazan Abo-Ayash",
    "Portfolio",
    "Deutschland",
  ],
  authors: [{ name: "Yazan Abo-Ayash (ColdByDefault)" }],
  creator: "Yazan Abo-Ayash (ColdByDefault)",
  publisher: "Yazan Abo-Ayash (ColdByDefault)",
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
    locale: "de_DE",
    url: "https://www.coldbydefault.com/de",
    title: "Yazan Abo-Ayash | Full Stack Entwickler Portfolio",
    description:
      "Full Stack Junior Entwickler & Informatik Student spezialisiert auf moderne Webtechnologien",
    siteName: "ColdByDefault Portfolio",
    images: [
      {
        url: "/og-image-de.jpg",
        width: 1200,
        height: 630,
        alt: "ColdByDefault Portfolio - Full Stack Entwickler",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yazan Abo-Ayash | Full Stack Entwickler Portfolio",
    description:
      "Full Stack Junior Entwickler & Informatik Student spezialisiert auf moderne Webtechnologien",
    creator: "@ColdByDefault",
    images: ["/og-image-de.jpg"],
  },
  alternates: {
    canonical: "https://www.coldbydefault.com/de",
    languages: {
      "en-US": "https://www.coldbydefault.com",
      en: "https://www.coldbydefault.com",
      "de-DE": "https://www.coldbydefault.com/de",
      de: "https://www.coldbydefault.com/de",
      "x-default": "https://www.coldbydefault.com",
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
  return <div className={orbitron.variable}>{children}</div>;
}
