/**
 * ChatMessage Component - Individual message display
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
*/

"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Bot, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "@/types/configs/chatbot";
import {
  CHATBOT_CONFIG,
  CHATBOT_STYLES,
  CHATBOT_TRANSLATION_KEYS,
} from "./ChatBot.constants";

export interface ChatMessageProps {
  message: ChatMessageType;
  className?: string;
}

// Security helper to limit message content length for display
function sanitizeMessageForDisplay(content: string): string {
  return content.substring(0, CHATBOT_CONFIG.MESSAGE_DISPLAY_LIMIT);
}

export const ChatMessage = React.memo(function ChatMessage({
  message,
  className = "",
}: ChatMessageProps) {
  const t = useTranslations("ChatBot");
  const isUser = message.role === "user";

  const sanitizedContent = React.useMemo(
    () => sanitizeMessageForDisplay(message.content),
    [message.content]
  );
  const formattedTime = React.useMemo(
    () =>
      message.timestamp.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [message.timestamp]
  );

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } group ${className}`}
      role="article"
      aria-label={`${
        isUser ? "Your" : "Assistant"
      } message from ${formattedTime}`}
    >
      <div className={`max-w-[85%] ${isUser ? "order-2" : "order-1"}`}>
        {!isUser && (
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`w-6 h-6 ${CHATBOT_STYLES.BUTTON_ROUNDED} ${CHATBOT_STYLES.AVATAR_GRADIENT} flex items-center justify-center`}
              role="img"
              aria-label="Assistant avatar"
            >
              <Bot
                className="w-3 h-3 text-primary-foreground"
                aria-hidden="true"
              />
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              {t(CHATBOT_TRANSLATION_KEYS.NAME)}
            </span>
            {message.status === "sending" && (
              <Badge
                variant="outline"
                className="text-xs px-2 py-0.5"
                role="status"
              >
                <Loader2
                  className={`w-3 h-3 mr-1 ${CHATBOT_STYLES.SPIN_ANIMATION}`}
                  aria-hidden="true"
                />
                {t(CHATBOT_TRANSLATION_KEYS.STATUS_SENDING)}
              </Badge>
            )}
          </div>
        )}

        <div
          className={`p-3 ${
            CHATBOT_STYLES.MESSAGE_ROUNDED
          } text-sm leading-relaxed shadow-sm transition-all duration-200 group-hover:shadow-md ${
            isUser
              ? `${CHATBOT_STYLES.MESSAGE_USER_GRADIENT} text-primary-foreground ${CHATBOT_STYLES.MESSAGE_USER_CORNER}`
              : `${CHATBOT_STYLES.MESSAGE_BORDER} ${CHATBOT_STYLES.MESSAGE_ASSISTANT_CORNER}`
          }`}
          role="text"
          aria-describedby={isUser ? undefined : "assistant-message-info"}
        >
          <span>{sanitizedContent}</span>
        </div>

        {isUser && (
          <div
            className="flex items-center justify-end gap-2 mt-1"
            id="message-status"
          >
            <span
              className="text-xs text-muted-foreground"
              aria-label={`Sent at ${formattedTime}`}
            >
              {formattedTime}
            </span>
            {message.status === "sent" && (
              <CheckCircle2
                className="w-3 h-3 text-green-500"
                aria-label="Message sent successfully"
              />
            )}
            {message.status === "error" && (
              <AlertCircle
                className="w-3 h-3 text-destructive"
                aria-label="Message failed to send"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
});

export default ChatMessage;
