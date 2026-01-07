// API route to check remaining uses

import { headers } from "next/headers";
import { getRemainingUses } from "@/lib/live-tools/rewriter-rate-limit";

export async function GET() {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";

  const remaining = getRemainingUses(ip);

  return Response.json({ remaining });
}
