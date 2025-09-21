/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 * ------------------------------------------------------
 * @Legacy Contact form spam monitoring and blocking system
 * @description Monitors contact form submissions for spam patterns,
 *              blocks suspicious IPs/emails, and provides analytics.
 */

interface ContactSubmission {
  ip: string;
  email: string;
  name: string;
  subject: string;
  message: string;
  timestamp: number;
  userAgent?: string;
  suspicious: boolean;
  spamScore: number;
}

const submissions: ContactSubmission[] = [];
const blockedIPs = new Set<string>();
const blockedEmails = new Set<string>();

/**
 * Log a contact form submission
 */
export function logSubmission(
  data: Omit<ContactSubmission, "suspicious" | "spamScore">
) {
  const spamScore = calculateSpamScore(data);
  const suspicious = spamScore > 5;

  const submission: ContactSubmission = {
    ...data,
    suspicious,
    spamScore,
  };

  submissions.push(submission);

  // Auto-block if very suspicious
  if (spamScore > 10) {
    blockedIPs.add(data.ip);
    console.warn("Auto-blocked suspicious IP: %s", data.ip);
  }

  return submission;
}

/**
 * Calculate spam score for a submission
 */
function calculateSpamScore(
  data: Omit<ContactSubmission, "suspicious" | "spamScore">
): number {
  let score = 0;

  // Check for repeated submissions from same IP
  const recentSubmissions = submissions.filter(
    (s) => s.ip === data.ip && Date.now() - s.timestamp < 24 * 60 * 60 * 1000
  );
  score += recentSubmissions.length * 2;

  // Check for suspicious patterns in content
  const content = `${data.name} ${data.subject} ${data.message}`.toLowerCase();

  const suspiciousPatterns = [
    /\b(viagra|cialis|casino|lottery|bitcoin|crypto)\b/g,
    /\b(click here|visit now|amazing offer)\b/g,
    /https?:\/\/[^\s]+/g,
    /\$[0-9,]+/g,
    /[A-Z]{5,}/g,
  ];

  suspiciousPatterns.forEach((pattern) => {
    const matches = content.match(pattern);
    if (matches) score += matches.length;
  });

  // Check for very short or very long messages
  if (data.message.length < 20) score += 2;
  if (data.message.length > 2000) score += 3;

  // Check for repeated characters
  if (/(.)\1{4,}/.test(content)) score += 3;

  return score;
}

/**
 * Check if IP is blocked
 */
export function isBlockedIP(ip: string): boolean {
  return blockedIPs.has(ip);
}

/**
 * Check if email is blocked
 */
export function isBlockedEmail(email: string): boolean {
  return blockedEmails.has(email.toLowerCase());
}

/**
 * Block an IP address
 */
export function blockIP(ip: string): void {
  blockedIPs.add(ip);
}

/**
 * Block an email address
 */
export function blockEmail(email: string): void {
  blockedEmails.add(email.toLowerCase());
}

/**
 * Get recent suspicious activity
 */
export function getSuspiciousActivity(hours: number = 24): ContactSubmission[] {
  const cutoff = Date.now() - hours * 60 * 60 * 1000;
  return submissions
    .filter((s) => s.timestamp > cutoff && s.suspicious)
    .sort((a, b) => b.spamScore - a.spamScore);
}

/**
 * Get submission statistics
 */
export function getStats() {
  const last24h = submissions.filter(
    (s) => Date.now() - s.timestamp < 24 * 60 * 60 * 1000
  );

  return {
    totalSubmissions: submissions.length,
    last24h: last24h.length,
    suspicious: last24h.filter((s) => s.suspicious).length,
    blockedIPs: blockedIPs.size,
    blockedEmails: blockedEmails.size,
    topIPs: getTopIPs(last24h),
  };
}

function getTopIPs(submissions: ContactSubmission[]) {
  const ipCounts = new Map<string, number>();
  submissions.forEach((s) => {
    ipCounts.set(s.ip, (ipCounts.get(s.ip) || 0) + 1);
  });

  return Array.from(ipCounts.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);
}

/**
 * Export data for analysis (use with caution)
 */
export function exportData(): {
  submissions: ContactSubmission[];
  blockedIPs: string[];
  blockedEmails: string[];
} {
  return {
    submissions: submissions.slice(),
    blockedIPs: Array.from(blockedIPs),
    blockedEmails: Array.from(blockedEmails),
  };
}
