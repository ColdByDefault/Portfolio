/**
 * ChatHeader Component - Chat window header with title and controls
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, X } from "lucide-react";
import {
  CHATBOT_STYLES,
  CHATBOT_TRANSLATION_KEYS,
} from "@/components/chatbot";

export interface ChatHeaderProps {
  onClose: () => void;
  className?: string;
}

export const ChatHeader = React.memo(function ChatHeader({
  onClose,
  className = "",
}: ChatHeaderProps) {
  const t = useTranslations("ChatBot");

  return (
    <CardHeader
      className={`flex flex-row items-center justify-between space-y-0 pb-2 px-4 ${CHATBOT_STYLES.HEADER_BORDER} flex-shrink-0 ${className}`}
      role="banner"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 ${CHATBOT_STYLES.BUTTON_ROUNDED} ${CHATBOT_STYLES.AVATAR_GRADIENT} flex items-center justify-center`}
          role="img"
          aria-label={t(CHATBOT_TRANSLATION_KEYS.NAME)}
        >
          <Bot className="w-5 h-5 text-primary-foreground" aria-hidden="true" />
        </div>
        <div className="flex flex-col">
          <CardTitle
            className="text-base font-semibold text-foreground"
            id="chatbot-title"
          >
            {t(CHATBOT_TRANSLATION_KEYS.NAME)}{" "}
            <span
              className="text-xs text-muted-foreground font-normal"
              aria-label="pronunciation"
            >
              {t(CHATBOT_TRANSLATION_KEYS.PRONUNCIATION)}
            </span>
          </CardTitle>
          <span
            className="text-xs text-muted-foreground font-medium"
            id="chatbot-subtitle"
          >
            {t(CHATBOT_TRANSLATION_KEYS.SUBTITLE)}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className={`h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive ${CHATBOT_STYLES.BUTTON_ROUNDED} transition-colors`}
          aria-label={t(CHATBOT_TRANSLATION_KEYS.CLOSE_CHAT)}
          title={t(CHATBOT_TRANSLATION_KEYS.CLOSE_CHAT)}
        >
          <X className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">
            {t(CHATBOT_TRANSLATION_KEYS.CLOSE_CHAT)}
          </span>
        </Button>
      </div>
    </CardHeader>
  );
});
