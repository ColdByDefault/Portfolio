/**
 * SEO-related TypeScript types and interfaces
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import type { TwitterCardType } from "@/types/metadata";

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  siteUrl: string;
  siteName: string;
  locale: string;
  alternateLocales: string[];
  openGraph: {
    title: string;
    description: string;
    type: string;
    image: string;
    imageAlt: string;
  };
  twitter: {
    handle: string;
    cardType: TwitterCardType;
  };
  structured: {
    name: string;
    jobTitle: string;
    description: string;
    skills: string[];
    location: string;
    email: string;
    github: string;
    linkedIn?: string;
  };
}

export interface PageContent {
  title: string;
  description: string;
  keywords: string[];
  path: string;
}

export interface LegalPageContent {
  privacy: {
    en: PageContent;
    de: PageContent;
  };
  impressum: {
    en: PageContent;
    de: PageContent;
  };
  terms: {
    en: PageContent;
    de: PageContent;
  };
}

export interface MediaSectionContent {
  dashboard: {
    en: PageContent;
    de: PageContent;
  };
  about: {
    en: PageContent;
    de: PageContent;
  };
  blog: {
    en: PageContent;
    de: PageContent;
  };
  projects: {
    en: PageContent;
    de: PageContent;
  };
  library: {
    en: PageContent;
    de: PageContent;
  };
}

export type LegalPageType = "privacy" | "impressum" | "terms";
export type MediaSectionType =
  | "dashboard"
  | "about"
  | "blog"
  | "projects"
  | "library";
