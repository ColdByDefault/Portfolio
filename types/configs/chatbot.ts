/**
 * ChatBot Interface Types
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
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
        language?: string | undefined;
      }
    | undefined;
  csrfToken?: string | undefined;
  consentGiven?: boolean | undefined; // User consent for data logging
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
    | "UNAUTHORIZED"
    | "QUOTA_EXCEEDED";
  details?: Record<string, unknown>;
  retryAfter?: number;
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

// Chat Logging Types
export interface ChatSessionLog {
  id: string;
  ipAddress: string | null;
  ipCountry: string | null;
  ipCity: string | null;
  userAgent: string | null;
  language: string | null;
  startedAt: Date;
  lastActivityAt: Date;
  endedAt: Date | null;
  isActive: boolean;
  consentGiven: boolean;
  consentTimestamp: Date | null;
  totalMessages: number;
  messages?: ChatMessageLog[];
}

export interface ChatMessageLog {
  id: string;
  sessionId: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  status: string | null;
  pageContext: string | null;
  errorDetails: string | null;
}

export interface ChatLogsFilter {
  startDate?: Date;
  endDate?: Date;
  country?: string;
  searchQuery?: string;
  minMessages?: number;
  hasConsent?: boolean;
  isActive?: boolean;
  limit?: number;
  offset?: number;
}

export interface ChatLogsResponse {
  sessions: ChatSessionLog[];
  total: number;
  hasMore: boolean;
}

export interface GeoIPInfo {
  country?: string;
  city?: string;
  timezone?: string;
}
