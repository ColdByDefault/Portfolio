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

const languages: Record<string, { name: string; flag: string }> = {
  en: { name: "English", flag: "🇬🇧" },
  de: { name: "Deutsch", flag: "🇩🇪" },
  es: { name: "Español", flag: "🇪🇸" },
  fr: { name: "Français", flag: "🇫🇷" },
  sv: { name: "Svenska", flag: "🇸🇪" },
};

const LanguageSwitcher = () => {
  // 1. State must be declared before use
  const [locale, setLocale] = useState<string>("en");
  const router = useRouter();

  useEffect(() => {
    // 2. Read existing cookie
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("PORTFOLIOVERSIONLATEST_LOCALE="))
      ?.split("=")[1];

    if (cookieLocale && languages[cookieLocale]) {
      setLocale(cookieLocale);
    } else {
      // 3. Derive from browser, but ensure it's one of our supported locales
      const browserLang = navigator.language.slice(0, 2);
      const defaultLocale = languages[browserLang] ? browserLang : "en";
      setLocale(defaultLocale);
      document.cookie = `PORTFOLIOVERSIONLATEST_LOCALE=${defaultLocale}; path=/;`;
    }
  }, []);

  const changeLocale = (newLocale: string) => {
    if (!languages[newLocale]) return;
    setLocale(newLocale);
    document.cookie = `PORTFOLIOVERSIONLATEST_LOCALE=${newLocale}; path=/;`;
    // 4. Refresh current route to re-render server components with new locale
    router.refresh(); // useRouter only works in Client Components :contentReference[oaicite:0]{index=0}
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center w-12 h-10"
          aria-label={`Current language: ${
            languages[locale]?.name ?? "English"
          }. Click to change language`}
        >
          <Languages aria-hidden="true" />
          <span className="ml-1" aria-hidden="true">
            {languages[locale]?.flag ?? "🌐"}
          </span>
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" aria-label="Language selection menu">
        {Object.entries(languages).map(([key, { name, flag }]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => changeLocale(key)}
            aria-label={`Switch to ${name}`}
          >
            <span className="mr-2" aria-hidden="true">
              {flag}
            </span>
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
