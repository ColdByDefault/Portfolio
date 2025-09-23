/**
 * Technology Component - About Portfolio Page
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import React from "react";
import { SectionCard, TechBadgeList } from "./shared";

interface TechnologyProps {
  readonly className?: string;
}

const frontendTech: readonly string[] = [
  "Next.js 14",
  "React 18",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui",
  "Framer Motion",
  "next-intl",
];

const backendTech: readonly string[] = [
  "Next.js API Routes",
  "Prisma ORM",
  "PostgreSQL",
  "NextAuth.js",
  "Zod Validation",
  "Rate Limiting",
];

const devTools: readonly string[] = [
  "ESLint",
  "Prettier",
  "Husky",
  "Jest",
  "Playwright",
  "GitHub Actions",
];

const deploymentTech: readonly string[] = [
  "Vercel",
  "Docker",
  "GitHub",
  "Cloudflare",
];

export function Technology({ className }: TechnologyProps) {
  return (
    <div className={`space-y-6 ${className || ""}`}>
      <SectionCard
        title="Frontend Technologies"
        description="Client-side technologies and frameworks"
      >
        <TechBadgeList technologies={frontendTech} />
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            Built with Next.js 14 using the App Router for optimal performance
            and SEO. React 18 provides the foundation with TypeScript ensuring
            type safety throughout.
          </p>
        </div>
      </SectionCard>

      <SectionCard
        title="Backend Technologies"
        description="Server-side technologies and database"
      >
        <TechBadgeList technologies={backendTech} />
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            API routes handle server-side logic with Prisma managing database
            operations. NextAuth.js provides authentication with Zod ensuring
            data validation.
          </p>
        </div>
      </SectionCard>

      <SectionCard
        title="Development Tools"
        description="Tools used for development, testing, and quality assurance"
      >
        <TechBadgeList technologies={devTools} />
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            Comprehensive tooling setup including linting, formatting, testing,
            and CI/CD. GitHub Actions automate testing and deployment processes.
          </p>
        </div>
      </SectionCard>

      <SectionCard
        title="Deployment & Infrastructure"
        description="Hosting and deployment technologies"
      >
        <TechBadgeList technologies={deploymentTech} />
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            Deployed on Vercel with automatic deployments from GitHub.
            Cloudflare provides CDN and security features.
          </p>
        </div>
      </SectionCard>
    </div>
  );
}
