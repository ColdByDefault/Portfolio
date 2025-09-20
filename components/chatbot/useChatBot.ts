/**
 * ChatBot Custom Hook
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type {
  ChatBotState,
  ChatBotRequest,
  ChatBotResponse,
  ChatMessage,
  ChatSession,
} from "@/types/chatbot";

interface UseChatBotReturn {
  state: ChatBotState;
  messages: ChatMessage[];
  sendMessage: (message: string) => Promise<void>;
  toggleChat: () => void;
  clearChat: () => void;
  isTyping: boolean;
}

const CHATBOT_API_URL = "/api/chatbot";

export function useChatBot(): UseChatBotReturn {
  const [state, setState] = useState<ChatBotState>({
    isOpen: false,
    isLoading: false,
    isConnected: true,
    currentSession: null,
    error: null,
  });

  const [isTyping, setIsTyping] = useState(false);
  const sessionIdRef = useRef<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Initialize session
  const initializeSession = useCallback(() => {
    const newSession: ChatSession = {
      id: `session_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      messages: [],
      isActive: true,
      startedAt: new Date(),
      lastActivity: new Date(),
    };

    setState((prev) => ({
      ...prev,
      currentSession: newSession,
      error: null,
    }));

    sessionIdRef.current = newSession.id;
  }, []);

  // Send message to ChatBot API
  const sendMessage = useCallback(
    async (message: string): Promise<void> => {
      if (!message.trim() || state.isLoading) return;

      // Cancel any ongoing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      // Initialize session if needed
      if (!state.currentSession) {
        initializeSession();
      }

      const userMessage: ChatMessage = {
        id: `msg_${Date.now()}_user`,
        role: "user",
        content: message.trim(),
        timestamp: new Date(),
        status: "sending",
      };

      // Add user message immediately
      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
        currentSession: prev.currentSession
          ? {
              ...prev.currentSession,
              messages: [...prev.currentSession.messages, userMessage],
              lastActivity: new Date(),
            }
          : null,
      }));

      try {
        setIsTyping(true);

        const requestBody: ChatBotRequest = {
          message: message.trim(),
          sessionId: sessionIdRef.current || undefined,
          context: {
            page:
              typeof window !== "undefined"
                ? window.location.pathname
                : undefined,
            userAgent:
              typeof navigator !== "undefined"
                ? navigator.userAgent
                : undefined,
          },
        };

        const response = await fetch(CHATBOT_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        const data: ChatBotResponse = await response.json();

        if (!data.success || !data.data) {
          throw new Error(data.error || "Invalid response from server");
        }

        // Update session ID if provided
        if (data.data.sessionId) {
          sessionIdRef.current = data.data.sessionId;
        }

        const assistantMessage: ChatMessage = {
          id: data.data.messageId,
          role: "assistant",
          content: data.data.message,
          timestamp: new Date(),
          status: "sent",
        };

        // Update messages with sent status for user message and add assistant message
        setState((prev) => ({
          ...prev,
          isLoading: false,
          currentSession: prev.currentSession
            ? {
                ...prev.currentSession,
                messages: [
                  ...prev.currentSession.messages.map((msg) =>
                    msg.id === userMessage.id
                      ? { ...msg, status: "sent" as const }
                      : msg
                  ),
                  assistantMessage,
                ],
                lastActivity: new Date(),
              }
            : null,
        }));
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return; // Request was cancelled, don't update state
        }

        console.error("ChatBot send message error:", error);

        // Mark user message as error and set error state
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error ? error.message : "Failed to send message",
          currentSession: prev.currentSession
            ? {
                ...prev.currentSession,
                messages: prev.currentSession.messages.map((msg) =>
                  msg.id === userMessage.id
                    ? { ...msg, status: "error" as const }
                    : msg
                ),
              }
            : null,
        }));
      } finally {
        setIsTyping(false);
        abortControllerRef.current = null;
      }
    },
    [state.isLoading, state.currentSession, initializeSession]
  );

  // Toggle chat visibility
  const toggleChat = useCallback(() => {
    setState((prev) => {
      const newIsOpen = !prev.isOpen;

      // Initialize session when opening chat for the first time
      if (newIsOpen && !prev.currentSession) {
        const newSession: ChatSession = {
          id: `session_${Date.now()}_${Math.random()
            .toString(36)
            .substring(2)}`,
          messages: [],
          isActive: true,
          startedAt: new Date(),
          lastActivity: new Date(),
        };

        sessionIdRef.current = newSession.id;

        return {
          ...prev,
          isOpen: newIsOpen,
          currentSession: newSession,
          error: null,
        };
      }

      return {
        ...prev,
        isOpen: newIsOpen,
      };
    });
  }, []);

  // Clear chat session
  const clearChat = useCallback(() => {
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setState((prev) => ({
      ...prev,
      currentSession: null,
      error: null,
      isLoading: false,
    }));

    sessionIdRef.current = null;
    setIsTyping(false);
  }, []);

  // Check API availability on mount
  useEffect(() => {
    let mounted = true;

    const checkAvailability = async () => {
      try {
        const response = await fetch(CHATBOT_API_URL, {
          method: "GET",
        });

        if (!mounted) return;

        setState((prev) => ({
          ...prev,
          isConnected: response.ok,
        }));
      } catch {
        if (mounted) {
          setState((prev) => ({
            ...prev,
            isConnected: false,
          }));
        }
      }
    };

    checkAvailability();

    return () => {
      mounted = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    state,
    messages: state.currentSession?.messages || [],
    sendMessage,
    toggleChat,
    clearChat,
    isTyping,
  };
}
