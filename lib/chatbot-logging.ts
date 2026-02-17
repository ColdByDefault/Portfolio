/**
 * ChatBot Logging Utilities
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

import type { GeoIPInfo } from "@/types/configs/chatbot";

/**
 * Get geolocation info from IP address using a free API
 * Uses ip-api.com (free, no API key required, 45 requests/minute limit)
 * @param ip - IP address to lookup
 * @returns GeoIP information (country, city, timezone)
 */
export async function getGeoIPInfo(
  ip: string,
): Promise<GeoIPInfo | Record<string, undefined>> {
  // Don't lookup localhost or private IPs
  // Check for private IP ranges per RFC 1918:
  // - 10.0.0.0/8 (10.0.0.0 to 10.255.255.255)
  // - 172.16.0.0/12 (172.16.0.0 to 172.31.255.255)
  // - 192.168.0.0/16 (192.168.0.0 to 192.168.255.255)
  const isPrivateIP =
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("192.168.") ||
    ip.startsWith("10.") ||
    (ip.startsWith("172.") &&
      (() => {
        const secondOctet = parseInt(ip.split(".")[1], 10);
        return secondOctet >= 16 && secondOctet <= 31;
      })());

  if (isPrivateIP) {
    return {
      country: "LOCAL",
      city: "Local",
      timezone: "UTC",
    };
  }

  try {
    // Using ip-api.com - free tier allows 45 requests/minute
    const response = await fetch(
      `http://ip-api.com/json/${ip}?fields=country,city,timezone,status,message`,
      {
        method: "GET",
        headers: {
          "User-Agent": "Portfolio-Chatbot/1.0",
        },
        // Cache for 1 hour to reduce API calls
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      console.warn(`GeoIP API returned status: ${response.status}`);
      return {};
    }

    const data = (await response.json()) as {
      status?: string;
      country?: string;
      city?: string;
      timezone?: string;
      message?: string;
    };

    if (data.status === "fail") {
      console.warn(`GeoIP lookup failed: ${data.message || "Unknown error"}`);
      return {};
    }

    const result: GeoIPInfo = {};
    if (data.country) result.country = data.country;
    if (data.city) result.city = data.city;
    if (data.timezone) result.timezone = data.timezone;
    return result;
  } catch (error) {
    console.error("Error fetching GeoIP info:", error);
    return {};
  }
}

/**
 * Anonymize IP address by removing last octet (IPv4) or last 4 groups (IPv6)
 * This helps with GDPR compliance by not storing full IP addresses
 * @param ip - IP address to anonymize
 * @returns Anonymized IP address
 */
export function anonymizeIP(ip: string): string {
  if (ip.includes(":")) {
    // IPv6 - Keep first 64 bits (4 groups), zero out last 64 bits
    // Properly handle compressed notation (::)

    try {
      // Expand compressed IPv6 addresses
      let expanded = ip;
      if (ip.includes("::")) {
        const sides = ip.split("::");
        const leftGroups = sides[0] ? sides[0].split(":") : [];
        const rightGroups = sides[1] ? sides[1].split(":") : [];
        const missingGroups = 8 - leftGroups.length - rightGroups.length;
        const middleGroups = Array(missingGroups).fill("0");
        expanded = [...leftGroups, ...middleGroups, ...rightGroups].join(":");
      }

      // Split into groups and take first 4 (network prefix)
      const groups = expanded.split(":");
      if (groups.length >= 4) {
        // Keep first 4 groups, zero out the rest
        const networkPrefix = groups.slice(0, 4).join(":");
        return `${networkPrefix}::`;
      }

      // Fallback for malformed addresses
      return ip;
    } catch {
      // If parsing fails, return as-is
      return ip;
    }
  } else {
    // IPv4 - remove last octet
    const parts = ip.split(".");
    return parts.slice(0, -1).join(".") + ".0";
  }
}

/**
 * Check if chat logging is enabled via environment variable
 */
export function isChatLoggingEnabled(): boolean {
  return process.env.CHATBOT_LOGGING_ENABLED === "true";
}

/**
 * Check if IP should be anonymized (GDPR compliance)
 */
export function shouldAnonymizeIP(): boolean {
  return process.env.CHATBOT_ANONYMIZE_IP !== "false"; // Default to true
}
