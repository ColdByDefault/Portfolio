// SPDX-License-Identifier: LicenseRef-BRH-1.0
"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { X, Languages, Info } from "lucide-react";

interface BrowserTranslationNoticeProps {
  className?: string;
}

const emptySubscribe = () => () => {};

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
}

const BrowserTranslationNotice = ({
  className = "",
}: BrowserTranslationNoticeProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isDismissed = useSyncExternalStore(
    emptySubscribe,
    () => localStorage.getItem("translation-notice-dismissed") === "true",
    () => true
  );

  const browserLang = useSyncExternalStore(
    emptySubscribe,
    () => getCookie("PORTFOLIOVERSIONLATEST_BROWSER_LANG") || "",
    () => ""
  );

  const currentLocale = useSyncExternalStore(
    emptySubscribe,
    () => getCookie("PORTFOLIOVERSIONLATEST_LOCALE") || "en",
    () => "en"
  );

  useEffect(() => {
    if (!isClient || isDismissed) return;

    // Show notice if browser language is different from current locale
    // or if browser language is unsupported
    const supportedLocales = ["en", "de", "es", "fr", "sv"];
    const showNotice =
      browserLang &&
      currentLocale &&
      (browserLang !== currentLocale ||
        !supportedLocales.includes(browserLang));

    if (showNotice) {
      // Delay showing the notice to avoid layout shift
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isClient, isDismissed, browserLang, currentLocale]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("translation-notice-dismissed", "true");
  };

  const scrollToLanguageSwitcher = () => {
    // Try to find and scroll to the language switcher
    const languageSwitcher = document.querySelector(
      '[aria-label*="Current language"]'
    );
    if (languageSwitcher) {
      languageSwitcher.scrollIntoView({ behavior: "smooth", block: "center" });
      // Briefly highlight the switcher with a more subtle effect
      languageSwitcher.classList.add(
        "ring-2",
        "ring-blue-400/50",
        "ring-offset-2"
      );
      setTimeout(() => {
        languageSwitcher.classList.remove(
          "ring-2",
          "ring-blue-400/50",
          "ring-offset-2"
        );
      }, 3000);
    }
    // Don't auto-dismiss, let user decide
  };

  if (!isVisible || isDismissed) {
    return null;
  }

  const supportedLocales = ["en", "de", "es", "fr", "sv"];
  const isUnsupportedBrowser = !supportedLocales.includes(browserLang);
  const browserLangDisplay =
    browserLang === "unknown" ? "UNKNOWN" : browserLang.toUpperCase();

  return (
    <div
      className={`fixed top-16 right-4 max-w-xs sm:max-w-sm bg-background/95 backdrop-blur-sm border border-border rounded-md shadow-md p-3 z-40 animate-in slide-in-from-top-5 
        sm:right-4 sm:top-16
        max-sm:right-2 max-sm:top-14 max-sm:left-2 max-sm:max-w-none ${className}`}
    >
      <div className="flex items-start gap-2">
        <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
        <div className="flex-1 space-y-1.5">
          <h4 className="font-medium text-xs">Language Auto-detected</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {isUnsupportedBrowser ? (
              <>
                <span className="sm:hidden">
                  Browser: {browserLangDisplay} (unsupported). Using English.
                </span>
                <span className="hidden sm:inline">
                  Browser: {browserLangDisplay} (not supported). Using English.
                </span>
              </>
            ) : (
              <>
                <span className="sm:hidden">
                  Auto-switched to {currentLocale.toUpperCase()}. Use language
                  switcher for best experience.
                </span>
                <span className="hidden sm:inline">
                  Switched to {currentLocale.toUpperCase()}. Use switcher below
                  for best experience.
                </span>
              </>
            )}
          </p>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="outline"
              onClick={scrollToLanguageSwitcher}
              className="text-xs h-6 px-2 shrink-0"
            >
              <Languages className="h-3 w-3 mr-1" />
              <span className="sm:hidden">Lang</span>
              <span className="hidden sm:inline">Switch</span>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDismiss}
              className="text-xs h-6 px-2"
            >
              OK
            </Button>
          </div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleDismiss}
          className="h-11 w-11 p-0 text-muted-foreground/70 hover:text-foreground shrink-0"
          aria-label="Dismiss browser translation notice"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default BrowserTranslationNotice;
