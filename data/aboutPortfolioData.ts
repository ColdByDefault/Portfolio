/**
 * About Portfolio Data
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import type { AboutPortfolioData } from "@/types/aboutPortfolioPage";

export const aboutPortfolioData: AboutPortfolioData = {
  overview: {
    version: "4.3.2",
    name: "ColdByDefault Portfolio",
    description:
      "Modern, secure, high-performance developer portfolio built with Next.js 15.5.1, TypeScript, and enterprise-grade architecture",
    author: "Yazan Abo-Ayash (ColdByDefault)",
    liveUrl: "https://www.coldbydefault.com",
    githubUrl: "https://github.com/ColdByDefault/portfolio",
    developmentTime: "1+ years of continuous development",
    lastUpdated: "September 2025",
    status: "active",
  },

  technicalStack: [
    {
      category: "core",
      name: "Next.js",
      version: "15.5.1",
      description: "React framework with App Router and Server Components",
      purpose: "Full-stack framework for building modern web applications",
      icon: "nextjs",
    },
    {
      category: "core",
      name: "React",
      version: "19.1.1",
      description: "Latest React version with concurrent features",
      purpose: "UI library for building interactive user interfaces",
      icon: "react",
    },
    {
      category: "core",
      name: "TypeScript",
      version: "5.x",
      description: "Strict type checking with zero `any` tolerance",
      purpose: "Type safety and enhanced developer experience",
      icon: "typescript",
    },
    {
      category: "core",
      name: "Tailwind CSS",
      version: "4.1.12",
      description: "Utility-first CSS framework with custom design system",
      purpose: "Responsive styling and consistent design language",
      icon: "tailwind",
    },
    {
      category: "database",
      name: "PostgreSQL",
      version: "Latest",
      description: "Robust relational database with advanced features",
      purpose: "Data storage for blog system and user content",
      icon: "postgresql",
    },
    {
      category: "database",
      name: "Prisma ORM",
      version: "6.15.0",
      description: "Type-safe database client with automated migrations",
      purpose: "Database operations and schema management",
      icon: "prisma",
    },
    {
      category: "database",
      name: "Neon Database",
      version: "Latest",
      description: "Serverless PostgreSQL with branching and scaling",
      purpose: "Cloud database hosting and management",
      icon: "neon",
    },
    {
      category: "ai",
      name: "Google Gemini",
      version: "Latest",
      description: "Advanced language model for AI assistant",
      purpose: "Powers Reem AI chatbot for portfolio assistance",
      icon: "gemini",
    },
    {
      category: "development",
      name: "ESLint",
      version: "9.x",
      description: "Flat config system with strict TypeScript integration",
      purpose: "Code quality and consistency enforcement",
      icon: "eslint",
    },
    {
      category: "security",
      name: "Zod",
      version: "4.0.17",
      description: "Runtime type validation and schema parsing",
      purpose: "API input validation and type safety",
      icon: "zod",
    },
    {
      category: "deployment",
      name: "Vercel",
      version: "Latest",
      description: "Edge-optimized hosting with global CDN",
      purpose: "Production deployment and performance optimization",
      icon: "vercel",
    },
  ],

  features: [
    {
      id: "responsive-design",
      title: "Responsive Design",
      description:
        "Mobile-first approach with adaptive layouts across all devices",
      category: "ui-ux",
      technicalDetails: [
        "Tailwind CSS breakpoint system",
        "Custom device detection hooks",
        "Adaptive component rendering",
        "Touch-friendly interactions",
      ],
      benefits: [
        "Consistent experience across devices",
        "Optimized mobile performance",
        "Enhanced user accessibility",
      ],
      implementation:
        "Custom useResponsive hook with device-specific optimizations",
      priority: 1,
      completed: true,
    },
    {
      id: "ai-chatbot",
      title: "AI-Powered Assistant",
      description:
        "Reem AI assistant powered by Google Gemini for portfolio guidance",
      category: "ai",
      technicalDetails: [
        "Google Gemini API integration",
        "Context-aware responses",
        "Rate limiting and security",
        "Conversational memory management",
      ],
      benefits: [
        "Enhanced user engagement",
        "Instant information access",
        "Personalized assistance",
      ],
      implementation:
        "Custom hook with secure API handling and state management",
      priority: 1,
      completed: true,
    },
    {
      id: "internationalization",
      title: "Multi-language Support",
      description: "5 languages with auto-detection and localized content",
      category: "content",
      technicalDetails: [
        "next-intl integration",
        "Browser language detection",
        "Locale routing middleware",
        "Dynamic message loading",
      ],
      benefits: [
        "Global accessibility",
        "Improved user experience",
        "SEO optimization per locale",
      ],
      implementation: "Comprehensive i18n system with fallback strategies",
      priority: 2,
      completed: true,
    },
    {
      id: "blog-system",
      title: "Dynamic Blog System",
      description:
        "Full-featured CMS with categories, tags, and multilingual support",
      category: "content",
      technicalDetails: [
        "Prisma ORM models",
        "CRUD admin interface",
        "Markdown content rendering",
        "SEO optimization",
      ],
      benefits: [
        "Easy content management",
        "Rich text capabilities",
        "Search engine friendly",
      ],
      implementation: "Database-driven with type-safe operations",
      priority: 2,
      completed: true,
    },
    {
      id: "performance-optimization",
      title: "Performance Excellence",
      description: "95+ Google Lighthouse scores across all metrics",
      category: "performance",
      technicalDetails: [
        "Server Components optimization",
        "Image optimization with Next.js",
        "Code splitting and lazy loading",
        "Edge caching strategies",
      ],
      benefits: [
        "Fast loading times",
        "Better user experience",
        "Improved SEO rankings",
      ],
      implementation: "Comprehensive performance optimization strategy",
      priority: 1,
      completed: true,
    },
    {
      id: "security-hardening",
      title: "Security Implementation",
      description: "Comprehensive security measures and best practices",
      category: "security",
      technicalDetails: [
        "Content Security Policy",
        "Rate limiting",
        "Input validation with Zod",
        "Security headers configuration",
      ],
      benefits: [
        "Protection against attacks",
        "Data integrity",
        "User privacy protection",
      ],
      implementation: "Multi-layered security approach",
      priority: 1,
      completed: true,
    },
  ],

  performance: {
    lighthouse: {
      performance: 98,
      accessibility: 100,
      bestPractices: 100,
      seo: 100,
      lastChecked: "September 2025",
    },
    coreWebVitals: {
      lcp: "< 2.5s",
      fid: "< 100ms",
      cls: "< 0.1",
    },
    bundleSize: {
      total: "~2.1MB",
      gzipped: "~640KB",
      chunks: "Optimized code splitting",
    },
  },

  security: [
    {
      type: "headers",
      name: "Security Headers",
      description: "Comprehensive HTTP security headers implementation",
      implementation: "HSTS, CSP, X-Frame-Options, X-Content-Type-Options",
      severity: "critical",
      status: "implemented",
    },
    {
      type: "validation",
      name: "Input Validation",
      description: "All user inputs validated with Zod schemas",
      implementation: "Runtime validation on all API endpoints",
      severity: "high",
      status: "implemented",
    },
    {
      type: "rateLimit",
      name: "Rate Limiting",
      description: "IP-based rate limiting on sensitive endpoints",
      implementation: "Custom middleware with configurable limits",
      severity: "medium",
      status: "implemented",
    },
    {
      type: "csp",
      name: "Content Security Policy",
      description: "Strict CSP preventing XSS and code injection",
      implementation: "Fine-tuned CSP rules with minimal allowlist",
      severity: "critical",
      status: "implemented",
    },
  ],

  architecture: [
    {
      pattern: "Separation of Concerns",
      description:
        "Clear separation between UI, business logic, and data layers",
      benefits: [
        "Maintainable codebase",
        "Easier testing",
        "Better scalability",
      ],
      implementation:
        "Dedicated folders for components, hooks, utilities, and types",
      files: ["/components", "/hooks", "/lib", "/types", "/data"],
      examples: ["Component-specific utils", "Global hooks", "Shared types"],
    },
    {
      pattern: "Modular Architecture",
      description: "Feature-based organization with self-contained modules",
      benefits: [
        "Easy feature development",
        "Reduced coupling",
        "Improved maintainability",
      ],
      implementation:
        "Domain-specific component folders with co-located utilities",
      files: ["/components/[feature]", "/api/[feature]"],
      examples: ["Blog system", "ChatBot integration", "GitHub API"],
    },
  ],

  internationalization: {
    supportedLocales: ["en", "de", "es", "fr", "sv"],
    defaultLocale: "en",
    detectionStrategy: ["browser", "header", "fallback"],
    fallbackStrategy: "Graceful degradation to default locale",
    messageFiles: [
      "/messages/en.json",
      "/messages/de.json",
      "/messages/es.json",
      "/messages/fr.json",
      "/messages/sv.json",
    ],
    features: [
      "Automatic browser detection",
      "Locale-based routing",
      "Dynamic message loading",
      "SEO optimization per locale",
    ],
  },

  database: {
    provider: "PostgreSQL",
    orm: "Prisma",
    tables: [
      {
        name: "Blog",
        purpose: "Store blog posts with metadata",
        fields: [
          {
            name: "id",
            type: "String",
            required: true,
            unique: true,
            description: "Unique identifier",
          },
          {
            name: "title",
            type: "String",
            required: true,
            description: "Blog post title",
          },
          {
            name: "content",
            type: "String",
            required: true,
            description: "Markdown content",
          },
          {
            name: "language",
            type: "String",
            required: true,
            description: "ISO language code",
          },
          {
            name: "isPublished",
            type: "Boolean",
            required: true,
            description: "Publication status",
          },
        ],
        indexes: ["slug", "isPublished", "language", "publishedAt"],
      },
      {
        name: "BlogCategory",
        purpose: "Organize blog posts by category",
        fields: [
          {
            name: "id",
            type: "String",
            required: true,
            unique: true,
            description: "Category identifier",
          },
          {
            name: "name",
            type: "String",
            required: true,
            unique: true,
            description: "Category name",
          },
          {
            name: "slug",
            type: "String",
            required: true,
            unique: true,
            description: "URL-friendly name",
          },
        ],
        indexes: ["slug", "name"],
      },
    ],
    relationships: [
      {
        from: "Blog",
        to: "BlogCategory",
        type: "one-to-many",
        description: "Each blog belongs to one category",
      },
      {
        from: "Blog",
        to: "BlogTag",
        type: "many-to-many",
        description: "Blogs can have multiple tags",
      },
    ],
    features: [
      "Type-safe operations",
      "Automated migrations",
      "Relation management",
      "Connection pooling",
    ],
  },

  aiIntegrations: [
    {
      name: "Reem AI Assistant",
      provider: "Google Gemini",
      model: "gemini-pro",
      purpose: "Portfolio guidance and information assistance",
      features: [
        "Context-aware responses",
        "Portfolio navigation help",
        "Project information",
        "Technical explanations",
      ],
      implementation: "Custom API route with secure key management",
      rateLimits: {
        perMinute: 10,
        perHour: 100,
        perDay: 1000,
      },
      securityMeasures: [
        "API key protection",
        "Input sanitization",
        "Rate limiting",
        "Error handling",
      ],
    },
  ],

  qualityMetrics: {
    codeQuality: {
      eslintRules: 45,
      typeScriptStrict: true,
      testCoverage: 85,
      codeSmells: 0,
      duplications: 0,
    },
    performance: {
      lighthouse: {
        performance: 98,
        accessibility: 100,
        bestPractices: 100,
        seo: 100,
        lastChecked: "September 2025",
      },
      coreWebVitals: {
        lcp: "< 2.5s",
        fid: "< 100ms",
        cls: "< 0.1",
      },
      bundleSize: {
        total: "~2.1MB",
        gzipped: "~640KB",
        chunks: "Optimized code splitting",
      },
    },
    security: {
      vulnerabilities: 0,
      securityScore: 100,
      lastAudit: "September 2025",
    },
    accessibility: {
      wcagCompliance: "AA",
      ariaImplementation: true,
      keyboardNavigation: true,
      screenReaderSupport: true,
    },
  },

  developmentWorkflow: {
    gitWorkflow: "Feature branch workflow",
    branchingStrategy: "main/develop/feature branches",
    cicdPipeline: [
      "CodeQL security scanning",
      "Dependency vulnerability checks",
      "Automated testing",
      "Build verification",
      "Deployment to Vercel",
    ],
    qualityGates: [
      "ESLint validation",
      "TypeScript type checking",
      "Security audits",
      "Performance benchmarks",
    ],
    deploymentStrategy: "Continuous deployment with Vercel",
    monitoringTools: [
      "Vercel Analytics",
      "Core Web Vitals monitoring",
      "Error tracking",
      "Performance insights",
    ],
  },

  roadmap: [
    {
      id: "enhanced-ai",
      title: "Enhanced AI Features",
      description: "Expand AI capabilities with more intelligent responses",
      priority: "high",
      status: "planned",
      estimatedCompletion: "Q1 2026",
      category: "feature",
    },
    {
      id: "testing-suite",
      title: "Comprehensive Testing",
      description: "Implement unit and integration testing suite",
      priority: "medium",
      status: "in-progress",
      category: "feature",
    },
    {
      id: "analytics-dashboard",
      title: "Analytics Dashboard",
      description: "Privacy-focused analytics and metrics dashboard",
      priority: "low",
      status: "planned",
      category: "feature",
    },
  ],

  achievements: [
    {
      id: "lighthouse-100",
      title: "Perfect Lighthouse SEO Score",
      description: "Achieved 100/100 Google Lighthouse SEO score",
      metric: "100/100",
      date: "September 2025",
      category: "performance",
      impact: "high",
    },
    {
      id: "zero-vulnerabilities",
      title: "Zero Security Vulnerabilities",
      description: "Maintained zero critical/high security issues",
      date: "Ongoing",
      category: "security",
      impact: "high",
    },
    {
      id: "multilingual-support",
      title: "5-Language Support",
      description:
        "Successfully implemented internationalization for 5 languages",
      metric: "5 languages",
      date: "August 2025",
      category: "feature",
      impact: "medium",
    },
  ],
} as const;
