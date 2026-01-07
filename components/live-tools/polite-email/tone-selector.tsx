/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */
"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TONE_OPTIONS } from "@/data/live-tools/email-rewriter";
import type { ToneType } from "@/types/live-tools/email-rewriter";

interface ToneSelectorProps {
  value: ToneType;
  onChange: (value: ToneType) => void;
  disabled?: boolean;
}

export function ToneSelector({ value, onChange, disabled }: ToneSelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Select Tone</Label>
      <RadioGroup
        value={value}
        onValueChange={(val) => onChange(val as ToneType)}
        disabled={disabled}
        className="grid grid-cols-3 gap-3"
      >
        {TONE_OPTIONS.map((option) => (
          <Label
            key={option.value}
            htmlFor={option.value}
            className={`flex cursor-pointer flex-col items-center gap-1 rounded-lg border-2 p-3 transition-colors ${
              value === option.value
                ? "border-foreground bg-muted"
                : "border-border hover:border-muted-foreground"
            } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
          >
            <RadioGroupItem
              value={option.value}
              id={option.value}
              className="sr-only"
            />
            <span className="text-sm font-medium">{option.label}</span>
            <span className="text-center text-xs text-muted-foreground">
              {option.description}
            </span>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
