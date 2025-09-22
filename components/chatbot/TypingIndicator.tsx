/**
 * TypingIndicator Component - Shows AI thinking animation
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Bot, Sparkles } from "lucide-react";
import {
  CHATBOT_CONFIG,
  CHATBOT_STYLES,
  CHATBOT_TRANSLATION_KEYS,
} from "./ChatBot.constants";

export interface TypingIndicatorProps {
  className?: string;
}

export function TypingIndicator({ className = "" }: TypingIndicatorProps) {
  const t = useTranslations("ChatBot");

  return (
    <div className={`flex justify-start ${className}`}>
      <div className="max-w-[80%]">
        <div className="flex items-center gap-2 mb-2">
          <div
            className={`w-6 h-6 ${CHATBOT_STYLES.BUTTON_ROUNDED} ${CHATBOT_STYLES.AVATAR_GRADIENT} flex items-center justify-center`}
          >
            <Bot className="w-3 h-3 text-primary-foreground" />
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            {t(CHATBOT_TRANSLATION_KEYS.TYPING_STATUS)}
          </span>
          <Badge variant="secondary" className="text-xs px-2 py-0.5">
            <Sparkles className="w-3 h-3 mr-1" />
            {t(CHATBOT_TRANSLATION_KEYS.TYPING_THINKING)}
          </Badge>
        </div>
        <div className={`${CHATBOT_STYLES.MESSAGE_BORDER} p-3 rounded-lg`}>
          <div className="flex items-center gap-1">
            <div className="flex space-x-1">
              <div
                className={`w-2 h-2 bg-primary/60 ${CHATBOT_STYLES.BUTTON_ROUNDED} ${CHATBOT_STYLES.BOUNCE_ANIMATION}`}
                style={{
                  animationDelay: `${CHATBOT_CONFIG.BOUNCE_DELAY.FIRST}s`,
                }}
              ></div>
              <div
                className={`w-2 h-2 bg-primary/60 ${CHATBOT_STYLES.BUTTON_ROUNDED} ${CHATBOT_STYLES.BOUNCE_ANIMATION}`}
                style={{
                  animationDelay: `${CHATBOT_CONFIG.BOUNCE_DELAY.SECOND}s`,
                }}
              ></div>
              <div
                className={`w-2 h-2 bg-primary/60 ${CHATBOT_STYLES.BUTTON_ROUNDED} ${CHATBOT_STYLES.BOUNCE_ANIMATION}`}
                style={{
                  animationDelay: `${CHATBOT_CONFIG.BOUNCE_DELAY.THIRD}s`,
                }}
              ></div>
            </div>
            <span className="text-xs text-muted-foreground ml-2">
              {t(CHATBOT_TRANSLATION_KEYS.TYPING_PROCESSING)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;
