/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

/**
 * Validates and sanitizes URL parameters
 */
export function validateURLParam(param: string | null): string | null {
  if (!param) return null;

  // Remove any potentially dangerous characters
  const sanitized = param.replace(/[<>&"'/]/g, "");

  // Limit length to prevent DoS
  if (sanitized.length > 100) return null;

  return sanitized;
}

/**
 * Validates GitHub API data type parameter
 */
export function validateDataType(type: string | null): string {
  const allowedTypes = ["profile", "repos", "stats", "activity", "all"];

  if (!type || !allowedTypes.includes(type)) {
    return "all";
  }

  return type;
}

/**
 * Rate limiting check (simple implementation)
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(windowMs: number = 60000, maxRequests: number = 10) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];

    // Remove old requests outside the window
    const validRequests = requests.filter((time) => now - time < this.windowMs);

    if (validRequests.length >= this.maxRequests) {
      return false;
    }

    validRequests.push(now);
    this.requests.set(identifier, validRequests);

    return true;
  }
}

/**
 * Enhanced input sanitization for contact forms
 */
export function sanitizeInput(input: string): string {
  if (!input) return "";

  // Remove HTML tags and script injections
  const htmlStripped = input.replace(/<[^>]*>/g, "");

  // Remove common spam patterns
  const spamPatterns = [
    /\b(viagra|cialis|casino|poker|lottery|bitcoin|crypto)\b/gi,
    /\b(click here|visit now|amazing offer|limited time)\b/gi,
    /\b(make money|earn money|work from home|get rich)\b/gi,
    /https?:\/\/[^\s]+/g, // Remove URLs
  ];

  let sanitized = htmlStripped;
  spamPatterns.forEach((pattern) => {
    sanitized = sanitized.replace(pattern, "[FILTERED]");
  });

  return sanitized.trim();
}

/**
 * Validates email format and checks for suspicious patterns
 */
export function validateEmailSecurity(email: string): {
  valid: boolean;
  reason?: string;
} {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return { valid: false, reason: "Invalid email format" };
  }

  // Check for suspicious patterns
  const suspiciousPatterns = [
    /\+.*\+/g, // Multiple plus signs
    /\.{2,}/g, // Multiple dots
    /@.*@/g, // Multiple @ symbols
    /[0-9]{10,}/, // Long number sequences
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(email)) {
      return { valid: false, reason: "Suspicious email pattern detected" };
    }
  }

  // Check for disposable email domains
  const disposableDomains = [
    "10minutemail.com",
    "tempmail.org",
    "guerrillamail.com",
    "mailinator.com",
    "throwaway.email",
    "temp-mail.org",
  ];

  const domain = email.split("@")[1]?.toLowerCase();
  if (disposableDomains.includes(domain)) {
    return { valid: false, reason: "Disposable email addresses not allowed" };
  }

  return { valid: true };
}

/**
 * Contact form rate limiter with stricter limits
 */
export class ContactRateLimiter extends RateLimiter {
  constructor() {
    // Allow only 1 email per 15 minutes per IP
    super(15 * 60 * 1000, 1);
  }
}

/**
 * Check if content appears to be spam
 */
export function isSpamContent(content: string): boolean {
  const spamIndicators = [
    /(.)\1{4,}/g, // Repeated characters (5+ times)
    /[A-Z]{5,}/g, // ALL CAPS words
    /\b(URGENT|IMMEDIATE|ACT NOW|LIMITED TIME|CONGRATULATIONS)\b/gi,
    /\$[0-9,]+/g, // Money amounts
    /\b[0-9]{3}[-.]?[0-9]{3}[-.]?[0-9]{4}\b/g, // Phone numbers
  ];

  let spamScore = 0;

  spamIndicators.forEach((pattern) => {
    const matches = content.match(pattern);
    if (matches) {
      spamScore += matches.length;
    }
  });

  // Content is spam if score > 3 or very short/long
  return spamScore > 3 || content.length < 10 || content.length > 5000;
}

/**
 * Sanitizes error messages to prevent information leakage
 */
export function sanitizeErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    // Only return safe error messages
    if (error.message.includes("fetch")) {
      return "Network request failed";
    }
    if (error.message.includes("rate limit")) {
      return "Too many requests";
    }
    if (error.message.includes("404")) {
      return "Resource not found";
    }
    if (error.message.includes("403")) {
      return "Access denied";
    }
  }

  return "Service temporarily unavailable";
}
