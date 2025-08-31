/**
 * Language Badge Component for Blog Posts
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Languages } from "lucide-react";
import { BLOG_LANGUAGE_NAMES, type BlogLanguage } from "@/types/blogs";

interface LanguageBadgeProps {
  language: string;
  showIcon?: boolean;
  variant?: "default" | "secondary" | "destructive" | "outline";
  size?: "sm" | "md";
  className?: string;
  onClick?: () => void;
}

export function LanguageBadge({
  language,
  showIcon = false,
  variant = "outline",
  size = "md",
  className = "",
  onClick,
}: LanguageBadgeProps) {
  const languageName =
    BLOG_LANGUAGE_NAMES[language as BlogLanguage] || language.toUpperCase();

  const iconSize = size === "sm" ? "h-3 w-3" : "h-4 w-4";

  return (
    <Badge variant={variant} className={className} onClick={onClick}>
      {showIcon && <Languages className={`${iconSize} mr-1`} />}
      {languageName}
    </Badge>
  );
}
