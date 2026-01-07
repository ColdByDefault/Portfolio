// Static data and constants

import type { ToneOption } from "@/types/live-tools/email-rewriter";

export const TONE_OPTIONS: ToneOption[] = [
  {
    value: "professional",
    label: "Professional",
    description: "Formal and business-appropriate",
  },
  {
    value: "empathetic",
    label: "Empathetic",
    description: "Understanding and compassionate",
  },
  {
    value: "assertive",
    label: "Assertive",
    description: "Direct but respectful",
  },
];

export const MAX_USES_PER_IP = 2;
export const MAX_EMAIL_LENGTH = 1000;

export const TONE_PROMPTS: Record<string, string> = {
  professional: `Rewrite the following email in a professional, formal business tone. 
    - Use proper salutations and closings
    - Maintain clarity and precision
    - Remove any emotional or aggressive language
    - Keep the core message intact`,
  empathetic: `Rewrite the following email in an empathetic, understanding tone.
    - Show compassion and understanding
    - Acknowledge the situation diplomatically
    - Use warm but professional language
    - Keep the core message intact`,
  assertive: `Rewrite the following email in an assertive but respectful tone.
    - Be direct and clear about expectations
    - Maintain professionalism
    - Use confident language without being aggressive
    - Keep the core message intact`,
};
