/**
 * About Portfolio Page Main Component
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import React from "react";
import type { AboutPortfolioPageProps } from "@/types/aboutPortfolioPage";
import { useAboutPortfolioNavigation } from "./AboutPortfolioPage.logic";
import { HeroSection } from "./HeroSection";
import { NavigationTabs } from "./NavigationTabs";
import { OverviewSection } from "./OverviewSection";
import { TechnicalStackSection } from "./TechnicalStackSection";
import { FeaturesSection } from "./FeaturesSection";
import { PerformanceSection } from "./PerformanceSection";
import { SecuritySection } from "./SecuritySection";
import { AIIntegrationSection } from "./AIIntegrationSection";

export default function AboutPortfolioPage({
  className,
}: AboutPortfolioPageProps) {
  const { activeSection, setActiveSection, navigationSections } =
    useAboutPortfolioNavigation();

  const renderActiveSection = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection />;
      case "stack":
        return <TechnicalStackSection />;
      case "features":
        return <FeaturesSection />;
      case "performance":
        return <PerformanceSection />;
      case "security":
        return <SecuritySection />;
      case "ai":
        return <AIIntegrationSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className={`min-h-screen ${className || ""}`}>
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <NavigationTabs
          sections={navigationSections}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {renderActiveSection()}
      </div>
    </div>
  );
}
