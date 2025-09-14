/**
 * SEO configuration and metadata generation utilities
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import type { TwitterCardType } from "@/types/metadata";
import type { Blog, BlogSEO, BlogStructuredData } from "@/types/blogs";

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
    "Junior Full Stack Developer. Specialized in React, Next.js, Node.js, Python, and modern web technologies. Experienced in creating responsive web applications and RESTful APIs.",
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
      "Junior Full Stack Developer specializing in modern web technologies",
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

/**
 * Generate SEO metadata for blog posts
 */
export function generateBlogSEO(blog: Blog, locale: string = "en"): BlogSEO {
  const config = locale === "de" ? seoConfigDE : seoConfigEN;
  const baseUrl = config.siteUrl;

  // Create title with fallback
  const blogTitle = blog.metaTitle || blog.title;
  const fullTitle = `${blogTitle} | ${config.siteName}`;

  // Create description with fallback
  const description =
    blog.metaDescription ||
    blog.excerpt ||
    `Read "${blog.title}" on ${config.siteName}. ${config.description}`;

  // Generate keywords from tags and categories
  const keywords = [
    ...config.keywords,
    ...(blog.tags?.map((tagRel) => tagRel.tag?.name).filter(Boolean) || []),
    blog.category?.name,
    blog.title.split(" ").slice(0, 3), // First 3 words of title
  ].filter(Boolean) as string[];

  // Canonical URL
  const canonicalUrl = `${baseUrl}/blog/${blog.slug}`;

  // Open Graph image with fallback
  const ogImage = blog.featuredImage || `${baseUrl}/og-blog-default.jpg`;

  return {
    title: fullTitle,
    description: description.slice(0, 160), // Meta description limit
    keywords: [...new Set(keywords)], // Remove duplicates
    canonicalUrl,
    ogImage,
    ogTitle: blogTitle,
    ogDescription: description.slice(0, 200), // OG description can be longer
    twitterTitle: blogTitle,
    twitterDescription: description.slice(0, 120), // Twitter description limit
    twitterImage: ogImage,
    structuredData: generateBlogStructuredData(blog, config),
  };
}

/**
 * Generate structured data for blog posts
 */
export function generateBlogStructuredData(
  blog: Blog,
  config: SEOConfig
): BlogStructuredData {
  const baseUrl = config.siteUrl;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt || blog.metaDescription || "",
    image: blog.featuredImage ? `${baseUrl}${blog.featuredImage}` : undefined,
    author: {
      "@type": "Person",
      name: config.structured.name,
      url: config.structured.github,
    },
    publisher: {
      "@type": "Organization",
      name: config.siteName,
      logo: `${baseUrl}/logo.png`,
    },
    datePublished:
      blog.publishedAt?.toISOString() || blog.createdAt.toISOString(),
    dateModified: blog.updatedAt.toISOString(),
    url: `${baseUrl}/blog/${blog.slug}`,
    mainEntityOfPage: `${baseUrl}/blog/${blog.slug}`,
    wordCount: blog.content.split(/\s+/).length,
    timeRequired: blog.readingTime ? `PT${blog.readingTime}M` : undefined,
    keywords: [
      ...(blog.tags?.map((tagRel) => tagRel.tag?.name).filter(Boolean) || []),
      blog.category?.name,
    ].filter((keyword): keyword is string => Boolean(keyword)),
    articleSection: blog.category?.name,
    about: blog.category?.description,
  };
}

/**
 * Generate SEO metadata for blog list page
 */
