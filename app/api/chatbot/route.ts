/**
 * ChatBot API Route with Gemini AI Integration
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { randomBytes } from "crypto";
import type {
  ChatBotRequest,
  ChatBotResponse,
  ChatBotApiError,
  ChatBotRateLimit,
  ChatBotConfig,
  ChatMessage,
} from "@/types/configs/chatbot";
import { sanitizeChatInput, isChatSpam } from "@/lib/security";
import {
  REEM_SYSTEM_PROMPT,
  REEM_CONFIG,
} from "@/data/live-tools/chatbot-system-prompt";

// Environment configuration with validation
const GEMINI_API_KEY = process.env.GEMINI_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const CHATBOT_ENABLED = process.env.CHATBOT_ENABLED === "true";

const chatbotConfig: ChatBotConfig = {
  maxMessagesPerSession: parseInt(
    process.env.CHATBOT_MAX_MESSAGES_PER_SESSION || "20",
    10
  ),
  maxMessageLength: parseInt(
    process.env.CHATBOT_MAX_MESSAGE_LENGTH || "1000",
    10
  ),
  rateLimitPerMinute: parseInt(
    process.env.CHATBOT_RATE_LIMIT_PER_MINUTE || "10",
    10
  ),
  rateLimitPerHour: parseInt(
    process.env.CHATBOT_RATE_LIMIT_PER_HOUR || "50",
    10
  ),
  sessionTimeoutMs: parseInt(
    process.env.CHATBOT_SESSION_TIMEOUT_MS || "1800000",
    10
  ),
  systemPrompt: REEM_SYSTEM_PROMPT,
};

// Enhanced validation schemas with security checks
const chatRequestSchema = z.object({
  message: z
    .string()
    .min(1, "Message cannot be empty")
    .max(chatbotConfig.maxMessageLength, "Message too long")
    .refine((val) => !isChatSpam(val), "Spam content detected")
    .transform((val) => sanitizeChatInput(val)),
  sessionId: z
    .string()
    .regex(/^session_[0-9]+_[a-f0-9]+$/, "Invalid session ID format")
    .optional(),
  context: z
    .object({
      page: z.string().max(200).optional(),
      userAgent: z.string().max(500).optional(),
      timestamp: z.number().optional(),
    })
    .optional(),
  csrfToken: z.string().min(32).max(64).optional(),
});

// In-memory rate limiting and session storage
const rateLimits = new Map<string, ChatBotRateLimit>();
const sessions = new Map<string, ChatMessage[]>();

// Utility functions
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");

  return cfConnectingIp || realIp || forwarded?.split(",")[0] || "127.0.0.1";
}

function generateSessionId(): string {
  const rand = randomBytes(16).toString("hex"); // 32 hex chars
  return `session_${Date.now()}_${rand}`;
}

function generateMessageId(): string {
  const rand = randomBytes(12).toString("hex"); // 24 hex chars
  return `msg_${Date.now()}_${rand}`;
}

function isRateLimited(clientIP: string): boolean {
  const now = Date.now();
  const limit = rateLimits.get(clientIP);

  if (!limit) {
    rateLimits.set(clientIP, {
      minute: { count: 1, windowStart: now, lastRequest: now },
      hour: { count: 1, windowStart: now, lastRequest: now },
    });
    return false;
  }

  // Check minute window
  if (now - limit.minute.windowStart > 60000) {
    limit.minute = { count: 1, windowStart: now, lastRequest: now };
  } else {
    limit.minute.count++;
    limit.minute.lastRequest = now;
  }

  // Check hour window
  if (now - limit.hour.windowStart > 3600000) {
    limit.hour = { count: 1, windowStart: now, lastRequest: now };
  } else {
    limit.hour.count++;
    limit.hour.lastRequest = now;
  }

  return (
    limit.minute.count > chatbotConfig.rateLimitPerMinute ||
    limit.hour.count > chatbotConfig.rateLimitPerHour
  );
}

function getRateLimitInfo(clientIP: string): {
  remaining: number;
  resetTime: number;
} {
  const limit = rateLimits.get(clientIP);
  if (!limit) {
    return {
      remaining: chatbotConfig.rateLimitPerMinute,
      resetTime: Date.now() + 60000,
    };
  }

  const minuteRemaining = Math.max(
    0,
    chatbotConfig.rateLimitPerMinute - limit.minute.count
  );
  const nextMinuteReset = limit.minute.windowStart + 60000;

  return {
    remaining: minuteRemaining,
    resetTime: nextMinuteReset,
  };
}

function cleanupSessions(): void {
  const now = Date.now();
  for (const [sessionId, messages] of sessions.entries()) {
    const lastActivity = Math.max(
      ...messages.map((m) => m.timestamp.getTime())
    );
    if (now - lastActivity > chatbotConfig.sessionTimeoutMs) {
      sessions.delete(sessionId);
    }
  }
}

function cleanupRateLimits(): void {
  const now = Date.now();
  for (const [ip, limit] of rateLimits.entries()) {
    if (now - limit.hour.lastRequest > 3600000) {
      // 1 hour
      rateLimits.delete(ip);
    }
  }
}

// Groq API fallback when Gemini quota is exceeded
async function callGroqAPI(
  messages: ChatMessage[],
  systemPrompt: string
): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error("No fallback API available");
  }

  const groqMessages = [
    { role: "system" as const, content: systemPrompt },
    ...messages
      .filter((msg) => msg.role !== "system")
      .map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
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
        messages: groqMessages,
        temperature: 0.7,
        max_tokens: 1024,
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

async function callGeminiAPI(messages: ChatMessage[]): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key not configured");
  }

  // Check if this is the first user message (only 1 message = the user's first message)
  const isFirstMessage = messages.length === 1;

  // Convert messages to Gemini format
  const contents = messages
    .filter((msg) => msg.role !== "system")
    .map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

  // Modify system prompt for first message to include greeting instruction
  let systemPrompt = chatbotConfig.systemPrompt;
  if (isFirstMessage) {
    systemPrompt += `\n\nIMPORTANT: This is the user's FIRST message in this conversation. You MUST start your response with a casual greeting like "What's up!" or "Hola!" or "How you doing!" followed by a brief introduction about yourself and what you can help with.`;
  }

  // Add system prompt as the first message
  const systemMessage = {
    role: "user" as const,
    parts: [{ text: systemPrompt }],
  };

  const requestBody = {
    contents: [systemMessage, ...contents],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
    ],
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({}))) as {
        error?: { message?: string; code?: number };
      };

      // Handle quota exceeded (429) specifically
      if (response.status === 429) {
        const retryMatch =
          errorData.error?.message?.match(/retry in ([\d.]+)s/i);
        const retryAfter = retryMatch?.[1] ? parseFloat(retryMatch[1]) : 60;
        throw new Error(
          `QUOTA_EXCEEDED:${retryAfter}:Gemini API quota exceeded. Please try again later.`
        );
      }

      throw new Error(
        `Gemini API error: ${response.status} - ${
          errorData.error?.message || "Unknown error"
        }`
      );
    }

    const data = (await response.json()) as {
      candidates?: Array<{
        content?: {
          parts?: Array<{ text?: string }>;
        };
      }>;
    };

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error("Invalid response format from Gemini API");
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini API call failed:", error);

    // Try Groq as fallback if Gemini quota exceeded and Groq key available
    if (
      GROQ_API_KEY &&
      error instanceof Error &&
      (error.message.includes("QUOTA_EXCEEDED") ||
        error.message.includes("429"))
    ) {
      console.log("Falling back to Groq API...");
      return callGroqAPI(messages, systemPrompt);
    }

    throw error;
  }
}

// API Routes
export async function POST(
  request: NextRequest
): Promise<NextResponse<ChatBotResponse | ChatBotApiError>> {
  // Check if chatbot is enabled
  if (!CHATBOT_ENABLED) {
    return NextResponse.json(
      {
        error: "ChatBot service is currently unavailable",
        code: "SERVICE_UNAVAILABLE",
      },
      { status: 503 }
    );
  }

  // Get client IP and check rate limiting
  const clientIP = getClientIP(request);

  if (isRateLimited(clientIP)) {
    const rateLimitInfo = getRateLimitInfo(clientIP);
    return NextResponse.json(
      {
        error: "Too many requests. Please try again later.",
        code: "RATE_LIMIT_EXCEEDED",
        details: rateLimitInfo,
      },
      { status: 429 }
    );
  }

  try {
    // Validate content type
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        {
          error: "Content-Type must be application/json",
          code: "INVALID_INPUT",
        },
        { status: 400 }
      );
    }

    // Parse and validate request body
    let requestBody: ChatBotRequest;
    try {
      const rawBody = (await request.json()) as unknown;
      const validatedBody = chatRequestSchema.parse(rawBody);
      requestBody = validatedBody as ChatBotRequest;
    } catch (error) {
      return NextResponse.json(
        {
          error:
            error instanceof z.ZodError
              ? `Validation error: ${error.issues
                  .map((e) => e.message)
                  .join(", ")}`
              : "Invalid request body",
          code: "INVALID_INPUT",
        },
        { status: 400 }
      );
    }

    // Generate or validate session ID
    const sessionId = requestBody.sessionId || generateSessionId();

    // Get or initialize session messages
    const sessionMessages = sessions.get(sessionId) || [];

    // Check session message limit
    if (sessionMessages.length >= chatbotConfig.maxMessagesPerSession) {
      return NextResponse.json(
        {
          error: `Maximum ${chatbotConfig.maxMessagesPerSession} messages per session exceeded`,
          code: "INVALID_INPUT",
        },
        { status: 400 }
      );
    }

    // Create user message
    const userMessage: ChatMessage = {
      id: generateMessageId(),
      role: "user",
      content: requestBody.message.trim(),
      timestamp: new Date(),
      status: "sent",
    };

    // Add user message to session
    sessionMessages.push(userMessage);

    // Call Gemini AI
    const aiResponse = await callGeminiAPI(sessionMessages);

    // Create assistant message
    const assistantMessage: ChatMessage = {
      id: generateMessageId(),
      role: "assistant",
      content: aiResponse,
      timestamp: new Date(),
      status: "sent",
    };

    // Add assistant message to session
    sessionMessages.push(assistantMessage);

    // Update session storage
    sessions.set(sessionId, sessionMessages);

    // Cleanup old sessions and rate limits periodically during requests
    if (Math.random() < 0.1) {
      cleanupSessions();
      cleanupRateLimits();
    }

    const rateLimitInfo = getRateLimitInfo(clientIP);

    return NextResponse.json({
      success: true,
      data: {
        message: aiResponse,
        sessionId,
        messageId: assistantMessage.id,
      },
      rateLimitInfo,
    });
  } catch (error) {
    console.error("ChatBot API error:", error);

    // Check for quota exceeded error
    if (error instanceof Error && error.message.startsWith("QUOTA_EXCEEDED:")) {
      const [, retryAfter, message] = error.message.split(":");
      const retrySeconds = retryAfter ? parseFloat(retryAfter) : 60;
      return NextResponse.json(
        {
          error:
            message || "AI service quota exceeded. Please try again later.",
          code: "QUOTA_EXCEEDED",
          retryAfter: retrySeconds || 60,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(retrySeconds || 60)),
          },
        }
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? "AI service temporarily unavailable"
            : "Internal server error",
        code: "SERVICE_UNAVAILABLE",
      },
      { status: 500 }
    );
  }
}

export function GET(): NextResponse<{
  status: string;
  config: Partial<ChatBotConfig>;
  assistant: typeof REEM_CONFIG;
}> {
  return NextResponse.json({
    status: CHATBOT_ENABLED ? "available" : "disabled",
    config: {
      maxMessageLength: chatbotConfig.maxMessageLength,
      maxMessagesPerSession: chatbotConfig.maxMessagesPerSession,
    },
    assistant: REEM_CONFIG,
  });
}
