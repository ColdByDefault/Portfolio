/**
 * Professional Floating ChatBot Component
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  X,
  Send,
  Loader2,
  CircleAlert,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useChatBot } from "@/components/chatbot";
import type { ChatBotUIProps, ChatMessage } from "@/types/chatbot";

// Security helper to limit message content length for display
function sanitizeMessageForDisplay(content: string): string {
  return content.substring(0, 2000); // Limit display length
}

function TypingIndicator() {
  const t = useTranslations("ChatBot");

  return (
    <div className="flex justify-start">
      <div className="max-w-[80%]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
            <Bot className="w-3 h-3 text-primary-foreground" />
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            {t("typing.status")}
          </span>
          <Badge variant="secondary" className="text-xs px-2 py-0.5">
            <Sparkles className="w-3 h-3 mr-1" />
            {t("typing.thinking")}
          </Badge>
        </div>
        <div className="bg-muted/80 backdrop-blur-sm p-3 rounded-lg border border-border/50">
          <div className="flex items-center gap-1">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
            </div>
            <span className="text-xs text-muted-foreground ml-2">
              {t("typing.processing")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChatBot({
  className = "",
  position = "bottom-left",
}: ChatBotUIProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("ChatBot");

  const { messages, isLoading, error, sendMessage, clearError } = useChatBot();

  // Show ChatBot button after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Clear error when opening chat
  useEffect(() => {
    if (isOpen && error) {
      clearError();
    }
  }, [isOpen, error, clearError]);

  const handleCloseChat = () => {
    setIsOpen(false);
    setInputValue(""); // Clear input
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Basic client-side input sanitization
    const sanitizedMessage = inputValue.trim().substring(0, 1000);

    // Simple spam detection
    if (sanitizedMessage.length < 2) return;

    setInputValue("");

    try {
      await sendMessage(sanitizedMessage);
    } catch (err) {
      // Error is handled by the hook
      console.error("Failed to send message:", err);
    }
  };

  const positionClasses = {
    "bottom-left": "bottom-6 left-6",
    "bottom-right": "bottom-6 right-6",
    "top-left": "top-6 left-6",
    "top-right": "top-6 right-6",
  };

  return isVisible ? (
    <div className={`fixed ${positionClasses[position]} z-50 ${className}`}>
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="relative rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 h-14 w-14 border-2 border-primary/20 group"
        >
          <Bot
            className="w-6 h-6 animate-subtle-shake"
            style={{ width: "1.5rem", height: "1.5rem" }}
          />
          <span className="sr-only">{t("openAssistant")}</span>
        </Button>
      ) : (
        <Card className="w-96 min-h-[28rem] max-h-[32rem] shadow-2xl border border-border/50 bg-background/95 backdrop-blur-xl flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4  border-b border-border/50 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <CardTitle className="text-base font-semibold text-foreground">
                  {t("name")}{" "}
                  <span className="text-xs text-muted-foreground font-normal">
                    {t("pronunciation")}
                  </span>
                </CardTitle>
                <span className="text-xs text-muted-foreground font-medium">
                  {t("subtitle")}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCloseChat}
                className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive rounded-full transition-colors"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">{t("closeChat")}</span>
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex flex-col flex-1 min-h-0">
            <div className="flex-1 p-4 min-h-0 max-h-[20rem] overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
              <div className="space-y-4">
                {messages.length === 0 && !isLoading && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
                      <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {t("greeting.title")}
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                      {t("greeting.description")}
                    </p>
                  </div>
                )}

                {messages.map((message: ChatMessage) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    } group`}
                  >
                    <div
                      className={`max-w-[85%] ${
                        message.role === "user" ? "order-2" : "order-1"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                            <Bot className="w-3 h-3 text-primary-foreground" />
                          </div>
                          <span className="text-xs text-muted-foreground font-medium">
                            {t("name")}
                          </span>
                          {message.status === "sending" && (
                            <Badge
                              variant="outline"
                              className="text-xs px-2 py-0.5"
                            >
                              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                              {t("status.sending")}
                            </Badge>
                          )}
                        </div>
                      )}

                      <div
                        className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm transition-all duration-200 group-hover:shadow-md ${
                          message.role === "user"
                            ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-br-md"
                            : "bg-muted/80 backdrop-blur-sm border border-border/50 rounded-bl-md"
                        }`}
                      >
                        <span>
                          {sanitizeMessageForDisplay(message.content)}
                        </span>
                      </div>

                      {message.role === "user" && (
                        <div className="flex items-center justify-end gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          {message.status === "sent" && (
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                          )}
                          {message.status === "error" && (
                            <AlertCircle className="w-3 h-3 text-destructive" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && <TypingIndicator />}

                {error && (
                  <div className="flex justify-center py-4">
                    <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm flex items-center gap-2 max-w-xs">
                      <CircleAlert className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            <Separator className="opacity-50" />

            <div className="p-3 bg-muted/20 flex-shrink-0">
              <form
                onSubmit={(e) => {
                  handleSendMessage(e).catch(console.error);
                }}
                className="flex gap-3"
              >
                <div className="flex-1 relative">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={t("input.placeholder")}
                    disabled={isLoading}
                    className="pr-12 bg-background border-border/50 focus:border-primary/50 rounded-full transition-all duration-200 placeholder:text-muted-foreground/60"
                    maxLength={1000}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <span className="text-xs text-muted-foreground">
                      {inputValue.length}
                      {t("input.characterLimit")}
                    </span>
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="px-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {t("accessibility.sendMessage")}
                  </span>
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  ) : null;
}

export default ChatBot;
