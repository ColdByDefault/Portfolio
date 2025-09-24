/**
 * Professional Floating ChatBot Component
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bot, CircleAlert, Sparkles } from "lucide-react";
import { useChatBot } from "@/components/chatbot";
import type { ChatBotUIProps, ChatMessage } from "@/types/chatbot";
import {
  ChatHeader,
  ChatMessage as ChatMessageComponent,
  ChatInput,
  TypingIndicator,
} from "@/components/chatbot";

import {
  CHATBOT_CONFIG,
  CHATBOT_STYLES,
  CHATBOT_TRANSLATION_KEYS,
} from "./ChatBot.constants";

export function ChatBot({
  className = "",
  position = "bottom-left",
}: ChatBotUIProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(
    CHATBOT_CONFIG.DEFAULT_BOTTOM_OFFSET
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("ChatBot");

  const { messages, isLoading, error, sendMessage, clearError } = useChatBot();

  // Show ChatBot button after configured delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, CHATBOT_CONFIG.VISIBILITY_DELAY);

    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: CHATBOT_CONFIG.SCROLL_BEHAVIOR,
    });
  }, [messages]);

  // Clear error when opening chat
  useEffect(() => {
    if (isOpen && error) {
      clearError();
    }
  }, [isOpen, error, clearError]);

  // Detect footer visibility and adjust chatbot position dynamically
  useEffect(() => {
    const handleScroll = () => {
      if (!isVisible) return; // Only adjust position if chatbot is visible

      const footer = document.querySelector("footer");
      if (!footer) {
        setBottomOffset(CHATBOT_CONFIG.DEFAULT_BOTTOM_OFFSET);
        return;
      }

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of the footer is visible
      const footerVisibleHeight = Math.max(0, windowHeight - footerRect.top);

      // If footer is visible, position chatbot above it with some padding
      if (footerVisibleHeight > 0) {
        setBottomOffset(footerVisibleHeight + CHATBOT_CONFIG.FOOTER_PADDING);
      } else {
        setBottomOffset(CHATBOT_CONFIG.DEFAULT_BOTTOM_OFFSET);
      }
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);
    // Add resize listener for responsive behavior
    window.addEventListener("resize", handleScroll);
    // Check initial state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isVisible]);

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    // Focus the input when chat opens for better accessibility
    setTimeout(() => {
      chatInputRef.current?.focus();
    }, 100);
  };

  const handleSendMessage = async (message: string) => {
    try {
      await sendMessage(message);
    } catch (err) {
      // Error is handled by the hook
      console.error("Failed to send message:", err);
    }
  };

  // Dynamic position classes based on calculated bottom offset
  const getPositionClasses = () => {
    return CHATBOT_CONFIG.POSITION_CLASSES[position];
  };

  return isVisible ? (
    <div
      className={`fixed ${getPositionClasses()} z-50 transition-all duration-300 ease-in-out ${className}`}
      style={{
        bottom: position.startsWith("bottom") ? `${bottomOffset}px` : undefined,
      }}
    >
      {!isOpen ? (
        <Button
          onClick={handleOpenChat}
          size="lg"
          className={`relative ${CHATBOT_STYLES.BUTTON_ROUNDED} ${CHATBOT_STYLES.BUTTON_SHADOW} transition-all duration-300 ${CHATBOT_STYLES.BUTTON_GRADIENT} h-14 w-14 border-2 border-primary/20 group`}
          aria-label={t(CHATBOT_TRANSLATION_KEYS.OPEN_ASSISTANT)}
          title={t(CHATBOT_TRANSLATION_KEYS.OPEN_ASSISTANT)}
        >
          <Bot
            className={`w-6 h-6 ${CHATBOT_STYLES.BOT_ANIMATION}`}
            style={{ width: "1.5rem", height: "1.5rem" }}
            aria-hidden="true"
          />
          <span className="sr-only">
            {t(CHATBOT_TRANSLATION_KEYS.OPEN_ASSISTANT)}
          </span>
        </Button>
      ) : (
        <Card
          className={`${CHATBOT_CONFIG.RESPONSIVE_WIDTH_CLASSES} min-h-[24rem] sm:min-h-[28rem] max-h-[28rem] sm:max-h-[32rem] ${CHATBOT_STYLES.CARD_SHADOW} ${CHATBOT_STYLES.CARD_BORDER} flex flex-col`}
          role="dialog"
          aria-labelledby="chatbot-title"
          aria-describedby="chatbot-subtitle"
          aria-modal="false"
        >
          <ChatHeader onClose={handleCloseChat} />

          <CardContent className="p-0 flex flex-col flex-1 min-h-0">
            <div
              className={`flex-1 p-3 sm:p-4 min-h-0 max-h-[16rem] sm:max-h-[20rem] overflow-y-auto ${CHATBOT_STYLES.SCROLLBAR}`}
              role="log"
              aria-live="polite"
              aria-label="Chat conversation"
            >
              <div className="space-y-4">
                {messages.length === 0 && !isLoading && (
                  <div
                    className="flex flex-col items-center justify-center py-12 text-center"
                    role="region"
                    aria-labelledby="welcome-title"
                  >
                    <div
                      className={`w-16 h-16 ${CHATBOT_STYLES.BUTTON_ROUNDED} ${CHATBOT_STYLES.WELCOME_ICON_GRADIENT} flex items-center justify-center mb-4`}
                      role="img"
                      aria-label="Welcome illustration"
                    >
                      <Sparkles
                        className="w-8 h-8 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <h3
                      className="font-semibold text-foreground mb-2"
                      id="welcome-title"
                    >
                      {t(CHATBOT_TRANSLATION_KEYS.GREETING_TITLE)}
                    </h3>
                    <p
                      className="text-sm text-muted-foreground max-w-xs leading-relaxed"
                      id="welcome-description"
                    >
                      {t(CHATBOT_TRANSLATION_KEYS.GREETING_DESCRIPTION)}
                    </p>
                  </div>
                )}

                {messages.map((message: ChatMessage) => (
                  <ChatMessageComponent key={message.id} message={message} />
                ))}

                {isLoading && <TypingIndicator />}

                {error && (
                  <div
                    className="flex justify-center py-4"
                    role="alert"
                    aria-live="assertive"
                  >
                    <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm flex items-center gap-2 max-w-xs">
                      <CircleAlert
                        className="w-4 h-4 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span>{error}</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            <Separator className="opacity-50" />

            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              disabled={false}
              ref={chatInputRef}
            />
          </CardContent>
        </Card>
      )}
    </div>
  ) : null;
}

export default ChatBot;
