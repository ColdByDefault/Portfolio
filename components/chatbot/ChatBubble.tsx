/**
 * ChatBot Floating Bubble Component
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Bot, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  onClick: () => void;
  isConnected: boolean;
  hasNewMessages?: boolean;
  theme?: "light" | "dark" | "system";
  className?: string;
}

export function ChatBubble({
  onClick,
  isConnected,
  hasNewMessages = false,
  theme = "system",
  className,
}: ChatBubbleProps) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0, opacity: 0, y: 50 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.6,
      }}
      className={cn(
        "relative w-14 h-14 rounded-full shadow-lg",
        "flex items-center justify-center",
        "transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary/50",
        isConnected
          ? "bg-primary hover:bg-primary/90 text-primary-foreground"
          : "bg-muted hover:bg-muted/90 text-muted-foreground",
        className
      )}
      style={{
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      }}
      disabled={!isConnected}
      aria-label="Open AI ChatBot"
    >
      {/* Connection Status Indicator */}
      {!isConnected && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full flex items-center justify-center">
          <WifiOff className="w-2 h-2 text-destructive-foreground" />
        </div>
      )}

      {/* New Messages Indicator */}
      {hasNewMessages && isConnected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
            className="w-full h-full bg-green-400 rounded-full"
          />
        </motion.div>
      )}

      {/* Main Icon */}
      <motion.div
        animate={isConnected ? { rotate: [0, 5, -5, 0] } : {}}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        {isConnected ? (
          <Bot className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </motion.div>

      {/* Pulse Effect for Connected State */}
      {isConnected && (
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20"
          animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeOut",
          }}
        />
      )}
    </motion.button>
  );
}
