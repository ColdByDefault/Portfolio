/**
 * Hook for language detection and management
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

"use client";

import { useState, useEffect, useSyncExternalStore } from "react";

export type Language = "en" | "de";

const emptySubscribe = () => () => {};

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";

  // Check URL params first
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get("lang") as Language;
  if (langParam && ["en", "de"].includes(langParam)) {
    return langParam;
  }

  // Check localStorage
  const savedLang = localStorage.getItem("preferred-language") as Language;
  if (savedLang && ["en", "de"].includes(savedLang)) {
    return savedLang;
  }

  // Detect browser language
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith("de") ? "de" : "en";
}

export function useLanguage() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [language, setLanguage] = useState<Language>("en");
  const [isLoading, setIsLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!isClient || initialized) return;

    const initLanguage = () => {
      const detectedLang = getInitialLanguage();
      setLanguage(detectedLang);
      localStorage.setItem("preferred-language", detectedLang);
      setIsLoading(false);
      setInitialized(true);
    };

    initLanguage();
  }, [isClient, initialized]);

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
