/**
 * ChatBot Interface Types
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  status?: "sending" | "sent" | "error";
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  isActive: boolean;
  startedAt: Date;
  lastActivity: Date;
}

export interface ChatBotConfig {
  maxMessagesPerSession: number;
  maxMessageLength: number;
  rateLimitPerMinute: number;
  rateLimitPerHour: number;
  sessionTimeoutMs: number;
  systemPrompt: string;
}

export interface ChatBotRequest {
  message: string;
  sessionId?: string | undefined;
  context?:
    | {
        page?: string | undefined;
        userAgent?: string | undefined;
        timestamp?: number | undefined;
      }
    | undefined;
  csrfToken?: string | undefined;
}

export interface ChatBotResponse {
  success: boolean;
  data?: {
    message: string;
    sessionId: string;
    messageId: string;
    csrfToken?: string;
  };
  error?: string;
  rateLimitInfo?: {
    remaining: number;
    resetTime: number;
  };
}

export interface ChatBotState {
  isOpen: boolean;
  isLoading: boolean;
  isConnected: boolean;
  currentSession: ChatSession | null;
  error: string | null;
}

export interface ChatBotUIProps {
  className?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  theme?: "light" | "dark" | "system";
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled: boolean;
  placeholder?: string;
  maxLength: number;
}

export interface ChatMessageProps {
  message: ChatMessage;
  isLatest: boolean;
}

export interface ChatHeaderProps {
  onClose: () => void;
  onMinimize?: () => void;
  isConnected: boolean;
}

// API Error Response Types
export interface ChatBotApiError {
  error: string;
  code?:
    | "RATE_LIMIT_EXCEEDED"
    | "INVALID_INPUT"
    | "SERVICE_UNAVAILABLE"
    | "UNAUTHORIZED";
  details?: Record<string, unknown>;
}

// Rate Limiting Types
export interface RateLimitEntry {
  count: number;
  windowStart: number;
  lastRequest: number;
}

export interface ChatBotRateLimit {
  minute: RateLimitEntry;
  hour: RateLimitEntry;
}

// Security Types
export interface ChatBotSecurityContext {
  clientIP: string;
  userAgent: string;
  timestamp: number;
  sessionId: string;
}

// Analytics Types (optional)
export interface ChatBotAnalytics {
  sessionsCreated: number;
  messagesProcessed: number;
  averageSessionLength: number;
  errorRate: number;
  lastResetTime: number;
}