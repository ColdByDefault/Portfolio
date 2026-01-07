/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
*/

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

export const MAX_USES_PER_IP = 10; // Increased for both features
export const MAX_EMAIL_LENGTH = 2000;
export const MAX_CONTEXT_LENGTH = 3000; // For RAG context

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

export const ANALYZE_PROMPT = `You are an email analyst. Analyze the incoming email and provide:

1. A brief summary (2-3 sentences)
2. The overall sentiment (positive, neutral, negative, or urgent)
3. Key points that need to be addressed (as bullet points)
4. TWO different response options with different tones

Respond in the following JSON format ONLY (no markdown, no extra text):
{
  "summary": "Brief summary here",
  "sentiment": "positive|neutral|negative|urgent",
  "keyPoints": ["point 1", "point 2", "point 3"],
  "responseOptions": [
    {
      "id": "1",
      "tone": "Friendly & Accommodating",
      "content": "Full email response here..."
    },
    {
      "id": "2", 
      "tone": "Professional & Direct",
      "content": "Full email response here..."
    }
  ]
}`;
