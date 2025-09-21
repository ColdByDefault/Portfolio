/**
 * Hook for language detection and management
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import { useState, useEffect } from "react";

export type Language = "en" | "de";

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("en");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check URL params first
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get("lang") as Language;

    if (langParam && ["en", "de"].includes(langParam)) {
      setLanguage(langParam);
      localStorage.setItem("preferred-language", langParam);
      setIsLoading(false);
      return;
    }

    // Check localStorage
    const savedLang = localStorage.getItem("preferred-language") as Language;
    if (savedLang && ["en", "de"].includes(savedLang)) {
      setLanguage(savedLang);
      setIsLoading(false);
      return;
    }

    // Detect browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("de")) {
      setLanguage("de");
      localStorage.setItem("preferred-language", "de");
    } else {
      setLanguage("en");
      localStorage.setItem("preferred-language", "en");
    }

    setIsLoading(false);
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem("preferred-language", newLang);

    // Update URL without reload
    const url = new URL(window.location.href);
    url.searchParams.set("lang", newLang);
    window.history.replaceState({}, "", url.toString());
  };

  return {
    language,
    changeLanguage,
    isLoading,
    isGerman: language === "de",
    isEnglish: language === "en",
  };
}