/**
 * API Interface Types
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

export interface ApiResponse<T = unknown> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiEndpoints {
  stats: string;
  suspicious: string;
}

export interface ContactApiResponse {
  message?: string;
  endpoints?: ApiEndpoints;
  success?: boolean;
  data?: unknown;
}

export interface BlockActionRequest {
  action: "block_ip" | "block_email";
  ip?: string;
  email?: string;
}

export interface BlockActionResponse {
  message: string;
}

export interface ApiErrorResponse {
  error: string;
}

export interface ContactAdminRequest {
  action: string;
  ip?: string;
  email?: string;
}