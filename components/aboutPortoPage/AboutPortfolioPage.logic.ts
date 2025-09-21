/**
 * About Portfolio Page Business Logic
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";
import { useState } from "react";
import { Code2, Database, Shield, Zap, TrendingUp, Bot } from "lucide-react";
import { type LucideIcon } from "lucide-react";

export interface NavigationSection {
  readonly id: string;
  readonly label: string;
  readonly icon: LucideIcon;
}

export function useAboutPortfolioNavigation() {
  const [activeSection, setActiveSection] = useState<string>("overview");

  const navigationSections: readonly NavigationSection[] = [
    { id: "overview", label: "Overview", icon: Code2 },
    { id: "stack", label: "Technical Stack", icon: Database },
    { id: "features", label: "Features", icon: Zap },
    { id: "performance", label: "Performance", icon: TrendingUp },
    { id: "security", label: "Security", icon: Shield },
    { id: "ai", label: "AI Integration", icon: Bot },
  ] as const;

  return {
    activeSection,
    setActiveSection,
    navigationSections,
  } as const;
}

export type AboutPortfolioNavigation = ReturnType<
  typeof useAboutPortfolioNavigation
>;
