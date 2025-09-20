/**
 * ChatBot Message Component
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Bot, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessageProps } from "@/types/chatbot";

export function ChatMessage({ message, isLatest }: ChatMessageProps) {
  const isUser = message.role === "user";
  const isError = message.status === "error";
  const isPending = message.status === "sending";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex gap-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary" />
        </div>
      )}

      {/* Message Content */}
      <div className={cn(
        "max-w-xs lg:max-w-md",
        isUser && "order-first"
      )}>
        <div className={cn(
          "px-3 py-2 rounded-lg text-sm",
          isUser ? (
            isError 
              ? "bg-destructive/10 text-destructive border border-destructive/20"
              : "bg-primary text-primary-foreground"
          ) : (
            "bg-muted text-muted-foreground"
          )
        )}>
          <p className="whitespace-pre-wrap break-words">
            {message.content}
          </p>
          
          {/* Status Indicators */}
          <div className="flex items-center justify-end mt-1 space-x-1">
            {isPending && (
              <Clock className="w-3 h-3 opacity-60" />
            )}
            {isError && (
              <AlertCircle className="w-3 h-3" />
            )}
            <span className="text-xs opacity-60">
              {message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
          <User className="w-4 h-4 text-secondary-foreground" />
        </div>
      )}
    </motion.div>
  );
}