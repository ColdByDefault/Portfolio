/**
 * ChatBot Custom Hook - Manages state and API communication
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import { useState, useCallback, useRef } from "react";
import type {
  ChatMessage,
  ChatBotResponse,
  ChatBotApiError,
} from "@/types/chatbot";

interface UseChatBotReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  isConnected: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearError: () => void;
  clearMessages: () => void;
}

export function useChatBot(): UseChatBotReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sessionIdRef = useRef<string | null>(null);

  const generateMessageId = (): string => {
    return `msg_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  };

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    sessionIdRef.current = null;
  }, []);

  const sendMessage = useCallback(
    async (content: string): Promise<void> => {
      if (!content.trim() || isLoading) return;

      // Clear any existing error
      setError(null);
      setIsLoading(true);

      // Create user message
      const userMessage: ChatMessage = {
        id: generateMessageId(),
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
        status: "sending",
      };

      // Add user message to UI
      setMessages((prev) => [...prev, userMessage]);

      try {
        const requestBody = {
          message: content.trim(),
          sessionId: sessionIdRef.current || undefined,
          context: {
            page:
              typeof window !== "undefined"
                ? window.location.pathname
                : undefined,
            userAgent:
              typeof window !== "undefined" ? navigator.userAgent : undefined,
          },
        };

        const response = await fetch("/api/chatbot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        const data = (await response.json()) as
          | ChatBotResponse
          | ChatBotApiError;

        // Update user message status
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === userMessage.id ? { ...msg, status: "sent" } : msg
          )
        );

        if (!response.ok || !("success" in data) || !data.success) {
          const errorData = data as ChatBotApiError;
          throw new Error(errorData.error || "Failed to send message");
        }

        if (!data.data) {
          throw new Error("Invalid response from server");
        }

        // Store session ID for future requests
        sessionIdRef.current = data.data.sessionId;

        // Create assistant message
        const assistantMessage: ChatMessage = {
          id: data.data.messageId,
          role: "assistant",
          content: data.data.message,
          timestamp: new Date(),
          status: "sent",
        };

        // Add assistant message to UI
        setMessages((prev) => [...prev, assistantMessage]);

        setIsConnected(true);
      } catch (err) {
        console.error("ChatBot error:", err);

        // Update user message status to error
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === userMessage.id ? { ...msg, status: "error" } : msg
          )
        );

        // Set error message
        const errorMessage =
          err instanceof Error ? err.message : "Failed to send message";
        setError(errorMessage);

        // Check if it's a connection issue
        if (
          errorMessage.includes("fetch") ||
          errorMessage.includes("network")
        ) {
          setIsConnected(false);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  return {
    messages,
    isLoading,
    isConnected,
    error,
    sendMessage,
    clearError,
    clearMessages,
  };
}
