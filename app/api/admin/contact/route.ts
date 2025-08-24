/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  getSuspiciousActivity,
  getStats,
  blockIP,
  blockEmail,
} from "@/lib/contact-monitor";

// Simple authentication - replace with proper auth in production
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

function isAuthorized(request: NextRequest): boolean {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  return token === ADMIN_TOKEN;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  try {
    switch (action) {
      case "stats":
        return NextResponse.json(getStats());

      case "suspicious":
        const hours = parseInt(searchParams.get("hours") || "24");
        return NextResponse.json(getSuspiciousActivity(hours));

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

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { action, ip, email } = await request.json();

    switch (action) {
      case "block_ip":
        if (!ip) {
          return NextResponse.json(
            { error: "IP address required" },
            { status: 400 }
          );
        }
        blockIP(ip);
        return NextResponse.json({ message: `IP ${ip} blocked successfully` });

      case "block_email":
        if (!email) {
          return NextResponse.json(
            { error: "Email address required" },
            { status: 400 }
          );
        }
        blockEmail(email);
        return NextResponse.json({
          message: `Email ${email} blocked successfully`,
        });

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
