// Created At: 2024-12-31 23:00:00
// Designed By: ColdByDefault
// COPYRIGHT 2024 - ColdByDefault
// All Rights Reserved - No part of this website or any of its contents may be reproduced, copied, modified or adapted, 
// without the prior written consent of the author, unless otherwise indicated for stand-alone materials.


import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import "@styles/globals.css";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import { Red_Hat_Display } from 'next/font/google'

export const metadata = {
  title: "ColdByDefault",
  description: "Portfolio and beRich.Hub",
};

 
export const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  const defaultLang = 'en'; 
  const alternateLang = 'de';
  return (
    <html lang={defaultLang} className={redHatDisplay.className}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Portfolio and beRich.Hub" />
        <meta name="author" content="ColdByDefault" />
        <meta name="keywords" content="ColdByDefault, Portfolio, beRich, Next.Js, Web Development" />
        <meta property="og:title" content="ColdByDefault" />
        <meta property="og:description" content="Portfolio and beRich.Hub" />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://www.coldbydefault.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ColdByDefault" />
        <meta name="twitter:description" content="Portfolio and beRich.Hub" />
        <meta name="twitter:image" content="/logo.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="alternate" hrefLang={alternateLang} href="https://www.coldbydefault.com/de" /> 
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ColdByDefault",
              "url": "https://www.coldbydefault.com",
              "logo": "https://www.coldbydefault.com/logo.png",
              "sameAs": [
                "https://github.com/ColdByDefault",
              ]
            }
          `}
        </script>
        <title>ColdByDefault</title>
      </head>
      <body>
        <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />
        <Footer />
      </body>
    </html>
  );
}