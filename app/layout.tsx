// All Rights Reserved - No part of this website or any of its contents may be reproduced, copied, modified or adapted,
// without the prior written consent of the author, unless otherwise indicated for stand-alone materials.
// <!-- Leve Palestina -->
// <!-- Free Palestine -->
/**
 * RootLayout component serves as the main layout wrapper for the application.
 * It includes global metadata, styles, and shared components such as Navbar and Footer.
 *
 * @ file /app/layout.tsx
 * @ created 2024-12-31 23:00:00
 * @ author ColdByDefault
 * @ copyright 2024 ColdByDefault. All Rights Reserved.
 *
 * @ remarks
 * This layout component sets up the HTML structure, including the `<head>` section
 * with metadata for SEO and social sharing, and the `<body>` section with shared UI components.
 * It also integrates Vercel Analytics and Speed Insights for performance monitoring.
 *
 * @ see {@ link https://www.coldbydefault.com} for the live website.
 *
 * @ param {RootLayoutProps} props - The props object containing the children to be rendered.
 * @ param {React.ReactNode} props.children - The child components to be rendered within the layout.
 *
 * @ returns {JSX.Element} The RootLayout component.
 */
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Orbitron } from "next/font/google";
import React from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/footer/Footer";
import { CookiesBanner } from "@/components/cookies/cookies-banner";

export const metadata = {
  title: "ColdByDefault",
  description: "Portfolio",
};

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-orbitron",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const defaultLang = "en";
  const alternateLang = "";

  return (
    <html
      lang={defaultLang}
      className={`${orbitron.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Portfolio" />
        <meta name="author" content="ColdByDefault" />
        <meta
          name="keywords"
          content="ColdByDefault, Portfolio, Next.Js, Web Development"
        />
        <meta property="og:title" content="ColdByDefault" />
        <meta property="og:description" content="Portfolio" />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://www.coldbydefault.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ColdByDefault" />
        <meta name="twitter:description" content="Portfolio" />
        <meta name="twitter:image" content="/logo.png" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="alternate"
          hrefLang={alternateLang}
          href="https://www.coldbydefault.com/"
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Individual",
              "name": "ColdByDefault",
              "url": "https://www.coldbydefault.com",
              "logo": "https://www.coldbydefault.com/logo.png",
              "sameAs": [
                "https://github.com/ColdByDefault"
              ]
            }
          `}
        </script>
        <title>ColdByDefault</title>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
          <CookiesBanner />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
