/**
 * ChatInput Component - Message input form with validation
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send } from "lucide-react";
import {
  CHATBOT_CONFIG,
  CHATBOT_STYLES,
  CHATBOT_TRANSLATION_KEYS,
} from "./ChatBot.constants";

export interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
  disabled?: boolean;
  className?: string;
}

export const ChatInput = React.memo(
  React.forwardRef<HTMLInputElement, ChatInputProps>(function ChatInput(
    { onSendMessage, isLoading, disabled = false, className = "" },
    ref
  ) {
    const [inputValue, setInputValue] = useState("");
    const t = useTranslations("ChatBot");

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputValue.trim() || isLoading || disabled) return;

      // Basic client-side input sanitization
      const sanitizedMessage = inputValue
        .trim()
        .substring(0, CHATBOT_CONFIG.INPUT_MAX_LENGTH);

      // Simple spam detection
      if (sanitizedMessage.length < CHATBOT_CONFIG.INPUT_MIN_LENGTH) return;

      setInputValue("");

      try {
        await onSendMessage(sanitizedMessage);
      } catch (err) {
        // Error is handled by the parent component
        console.error("Failed to send message:", err);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      // Allow Shift+Enter for new lines, but Enter alone submits
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        void handleSubmit(e as React.FormEvent);
      }
    };

    return (
      <div
        className={`p-2 sm:p-3 bg-muted/20 flex-shrink-0 ${className}`}
        role="form"
      >
        <form
          onSubmit={(e) => {
            handleSubmit(e).catch(console.error);
          }}
          className="flex gap-2 sm:gap-3"
          aria-label="Send message to assistant"
        >
          <div className="flex-1 relative">
            <Input
              ref={ref}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t(CHATBOT_TRANSLATION_KEYS.INPUT_PLACEHOLDER)}
              disabled={isLoading || disabled}
              className={`pr-12 ${CHATBOT_STYLES.INPUT_BORDER} ${CHATBOT_STYLES.INPUT_ROUNDED} transition-all duration-200 placeholder:text-muted-foreground/60`}
              maxLength={CHATBOT_CONFIG.INPUT_MAX_LENGTH}
              aria-describedby="character-count"
              aria-label="Type your message"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <span
                className="text-xs text-muted-foreground"
                id="character-count"
                aria-live="polite"
              >
                {inputValue.length}
                {t(CHATBOT_TRANSLATION_KEYS.INPUT_CHARACTER_LIMIT)}
              </span>
            </div>
          </div>
          <Button
            type="submit"
            disabled={!inputValue.trim() || isLoading || disabled}
            className={`px-4 ${CHATBOT_STYLES.BUTTON_GRADIENT} ${CHATBOT_STYLES.INPUT_ROUNDED} ${CHATBOT_STYLES.INPUT_SHADOW} transition-all duration-200`}
            aria-label={t(CHATBOT_TRANSLATION_KEYS.ACCESSIBILITY_SEND_MESSAGE)}
            title={t(CHATBOT_TRANSLATION_KEYS.ACCESSIBILITY_SEND_MESSAGE)}
          >
            {isLoading ? (
              <Loader2
                className={`h-4 w-4 ${CHATBOT_STYLES.SPIN_ANIMATION}`}
                aria-hidden="true"
              />
            ) : (
              <Send className="h-4 w-4" aria-hidden="true" />
            )}
            <span className="sr-only">
              {t(CHATBOT_TRANSLATION_KEYS.ACCESSIBILITY_SEND_MESSAGE)}
            </span>
          </Button>
        </form>
      </div>
    );
  })
);
