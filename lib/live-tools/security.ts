/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
*/

export function sanitizeChatInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")
    .trim();
}

export function isChatSpam(input: string): boolean {
  const spamPatterns = [/(.)\1{10,}/, /https?:\/\/[^\s]+/gi];

  const matches = spamPatterns.filter((pattern) => pattern.test(input));
  return matches.length >= 2;
}

export function sanitizeErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes("API") || error.message.includes("key")) {
      return "Service temporarily unavailable";
    }
    return "An unexpected error occurred";
  }
  return "An unexpected error occurred";
}