export function generateBlogListSEO(
  page: number = 1,
  category?: string,
  tag?: string,
  search?: string,
  locale: string = "en"
): BlogSEO {
  const config = locale === "de" ? seoConfigDE : seoConfigEN;
  const baseUrl = config.siteUrl;

  let title = locale === "de" ? "Blog" : "Blog";
  let description =
    locale === "de"
      ? "Entdecken Sie Artikel über Webentwicklung, Programmierung und Technologie."
      : "Discover articles about web development, programming, and technology.";

  // Customize based on filters
  if (category) {
    title = `${category} ${locale === "de" ? "Artikel" : "Articles"}`;
    description =
      locale === "de"
        ? `Alle Artikel in der Kategorie ${category}.`
        : `All articles in the ${category} category.`;
  }

  if (tag) {
    title = `${tag} ${locale === "de" ? "Artikel" : "Articles"}`;
    description =
      locale === "de"
        ? `Artikel mit dem Tag ${tag}.`
        : `Articles tagged with ${tag}.`;
  }

  if (search) {
    title = `${locale === "de" ? "Suche" : "Search"}: ${search}`;
    description =
      locale === "de"
        ? `Suchergebnisse für "${search}".`
        : `Search results for "${search}".`;
  }

  if (page > 1) {
    title += ` - ${locale === "de" ? "Seite" : "Page"} ${page}`;
  }

  const fullTitle = `${title} | ${config.siteName}`;
  const canonicalUrl = `${baseUrl}/blog${page > 1 ? `?page=${page}` : ""}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      ...config.keywords,
      "blog",
      "articles",
      "tutorials",
      "web development",
      "programming",
    ],
    canonicalUrl,
    ogTitle: title,
    ogDescription: description,
    ogImage: `${baseUrl}/og-blog-list.jpg`,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: `${baseUrl}/og-blog-list.jpg`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      url: canonicalUrl,
      author: {
        "@type": "Person",
        name: config.structured.name,
        url: config.structured.github,
      },
      publisher: {
        "@type": "Organization",
        name: config.siteName,
        logo: `${baseUrl}/logo.png`,
      },
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
    } as BlogStructuredData,
  };
}

/**
 * Generate SEO metadata for legal pages (privacy, terms, impressum)
 */
export function generateLegalPageSEO(
  pageType: "privacy" | "impressum" | "terms",
  locale: string = "en"
) {
  const config = locale === "de" ? seoConfigDE : seoConfigEN;
  const baseUrl = config.siteUrl;

  const pageContent = {
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

  const currentLang = locale === "de" ? "de" : "en";
  const content = pageContent[pageType][currentLang];
  const fullTitle = `${content.title} | ${config.siteName}`;
  const canonicalUrl = `${baseUrl}${content.path}`;

  return {
    title: {
      default: fullTitle,
      template: `%s | ${config.siteName}`,
    },
    description: content.description,
    keywords: [...config.keywords, ...content.keywords],
    authors: [{ name: config.author }],
    creator: config.author,
    publisher: config.siteName,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}${content.path}`,
        de: `${baseUrl}/de${content.path}`,
      },
    },
    openGraph: {
      title: content.title,
      description: content.description,
      url: canonicalUrl,
      siteName: config.siteName,
      type: "website",
      locale: config.locale,
      images: [
        {
          url: `${baseUrl}/og-legal.jpg`,
          width: 1200,
          height: 630,
          alt: `${content.title} - ${config.siteName}`,
        },
      ],
    },
    twitter: {
      card: config.twitter.cardType,
      title: content.title,
      description: content.description,
      creator: config.twitter.handle,
      images: [`${baseUrl}/og-legal.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },
  };
}

/**
 * Generate SEO metadata for media section pages
 */
export function generateMediaSectionSEO(
  section: "dashboard" | "about" | "blog" | "projects" | "library",
  locale: string = "en"
) {
  const config = locale === "de" ? seoConfigDE : seoConfigEN;
  const baseUrl = config.siteUrl;

  const sectionContent = {
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
          "Next.js",
          "React",
          "JavaScript",
          "TypeScript",
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
          "Next.js",
          "React",
          "JavaScript",
          "TypeScript",
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
          "Next.js",
          "React",
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
          "Next.js",
          "React",
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
          "React",
          "Next.js",
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
          "React",
          "Next.js",
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

  const currentLang = locale === "de" ? "de" : "en";
  const content = sectionContent[section][currentLang];
  const fullTitle = `${content.title} | ${config.siteName}`;
  const canonicalUrl = `${baseUrl}${content.path}`;

  return {
    title: {
      default: fullTitle,
      template: `%s | ${config.siteName}`,
    },
    description: content.description,
    keywords: [...config.keywords, ...content.keywords],
    authors: [{ name: config.author }],
    creator: config.author,
    publisher: config.siteName,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}${content.path}`,
        de: `${baseUrl}/de${content.path}`,
      },
    },
    openGraph: {
      title: content.title,
      description: content.description,
      url: canonicalUrl,
      siteName: config.siteName,
      type: "website",
      locale: config.locale,
      images: [
        {
          url: `${baseUrl}/og-${section}.jpg`,
          width: 1200,
          height: 630,
          alt: `${content.title} - ${config.siteName}`,
        },
      ],
    },
    twitter: {
      card: config.twitter.cardType,
      title: content.title,
      description: content.description,
      creator: config.twitter.handle,
      images: [`${baseUrl}/og-${section}.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },
  };
}
