/**
 * About Portfolio Main Component
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Overview } from "./Overview";
import { Technology } from "./Technology";
import { Documentation } from "./Documentation";
import { useAboutPorto } from "./aboutPorto.logic";

interface AboutPortoProps {
  readonly className?: string;
}

export function AboutPorto({ className }: AboutPortoProps) {
  const { currentSection, setCurrentSection, sections } = useAboutPorto();
  const t = useTranslations("AboutPortfolio");

  return (
    <div className={`container mx-auto px-4 py-8 ${className || ""}`}>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </header>

        <nav className="mb-8">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(section.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  currentSection === section.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </nav>

        <main>
          {currentSection === "overview" && <Overview />}
          {currentSection === "technology" && <Technology />}
          {currentSection === "documentation" && <Documentation />}
        </main>
      </div>
    </div>
  );
}
