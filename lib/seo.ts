/**
 * SEO configuration and metadata generation utilities
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import type { TwitterCardType } from "@/types/metadata";

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  siteUrl: string;
  siteName: string;
  locale: string;
  alternateLocales: string[];
  openGraph: {
    title: string;
    description: string;
    type: string;
    image: string;
    imageAlt: string;
  };
  twitter: {
    handle: string;
    cardType: TwitterCardType;
  };
  structured: {
    name: string;
    jobTitle: string;
    description: string;
    skills: string[];
    location: string;
    email: string;
    github: string;
    linkedIn?: string;
  };
}

// English SEO Configuration
export const seoConfigEN: SEOConfig = {
  title: "Yazan Abo-Ayash | Full Stack Developer Portfolio - ColdByDefault",
  description:
    "Full Stack Junior Developer & Computer Science Student. Specialized in React, Next.js, Node.js, Python, and modern web technologies. Experienced in creating responsive web applications and RESTful APIs.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Python Developer",
    "Web Developer",
    "Computer Science Student",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "ColdByDefault",
    "Yazan Abo-Ayash",
    "Portfolio",
    "Software Engineer",
    "API Development",
    "Responsive Design",
    "Modern Web Technologies",
  ],
  author: "Yazan Abo-Ayash (ColdByDefault)",
  siteUrl: "https://www.coldbydefault.com",
  siteName: "ColdByDefault Portfolio",
  locale: "en_US",
  alternateLocales: ["de_DE"],
  openGraph: {
    title: "Yazan Abo-Ayash | Full Stack Developer Portfolio",
    description:
      "Full Stack Junior Developer & Computer Science Student specializing in modern web technologies",
    type: "website",
    image: "/og-image-en.jpg",
    imageAlt: "ColdByDefault Portfolio - Full Stack Developer",
  },
  twitter: {
    handle: "@ColdByDefault",
    cardType: "summary_large_image",
  },
  structured: {
    name: "Yazan Abo-Ayash",
    jobTitle: "Full Stack Junior Developer",
    description:
      "Computer Science Student and Full Stack Developer specializing in React, Next.js, Node.js, and Python",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "TypeScript",
      "JavaScript",
      "Express.js",
      "PostgreSQL",
      "MySQL",
      "Docker",
      "Git",
      "Tailwind CSS",
    ],
    location: "Germany",
    email: "contact@coldbydefault.com",
    github: "https://github.com/ColdByDefault",
  },
};

// German SEO Configuration
export const seoConfigDE: SEOConfig = {
  title: "Yazan Abo-Ayash | Full Stack Entwickler Portfolio - ColdByDefault",
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
    "Frontend Entwickler",
    "Backend Entwickler",
    "JavaScript Entwickler",
    "TypeScript Entwickler",
    "ColdByDefault",
    "Yazan Abo-Ayash",
    "Portfolio",
    "Software Ingenieur",
    "API Entwicklung",
    "Responsive Design",
    "Moderne Webtechnologien",
    "Webentwicklung Deutschland",
    "Programmierer",
    "Softwareentwickler",
  ],
  author: "Yazan Abo-Ayash (ColdByDefault)",
  siteUrl: "https://www.coldbydefault.com",
  siteName: "ColdByDefault Portfolio",
  locale: "de_DE",
  alternateLocales: ["en_US"],
  openGraph: {
    title: "Yazan Abo-Ayash | Full Stack Entwickler Portfolio",
    description:
      "Full Stack Junior Entwickler & Informatik Student spezialisiert auf moderne Webtechnologien",
    type: "website",
    image: "/og-image-de.jpg",
    imageAlt: "ColdByDefault Portfolio - Full Stack Entwickler",
  },
  twitter: {
    handle: "@ColdByDefault",
    cardType: "summary_large_image",
  },
  structured: {
    name: "Yazan Abo-Ayash",
    jobTitle: "Full Stack Junior Entwickler",
    description:
      "Informatik Student und Full Stack Entwickler spezialisiert auf React, Next.js, Node.js und Python",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "TypeScript",
      "JavaScript",
      "Express.js",
      "PostgreSQL",
      "MySQL",
      "Docker",
      "Git",
      "Tailwind CSS",
    ],
    location: "Deutschland",
    email: "contact@coldbydefault.com",
    github: "https://github.com/ColdByDefault",
  },
};

export function generateStructuredData(config: SEOConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: config.structured.name,
    jobTitle: config.structured.jobTitle,
    description: config.structured.description,
    url: config.siteUrl,
    image: `${config.siteUrl}${config.openGraph.image}`,
    email: config.structured.email,
    sameAs: [
      config.structured.github,
      ...(config.structured.linkedIn ? [config.structured.linkedIn] : []),
    ],
    knowsAbout: config.structured.skills,
    address: {
      "@type": "Place",
      name: config.structured.location,
    },
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
  };
}

export function generateBreadcrumbData(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
