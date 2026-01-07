/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import {
  checkRateLimit,
  getRemainingUses,
} from "@/lib/live-tools/rewriter-rate-limit";
import {
  ANALYZE_PROMPT,
  MAX_EMAIL_LENGTH,
  MAX_CONTEXT_LENGTH,
} from "@/data/live-tools/email-rewriter";
import {
  sanitizeChatInput,
  isChatSpam,
  sanitizeErrorMessage,
} from "@/lib/security";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const REWRITER_ENABLED = process.env.REWRITER_ENABLED !== "false";

const analyzeRequestSchema = z.object({
  email: z
    .string()
    .min(1, "Email content is required")
    .max(MAX_EMAIL_LENGTH, `Email must be under ${MAX_EMAIL_LENGTH} characters`)
    .refine((val) => !isChatSpam(val), "Spam content detected")
    .transform((val) => sanitizeChatInput(val)),
  context: z
    .string()
    .max(
      MAX_CONTEXT_LENGTH,
      `Context must be under ${MAX_CONTEXT_LENGTH} characters`
    )
    .optional()
    .transform((val) => (val ? sanitizeChatInput(val) : undefined)),
});

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  return cfConnectingIp || realIp || forwarded?.split(",")[0] || "127.0.0.1";
}

async function callGroqAPI(
  email: string,
  systemPrompt: string,
  context?: string
): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error("Groq API key not configured");
  }

  let fullPrompt = systemPrompt;
  if (context) {
    fullPrompt += `\n\nIMPORTANT CONTEXT TO USE (this is custom knowledge provided by the user - incorporate it naturally into your analysis and responses):\n${context}`;
  }

  const messages = [
    { role: "system" as const, content: fullPrompt },
    {
      role: "user" as const,
      content: `Analyze this email and provide response options:\n\n${email}`,
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
        model: "openai/gpt-oss-120b",
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000,
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
    if (!REWRITER_ENABLED) {
      return NextResponse.json(
        { error: "Email analyzer service is currently disabled" },
        { status: 503 }
      );
    }

    if (!GROQ_API_KEY) {
      console.error("GROQ_API_KEY not configured");
      return NextResponse.json(
        { error: "Service configuration error" },
        { status: 500 }
      );
    }

    const clientIP = getClientIP(request);

    const rateLimitResult = checkRateLimit(clientIP);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please try again later.",
          remaining: 0,
        },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const validationResult = analyzeRequestSchema.safeParse(body);

    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message || "Invalid request data" },
        { status: 400 }
      );
    }

    const { email, context } = validationResult.data;

    const rawResponse = await callGroqAPI(email, ANALYZE_PROMPT, context);

    // Parse JSON response
    let analysisResult;
    try {
      // Clean the response - remove markdown code blocks if present
      const cleanedResponse = rawResponse
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      analysisResult = JSON.parse(cleanedResponse);
    } catch {
      console.error("Failed to parse AI response:", rawResponse);
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    const remaining = getRemainingUses(clientIP);

    return NextResponse.json(
      {
        ...analysisResult,
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
    console.error("Email analyze error:", error);
    const sanitizedError = sanitizeErrorMessage(error);

    if (error instanceof Error && error.message.includes("Groq API")) {
      return NextResponse.json(
        {
          error: "AI service temporarily unavailable. Please try again later.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ error: sanitizedError }, { status: 500 });
  }
}