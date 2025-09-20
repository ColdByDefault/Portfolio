/**
 * ChatBot API Route with Gemini AI Integration
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import type {
  ChatBotRequest,
  ChatBotResponse,
  ChatBotApiError,
  ChatBotRateLimit,
  ChatBotConfig,
  ChatMessage,
} from "@/types/chatbot";
import { sanitizeChatInput, isChatSpam } from "@/lib/security";

// Environment configuration with validation
const GEMINI_API_KEY = process.env.GEMINI_KEY;
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
  systemPrompt: `You are a helpful AI assistant for ColdByDefault's portfolio website. You can help visitors learn more about Yazan Abo-Ayash's projects, skills, and experience. Keep responses concise, professional, and relevant to web development and the portfolio content. If asked about topics outside of the portfolio, politely redirect the conversation back to relevant topics.`,
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
  return `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
}

function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substring(2)}`;
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

async function callGeminiAPI(messages: ChatMessage[]): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key not configured");
  }

  // Convert messages to Gemini format
  const contents = messages
    .filter((msg) => msg.role !== "system")
    .map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

  // Add system prompt as the first message
  const systemMessage = {
    role: "user" as const,
    parts: [{ text: chatbotConfig.systemPrompt }],
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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
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
        error?: { message?: string };
      };
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

    // Cleanup old sessions periodically
    if (Math.random() < 0.1) {
      // 10% chance to run cleanup
      cleanupSessions();
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
}> {
  return NextResponse.json({
    status: CHATBOT_ENABLED ? "available" : "disabled",
    config: {
      maxMessageLength: chatbotConfig.maxMessageLength,
      maxMessagesPerSession: chatbotConfig.maxMessagesPerSession,
    },
  });
}

// Periodic cleanup (runs every 5 minutes)
setInterval(() => {
  cleanupSessions();

  // Also cleanup old rate limit entries
  const now = Date.now();
  for (const [ip, limit] of rateLimits.entries()) {
    if (now - limit.hour.lastRequest > 3600000) {
      // 1 hour
      rateLimits.delete(ip);
    }
  }
}, 5 * 60 * 1000);
