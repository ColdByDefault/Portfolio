/**
 * About Portfolio Hero Section Component
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import React from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code2, Globe, Github } from "lucide-react";
import { aboutPortfolioData } from "@/data/aboutPortfolioData";

interface HeroSectionProps {
  readonly className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const t = useTranslations("AboutPortfolio");

  return (
    <section className={`relative py-12 px-4 ${className || ""}`}>
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <Code2 className="h-8 w-8 text-primary" />
          <Badge variant="outline" className="px-3 py-1 text-sm font-semibold">
            {t("overview.version")}
          </Badge>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
          {t("title")}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
          {t("subtitle")}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="gap-2" asChild>
            <a
              href={aboutPortfolioData.overview.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe className="h-5 w-5" />
              Live Website
            </a>
          </Button>
          {aboutPortfolioData.overview.githubUrl && (
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <a
                href={aboutPortfolioData.overview.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                View Source
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
