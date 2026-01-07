/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */
"use client";
import { Textarea } from "@/components/ui/textarea";
import { MAX_CONTEXT_LENGTH } from "@/data/live-tools/email-rewriter";
import { Database, Info } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ContextInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function ContextInput({ value, onChange, disabled }: ContextInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <div className="flex items-center gap-2">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2 p-0 h-auto">
            <Database className="h-4 w-4" />
            <span className="text-sm font-medium">Custom Context (RAG)</span>
            <span className="text-xs text-muted-foreground">
              {isOpen ? "−" : "+"}
            </span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="flex items-start gap-2 rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
          <Info className="h-4 w-4 mt-0.5 shrink-0" />
          <p>
            Add custom context that the AI will use when analyzing or rewriting
            emails. This could include company policies, communication
            guidelines, project details, or any relevant background information.
          </p>
        </div>
        <Textarea
          placeholder="Example: Our company policy is to respond within 24 hours. We offer 30-day money-back guarantees. The project deadline is March 15th..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="min-h-24 resize-none text-sm"
          maxLength={MAX_CONTEXT_LENGTH}
        />
        <p className="text-right text-xs text-muted-foreground">
          {value.length}/{MAX_CONTEXT_LENGTH}
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
}
