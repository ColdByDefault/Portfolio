/**
 * @author ColdByDefault
 * @copyright 2026 ColdByDefault. All Rights Reserved.
 */

/** Score threshold boundaries for color coding */
export const SCORE_THRESHOLDS = {
  good: 90,
  average: 50,
} as const;

/** Circle progress ring dimensions */
export const RING = {
  size: 60,
  strokeWidth: 5,
  radius: 25,
  circumference: 2 * Math.PI * 25,
} as const;

/** API endpoint path */
export const SPEED_INSIGHT_API = "/api/speed-insight" as const;

/** Cache duration in milliseconds (matches API revalidate: 1 hour) */
export const CACHE_DURATION_MS = 3_600_000 as const;
