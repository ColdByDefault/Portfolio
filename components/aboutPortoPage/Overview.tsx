/**
 * Overview Component - About Portfolio Page
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import React from "react";
import { SectionCard, FeatureList } from "./shared";

interface OverviewProps {
  readonly className?: string;
}

const portfolioFeatures: readonly string[] = [
  "Modern responsive design with dark/light theme support",
  "Multi-language support with internationalization",
  "Blog system with admin panel and markdown support",
  "Project showcase with detailed information",
  "Interactive chatbot for visitor engagement",
  "Performance optimized with 100/100 Lighthouse scores",
  "SEO optimized with structured data and meta tags",
  "Security-first approach with input validation",
];

const architectureFeatures: readonly string[] = [
  "Component-based architecture with clear separation of concerns",
  "TypeScript strict mode for type safety",
  "Server-side rendering with Next.js App Router",
  "Database integration with Prisma ORM",
  "Authentication and authorization system",
  "API routes with proper validation and security",
];

export function Overview({ className }: OverviewProps) {
  return (
    <div className={`space-y-6 ${className || ""}`}>
      <SectionCard
        title="Portfolio Features"
        description="Key features and capabilities of this portfolio"
      >
        <FeatureList items={portfolioFeatures} />
      </SectionCard>

      <SectionCard
        title="Architecture Overview"
        description="Technical architecture and design principles"
      >
        <FeatureList items={architectureFeatures} />
      </SectionCard>

      <SectionCard
        title="Development Goals"
        description="Primary objectives and principles followed during development"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Performance</h4>
            <p className="text-sm text-muted-foreground">
              Optimized for speed with Core Web Vitals in mind, achieving
              perfect Lighthouse scores.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Accessibility</h4>
            <p className="text-sm text-muted-foreground">
              WCAG 2.1 AA compliant with proper semantic HTML and ARIA
              attributes.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Security</h4>
            <p className="text-sm text-muted-foreground">
              Security-first development with input validation, sanitization,
              and CSP headers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Maintainability</h4>
            <p className="text-sm text-muted-foreground">
              Clean code architecture with TypeScript, proper testing, and
              documentation.
            </p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
