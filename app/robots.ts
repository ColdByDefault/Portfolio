/**
 * Dynamic Robots.txt Generation
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
*/

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.coldbydefault.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/blog", "/library", "/media", "/impressum"],
        disallow: ["/admin/", "/api/", "/admin/blog", "/private/"],
        crawlDelay: 1,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
      },
      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      {
        userAgent: "Twitterbot",
        allow: "/",
      },
      {
        userAgent: "LinkedInBot",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}