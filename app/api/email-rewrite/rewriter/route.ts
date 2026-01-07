/**
 * Email Rewriter API Route with Groq AI Integration
 * @author ColdByDefault
 * @copyright 2026 ColdByDefault. All Rights Reserved.
*/

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import {
  checkRateLimit,
  getRemainingUses,
} from "@/lib/live-tools/rewriter-rate-limit";
import {
  TONE_PROMPTS,
  MAX_EMAIL_LENGTH,
} from "@/data/live-tools/email-rewriter";
import {
  sanitizeChatInput,
  isChatSpam,
  sanitizeErrorMessage,
} from "@/lib/security";

// Environment configuration
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
const REWRITER_ENABLED = process.env.REWRITER_ENABLED !== "false"; // Default to true

// Validation schema with security checks
const rewriteRequestSchema = z.object({
  email: z
    .string()
    .min(1, "Email content is required")
    .max(MAX_EMAIL_LENGTH, `Email must be under ${MAX_EMAIL_LENGTH} characters`)
    .refine((val) => !isChatSpam(val), "Spam content detected")
    .transform((val) => sanitizeChatInput(val)),
  tone: z.enum(["professional", "empathetic", "assertive"]),
});

/**
 * Get client IP address from request headers
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");

  return cfConnectingIp || realIp || forwarded?.split(",")[0] || "127.0.0.1";
}

/**
 * Call Groq API for email rewriting using direct API calls
 */
async function callGroqAPI(
  email: string,
  systemPrompt: string
): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error("Groq API key not configured");
  }

  const messages = [
    { role: "system" as const, content: systemPrompt },
    {
      role: "user" as const,
      content: `Original email:\n\n${email}\n\nPlease rewrite this email according to the instructions.`,
    },
  ];

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 1,
        stream: false,
      }),
    }
  );

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as {
      error?: { message?: string };
    };
    throw new Error(
      `Groq API error: ${response.status} - ${
        errorData.error?.message || "Unknown error"
      }`
    );
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  if (!data.choices?.[0]?.message?.content) {
    throw new Error("Invalid response from Groq API");
  }

  return data.choices[0].message.content;
}

export async function POST(request: NextRequest) {
  try {
    // Check if service is enabled
    if (!REWRITER_ENABLED) {
      return NextResponse.json(
        { error: "Email rewriter service is currently disabled" },
        { status: 503 }
      );
    }

    // Check API key configuration
    if (!GROQ_API_KEY) {
      console.error("GROQ_API_KEY not configured");
      return NextResponse.json(
        { error: "Service configuration error" },
        { status: 500 }
      );
    }

    // Get client IP for rate limiting
    const clientIP = getClientIP(request);

    // Check rate limit
    const rateLimitResult = checkRateLimit(clientIP);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. You can only rewrite 2 emails per day.",
          remaining: 0,
          resetTime: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
        },
        {
          status: 429,
          headers: {
            "Retry-After": "86400", // 24 hours in seconds
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    // Parse and validate request body
    const body = await request.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Validate with Zod schema
    const validationResult = rewriteRequestSchema.safeParse(body);

    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message || "Invalid request data" },
        { status: 400 }
      );
    }

    const { email, tone } = validationResult.data;

    // Get system prompt for the selected tone
    const systemPrompt = TONE_PROMPTS[tone];

    if (!systemPrompt) {
      return NextResponse.json(
        { error: "Invalid tone configuration" },
        { status: 500 }
      );
    }

    // Call Groq API
    const rewrittenEmail = await callGroqAPI(email, systemPrompt);

    // Get remaining uses for this IP
    const remaining = getRemainingUses(clientIP);

    return NextResponse.json(
      {
        rewrittenEmail: rewrittenEmail.trim(),
        remaining,
        success: true,
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Remaining": remaining.toString(),
        },
      }
    );
  } catch (error) {
    console.error("Email rewrite error:", error);

    // Sanitize error message for client
    const sanitizedError = sanitizeErrorMessage(error);

    // Specific error handling
    if (error instanceof Error) {
      if (error.message.includes("Groq API")) {
        return NextResponse.json(
          {
            error:
              "AI service temporarily unavailable. Please try again later.",
          },
          { status: 503 }
        );
      }

      if (error.message.includes("rate limit")) {
        return NextResponse.json(
          { error: "Service rate limit reached. Please try again later." },
          { status: 429 }
        );
      }
    }

    return NextResponse.json({ error: sanitizedError }, { status: 500 });
  }
}
