/**
 * Health Check API Route
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { NextResponse } from "next/server";
import { checkDatabaseHealth } from "@/lib/prisma";

export async function GET() {
  try {
    const dbHealthy = await checkDatabaseHealth();

    return NextResponse.json(
      {
        status: "ok",
        database: dbHealthy ? "connected" : "disconnected",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
      },
      {
        status: dbHealthy ? 200 : 503,
      }
    );
  } catch (error) {
    console.error("Health check failed:", error);

    return NextResponse.json(
      {
        status: "error",
        database: "error",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}
