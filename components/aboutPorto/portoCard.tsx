/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Code2,
  Database,
  Gauge,
  Globe,
  Settings,
  Palette,
  ExternalLink,
  CheckCircle,
  FolderTree,
} from "lucide-react";

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badges?: string[];
}

function FeatureItem({ icon, title, description, badges }: FeatureItemProps) {
  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex-shrink-0 mt-1 text-primary">{icon}</div>
      <div className="flex-1">
        <h4 className="font-medium text-sm mb-1">{title}</h4>
        <p className="text-xs text-muted-foreground mb-2">{description}</p>
        {badges && (
          <div className="flex flex-wrap gap-1">
            {badges.map((badge, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs px-2 py-0.5"
              >
                {badge}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PortoCard() {
  const t = useTranslations("PortfolioAbout");

  const features = [
    {
      icon: <Code2 className="h-4 w-4" />,
      title: t("features.techStack.title"),
      description: t("features.techStack.description"),
      badges: ["Next.js 15.5.1", "React 19", "TypeScript", "App Router"],
    },
    {
      icon: <FolderTree className="h-4 w-4" />,
      title: t("features.cleanArchitecture.title"),
      description: t("features.cleanArchitecture.description"),
      badges: ["/lib", "/data", "/hooks", "/types"],
    },
    {
      icon: <Database className="h-4 w-4" />,
      title: t("features.database.title"),
      description: t("features.database.description"),
      badges: ["PostgreSQL", "Prisma ORM", "Neon DB"],
    },
    {
      icon: <Gauge className="h-4 w-4" />,
      title: t("features.performance.title"),
      description: t("features.performance.description"),
      badges: ["95+ Lighthouse", "SEO 100/100", "A11y Optimized"],
    },
    {
      icon: <Globe className="h-4 w-4" />,
      title: t("features.mainFeatures.title"),
      description: t("features.mainFeatures.description"),
      badges: ["Blog System", "Media Gallery", "Content Library"],
    },
    {
      icon: <Settings className="h-4 w-4" />,
      title: t("features.techFeatures.title"),
      description: t("features.techFeatures.description"),
      badges: ["MCP GitHub", "Live PageSpeed", "CI/CD Automation"],
    },
    {
      icon: <Palette className="h-4 w-4" />,
      title: t("features.localization.title"),
      description: t("features.localization.description"),
      badges: ["5 Languages", "Light/Dark Themes", "Auto-detection"],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8" id="this-portfolio">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Code2 className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold">{t("title")}</CardTitle>
          </div>
          <CardDescription className="text-base max-w-2xl mx-auto">
            {t("description")}
          </CardDescription>

          {/* Performance Badge */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
            >
              {t("performanceBadge")}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {features.map((feature, index) => (
              <FeatureItem
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                badges={feature.badges}
              />
            ))}
          </div>

          {/* Tech Stack Highlights */}
          <div className="border-t pt-6">
            <div className="text-center">
              <h3 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wide">
                {t("techHighlights")}
              </h3>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {[
                  "Tailwind CSS",
                  "shadcnUI",
                  "Framer Motion",
                  "Embla Carousel",
                  "next-intl",
                  "Vercel Edge",
                  "Zod Validation",
                  "ESLint 9.x",
                ].map((tech, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Read More Section */}
          <div className="border-t pt-6 mt-4">
            <div className="text-center">
              <Button variant="outline" className="mt-2" disabled>
                <span>{t("readMore")}</span>
                <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                {t("readMoreNote")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
