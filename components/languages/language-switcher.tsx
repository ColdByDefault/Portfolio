// SPDX-License-Identifier: LicenseRef-BRH-1.0
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";

const languages: Record<string, { name: string }> = {
  en: { name: "English" },
  de: { name: "Deutsch" },
  es: { name: "Español" },
  fr: { name: "Français" },
  sv: { name: "Svenska" },
};

const LanguageSwitcher = () => {
  // 1. State must be declared before use
  const [locale, setLocale] = useState<string>("en");
  const [browserLang, setBrowserLang] = useState<string>("en");
  const [isUnsupportedLang, setIsUnsupportedLang] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // 2. Read existing cookies (set by middleware)
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("PORTFOLIOVERSIONLATEST_LOCALE="))
      ?.split("=")[1];

    const cookieBrowserLang = document.cookie
      .split("; ")
      .find((row) => row.startsWith("PORTFOLIOVERSIONLATEST_BROWSER_LANG="))
      ?.split("=")[1];

    if (cookieLocale && languages[cookieLocale]) {
      setLocale(cookieLocale);
    }

    if (cookieBrowserLang) {
      setBrowserLang(cookieBrowserLang);
      // Check if browser language is supported
      setIsUnsupportedLang(!languages[cookieBrowserLang]);
    }

    // Fallback: if no cookies, detect client-side (shouldn't happen with new middleware)
    if (!cookieLocale) {
      const browserLang = navigator.language.slice(0, 2);
      const defaultLocale = languages[browserLang] ? browserLang : "en";
      setLocale(defaultLocale);
      setBrowserLang(browserLang);
      setIsUnsupportedLang(!languages[browserLang]);
      document.cookie = `PORTFOLIOVERSIONLATEST_LOCALE=${defaultLocale}; path=/;`;
      document.cookie = `PORTFOLIOVERSIONLATEST_BROWSER_LANG=${browserLang}; path=/;`;
    }
  }, []);

  const changeLocale = (newLocale: string) => {
    if (!languages[newLocale]) return;
    setLocale(newLocale);
    setIsUnsupportedLang(false); // User manually selected a supported language
    document.cookie = `PORTFOLIOVERSIONLATEST_LOCALE=${newLocale}; path=/;`;
    // 4. Refresh current route to re-render server components with new locale
    router.refresh(); // useRouter only works in Client Components :contentReference[oaicite:0]{index=0}
  };

  const getCurrentFlag = () => {
    return "🌐"; // Always show globe emoji
  };

  const getCurrentName = () => {
    if (isUnsupportedLang && browserLang !== locale) {
      return `${languages[locale]?.name ?? "English"} (Auto)`;
    }
    return languages[locale]?.name ?? "English";
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center w-12 h-10 cursor-pointer hover:text-sky-600 transition-colors duration-300"
          aria-label={`Current language: ${getCurrentName()}. Click to change language`}
        >
          <Languages aria-hidden="true" />
          <span className="ml-1" aria-hidden="true">
            {getCurrentFlag()}
          </span>
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" aria-label="Language selection menu">
        {isUnsupportedLang && browserLang !== locale && (
          <DropdownMenuItem disabled className="text-muted-foreground text-xs">
            Browser: {browserLang.toUpperCase()} (Unsupported)
          </DropdownMenuItem>
        )}
        {Object.entries(languages).map(([key, { name }]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => changeLocale(key)}
            aria-label={`Switch to ${name}`}
            className={locale === key ? "bg-accent" : ""}
          >
            {name}
            {locale === key && isUnsupportedLang && (
              <span className="ml-auto text-xs text-muted-foreground">
                (Auto)
              </span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
