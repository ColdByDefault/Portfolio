<div align="center">

# ColdByDefault Portfolio · V4.0.0

Modern, secure, high‑performance developer portfolio built with Next.js 15, TypeScript, a strongly hardened edge-first architecture & multi‑locale SEO‑optimized delivery.

<img width="966" height="174" alt="image" src="https://github.com/user-attachments/assets/de1d9284-c385-4e15-9956-2781e583d66a" />


**Live:** https://www.coldbydefault.com • **Stack:** Next.js 15.5.1 · React 19 · TypeScript 5.x · Tailwind 4.1.12 · shadcn/ui · Embla Carousel · Framer Motion 12.x · next-intl 4.3.5 · ESLint 9.x · Vercel

</div>

---

v1

[![wakatime](https://wakatime.com/badge/user/c4621892-41e0-4c29-a8bc-05597d124f63/project/3cb24b80-9d06-4466-8578-315c61711973.svg)](https://wakatime.com/badge/user/c4621892-41e0-4c29-a8bc-05597d124f63/project/3cb24b80-9d06-4466-8578-315c61711973)

v2.0

[![wakatime](https://wakatime.com/badge/user/c4621892-41e0-4c29-a8bc-05597d124f63/project/d3d8e2c4-74f2-466b-a1eb-dd374fbd72a6.svg)](https://wakatime.com/badge/user/c4621892-41e0-4c29-a8bc-05597d124f63/project/d3d8e2c4-74f2-466b-a1eb-dd374fbd72a6)

v2.2

[![wakatime](https://wakatime.com/badge/user/c4621892-41e0-4c29-a8bc-05597d124f63/project/dfbc172c-fd3e-46d8-a8b1-31aeec64a895.svg)](https://wakatime.com/badge/user/c4621892-41e0-4c29-a8bc-05597d124f63/project/dfbc172c-fd3e-46d8-a8b1-31aeec64a895)

v3.0

[![wakatime](https://wakatime.com/badge/user/c4621892-41e0-4c29-a8bc-05597d124f63/project/beb9337a-f033-4377-9e03-26f96c36a41a.svg)](https://wakatime.com/badge/user/c4621892-41e0-4c29-a8bc-05597d124f63/project/beb9337a-f033-4377-9e03-26f96c36a41a)

v3.2

[![wakatime](https://wakatime.com/badge/user/c4621892-41e0-4c29-a8bc-05597d124f63/project/79c9876c-acce-48e7-b661-264f4bf514a5.svg)](https://wakatime.com/badge/user/c4621892-41e0-4c29-a8bc-05597d124f63/project/79c9876c-acce-48e7-b661-264f4bf514a5)

latest 3.4~

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
10. Privacy & Data Handling
11. Development (Local Setup)
12. Quality & Tooling
13. Version 4.0.0 Updates
14. Roadmap
15. License & Intellectual Property
16. Contact

---

## 1. Overview

This portfolio serves as a professional showcase of engineering capability: performant UI, secure API integrations (GitHub, PageSpeed), accessibility‑focused design, production‑grade hardening, and now multi‑language + deep structured SEO implementation achieving a 100/100 Google Lighthouse SEO score (Aug 2025 validation). All code is proprietary and published strictly for viewing.

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

Development & Quality:

- ESLint 9.x (flat config system, TypeScript-ESLint integration)
- Modern plugin architecture (React, Next.js, Import resolver)
- Strict type checking with zero `any` tolerance
- Enhanced import/export linting and validation

Supporting & Utilities:

- Custom hooks (device, language, theming)
- CSP + HTTP security headers configuration
- Lightweight internal rate limiting & request sanitation
- Structured SEO config & JSON-LD generators

---

## 3. Key Features

User Experience & UI:

- Responsive, mobile‑first adaptive layout
- Theme switching (light/dark) with persistence
- Enhanced carousel showcases with autoplay (Embla Carousel 8.6.0)
- Animated hero, project & certification showcases
- Cookie consent banner & localized content (EN / DE / ES / SV)
- Improved accessibility with ARIA support and keyboard navigation

Content & Data:

- Dynamic project, technology, and certification data modules
- Real‑time GitHub MCP repository & profile fetch (sanitized & cached)
- Google PageSpeed Insights integration for performance transparency
- Enhanced type-safe API interfaces for all data endpoints

Engineering & Quality:

- Modular component architecture (segmented domains: hero, github, projects, tech, seo, ui primitives)
- ESLint 9.x flat config with strict TypeScript integration
- React 19 with enhanced type safety and performance optimizations
- Zero-tolerance policy for `any` types across the codebase
- Centralized & locale‑aware SEO handling (`SEOHead`, dynamic OG tags, canonical + `hreflang`)
- Schema.org structured data generation (Person, Breadcrumbs)
- 100/100 Lighthouse SEO score target (validated Aug 2025)
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
- Supported locales: `en`, `de`, `es`, `sv`
- Selection Order: Cookie (`PORTFOLIOVERSIONLATEST_LOCALE`) → Browser language (2‑char) → Default `en`
- Client Switch: Dropdown triggers `router.refresh()` to re-render server components
- Message Bundles: JSON under `messages/` (typed access enhancements on roadmap)

Planned i18n Enhancements:

- Static type inference for message keys (prevent drift)
- CI lint to detect untranslated / orphaned keys
- Locale‑segmented sitemap & RSS generation

---

## 5. SEO & Discoverability

Advanced multi‑locale SEO system delivering consistent structured metadata:

- Config‑driven locale specific SEO objects (`seoConfigEN`, `seoConfigDE`, etc.)
- Open Graph & Twitter card variants per locale (images, titles, descriptions)
- JSON-LD generation for Person + BreadcrumbList
- Canonical + alternate `hreflang` tags
- Keyword curation & skill taxonomy powering `knowsAbout`
- CSP‑compatible (no unsafe inline script proliferation)
- Verified 100/100 Lighthouse SEO score (Aug 2025) & 100 PageSpeed Insights SEO metric

Upcoming SEO Roadmap:

- Project & Certification structured data
- Automated keyword coverage tests
- Locale‑partitioned dynamic sitemap

---

## 6. Performance & Accessibility

Focus Areas:

- First Meaningful Paint minimization via streaming & selective client components
- Efficient image delivery (static assets + modern formats where suitable)
- Reduced JavaScript footprint (edge/server rendering bias)
- Accessible semantic structure (landmarks, labels, focus states)

Additional Optimizations:

- Preconnect & DNS-prefetch where impactful
- Tailwind purge for minimal CSS payload
- Motion reduced gracefully for `prefers-reduced-motion`

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
- Immutable, typed content modules vs runtime DB dependency

---

## 8. API Surface

All endpoints are read-only and sanitized.

| Endpoint         | Purpose                                      | Notes                |
| ---------------- | -------------------------------------------- | -------------------- |
| `/api/about`     | Returns profile / about metadata             | Static + typed       |
| `/api/contact`   | Securely handles contact intent (anti‑abuse) | Rate limited         |
| `/api/github`    | Fetches GitHub profile + repos (filtered)    | Tokenized (env)      |
| `/api/pagespeed` | Surfaces PageSpeed metrics                   | External API wrapper |

Controls:

- Input validation & schema constraints
- Standardized error envelopes (no internal leakage)
- Rate limiting (per IP windowed)

---

## 9. Security & Hardening

Last internal assessment: 2025‑08 (latest iteration) — no known unresolved critical/high issues.

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

Checklist Summary:

- [x] CSP policy enforced
- [x] Headers baseline hardened
- [x] Input & output sanitation
- [x] Secret isolation (no checked‑in secrets)
- [x] Rate limit & abuse monitoring
- [x] XSS & injection surface minimized (no SQL layer, no dynamic eval)
- [x] Locale input constrained to explicit allow‑list

---

## 10. Privacy & Data Handling

- No invasive tracking; minimal analytical surface.
- Cookie consent banner gating non‑essential storage.
- No third‑party ad or profiling scripts.
- Contact submissions (if enabled) are transient and not persisted long‑term.

---

## 11. Development (Local Setup)

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

---

## 12. Quality & Tooling

**ESLint 9.x Migration & Enhanced Type Safety (4.0.0):**

- Complete migration to ESLint flat config system (`eslint.config.mts`)
- Upgraded to ESLint 9.x with modern plugin architecture
- Comprehensive TypeScript-ESLint integration with strict type checking
- Enhanced import resolution and React hooks linting
- Custom rule configuration for UI components vs. application code
- Zero-tolerance policy for `@typescript-eslint/no-explicit-any`

**Type Safety Improvements:**

- Upgraded to React 19 with enhanced type definitions
- TypeScript 5.x with stricter configuration
- Comprehensive type coverage for all API interfaces (`AdminStats`, `GitHubData`, `PageSpeedMetrics`)
- Discriminated unions for locale handling and error states
- Enhanced type safety in internationalization with proper message key inference

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

## 13. Version 4.0.0 Updates

**Major ESLint Architecture Overhaul:**

- **ESLint 9.x Migration**: Complete migration from legacy `.eslintrc` to modern flat config (`eslint.config.mts`)
- **Enhanced Plugin Integration**: Updated to latest TypeScript-ESLint, React, and Next.js plugins with proper flat config support
- **Strict Type Checking**: Implemented zero-tolerance policy for `@typescript-eslint/no-explicit-any` across the codebase
- **Import Resolution**: Enhanced import/export linting with proper alias support and module resolution
- **Component-Specific Rules**: Different ESLint configurations for UI components vs. application code

**React 19 & TypeScript 5.x Upgrade:**

- **React 19**: Full migration to React 19 with enhanced type definitions and improved performance
- **TypeScript 5.x**: Upgraded to latest TypeScript with stricter configuration and better inference
- **Type Safety**: Comprehensive type coverage for all API interfaces, including `AdminStats`, `GitHubData`, and `PageSpeedMetrics`
- **Discriminated Unions**: Enhanced type safety for locale handling and error states

**New Carousel System:**

- **Embla Carousel Integration**: Added professional carousel component using Embla Carousel v8.6.0
- **Autoplay Support**: Implemented smooth autoplay functionality with pause on hover
- **Responsive Design**: Mobile-first carousel implementation with touch/swipe support
- **Accessibility**: Full keyboard navigation and screen reader support

**Enhanced Component Architecture:**

- **Improved Separation**: Better distinction between data and presentation layers
- **Composition Patterns**: Enhanced component composition with better prop interfaces
- **Performance**: Optimized re-renders with proper memoization and state management
- **Error Boundaries**: Type-safe error handling throughout the component tree

**Development Experience Improvements:**

- **Modern Tooling**: Updated all development dependencies to latest stable versions
- **Build Performance**: Enhanced build pipeline with better caching strategies
- **Type Coverage**: Improved TypeScript coverage across all modules
- **Code Quality**: Stricter linting rules ensuring consistent code patterns

**API & Backend Enhancements:**

- **Type-Safe APIs**: All API routes now have comprehensive TypeScript interfaces
- **Enhanced Error Handling**: Standardized error responses with proper type safety
- **Better Validation**: Improved input validation using discriminated unions
- **Performance**: Optimized API response caching and data fetching strategies

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
Linktree: https://linktr.ee/ColdByDefault  
For professional or security inquiries, reach out via the official channels listed above.

---

> Security research note: Responsible disclosure practices appreciated. Do not attempt exploitation against production infrastructure.
