// Types for the Email Rewriter application

export type ToneType = "professional" | "empathetic" | "assertive";

export interface ToneOption {
  value: ToneType;
  label: string;
  description: string;
}

export interface RewriteRequest {
  email: string;
  tone: ToneType;
}

export interface RewriteResponse {
  rewrittenEmail: string;
  error?: string;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}
