/**
 * PageSpeed Interface Types
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

export interface PageSpeedMetrics {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  pwa?: number;
}

export interface PageSpeedResult {
  url: string;
  strategy: "mobile" | "desktop";
  metrics: PageSpeedMetrics;
  loadingExperience?: {
    metrics: {
      FIRST_CONTENTFUL_PAINT_MS?: { percentile: number };
      FIRST_INPUT_DELAY_MS?: { percentile: number };
      LARGEST_CONTENTFUL_PAINT_MS?: { percentile: number };
      CUMULATIVE_LAYOUT_SHIFT_SCORE?: { percentile: number };
    };
  };
}

export interface PageSpeedApiResponse {
  error?: string;
  details?: string;
  url?: string;
  strategy?: string;
  metrics?: PageSpeedMetrics;
  loadingExperience?: PageSpeedResult["loadingExperience"];
  retryAfter?: number;
}

export interface PageSpeedInsightsProps {
  url?: string;
  showRefreshButton?: boolean;
  showBothStrategies?: boolean;
}

export interface PageSpeedLighthouseCategory {
  id: string;
  title: string;
  score: number | null;
}

export interface PageSpeedLighthouseResult {
  categories: {
    performance?: PageSpeedLighthouseCategory;
    accessibility?: PageSpeedLighthouseCategory;
    "best-practices"?: PageSpeedLighthouseCategory;
    seo?: PageSpeedLighthouseCategory;
    pwa?: PageSpeedLighthouseCategory;
  };
}

export interface PageSpeedApiRawResponse {
  id?: string;
  lighthouseResult?: PageSpeedLighthouseResult;
}
