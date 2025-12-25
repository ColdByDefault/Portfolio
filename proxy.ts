/**
 * Middleware for handling redirects and locale management
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Supported locales
const supportedLocales = ["en", "de", "es", "fr", "sv"];

/**
 * Handle automatic locale detection based on browser language
 * Sets cookie to prevent browser translation interference
 */
function handleLocaleDetection(request: NextRequest): NextResponse | null {
  // Check if locale cookie already exists
  const existingLocale = request.cookies.get(
    "PORTFOLIOVERSIONLATEST_LOCALE"
  )?.value;
  if (existingLocale && supportedLocales.includes(existingLocale)) {
    return null; // Cookie already set, continue normally
  }

  // Get Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) {
    // No language preference, set default and continue
    const response = NextResponse.next();
    response.cookies.set("PORTFOLIOVERSIONLATEST_LOCALE", "en", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
    });
    response.cookies.set("PORTFOLIOVERSIONLATEST_BROWSER_LANG", "unknown", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  // Parse Accept-Language header to get primary language
  const languages = acceptLanguage
    .split(",")
    .map((lang) => {
      const parts = lang.trim().split(";");
      if (!parts[0]) return null;

      const code = parts[0].toLowerCase();
      const qualityPart = parts[1]?.split("=")[1];
      const quality = qualityPart ? parseFloat(qualityPart) : 1;
      return { code, quality };
    })
    .filter((lang): lang is { code: string; quality: number } => lang !== null)
    .sort((a, b) => b.quality - a.quality);

  // Find the best matching supported locale
  let detectedLocale = "en"; // default
  let browserLang = "en";

  for (const lang of languages) {
    const langCode = lang.code.split("-")[0]; // Extract main language code
    if (!langCode) continue;

    browserLang = langCode;

    if (supportedLocales.includes(langCode)) {
      detectedLocale = langCode;
      break;
    }
  }

  // Set cookies and continue
  const response = NextResponse.next();
  response.cookies.set("PORTFOLIOVERSIONLATEST_LOCALE", detectedLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });

  // Store the actual browser language for UI purposes
  response.cookies.set("PORTFOLIOVERSIONLATEST_BROWSER_LANG", browserLang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Enhanced security for ChatBot API
  if (pathname.startsWith("/api/chatbot")) {
    // Check for basic bot patterns
    const userAgent = request.headers.get("user-agent") || "";
    const botPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /python/i,
      /curl/i,
      /wget/i,
      /postman/i,
    ];

    for (const pattern of botPatterns) {
      if (pattern.test(userAgent)) {
        return NextResponse.json({ error: "Access denied" }, { status: 403 });
      }
    }

    // Require referer for chatbot requests
    const referer = request.headers.get("referer");
    if (request.method === "POST" && !referer) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
  }

  // Handle automatic locale detection for first-time visitors
  const response = handleLocaleDetection(request);
  if (response) return response;

  // Define valid routes to avoid redirecting legitimate paths
  const validRoutes = [
    "/",
    "/about",
    "/blog",
    "/library",
    "/media",
    "/impressum",
    "/admin",
    "/api",
  ];

  // Check if it's a valid route or sub-route
  const isValidRoute = validRoutes.some((route) => {
    return pathname === route || pathname.startsWith(`${route}/`);
  });

  // Only redirect /de routes (legacy German locale routes)
  if (pathname.startsWith("/de")) {
    const newPath = pathname.replace(/^\/de/, "");
    const redirectPath = newPath === "" ? "/" : newPath;

    return NextResponse.redirect(
      new URL(redirectPath, request.url),
      { status: 301 } // Permanent redirect for SEO
    );
  }

  // Redirect other unknown locale patterns
  const localePattern = /^\/([a-z]{2})(\/.*)?$/;
  const match = pathname.match(localePattern);

  if (match && !isValidRoute) {
    const locale = match[1];
    // Redirect if it looks like a locale code and isn't a valid route
    if (
      locale &&
      ["es", "fr", "sv", "it", "pt", "ru", "ja", "ko", "zh"].includes(locale)
    ) {
      const newPath = pathname.replace(/^\/[a-z]{2}/, "");
      const redirectPath = newPath === "" ? "/" : newPath;

      return NextResponse.redirect(new URL(redirectPath, request.url), {
        status: 301,
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt, sitemap.xml (now generated dynamically)
     * - .well-known (for verification files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.well-known).*)",
  ],
};
