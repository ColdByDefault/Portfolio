/**
 * ChatBot Input Component
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import React, { useState, useRef, KeyboardEvent } from "react";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatInputProps } from "@/types/chatbot";

export function ChatInput({
  onSendMessage,
  isLoading,
  disabled,
  placeholder = "Type your message...",
  maxLength,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!message.trim() || isLoading || disabled) return;

    const messageToSend = message.trim();
    setMessage("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    await onSendMessage(messageToSend);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setMessage(value);
    }

    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  const charactersRemaining = maxLength - message.length;
  const isNearLimit = charactersRemaining <= 50;

  return (
    <div className="border-t border-border p-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={cn(
              "w-full resize-none rounded-lg px-3 py-2 pr-12",
              "text-sm placeholder:text-muted-foreground",
              "border border-input bg-background",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "min-h-[40px] max-h-[120px]"
            )}
          />

          <button
            type="submit"
            disabled={!message.trim() || isLoading || disabled}
            className={cn(
              "absolute right-2 bottom-2 w-8 h-8",
              "rounded-md flex items-center justify-center",
              "transition-colors duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              message.trim() && !isLoading && !disabled
                ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Character Count */}
        {isNearLimit && (
          <div
            className={cn(
              "text-xs text-right",
              charactersRemaining <= 0
                ? "text-destructive"
                : charactersRemaining <= 20
                ? "text-yellow-600"
                : "text-muted-foreground"
            )}
          >
            {charactersRemaining} characters remaining
          </div>
        )}

        {/* Hints */}
        <div className="text-xs text-muted-foreground">
          Press{" "}
          <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Enter</kbd> to
          send,{" "}
          <kbd className="px-1 py-0.5 bg-muted rounded text-xs">
            Shift + Enter
          </kbd>{" "}
          for new line
        </div>
      </form>
    </div>
  );
}
