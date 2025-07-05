// Copyright © [ColdByDefault] [AnotherProject]™.
// All Rights Reserved.

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | Yazan Abo-Ayash - Full Stack Developer",
  description:
    "Learn more about my journey, philosophy, and passion for creating exceptional digital experiences. Currently interning at Avarno GmbH, specializing in Next.js, React, and modern web technologies.",
  keywords:
    "about, developer, full stack, Next.js, React, JavaScript, TypeScript, web development, software engineer, Avarno GmbH",
  openGraph: {
    title: "About Me | Yazan Abo-Ayash",
    description:
      "Learn more about my journey, philosophy, and passion for creating exceptional digital experiences.",
    type: "website",
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Me | Yazan Abo-Ayash",
    description:
      "Learn more about my journey, philosophy, and passion for creating exceptional digital experiences.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
