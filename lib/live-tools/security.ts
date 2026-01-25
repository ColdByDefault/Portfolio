/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

/**
 * ChatBot-specific input sanitization with XSS protection
 * Uses character-by-character parsing to prevent ReDoS attacks
 */
export function sanitizeChatInput(input: string): string {
  if (!input) return "";

  // Prevent ReDoS by limiting input length
  if (input.length > 10000) return "";

  // Secure HTML tag removal using character-by-character parsing
  let sanitized = "";
  let insideTag = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char === "<") {
      insideTag = true;
      continue;
    }

    if (char === ">" && insideTag) {
      insideTag = false;
      continue;
    }

    if (!insideTag) {
      sanitized += char;
    }
  }

  // Complete HTML entity encoding to prevent XSS
  sanitized = sanitized
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");

  // Remove dangerous protocols (javascript:, data:, vbscript:)
  sanitized = sanitized.replace(/(javascript|data|vbscript):/gi, "");

  // Remove potentially dangerous event handler attributes iteratively
  let previousLength;
  do {
    previousLength = sanitized.length;
    sanitized = sanitized.replace(/\bon\w+\s*=\s*[^>\s]*/gi, "");
  } while (sanitized.length !== previousLength);

  // Remove excessive whitespace but preserve readability
  sanitized = sanitized.replace(/\s{2,}/g, " ").trim();

  return sanitized;
}

/**
 * Advanced spam detection for chat messages
 * Uses ReDoS-safe regex patterns and scoring system
 */
export function isChatSpam(content: string): boolean {
  if (!content) return true;

  // Prevent ReDoS by limiting input length
  if (content.length > 10000) return true;

  // Check for common spam patterns (ReDoS-safe implementations)
  const spamPatterns = [
    /(.)\1{6,}/g, // Repeated characters (7+ times)
    /[A-Z]{8,}/g, // Excessive ALL CAPS
    /\b(CLICK|BUY|MONEY|FREE|URGENT|LIMITED|ACT NOW)\b/gi,
    /\$[0-9,]+/g, // Money amounts
    /https?:\/\/\S+/gi, // URLs (efficient pattern)
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
  const wordCounts = new Map<string, number>();
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
 * Sanitizes error messages to prevent information leakage
 * Never expose internal details, API keys, or stack traces
 */
export function sanitizeErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    // Check for sensitive information patterns
    const sensitivePatterns = [
      "api",
      "key",
      "token",
      "secret",
      "password",
      "credential",
      "auth",
      "bearer",
      "private",
      "internal",
      "config",
      "env",
      "database",
      "prisma",
      "sql",
      "connection",
    ];

    if (sensitivePatterns.some((pattern) => message.includes(pattern))) {
      return "Service temporarily unavailable";
    }

    // Return safe, user-friendly messages for known error types
    if (message.includes("fetch") || message.includes("network")) {
      return "Network request failed";
    }
    if (message.includes("rate limit")) {
      return "Too many requests. Please try again later";
    }
    if (message.includes("404") || message.includes("not found")) {
      return "Resource not found";
    }
    if (message.includes("403") || message.includes("forbidden")) {
      return "Access denied";
    }
    if (message.includes("401") || message.includes("unauthorized")) {
      return "Authentication required";
    }
    if (message.includes("timeout")) {
      return "Request timeout. Please try again";
    }
    if (message.includes("validation")) {
      return "Invalid input provided";
    }
  }

  return "An unexpected error occurred";
}
