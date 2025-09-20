/**
 * ChatBot Main Component
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import React, { useState, useEffect } from "react";
import { useChatBot } from "./useChatBot";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import type { ChatBotUIProps } from "@/types/chatbot";

export function ChatBot({
  className,
  position = "bottom-right",
  theme = "system",
}: ChatBotUIProps) {
  const { state, messages, sendMessage, toggleChat, clearChat, isTyping } =
    useChatBot();

  const [isVisible, setIsVisible] = useState(false);

  // Show chatbot after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const positionStyles = {
    "bottom-right": { bottom: "20px", right: "20px" },
    "bottom-left": { bottom: "20px", left: "20px" },
    "top-right": { top: "20px", right: "20px" },
    "top-left": { top: "20px", left: "20px" },
  };

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 50,
        width: "320px",
        height: "400px",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        ...positionStyles[position],
      }}
      className={className}
    >
      {!state.isOpen ? (
        <button
          onClick={toggleChat}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
          }}
        >
          💬
        </button>
      ) : (
        <>
          <ChatHeader
            onClose={toggleChat}
            onMinimize={toggleChat}
            isConnected={state.isConnected}
          />

          <div style={{ flex: 1, padding: "16px", overflowY: "auto" }}>
            {messages.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  color: "#666",
                  fontSize: "14px",
                  padding: "32px 0",
                }}
              >
                <p>👋 Hi! I'm your AI assistant.</p>
                <p style={{ marginTop: "8px" }}>
                  Ask me anything about ColdByDefault's projects and skills!
                </p>
              </div>
            )}

            {messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                isLatest={index === messages.length - 1}
              />
            ))}

            {isTyping && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    maxWidth: "75%",
                  }}
                >
                  <div style={{ display: "flex", gap: "4px" }}>
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#666",
                        borderRadius: "50%",
                      }}
                    />
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#666",
                        borderRadius: "50%",
                      }}
                    />
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#666",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {state.error && (
              <div
                style={{
                  backgroundColor: "#fee",
                  color: "#c00",
                  fontSize: "14px",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #fcc",
                }}
              >
                <p style={{ fontWeight: "600" }}>Error</p>
                <p>{state.error}</p>
                <button
                  onClick={clearChat}
                  style={{
                    marginTop: "8px",
                    fontSize: "12px",
                    textDecoration: "underline",
                    background: "none",
                    border: "none",
                    color: "#c00",
                    cursor: "pointer",
                  }}
                >
                  Clear chat and retry
                </button>
              </div>
            )}
          </div>

          <ChatInput
            onSendMessage={sendMessage}
            isLoading={state.isLoading || isTyping}
            disabled={!state.isConnected}
            placeholder={
              !state.isConnected
                ? "ChatBot is currently unavailable..."
                : "Type your message..."
            }
            maxLength={1000}
          />
        </>
      )}
    </div>
  );
}
