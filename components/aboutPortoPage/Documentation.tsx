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

];



export function Documentation({ className }: DocumentationProps) {
  return (
    <div className={`space-y-6 ${className || ""}`}>
      <SectionCard
        title=""
        description=""
      >
        <FeatureList items={codeStandards} />
      </SectionCard>

      <SectionCard
        title=""
        description=""
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
            <Link href="/" className="cursor-pointer">
            </Link>
          </Button>
        </div>
      </SectionCard>
    </div>
  );
}
