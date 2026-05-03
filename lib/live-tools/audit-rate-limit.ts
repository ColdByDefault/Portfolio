/**
 * @author © ColdByDefault
 * @license Copyright (c) 2026 ColdByDefault. All rights reserved.
 * @version 6.x.x
 */

import { MAX_AUDIT_USES_PER_IP } from "@/data/live-tools/automation-audit";

// In-memory store for rate limiting (resets on server restart)
const ipUsageMap = new Map<string, { count: number; resetAt: number }>();

const RESET_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours

export function checkAuditRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
} {
  const now = Date.now();
  const usage = ipUsageMap.get(ip);

  if (!usage || now > usage.resetAt) {
    ipUsageMap.set(ip, { count: 1, resetAt: now + RESET_INTERVAL_MS });
    return { allowed: true, remaining: MAX_AUDIT_USES_PER_IP - 1 };
  }

  if (usage.count < MAX_AUDIT_USES_PER_IP) {
    usage.count++;
    return { allowed: true, remaining: MAX_AUDIT_USES_PER_IP - usage.count };
  }

  return { allowed: false, remaining: 0 };
}

export function getAuditRemainingUses(ip: string): number {
  const now = Date.now();
  const usage = ipUsageMap.get(ip);

  if (!usage || now > usage.resetAt) {
    return MAX_AUDIT_USES_PER_IP;
  }

  return Math.max(0, MAX_AUDIT_USES_PER_IP - usage.count);
}
