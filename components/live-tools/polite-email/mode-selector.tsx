/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
*/
"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AppMode } from "@/types/live-tools/email-rewriter";
import { Mail, MessageSquareText } from "lucide-react";

interface ModeSelectorProps {
  value: AppMode;
  onChange: (value: AppMode) => void;
  disabled?: boolean;
}

export function ModeSelector({ value, onChange, disabled }: ModeSelectorProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(v) => onChange(v as AppMode)}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="analyze" disabled={disabled} className="gap-2">
          <Mail className="h-4 w-4" />
          Analyze & Reply
        </TabsTrigger>
        <TabsTrigger value="rewrite" disabled={disabled} className="gap-2">
          <MessageSquareText className="h-4 w-4" />
          Rewrite
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
