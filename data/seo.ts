/**
 * SEO configuration data and static objects
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import type { TwitterCardType } from "@/types/metadata";
import type {
  SEOConfig,
  LegalPageContent,
  MediaSectionContent,
} from "@/types/seo";

// Common keywords to reduce duplication
const COMMON_TECH_KEYWORDS = [
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "TypeScript",
  "JavaScript",
];

const COMMON_ROLE_KEYWORDS_EN = [
  "Full Stack Developer",
  "Web Developer",
  "Frontend Developer",
  "Backend Developer",
  "Software Engineer",
];

const COMMON_ROLE_KEYWORDS_DE = [
  "Full Stack Entwickler",
  "Web Entwickler",
  "Frontend Entwickler",
  "Backend Entwickler",
  "Software Ingenieur",
];

const COMMON_CONCEPTS_EN = [
  "ColdByDefault",
  "Yazan Abo-Ayash",
  "Portfolio",
  "API Development",
  "Responsive Design",
  "Modern Web Technologies",
];

const COMMON_CONCEPTS_DE = [
  "ColdByDefault",
  "Yazan Abo-Ayash",
  "Portfolio",
  "API Entwicklung",
  "Responsive Design",
  "Moderne Webtechnologien",
];

// Base configuration with shared values to reduce duplication
export const BASE_CONFIG = {
  author: "Yazan Abo-Ayash (ColdByDefault)",
  siteUrl: "https://www.coldbydefault.com",
  siteName: "ColdByDefault Portfolio",
  twitter: {
    handle: "@ColdByDefault",
    cardType: "summary_large_image" as TwitterCardType,
  },
  structured: {
    name: "Yazan Abo-Ayash",
    email: "contact@coldbydefault.com",
    github: "https://github.com/ColdByDefault",
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
  },
};

// English SEO Configuration
export const seoConfigEN: SEOConfig = {
  title: "Yazan Abo-Ayash | Full Stack Developer Portfolio - ColdByDefault",
  description:
    "Junior Full Stack Developer. Specialized in React, Next.js, Node.js, Python, and modern web technologies. Experienced in creating responsive web applications and RESTful APIs.",
  keywords: [
    ...COMMON_ROLE_KEYWORDS_EN,
    ...COMMON_TECH_KEYWORDS.map((tech) => `${tech} Developer`),
    "Computer Science Student",
    ...COMMON_CONCEPTS_EN,
  ],
  ...BASE_CONFIG,
  locale: "en_US",
  alternateLocales: ["de_DE"],
  openGraph: {
    title: "Yazan Abo-Ayash | Full Stack Developer Portfolio",
    description:
      "Junior Full Stack Developer specializing in modern web technologies",
    type: "website",
    image: "/og-image-en.jpg",
    imageAlt: "ColdByDefault Portfolio - Full Stack Developer",
  },
  structured: {
    ...BASE_CONFIG.structured,
    jobTitle: "Full Stack Junior Developer",
    description:
      "Computer Science Student and Full Stack Developer specializing in React, Next.js, Node.js, and Python",
    location: "Germany",
  },
};

// German SEO Configuration
export const seoConfigDE: SEOConfig = {
  title: "Yazan Abo-Ayash | Full Stack Entwickler Portfolio - ColdByDefault",
  description:
    "Full Stack Junior Entwickler & Informatik Student. Spezialisiert auf React, Next.js, Node.js, Python und moderne Webtechnologien. Erfahren in der Entwicklung responsiver Webanwendungen und RESTful APIs.",
  keywords: [
    ...COMMON_ROLE_KEYWORDS_DE,
    ...COMMON_TECH_KEYWORDS.map((tech) => `${tech} Entwickler`),
    "Informatik Student",
    "Webentwicklung Deutschland",
    "Programmierer",
    "Softwareentwickler",
    ...COMMON_CONCEPTS_DE,
  ],
  ...BASE_CONFIG,
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
  structured: {
    ...BASE_CONFIG.structured,
    jobTitle: "Full Stack Junior Entwickler",
    description:
      "Informatik Student und Full Stack Entwickler spezialisiert auf React, Next.js, Node.js und Python",
    location: "Deutschland",
  },
};

// Legal page content data
export const legalPageContent: LegalPageContent = {
  privacy: {
    en: {
      title: "Privacy Policy",
      description:
        "Learn how we collect, use, and protect your personal information on our website.",
      keywords: [
        "privacy policy",
        "data protection",
        "GDPR",
        "personal information",
        "cookies",
      ],
      path: "/privacy",
    },
    de: {
      title: "Datenschutzerklärung",
      description:
        "Erfahren Sie, wie wir Ihre persönlichen Daten auf unserer Website sammeln, verwenden und schützen.",
      keywords: [
        "Datenschutzerklärung",
        "Datenschutz",
        "DSGVO",
        "persönliche Daten",
        "Cookies",
      ],
      path: "/privacy",
    },
  },
  impressum: {
    en: {
      title: "Legal Notice",
      description:
        "Legal information and contact details as required by German law.",
      keywords: [
        "legal notice",
        "impressum",
        "contact information",
        "legal requirements",
      ],
      path: "/impressum",
    },
    de: {
      title: "Impressum",
      description:
        "Rechtliche Informationen und Kontaktdaten nach deutschem Recht.",
      keywords: [
        "Impressum",
        "rechtliche Informationen",
        "Kontaktdaten",
        "Anbieterkennzeichnung",
      ],
      path: "/impressum",
    },
  },
  terms: {
    en: {
      title: "Terms of Service",
      description: "Terms and conditions for using our website and services.",
      keywords: [
        "terms of service",
        "terms and conditions",
        "user agreement",
        "legal terms",
      ],
      path: "/terms",
    },
    de: {
      title: "Nutzungsbedingungen",
      description:
        "Allgemeine Geschäftsbedingungen für die Nutzung unserer Website und Dienste.",
      keywords: [
        "Nutzungsbedingungen",
        "AGB",
        "Nutzungsvereinbarung",
        "rechtliche Bedingungen",
      ],
      path: "/terms",
    },
  },
};

// Media section content data
export const mediaSectionContent: MediaSectionContent = {
  dashboard: {
    en: {
      title: "Media Dashboard",
      description:
        "Central hub for navigating all content and resources including blogs, projects, and more.",
      keywords: [
        "media dashboard",
        "content hub",
        "navigation",
        "portfolio sections",
      ],
      path: "/media",
    },
    de: {
      title: "Medien Dashboard",
      description:
        "Zentrale Anlaufstelle für die Navigation durch alle Inhalte und Ressourcen einschließlich Blogs, Projekte und mehr.",
      keywords: [
        "Medien Dashboard",
        "Content Hub",
        "Navigation",
        "Portfolio Bereiche",
      ],
      path: "/media",
    },
  },
  about: {
    en: {
      title: "About Me - Full Stack Developer",
      description:
        "Learn more about my journey, philosophy, and passion for creating exceptional digital experiences. Currently interning at Avarno GmbH, specializing in Next.js, React, and modern web technologies.",
      keywords: [
        "about",
        "developer",
        "full stack",
        ...COMMON_TECH_KEYWORDS,
        "web development",
        "software engineer",
        "Avarno GmbH",
      ],
      path: "/about",
    },
    de: {
      title: "Über Mich - Full Stack Entwickler",
      description:
        "Erfahren Sie mehr über meinen Werdegang, meine Philosophie und meine Leidenschaft für die Erstellung außergewöhnlicher digitaler Erlebnisse. Derzeit Praktikant bei Avarno GmbH, spezialisiert auf Next.js, React und moderne Webtechnologien.",
      keywords: [
        "über mich",
        "Entwickler",
        "Full Stack",
        ...COMMON_TECH_KEYWORDS,
        "Webentwicklung",
        "Software Ingenieur",
        "Avarno GmbH",
      ],
      path: "/about",
    },
  },
  blog: {
    en: {
      title: "Blog - Web Development & Technology",
      description:
        "Discover articles about web development, programming, and technology. Sharing insights and tutorials on modern development practices.",
      keywords: [
        "blog",
        "articles",
        "tutorials",
        "web development",
        "programming",
        "technology",
        ...COMMON_TECH_KEYWORDS.slice(0, 2), // Just Next.js and React for blog
      ],
      path: "/blog",
    },
    de: {
      title: "Blog - Webentwicklung & Technologie",
      description:
        "Entdecken Sie Artikel über Webentwicklung, Programmierung und Technologie. Teilen von Einblicken und Tutorials zu modernen Entwicklungspraktiken.",
      keywords: [
        "Blog",
        "Artikel",
        "Tutorials",
        "Webentwicklung",
        "Programmierung",
        "Technologie",
        ...COMMON_TECH_KEYWORDS.slice(0, 2), // Just Next.js and React for blog
      ],
      path: "/blog",
    },
  },
  projects: {
    en: {
      title: "Projects - Full Stack Development Showcase",
      description:
        "Explore my portfolio of web development projects, including full-stack applications, React components, and modern web solutions.",
      keywords: [
        "projects",
        "portfolio",
        "web development",
        "full stack",
        ...COMMON_TECH_KEYWORDS.slice(0, 3), // React, Next.js, Node.js
        "applications",
      ],
      path: "/projects",
    },
    de: {
      title: "Projekte - Full Stack Entwicklung Showcase",
      description:
        "Entdecken Sie mein Portfolio von Webentwicklungsprojekten, einschließlich Full-Stack-Anwendungen, React-Komponenten und modernen Web-Lösungen.",
      keywords: [
        "Projekte",
        "Portfolio",
        "Webentwicklung",
        "Full Stack",
        ...COMMON_TECH_KEYWORDS.slice(0, 3), // React, Next.js, Node.js
        "Anwendungen",
      ],
      path: "/projects",
    },
  },
  library: {
    en: {
      title: "Library - Code Resources & Components",
      description:
        "Browse through my collection of reusable components, code snippets, and development resources for modern web applications.",
      keywords: [
        "library",
        "components",
        "code resources",
        "snippets",
        "reusable",
        "web development",
      ],
      path: "/library",
    },
    de: {
      title: "Bibliothek - Code Ressourcen & Komponenten",
      description:
        "Durchstöbern Sie meine Sammlung von wiederverwendbaren Komponenten, Code-Snippets und Entwicklungsressourcen für moderne Webanwendungen.",
      keywords: [
        "Bibliothek",
        "Komponenten",
        "Code Ressourcen",
        "Snippets",
        "wiederverwendbar",
        "Webentwicklung",
      ],
      path: "/library",
    },
  },
};
