import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Allow cross-origin requests from local network devices during development
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS?.split(",") || [],

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Image optimization with modern formats
  images: {
    // Optimize image quality based on device capabilities
    qualities: [75, 80, 85, 90, 100] as const,
    // Enable modern image formats
    formats: ["image/avif", "image/webp"],
    // Add image optimization for better performance
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: false,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
    ],
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons"],
  },
  async headers() {
    return [
      {
        // Apply comprehensive security and performance headers
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          // Performance headers
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'", // Allow inline styles for Tailwind and components
              "img-src 'self' data: blob: https://avatars.githubusercontent.com https://github.com",
              "font-src 'self' data:",
              "connect-src 'self' https://api.github.com https://www.googleapis.com https://generativelanguage.googleapis.com",
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              // Only upgrade insecure requests in production
              ...(process.env.NODE_ENV === "production"
                ? ["upgrade-insecure-requests"]
                : []),
            ].join("; "),
          },
        ],
      },
      {
        // Static assets cache optimization
        source:
          "/((?!api/).*).(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // API routes cache and security
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=43200",
          },
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, nosnippet, noarchive",
          },
        ],
      },
      {
        // Enhanced security for ChatBot API
        source: "/api/chatbot",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, nosnippet, noarchive",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
