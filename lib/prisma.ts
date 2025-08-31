/**
 * Prisma Database Client
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { PrismaClient } from "@prisma/client";

// Global is used here to maintain a single instance of Prisma Client across hot reloads in development.
// This is needed because in development, the code is re-executed on every file change, which would normally
// create a new instance of PrismaClient each time. This pattern ensures we reuse the same instance.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Enhanced logging for security monitoring
    log: process.env.NODE_ENV === "production" ? ["error", "warn"] : [],
    // Prevent connection during build time
    datasources: {
      db: {
        url:
          process.env.DATABASE_URL ||
          "postgresql://dummy:dummy@localhost:5432/dummy?schema=public",
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
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

// Safe query wrapper with automatic retry
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
      // Exponential backoff
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }
  return null;
}
