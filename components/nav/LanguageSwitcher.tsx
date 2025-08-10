/**
 * Language Switcher Component
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { language, changeLanguage, isLoading } = useLanguage();

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <Globe className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => changeLanguage("en")}
        className="text-xs px-2 py-1 h-8"
      >
        EN
      </Button>
      <Button
        variant={language === "de" ? "default" : "ghost"}
        size="sm"
        onClick={() => changeLanguage("de")}
        className="text-xs px-2 py-1 h-8"
      >
        DE
      </Button>
    </div>
  );
}
