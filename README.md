<div align="center">

# ColdByDefault Portfolio · V3

Modern, secure, high‑performance developer portfolio built with Next.js 15, TypeScript, and a strongly hardened edge-first architecture.

<img width="974" height="170" alt="Lighthouse Score Screenshot" src="https://github.com/user-attachments/assets/226d0556-b09e-49a6-9499-2217b6fcfec5" />

**Live:** https://www.coldbydefault.com • **Stack:** Next.js 15 · TypeScript · Tailwind · shadcn/ui · Framer Motion · Vercel

</div>

---

## Table of Contents

1. Overview
2. Technology Stack
3. Key Features
4. Performance & Accessibility
5. Architecture Overview
6. API Surface
7. Security & Hardening
8. Privacy & Data Handling
9. Development (Local Setup)
10. Quality & Tooling
11. Roadmap
12. License & Intellectual Property
13. Contact

---

## 1. Overview

This portfolio serves as a professional showcase of engineering capability: performant UI, secure API integrations (GitHub, Pagespeed), accessibility‑focused design, and production‑grade hardening typically reserved for larger applications. All code is proprietary and published strictly for viewing.

---

## 2. Technology Stack

Core:

- Next.js 15 (App Router, Server Components, Edge runtime where applicable)
- TypeScript (strict mode)
- Tailwind CSS + PostCSS
- shadcn/ui (accessible primitives)
- Framer Motion (animation system)
- Vercel Hosting & Edge Network

Supporting & Utilities:

- Custom hooks (device, language, theming)
- CSP + HTTP security headers configuration
- Lightweight internal rate limiting & request sanitation

---

## 3. Key Features

User Experience & UI:

- Responsive, mobile‑first adaptive layout
- Theme switching (light/dark) with persistence
- Animated hero, project & certification showcases
- Cookie consent banner & localized content (EN/DE)

Content & Data:

- Dynamic project, technology, and certification data modules
- Real‑time GitHub MCP repository & profile fetch (sanitized & cached) 
- Google PageSpeed Insights integration for performance transparency

Engineering & Quality:

- Modular component architecture (segmented domains: hero, github, projects, tech, seo, ui primitives)
- Centralized SEO handling (`SEOHead` + structured meta strategy)
- No hydration warnings / zero console errors goal
- Strict TypeScript types across UI & API routes

Security & Privacy (summary):

- Hardened headers, CSP, origin isolation mindset
- Input & error sanitization on API boundaries
- Zero hard‑coded credentials; environment isolation
- Rate limiting to mitigate abuse vectors

---

## 4. Performance & Accessibility

Lighthouse (screenshot above) reflects focus on:

- First Meaningful Paint minimization via code‑splitting & streaming
- Efficient image delivery (static assets + modern formats where suitable)
- Reduced JavaScript footprint (selective client components, SSR/edge rendering)
- Accessible semantic structure (landmarks, labels, focus states)

Additional Optimizations:

- Preconnect & DNS-prefetch where impactful
- Tailwind purge for minimal CSS payload
- Motion reduced gracefully for prefers‑reduced‑motion users

---

## 5. Architecture Overview

High‑level structure:

- `app/` — Next.js routing (App Router, layouts, localized paths)
- `components/` — Domain + UI abstraction layers (e.g., `hero/`, `github/`, `ui/` primitives, accessibility focus)
- `data/` — Structured static metadata (projects, certifications, tech)
- `lib/` — Cross‑cutting utilities (security, SEO, rate limiting / monitoring)
- `hooks/` — Custom React hooks (language, mobile detection, client gating)
- `public/` — Static assets (images, logos, sitemap, robots)

Design Principles:

- Separation of concerns (data vs presentation)
- Minimal surface area for API routes
- Immutable, typed content modules vs runtime DB dependency

---

## 6. API Surface

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

## 7. Security & Hardening

Last internal assessment: 2025‑08 (latest iteration) — no known unresolved critical/high issues.

Implemented Layers:

1. Transport & Headers: HSTS, CSP, X-Content-Type-Options, X-Frame-Options (deny), Referrer-Policy, Permissions-Policy.
2. Application: Sanitized inputs, explicit error redaction, avoidance of `eval` / dangerous DOM sinks.
3. Operational: Secrets confined to environment variables; repository free of credentials.
4. Abuse Mitigation: IP‑scoped rate limiting on sensitive endpoints.
5. Dependency Hygiene: Routine audit (npm audit) — zero known CVEs at last scan.

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

---

## 8. Privacy & Data Handling

- No invasive tracking; minimal analytical surface.
- Cookie consent banner gating non‑essential storage.
- No third‑party ad or profiling scripts.
- Contact submissions (if enabled) are transient and not persisted long‑term.

---

## 9. Development (Local Setup)

Proprietary code; cloning allowed for personal viewing only (no reuse / redistribution).

Prerequisites: Node 20+ (LTS recommended), pnpm or npm.

Install & Run:

```
pnpm install
pnpm dev
```

Then open http://localhost:3000

Build:

```
pnpm build
pnpm start
```

---

## 10. Quality & Tooling

- TypeScript strict configuration
- Consistent component patterns (composition, no large monoliths)
- Accessible focus states & ARIA where needed
- Performance budget mindset (monitor bundle impact)

---

## 11. Roadmap

- Add selective metrics dashboard (anonymized)
- Expand localization (additional languages)
- Further edge caching tuning & RUM instrumentation (privacy‑preserving)
- Enhanced visual regression / accessibility automation

---

## 12. License & Intellectual Property

Copyright © 2025 ColdByDefault. All rights reserved.

This repository is provided exclusively for viewing professional capability.

Restrictions (Summary):

- No copying, modification, redistribution, or derivative works.
- No commercial or personal reuse of code, assets, or design patterns.
- Use beyond viewing requires explicit prior written permission.

Refer to `LICENSE` & `COPYRIGHT` files for formal wording.

---

## 13. Contact

Portfolio: https://www.coldbydefault.com  
Linktree: https://linktr.ee/ColdByDefault  
For professional or security inquiries, reach out via the official channels listed above.

---

> Security research note: Responsible disclosure practices appreciated. Do not attempt exploitation against production infrastructure.
