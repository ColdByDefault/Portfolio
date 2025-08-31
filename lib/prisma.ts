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
    // Only log errors in production, nothing in development for cleaner console
    log: process.env.NODE_ENV === "production" ? ["error"] : [],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
