/**
 * Documentation Component - About Portfolio Page
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import React from "react";
import Link from "next/link";
import { SectionCard, FeatureList } from "./shared";
import { Button } from "@/components/ui/button";

interface DocumentationProps {
  readonly className?: string;
}

const codeStandards: readonly string[] = [
  "TypeScript strict mode with zero any types",
  "ESLint and Prettier for code quality and formatting",
  "Component-based architecture with clear separation",
  "Comprehensive JSDoc comments for all interfaces",
  "Security-first development practices",
  "Performance optimization guidelines",
];

const projectStructure: readonly string[] = [
  "Components organized by feature with utils and logic files",
  "Global types, hooks, and utilities in dedicated folders",
  "Static data separated from component logic",
  "API routes with proper validation and error handling",
  "Internationalization messages in dedicated files",
  "Database schema and migrations with Prisma",
];

export function Documentation({ className }: DocumentationProps) {
  return (
    <div className={`space-y-6 ${className || ""}`}>
      <SectionCard
        title="Code Standards"
        description="Development guidelines and coding standards"
      >
        <FeatureList items={codeStandards} />
      </SectionCard>

      <SectionCard
        title="Project Structure"
        description="How the codebase is organized and structured"
      >
        <FeatureList items={projectStructure} />
      </SectionCard>

      <SectionCard
        title="Development Guidelines"
        description="Key principles and best practices"
      >
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Component Design</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Components are designed to be pure, receiving processed data via
              props. Business logic is separated into dedicated logic files.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Type Safety</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Strict TypeScript configuration ensures type safety throughout the
              application. All external data is validated using Zod schemas.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Performance</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Optimized for Core Web Vitals with server-side rendering, image
              optimization, and efficient bundle splitting.
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Source Code"
        description="Access the complete source code and documentation"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="default">
            <Link
              href="https://github.com/ColdByDefault/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              View on GitHub
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/library" className="cursor-pointer">
              Component Library
            </Link>
          </Button>
        </div>
      </SectionCard>
    </div>
  );
}
