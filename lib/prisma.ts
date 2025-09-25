/**
 * Prisma Database Client
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { PrismaClient } from "@prisma/client";

// Type-safe global declaration
declare global {
  var __prisma: PrismaClient | undefined;
}

// Database configuration with security and performance optimizations
const createPrismaClient = (): PrismaClient => {
  // Validate required environment variables
  if (!process.env.DATABASE_URL) {
    throw new Error("Database configuration error");
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === "production" ? ["error", "warn"] : [],
    // Remove datasources override - use environment configuration only
    // This prevents hardcoded URL overrides and improves security
  });
};

// Singleton pattern with proper typing
export const prisma: PrismaClient = globalThis.__prisma ?? createPrismaClient();

// Development-only global assignment
if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
}

// Enhanced database health check
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error("Database health check failed:", error);
    return false;
  }
}

export async function safeQuery<T>(
  queryFn: () => Promise<T>,
  retries = 3
): Promise<T | null> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await queryFn();
    } catch (error) {
      if (attempt === retries) {
        console.error("Query failed after all retries:", error);
        return null;
      }
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }
  return null;
}
