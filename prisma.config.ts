/**
 * Prisma Configuration for Prisma ORM 7
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // Schema location
  schema: "prisma/schema.prisma",

  // Migration configuration
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },

  // Database connection
  datasource: {
    url: env("DATABASE_URL"),
  },
});
