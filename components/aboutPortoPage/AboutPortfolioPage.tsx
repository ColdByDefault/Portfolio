/**
 * About Portfolio Page Main Component
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import React, { useState } from "react";
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
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Code2,
  Database,
  Shield,
  Zap,
  Globe,
  Bot,
  Github,
  ExternalLink,
  CheckCircle2,
  Clock,
  Award,
  TrendingUp,
  Users,
  Lock,
} from "lucide-react";
import type { AboutPortfolioPageProps } from "@/types/aboutPortfolioPage";
import { aboutPortfolioData } from "@/data/aboutPortfolioData";
import { useIsMobile } from "@/hooks/use-mobile";

export default function AboutPortfolioPage({
  className,
}: AboutPortfolioPageProps) {
  const t = useTranslations("AboutPortfolio");
  const isMobile = useIsMobile();
  const [activeSection, setActiveSection] = useState<string>("overview");

  const navigationSections = [
    { id: "overview", label: t("overview.title"), icon: Code2 },
    { id: "stack", label: t("technicalStack.title"), icon: Database },
    { id: "features", label: t("features.title"), icon: Zap },
    { id: "performance", label: t("performance.title"), icon: TrendingUp },
    { id: "security", label: t("security.title"), icon: Shield },
    { id: "ai", label: t("ai.title"), icon: Bot },
  ];

  return (
    <div className={`min-h-screen ${className}`}>
      {/* Hero Section */}
      <section className="relative py-12 px-4 ">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Code2 className="h-8 w-8 text-primary" />
            <Badge
              variant="outline"
              className="px-3 py-1 text-sm font-semibold"
            >
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation */}
        <div className={`mb-8 ${isMobile ? "overflow-x-auto" : ""}`}>
          <div className="flex gap-2 min-w-max">
            {navigationSections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "default" : "outline"}
                size="sm"
                className="gap-2 whitespace-nowrap"
                onClick={() => setActiveSection(section.id)}
              >
                <section.icon className="h-4 w-4" />
                {section.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Overview Section */}
        {activeSection === "overview" && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Code2 className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle>{t("overview.title")}</CardTitle>
                    <CardDescription>
                      {aboutPortfolioData.overview.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Project Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Author:</span>
                          <span>{aboutPortfolioData.overview.author}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Version:
                          </span>
                          <span>{aboutPortfolioData.overview.version}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <Badge variant="default" className="h-5">
                            {aboutPortfolioData.overview.status === "active"
                              ? "Active Development"
                              : aboutPortfolioData.overview.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Development Time:
                          </span>
                          <span>
                            {aboutPortfolioData.overview.developmentTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Key Achievements</h4>
                      <div className="space-y-2">
                        {aboutPortfolioData.achievements
                          .slice(0, 3)
                          .map((achievement) => (
                            <div
                              key={achievement.id}
                              className="flex items-center gap-2 text-sm"
                            >
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              <span>{achievement.title}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Technical Stack Section */}
        {activeSection === "stack" && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  {t("technicalStack.title")}
                </CardTitle>
                <CardDescription>
                  {t("technicalStack.subtitle")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aboutPortfolioData.technicalStack.map((tech) => (
                    <Card key={tech.name} className="border-muted">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Database className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">
                              {tech.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {tech.version}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {tech.description}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {t(
                            `technicalStack.categories.${tech.category}` as any
                          ) || tech.category}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Features Section */}
        {activeSection === "features" && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  {t("features.title")}
                </CardTitle>
                <CardDescription>{t("features.subtitle")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {aboutPortfolioData.features.map((feature) => (
                    <Card key={feature.id} className="border-muted">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center mt-1">
                            <Zap className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">
                              {feature.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              {feature.description}
                            </p>
                            <Badge
                              variant={
                                feature.completed ? "default" : "secondary"
                              }
                              className="text-xs"
                            >
                              {feature.completed ? "Completed" : "In Progress"}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h5 className="text-xs font-medium text-muted-foreground">
                            Key Benefits:
                          </h5>
                          <ul className="text-xs space-y-1">
                            {feature.benefits
                              .slice(0, 3)
                              .map((benefit, index) => (
                                <li
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                                  {benefit}
                                </li>
                              ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Performance Section */}
        {activeSection === "performance" && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  {t("performance.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">
                      {t("performance.lighthouse")}
                    </h4>
                    {Object.entries(
                      aboutPortfolioData.performance.lighthouse
                    ).map(([key, value]) => {
                      if (key === "lastChecked") return null;
                      return (
                        <div key={key} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize">
                              {key.replace(/([A-Z])/g, " $1")}
                            </span>
                            <span className="font-semibold">{value}/100</span>
                          </div>
                          <Progress value={Number(value)} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">
                      {t("performance.coreWebVitals")}
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(
                        aboutPortfolioData.performance.coreWebVitals
                      ).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm text-muted-foreground uppercase">
                            {key}
                          </span>
                          <Badge
                            variant="default"
                            className="text-green-700 bg-green-100"
                          >
                            {value}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <h5 className="font-medium text-sm">
                        {t("performance.bundleSize")}
                      </h5>
                      {Object.entries(
                        aboutPortfolioData.performance.bundleSize
                      ).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, " $1")}
                          </span>
                          <span className="text-sm font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Security Section */}
        {activeSection === "security" && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  {t("security.title")}
                </CardTitle>
                <CardDescription>{t("security.subtitle")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aboutPortfolioData.security.map((item) => (
                    <Card key={item.name} className="border-muted">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
                            <Lock className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-sm">
                                {item.name}
                              </h4>
                              <Badge
                                variant={
                                  item.severity === "critical"
                                    ? "destructive"
                                    : item.severity === "high"
                                    ? "default"
                                    : "secondary"
                                }
                                className="text-xs"
                              >
                                {item.severity}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              {item.description}
                            </p>
                            <p className="text-xs">{item.implementation}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* AI Integration Section */}
        {activeSection === "ai" && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  {t("ai.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {aboutPortfolioData.aiIntegrations.map((ai) => (
                  <Card key={ai.name} className="border-muted">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                          <Bot className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{ai.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {ai.provider} • {ai.model}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm mb-4">{ai.purpose}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-sm mb-2">
                            Features:
                          </h5>
                          <ul className="text-sm space-y-1">
                            {ai.features.map((feature, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">
                            Rate Limits:
                          </h5>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Per Minute:
                              </span>
                              <span>{ai.rateLimits.perMinute}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Per Hour:
                              </span>
                              <span>{ai.rateLimits.perHour}</span>
                            </div>
                            {ai.rateLimits.perDay && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Per Day:
                                </span>
                                <span>{ai.rateLimits.perDay}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
