/**
 * ChatBot Header Component
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import React from "react";
import { X, Minus, Bot, Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatHeaderProps } from "@/types/chatbot";

export function ChatHeader({
  onClose,
  onMinimize,
  isConnected,
}: ChatHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3",
        "bg-primary text-primary-foreground",
        "border-b border-border/20"
      )}
    >
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-8 h-8 bg-primary-foreground/10 rounded-full">
          <Bot className="w-4 h-4" />
        </div>

        <div className="flex flex-col">
          <h3 className="text-sm font-medium">AI Assistant</h3>
          <div className="flex items-center space-x-1">
            {isConnected ? (
              <Wifi className="w-3 h-3 text-green-400" />
            ) : (
              <WifiOff className="w-3 h-3 text-red-400" />
            )}
            <span className="text-xs opacity-80">
              {isConnected ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-1">
        {onMinimize && (
          <button
            onClick={onMinimize}
            className={cn(
              "w-6 h-6 rounded-md flex items-center justify-center",
              "hover:bg-primary-foreground/10 transition-colors",
              "focus:outline-none focus:ring-1 focus:ring-primary-foreground/30"
            )}
            aria-label="Minimize chat"
          >
            <Minus className="w-3 h-3" />
          </button>
        )}

        <button
          onClick={onClose}
          className={cn(
            "w-6 h-6 rounded-md flex items-center justify-center",
            "hover:bg-primary-foreground/10 transition-colors",
            "focus:outline-none focus:ring-1 focus:ring-primary-foreground/30"
          )}
          aria-label="Close chat"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
