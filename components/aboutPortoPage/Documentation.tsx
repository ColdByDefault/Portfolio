/**
 * Documentation Component - About Portfolio Page
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import React from "react";
import Link from "next/link";
import { SectionCard, FeatureList } from "@/components/aboutPortoPage";
import { Button } from "@/components/ui/button";

interface DocumentationProps {
  readonly className?: string;
}

const codeStandards: readonly string[] = [
  "TypeScript strict mode with zero 'any' tolerance",
  "ESLint flat config with TypeScript-ESLint integration",
  "Comprehensive TypeDoc documentation generation",
  "Zod schema validation for runtime type safety",
  "Prisma ORM for type-safe database operations",
  "Security-first approach with input validation",
];

export function Documentation({ className }: DocumentationProps) {
  return (
    <div className={`space-y-6 ${className || ""}`}>
      <SectionCard
        title="Code Standards & Quality"
        description="Development principles and tools ensuring code quality and maintainability"
      >
        <FeatureList items={codeStandards} />
      </SectionCard>

      <SectionCard
        title="Documentation & Resources"
        description="Comprehensive documentation and source code access"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="default">
            <Link
              href="https://docs.coldbydefault.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              Live Documentation
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link
              href="https://github.com/ColdByDefault/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              View on GitHub
            </Link>
          </Button>
        </div>
      </SectionCard>
    </div>
  );
}
