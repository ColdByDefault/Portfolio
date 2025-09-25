<div align="center">

# ColdByDefault Portfolio · V4.11.15

Modern, secure, high‑performance developer portfolio built with Next.js 15.5.1, TypeScript, a strongly hardened edge-first architecture & multi‑locale SEO‑optimized delivery.

<img width="990" height="174" alt="Screenshot 2025-08-31 111906" src="https://github.com/user-attachments/assets/2a863d38-e178-42ee-85a9-75010601fb2b" />

**Live:** https://www.coldbydefault.com • **Stack:** Next.js 15.5.1 · React 19.1.1 · TypeScript 5.x · Tailwind 4.1.12 · shadcn/ui · Embla Carousel · Framer Motion 12.x · next-intl 4.3.5 · Prisma ORM · Neon PostgreSQL · Zod · ESLint 9.x · Vercel

</div>

---

v2

[![wakatime](https://wakatime.com/badge/user/c4621892-41e0-4c29-a8bc-05597d124f63/project/dfbc172c-fd3e-46d8-a8b1-31aeec64a895.svg)](https://wakatime.com/badge/user/c4621892-41e0-4c29-a8bc-05597d124f63/project/dfbc172c-fd3e-46d8-a8b1-31aeec64a895)

v3

[![wakatime](https://wakatime.com/badge/user/c4621892-41e0-4c29-a8bc-05597d124f63/project/beb9337a-f033-4377-9e03-26f96c36a41a.svg)](https://wakatime.com/badge/user/c4621892-41e0-4c29-a8bc-05597d124f63/project/beb9337a-f033-4377-9e03-26f96c36a41a)

latest >= 4

[![wakatime](https://wakatime.com/badge/user/c4621892-41e0-4c29-a8bc-05597d124f63/project/76e31353-a33c-4db5-9263-8ede3103f951.svg)](https://wakatime.com/badge/user/c4621892-41e0-4c29-a8bc-05597d124f63/project/76e31353-a33c-4db5-9263-8ede3103f951)

---

## Table of Contents

1. Overview
2. Technology Stack
3. Key Features
4. Internationalization (i18n)
5. SEO & Discoverability
6. Performance & Accessibility
7. Architecture Overview
8. API Surface
9. Security & Hardening
10. GitHub Actions & Automation
11. Privacy & Data Handling
12. Development (Local Setup)
13. Quality & Tooling
14. Roadmap
15. License & Intellectual Property
16. Contact

---

## 1. Overview

This portfolio serves as a professional showcase of engineering capability: performant UI, secure API integrations (GitHub, PageSpeed), accessibility‑focused design, production‑grade hardening, and now multi‑language + deep structured SEO implementation achieving a 100/100 Google Lighthouse SEO score (Sep 2025 validation). All code is proprietary and published strictly for viewing.

---

## 2. Technology Stack

Core:

- Next.js 15.5.1 (App Router, Server Components, Edge runtime where applicable)
- React 19.1.1, TypeScript 5.x (strict mode)
- Tailwind CSS 4.1.12 + PostCSS
- shadcn/ui (accessible primitives)
- Embla Carousel 8.6.0 (modern carousel with autoplay)
- Framer Motion 12.x (animation system)
- next-intl 4.3.5 (runtime + server i18n)
- Vercel Hosting & Edge Network
- Vercel CRON_Jobs (Automated Background Tasks & refresh Data)

Development & Quality:

- ESLint 9.x (flat config system, TypeScript-ESLint integration)
- Strict type checking with zero `any` tolerance
- Enhanced import/export linting and validation
- Comprehensive type coverage for all API interfaces (`AdminStats`, `GitHubData`, `PageSpeedMetrics`)
- Discriminated unions for locale handling and error states

Supporting & Utilities:

- Custom hooks (device, language, theming)
- CSP + HTTP security headers configuration
- Lightweight internal rate limiting & request sanitation
- Structured SEO config & JSON-LD generators
- Zod schema validation for type-safe runtime validation
- Prisma ORM for type-safe database operations
- Neon PostgreSQL for scalable data storage
- Dynamic browser language detection & auto-switching
- Advanced middleware for locale routing & redirections
- Dynamic sitemap & robots.txt generation

---

## 3. Key Features

User Experience & UI:

- Responsive, mobile‑first adaptive layout
- Theme switching (light/dark) with persistence
- Enhanced carousel showcases with autoplay (Embla Carousel 8.6.0)
- Animated hero, project & certification showcases
- Cookie consent banner & localized content (EN / DE / ES / SV / FR)
- Improved accessibility with ARIA support and keyboard navigation
- Browser language auto-detection with intelligent locale switching
- Advanced middleware for seamless locale routing
- Enhanced general styling & visual improvements

Content & Data:

- Dynamic project, technology, and certification data modules
- Real‑time GitHub MCP repository & profile fetch (sanitized & cached)
- Google PageSpeed Insights integration for performance transparency
- Enhanced type-safe API interfaces for all data endpoints
- Blog system with dynamic content management and filtering
- CRUD admin dashboard for comprehensive blog management
- Enhanced blog styling with error handling & fallbacks
- New dedicated pages: /media & /library for content showcase
- Dynamic sitemap & robots.txt generation for improved SEO
- Prisma ORM integration for efficient database operations

Engineering & Quality:

- Modular component architecture (segmented domains: hero, github, projects, tech, seo, ui primitives)
- ESLint 9.x flat config with strict TypeScript integration
- Enhanced type safety and performance optimizations
- Zero-tolerance policy for `any` types across the codebase
- Centralized & locale‑aware SEO handling (`SEOHead`, dynamic OG tags, canonical + `hreflang`)
- Schema.org structured data generation (Person, Breadcrumbs)
- 100/100 Lighthouse SEO score target (validated Sep 2025)
- No hydration warnings / zero console errors goal
- Comprehensive TypeScript coverage (SEO config types, i18n message surfaces, rate limiting utilities)

Security & Privacy (summary):

- Hardened headers, CSP, origin isolation mindset
- Input & error sanitization on API boundaries
- Zero hard‑coded credentials; environment isolation
- Rate limiting to mitigate abuse vectors
- Reinforced type safety to narrow attack surface (literal unions for locales & metadata)

---

## 4. Internationalization (i18n)

Runtime locale negotiation with graceful fallbacks:

- Framework: `next-intl` (server aware, streaming compatible)
- Supported locales: `en`, `de`, `es`, `sv`, `fr`
- Browser Language Detection: Automatic detection & intelligent switching
- Advanced Middleware: Seamless locale routing with proper redirections
- Selection Order: Browser preference → Default `en`
- Message Bundles: JSON under `messages/` (typed access enhancements on roadmap)

---

## 5. SEO & Discoverability

Advanced multi‑locale SEO system delivering consistent structured metadata:

- Config‑driven locale specific SEO objects
- Open Graph & Twitter card variants per locale (images, titles, descriptions)
- JSON-LD generation for Person + BreadcrumbList
- Canonical + alternate `hreflang` tags
- Keyword curation & skill taxonomy powering `knowsAbout`
- Dynamic sitemap.xml generation with automatic locale & page discovery
- Dynamic robots.txt with proper crawling directives
- Enhanced SEO improvements across all pages & components
- CSP‑compatible (no unsafe inline script proliferation)
- Verified 100/100 Lighthouse SEO score (Sep 2025) & 100 PageSpeed Insights SEO metric

---

## 6. Performance & Accessibility

Focus Areas:

- First Meaningful Paint minimization via streaming & selective client components
- Efficient image delivery (static assets + modern formats where suitable)
- Reduced JavaScript footprint (edge/server rendering bias)
- Accessible semantic structure (landmarks, labels, focus states)

---

## 7. Architecture Overview

High‑level structure:

- `app/` — Next.js routing (App Router, layouts, localized paths)
- `components/` — Domain + UI abstraction layers (hero, github, ui primitives, accessibility focus)
- `data/` — Structured static metadata (projects, certifications, tech)
- `lib/` — Cross‑cutting utilities (security, SEO, rate limiting / monitoring)
- `hooks/` — Custom React hooks (language, mobile detection, client gating)
- `public/` — Static assets (images, logos, sitemap, robots)

Design Principles:

- Separation of concerns (data vs presentation)
- Minimal surface area for API routes
- Immutable, typed content modules

---

## 8. API Surface

All endpoints are read-only and sanitized.

| Endpoint         | Purpose                                      | Notes                |
| ---------------- | -------------------------------------------- | -------------------- |
| `/api/about`     | Returns profile / about metadata             | Static + typed       |
| `/api/blog`      | Blog content management and retrieval        | Prisma + Zod         |
| `/api/github`    | Fetches GitHub profile + repos (filtered)    | Tokenized (env)      |
| `/api/pagespeed` | Surfaces PageSpeed metrics                   | External API wrapper |
| `/api/admin`     | Administrative operations for content        | Secured endpoints    |

Controls:

- Input validation & schema constraints with Zod
- Standardized error envelopes (no internal leakage)
- Rate limiting (per IP windowed)
- Type-safe database operations via Prisma ORM

---

## 9. Security & Hardening

Last internal assessment: 2025‑09 (latest iteration) — no known unresolved critical/high issues.

Implemented Layers (expanded in 3.1):

1. Transport & Headers: HSTS, CSP, X-Content-Type-Options, X-Frame-Options (deny), Referrer-Policy, Permissions-Policy.
2. Application: Sanitized inputs, explicit error redaction, avoidance of `eval` / dangerous DOM sinks, reinforced type gates (locale / SEO literal unions) reducing unchecked paths.
3. Operational: Secrets confined to environment variables; repository free of credentials.
4. Abuse Mitigation: IP‑scoped rate limiting on sensitive endpoints.
5. Dependency Hygiene: Routine audit (npm audit) — zero known CVEs at last scan; periodic verification of transitive packages relevant to security headers & i18n.

Security Posture Snapshot:

- Critical: 0
- High: 0
- Medium: 0
- Low/Informational: Monitored

---

## 10. GitHub Actions & Automation

Automated security and quality workflows ensuring code integrity and vulnerability management:

**CodeQL Advanced Security Scanning:**

- **Triggers**: Push to main, pull requests, scheduled weekly
- **Languages**: Actions, JavaScript/TypeScript, Python
- **Purpose**: Static analysis for security vulnerabilities, code quality issues, and potential attack vectors
- **Advanced Features**: Multi-language matrix analysis, configurable query packs, integration with GitHub Security tab

**Dependency Review:**

- **Triggers**: Pull requests to main branch
- **Purpose**: Scans dependency changes for known vulnerabilities and license compliance
- **Features**: Blocks PRs with vulnerable dependencies, provides detailed security reports in PR comments
- **Integration**: Automated comments on pull requests with dependency security analysis

**Vercel CRON Jobs & Automation:**

- **PageSpeed Data Refresh**: Automated background refresh every 12 hours (`0 */12 * * *`)
- **Endpoint**: `/api/pagespeed/refresh` with extended 5-minute execution timeout
- **Purpose**: Keeps PageSpeed Insights data current without user-initiated requests
- **Caching Strategy**: 12-hour cache with 24-hour stale-while-revalidate for optimal performance
- **Vercel Redirections**: Advanced URL redirections & routing optimizations
- **Automated Background Tasks**: Comprehensive automation for data freshness & performance
- **Integration**: Seamless background updates maintaining data freshness for performance transparency

---

## 11. Privacy & Data Handling

- No invasive tracking; minimal analytical surface.
- Cookie consent banner gating non‑essential storage.
- No third‑party ad or profiling scripts.

---

## 12. Development (Local Setup)

Proprietary code; cloning allowed for personal viewing only (no reuse / redistribution).

Prerequisites: Node 20+ (LTS recommended), pnpm or npm.

Install & Run:

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000

Build:

```bash
pnpm build
pnpm start
```

**Quality Assurance:**

```bash
# Run ESLint 9.x with flat config
pnpm lint

# Auto-fix linting issues
pnpm lint:fix

# Check for dependency updates
pnpm test-dep
```

**Blog System & Content Management:**

- Prisma ORM provides type-safe database operations with PostgreSQL
- Zod schema validation ensures runtime type safety for all API inputs
- Neon PostgreSQL offers scalable, managed database infrastructure
- Blog content is dynamically managed through secure admin APIs
- Full CRUD operations with proper validation and error handling

---

## 13. Quality & Tooling

**Development Workflow:**

- Complete migration to ESLint flat config system (`eslint.config.mts`)
- Custom rule configuration for UI components vs. application code
- Enhanced import resolution and React hooks linting
- Zero-tolerance policy for `@typescript-eslint/no-explicit-any`

**UI Component Architecture:**

- New carousel component system using Embla Carousel with autoplay
- Improved component composition patterns
- Better separation of concerns (data vs presentation layers)
- Enhanced accessibility focus states & ARIA coverage

**Development Experience:**

- Enhanced ESLint rules for consistent code patterns
- Improved error boundaries and type-safe error handling
- Better debugging capabilities with structured logging
- Performance monitoring with enhanced PageSpeed integration

---

## 14. Roadmap

- Expand localization (additional languages beyond 4; automated missing key detection)
- Further edge caching tuning & RUM instrumentation (privacy‑preserving)
- Enhanced visual regression / accessibility automation
- Add selective metrics dashboard (anonymized)
- Structured data expansion (Projects, Certifications)

---

## 15. License & Intellectual Property

Copyright © 2025 ColdByDefault. All rights reserved.

This repository is provided exclusively for viewing professional capability.

Restrictions (Summary):

- No copying, modification, redistribution, or derivative works.
- No commercial or personal reuse of code, assets, or design patterns.
- Use beyond viewing requires explicit prior written permission.

Refer to `LICENSE` & `COPYRIGHT` files for formal wording.

---

## 16. Contact

Portfolio: https://www.coldbydefault.com
Email: contact@coldbydefault.com
Linktree: https://linktr.ee/ColdByDefault  
For professional or security inquiries, reach out via the official channels listed above.

---

> Security research note: Responsible disclosure practices appreciated. Do not attempt exploitation against production infrastructure.
