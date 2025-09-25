/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

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

  // Remove HTML tags and encode remaining angle brackets safely
  let htmlStripped = input;

  // Iterative removal: Keep removing HTML tags until no more tags are found
  let previousLength;
  do {
    previousLength = htmlStripped.length;
    htmlStripped = htmlStripped.replace(/<[^>]*>/g, "");
  } while (htmlStripped.length !== previousLength);

  // Encode any remaining angle brackets
  htmlStripped = htmlStripped.replace(/</g, "&lt;").replace(/>/g, "&gt;");

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

  // Remove HTML tags completely with proper handling
  let sanitized = input;

  // Iterative removal: Keep removing HTML tags until no more tags are found
  let previousLength;
  do {
    previousLength = sanitized.length;
    sanitized = sanitized.replace(/<[^>]*>/g, "");
  } while (sanitized.length !== previousLength);

  // Then encode remaining angle brackets
  sanitized = sanitized.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Remove script tags and dangerous protocols in a single pass
  sanitized = sanitized.replace(/(javascript|data|vbscript):/gi, "");

  // Remove potentially dangerous event handler attributes efficiently
  // This handles all common event attributes (onclick, onload, etc.) in one pass
  sanitized = sanitized.replace(/\bon\w+\s*=\s*[^>\s]*/gi, "");

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
