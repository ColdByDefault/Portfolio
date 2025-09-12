/**
 * Middleware for handling redirects and locale management
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

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

  // Redirect other unknown locale patterns (but not legitimate routes)
  const localePattern = /^\/([a-z]{2})(\/.*)?$/;
  const match = pathname.match(localePattern);

  if (match && !isValidRoute) {
    const locale = match[1];
    // Only redirect if it looks like a locale code and isn't a valid route
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
