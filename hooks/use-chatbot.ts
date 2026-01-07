/**
 * ChatBot Custom Hook - Manages state and API communication
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type {
  ChatMessage,
  ChatBotResponse,
  ChatBotApiError,
} from "@/types/configs/chatbot";

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

  // Storage keys for persistence
  const STORAGE_KEY_MESSAGES = "chatbot_messages";
  const STORAGE_KEY_SESSION = "chatbot_session";

  // Load messages from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedMessages = localStorage.getItem(STORAGE_KEY_MESSAGES);
        const savedSession = localStorage.getItem(STORAGE_KEY_SESSION);

        if (savedMessages) {
          const parsedMessages = JSON.parse(savedMessages) as ChatMessage[];
          // Convert timestamp strings back to Date objects
          const messagesWithDates: ChatMessage[] = parsedMessages.map(
            (msg) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
            })
          );
          setMessages(messagesWithDates);
        }

        if (savedSession) {
          sessionIdRef.current = savedSession;
        }
      } catch (error) {
        console.error("Failed to load chat history from localStorage:", error);
        // Clear corrupted data
        localStorage.removeItem(STORAGE_KEY_MESSAGES);
        localStorage.removeItem(STORAGE_KEY_SESSION);
      }
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (typeof window !== "undefined" && messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
      } catch (error) {
        console.error("Failed to save chat history to localStorage:", error);
      }
    }
  }, [messages]);

  // Save session ID to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined" && sessionIdRef.current) {
      try {
        localStorage.setItem(STORAGE_KEY_SESSION, sessionIdRef.current);
      } catch (error) {
        console.error("Failed to save session ID to localStorage:", error);
      }
    }
  }, []);

  // Clear chat history when user leaves the page completely
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleBeforeUnload = () => {
        localStorage.removeItem(STORAGE_KEY_MESSAGES);
        localStorage.removeItem(STORAGE_KEY_SESSION);
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }

    // Return empty cleanup function if window is not available
    return () => {};
  }, []);

  const generateMessageId = (): string => {
    return `msg_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  };

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    sessionIdRef.current = null;

    // Also clear from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY_MESSAGES);
      localStorage.removeItem(STORAGE_KEY_SESSION);
    }
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

          // Handle quota exceeded specifically
          if (errorData.code === "QUOTA_EXCEEDED" && errorData.retryAfter) {
            const retrySeconds = Math.ceil(errorData.retryAfter);
            throw new Error(
              `Reem is taking a short break. Please try again in ${retrySeconds} seconds.`
            );
          }

          throw new Error(errorData.error || "Failed to send message");
        }

        if (!data.data) {
          throw new Error("Invalid response from server");
        }

        // Store session ID for future requests
        sessionIdRef.current = data.data.sessionId;

        // Save session ID to localStorage
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(STORAGE_KEY_SESSION, data.data.sessionId);
          } catch (error) {
            console.error("Failed to save session ID to localStorage:", error);
          }
        }

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
