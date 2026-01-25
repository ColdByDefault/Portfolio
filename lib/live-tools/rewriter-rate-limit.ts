/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
*/

import { MAX_USES_PER_IP } from "@/data/live-tools/email-rewriter";

// In-memory store for rate limiting (resets on server restart)
// For production, use Redis or a database
const ipUsageMap = new Map<string, { count: number; resetAt: number }>();

const RESET_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
} {
  const now = Date.now();
  const usage = ipUsageMap.get(ip);

  // If no previous usage or reset time has passed
  if (!usage || now > usage.resetAt) {
    ipUsageMap.set(ip, { count: 1, resetAt: now + RESET_INTERVAL_MS });
    return { allowed: true, remaining: MAX_USES_PER_IP - 1 };
  }

  // Check if under limit
  if (usage.count < MAX_USES_PER_IP) {
    usage.count++;
    return { allowed: true, remaining: MAX_USES_PER_IP - usage.count };
  }

  // Rate limited
  return { allowed: false, remaining: 0 };
}

export function getRemainingUses(ip: string): number {
  const now = Date.now();
  const usage = ipUsageMap.get(ip);

  if (!usage || now > usage.resetAt) {
    return MAX_USES_PER_IP;
  }

  return Math.max(0, MAX_USES_PER_IP - usage.count);
}
