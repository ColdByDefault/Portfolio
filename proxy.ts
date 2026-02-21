/**
 * Proxy (Middleware => deprecated) for handling redirects and locale management
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Supported locales
const supportedLocales = ["en", "de", "es", "fr", "sv"];

const failedAttempts = new Map<string, number>();
const blockedIPs = new Map<string, number>();
const BLOCK_DURATION = 15 * 60 * 1000;
const MAX_ATTEMPTS = 2;

// Session validation: Store valid sessions with metadata
interface SessionData {
  createdAt: number;
  expiresAt: number;
  ip: string;
  signature: string;
}

const validSessions = new Map<string, SessionData>();
const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  const realIP = request.headers.get("x-real-ip");
  if (realIP) return realIP;
  return "unknown";
}

function isIPBlocked(ip: string): boolean {
  const blockExpiry = blockedIPs.get(ip);
  if (!blockExpiry) return false;

  if (Date.now() < blockExpiry) return true;

  // Expired, clean up
  blockedIPs.delete(ip);
  failedAttempts.delete(ip);
  return false;
}

function recordFailedAttempt(ip: string): void {
  const attempts = (failedAttempts.get(ip) || 0) + 1;
  failedAttempts.set(ip, attempts);

  if (attempts >= MAX_ATTEMPTS) {
    blockedIPs.set(ip, Date.now() + BLOCK_DURATION);
  }
}

function hasValidAdminSession(request: NextRequest): boolean {
  const sessionCookie = request.cookies.get("PORTFOLIO_ADMIN_SESSION");
  if (!sessionCookie?.value) return false;

  const sessionId = sessionCookie.value;
  const sessionData = validSessions.get(sessionId);

  if (!sessionData) return false;

  const now = Date.now();

  // Check expiration
  if (now > sessionData.expiresAt) {
    validSessions.delete(sessionId);
    return false;
  }

  const currentIP = getClientIP(request);
  if (sessionData.ip !== currentIP) {
    validSessions.delete(sessionId);
    return false;
  }

  return true;
}

export function createAdminSession(ip: string): string {
  const randomBytes = new Uint8Array(32);
  crypto.getRandomValues(randomBytes);
  const sessionId = Array.from(randomBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const now = Date.now();
  const expiresAt = now + SESSION_DURATION;

  const signature = `${sessionId}:${ip}:${expiresAt}`;

  const sessionData: SessionData = {
    createdAt: now,
    expiresAt,
    ip,
    signature,
  };

  validSessions.set(sessionId, sessionData);

  if (validSessions.size % 10 === 0) {
    cleanupExpiredSessions();
  }

  return sessionId;
}

export function invalidateAdminSession(sessionId: string): void {
  validSessions.delete(sessionId);
}

function cleanupExpiredSessions(): void {
  const now = Date.now();
  for (const [sessionId, data] of validSessions.entries()) {
    if (now > data.expiresAt) {
      validSessions.delete(sessionId);
    }
  }
}

/**
 * Handle automatic locale detection based on browser language
 * Sets PORTFOLIOVERSIONLATEST_LOCALE for i18n and PORTFOLIOVERSIONLATEST_BROWSER_LANG for UI hints
 *
 * Note: PORTFOLIOVERSIONLATEST_BROWSER_LANG is informational only (used by language-switcher
 * and locale-auto-detect components). It should NOT gate the locale detection bypass.
 */
function handleLocaleDetection(request: NextRequest): NextResponse | null {
  // Check if locale cookie already exists - this is the only required check
  const existingLocale = request.cookies.get(
    "PORTFOLIOVERSIONLATEST_LOCALE",
  )?.value;

  // If user already has a valid locale preference, respect it
  if (existingLocale && supportedLocales.includes(existingLocale)) {
    return null;
  }

  // Get Accept-Language header for first-time visitors
  const acceptLanguage = request.headers.get("accept-language");

  if (!acceptLanguage) {
    // No Accept-Language header (privacy mode / stripped by browser)
    // Fallback to default "de". Client-side LocaleAutoDetect component
    // will correct this using navigator.language if needed.
    const response = NextResponse.next();
    response.cookies.set("PORTFOLIOVERSIONLATEST_LOCALE", "de", {
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
  let detectedLocale = "de"; // default
  let browserLang = "de";

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
  const isDev = process.env.NODE_ENV === "development";

  // Admin route protection - Minimal server-side security (disabled in dev)
  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/blocked") &&
    !isDev
  ) {
    const clientIP = getClientIP(request);

    // Check if IP is blocked
    if (isIPBlocked(clientIP)) {
      return NextResponse.redirect(new URL("/admin/blocked", request.url));
    }

    // Check for valid admin session
    if (!hasValidAdminSession(request)) {
      // Record failed page access attempt
      recordFailedAttempt(clientIP);

      const attempts = failedAttempts.get(clientIP) || 0;

      // If just exceeded limit, redirect to blocked page
      if (attempts >= MAX_ATTEMPTS) {
        return NextResponse.redirect(new URL("/admin/blocked", request.url));
      }

      // Allow access but add warning header
      const response = NextResponse.next();
      response.headers.set(
        "X-Remaining-Attempts",
        String(MAX_ATTEMPTS - attempts),
      );
      return response;
    }

    // Valid session - clear attempts and allow access
    failedAttempts.delete(clientIP);
  }

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
    "/services",
    "/projects",
    "/rio-calculator",
    "/polite-email",
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
      { status: 301 }, // Permanent redirect for SEO
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
