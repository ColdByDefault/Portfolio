/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
*/

export type ToneType = "professional" | "empathetic" | "assertive";

export interface ToneOption {
  value: ToneType;
  label: string;
  description: string;
}

export interface RewriteRequest {
  email: string;
  tone: ToneType;
  context?: string; // RAG context
}

export interface RewriteResponse {
  rewrittenEmail: string;
  error?: string;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}

// New types for email analysis
export interface AnalyzeRequest {
  email: string;
  context?: string; // RAG context
}

export interface ResponseOption {
  id: string;
  tone: string;
  content: string;
}

export interface AnalyzeResponse {
  summary: string;
  sentiment: "positive" | "neutral" | "negative" | "urgent";
  keyPoints: string[];
  responseOptions: ResponseOption[];
  error?: string;
}

export type AppMode = "rewrite" | "analyze";
