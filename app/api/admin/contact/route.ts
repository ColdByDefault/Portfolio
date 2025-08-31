/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type {
  ContactApiResponse,
  BlockActionResponse,
  ApiErrorResponse,
  ContactAdminRequest,
} from "@/types/api";
import {
  getSuspiciousActivity,
  getStats,
  blockIP,
  blockEmail,
} from "@/lib/contact-monitor";

// Enhanced authentication - replace with proper auth in production
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

function getClientIP(request: NextRequest): string {
  // Check various headers in order of preference
  const headers = [
    "x-forwarded-for",
    "x-real-ip",
    "x-client-ip",
    "x-forwarded",
    "x-cluster-client-ip",
    "forwarded-for",
    "forwarded",
  ];

  for (const header of headers) {
    const value = request.headers.get(header);
    if (value) {
      // x-forwarded-for can contain multiple IPs, take the first one
      const ip = value.split(",")[0]?.trim();
      if (ip && ip !== "unknown") {
        return ip;
      }
    }
  }

  return "unknown";
}

function isAuthorized(request: NextRequest): boolean {
  if (!ADMIN_TOKEN) {
    console.error("ADMIN_TOKEN environment variable not set");
    return false;
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return false;
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : authHeader;

  // Use constant-time comparison to prevent timing attacks
  if (token.length !== ADMIN_TOKEN.length) {
    return false;
  }

  let isEqual = true;
  for (let i = 0; i < token.length; i++) {
    if (token[i] !== ADMIN_TOKEN[i]) {
      isEqual = false;
    }
  }

  return isEqual;
}

export function GET(
  request: NextRequest
): NextResponse<ContactApiResponse | ApiErrorResponse> {
  if (!isAuthorized(request)) {
    // Log unauthorized access attempt
    const clientIP = getClientIP(request);
    console.warn("Unauthorized admin access attempt", {
      ip: clientIP,
      userAgent: request.headers.get("user-agent"),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  try {
    switch (action) {
      case "stats": {
        const stats = getStats();
        return NextResponse.json({ success: true, data: stats });
      }

      case "suspicious": {
        const hours = Math.min(
          parseInt(searchParams.get("hours") || "24", 10),
          168
        ); // Max 7 days
        const suspicious = getSuspiciousActivity(hours);
        return NextResponse.json({ success: true, data: suspicious });
      }

      default:
        return NextResponse.json({
          message: "Contact monitoring API",
          endpoints: {
            stats: "/api/admin/contact?action=stats",
            suspicious: "/api/admin/contact?action=suspicious&hours=24",
          },
        });
    }
  } catch (error) {
    console.error("Admin API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<BlockActionResponse | ApiErrorResponse>> {
  if (!isAuthorized(request)) {
    const clientIP = getClientIP(request);
    console.warn("Unauthorized admin POST attempt", {
      ip: clientIP,
      userAgent: request.headers.get("user-agent"),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Validate content type
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { error: "Content-Type must be application/json" },
        { status: 400 }
      );
    }

    // Parse and validate request body
    let requestBody: ContactAdminRequest;
    try {
      requestBody = (await request.json()) as ContactAdminRequest;
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { action, ip, email } = requestBody;

    // Validate action
    if (!action || typeof action !== "string") {
      return NextResponse.json(
        { error: "Action is required and must be a string" },
        { status: 400 }
      );
    }

    switch (action) {
      case "block_ip": {
        if (!ip || typeof ip !== "string") {
          return NextResponse.json(
            { error: "IP address required" },
            { status: 400 }
          );
        }

        // Enhanced IP validation supporting both IPv4 and IPv6
        if (ip.length > 45) {
          // IPv6 can be up to 45 characters
          return NextResponse.json(
            { error: "IP address too long" },
            { status: 400 }
          );
        }

        // Robust IP format validation for both IPv4 and IPv6
        const isValidIP = (address: string): boolean => {
          // IPv4 regex pattern
          const ipv4Regex =
            /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

          // IPv6 regex pattern (handles full, compressed, and mixed notations)
          const ipv6Regex =
            /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$|^(?:[0-9a-fA-F]{1,4}:)*::(?:[0-9a-fA-F]{1,4}:)*[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:)*::(?:[0-9a-fA-F]{1,4}:)*(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

          return ipv4Regex.test(address) || ipv6Regex.test(address);
        };

        if (!isValidIP(ip)) {
          return NextResponse.json(
            { error: "Invalid IP address format (IPv4 or IPv6 supported)" },
            { status: 400 }
          );
        }

        blockIP(ip);

        // Log the blocking action
        console.info("IP blocked by admin", {
          blockedIP: ip,
          adminIP: getClientIP(request),
          timestamp: new Date().toISOString(),
        });

        return NextResponse.json({ message: `IP ${ip} blocked successfully` });
      }

      case "block_email": {
        if (!email || typeof email !== "string") {
          return NextResponse.json(
            { error: "Email address required" },
            { status: 400 }
          );
        }

        // Prevent ReDoS attacks by limiting input length
        if (email.length > 254) {
          return NextResponse.json(
            { error: "Email address too long" },
            { status: 400 }
          );
        }

        // Safe email format validation - prevents ReDoS with specific quantifiers
        const emailRegex =
          /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]{1,253}\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
          return NextResponse.json(
            { error: "Invalid email address format" },
            { status: 400 }
          );
        }

        blockEmail(email);

        // Log the blocking action
        console.info("Email blocked by admin", {
          blockedEmail: email,
          adminIP: getClientIP(request),
          timestamp: new Date().toISOString(),
        });

        return NextResponse.json({
          message: `Email ${email} blocked successfully`,
        });
      }

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Admin API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
