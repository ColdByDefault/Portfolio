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
 * Rate limiting check
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
  const htmlStripped = input.replace(/<|>/g, "");

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
  if (domain && disposableDomains.includes(domain)) {
    return { valid: false, reason: "Disposable email addresses not allowed" };
  }

  return { valid: true };
}

/**
 * Contact form rate limiter with stricter limits
 */
export class ContactRateLimiter extends RateLimiter {
  constructor() {
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
    if (error.message.includes("timeout")) {
      return "Request timeout";
    }
    if (error.message.includes("AI service")) {
      return error.message;
    }
  }

  return "Service temporarily unavailable";
}

/**
 * ChatBot-specific input sanitization with XSS protection
 */
export function sanitizeChatInput(input: string): string {
  if (!input) return "";

  // Remove HTML tags completely
  let sanitized = input;
  // Repeat removal to ensure all nested or malformed tags are eliminated
  let prevSanitized;
  do {
    prevSanitized = sanitized;
    sanitized = sanitized.replace(/<[^>]*>/g, "");
  } while (sanitized !== prevSanitized);

  // Remove script tags and javascript: protocols
  sanitized = sanitized.replace(/javascript:/gi, "");
  sanitized = sanitized.replace(/data:/gi, "");
  sanitized = sanitized.replace(/vbscript:/gi, "");

  // Remove potentially dangerous attributes
  // Repeat the replacement until no more dangerous attributes are left
  let prevAttrSanitized;
  do {
    prevAttrSanitized = sanitized;
    sanitized = sanitized.replace(/on\w+\s*=\s*[^>]*/gi, "");
  } while (sanitized !== prevAttrSanitized);

  // Remove excessive whitespace but preserve line breaks
  sanitized = sanitized.replace(/\s{2,}/g, " ").trim();

  return sanitized;
}

/**
 * Advanced spam detection for chat messages
 */
export function isChatSpam(content: string): boolean {
  if (!content) return true;

  // Check for common spam patterns
  const spamPatterns = [
    /(.)\1{6,}/g, // Repeated characters (7+ times)
    /[A-Z]{8,}/g, // Excessive ALL CAPS
    /\b(CLICK|BUY|MONEY|FREE|URGENT|LIMITED|ACT NOW)\b/gi,
    /\$[0-9,]+/g, // Money amounts
    /\b[0-9]{3}[-.]?[0-9]{3}[-.]?[0-9]{4}\b/g, // Phone numbers
    /https?:\/\/[^\s]+/gi, // URLs
    /\b(bitcoin|crypto|lottery|casino|viagra|cialis)\b/gi,
  ];

  let spamScore = 0;
  spamPatterns.forEach((pattern) => {
    const matches = content.match(pattern);
    if (matches) {
      spamScore += matches.length;
    }
  });

  // Additional checks
  if (content.length < 2) spamScore += 2;
  if (content.length > 2000) spamScore += 3;

  // Check for repeated words
  const words = content.toLowerCase().split(/\s+/);
  const wordCounts = new Map();
  words.forEach((word) => {
    if (word.length > 3) {
      wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
    }
  });

  for (const count of wordCounts.values()) {
    if (count > 3) spamScore += 2;
  }

  return spamScore >= 4;
}

/**
 * Validate and sanitize user agent string
 */
export function validateUserAgent(userAgent: string | null): boolean {
  if (!userAgent) return false;

  // Check for minimum length
  if (userAgent.length < 10) return false;

  // Check for suspicious patterns
  const suspiciousPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /python/i,
    /curl/i,
    /wget/i,
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(userAgent)) {
      return false;
    }
  }

  return true;
}

/**
 * ChatBot rate limiter with enhanced DoS protection
 */
export class ChatBotRateLimiter extends RateLimiter {
  private readonly maxBurst: number;
  private readonly burstWindow: number;
  private burstCounts: Map<string, { count: number; windowStart: number }> =
    new Map();

  constructor() {
    // Allow 5 messages per minute, 20 per hour
    super(60 * 1000, 5);
    this.maxBurst = 3; // Max 3 messages in 10 seconds
    this.burstWindow = 10 * 1000;
  }

  override isAllowed(identifier: string): boolean {
    const now = Date.now();

    // Check burst limit first
    const burstData = this.burstCounts.get(identifier);
    if (burstData) {
      if (now - burstData.windowStart < this.burstWindow) {
        if (burstData.count >= this.maxBurst) {
          return false;
        }
        burstData.count++;
      } else {
        this.burstCounts.set(identifier, { count: 1, windowStart: now });
      }
    } else {
      this.burstCounts.set(identifier, { count: 1, windowStart: now });
    }

    // Then check regular rate limit
    return super.isAllowed(identifier);
  }
}

/**
 * Prevent session fixation attacks
 */
export function validateSessionId(sessionId: string | null): boolean {
  if (!sessionId) return false;

  const pattern = /^session_\d{13}_[a-f0-9]{32}$/;
  return pattern.test(sessionId);
}

/**
 * Check for suspicious activity patterns
 */
export function detectSuspiciousActivity(
  clientIP: string,
  userAgent: string,
  messageCount: number,
  timeWindow: number
): boolean {
  // Rapid fire messages
  if (messageCount > 10 && timeWindow < 60000) {
    // 10 messages in 1 minute
    return true;
  }

  // Check for automation patterns
  if (!validateUserAgent(userAgent)) {
    return true;
  }

  return false;
}
