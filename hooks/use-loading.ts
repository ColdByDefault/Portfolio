/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
*/

"use client";
import { useState, useCallback } from "react";

interface LoadingState {
  isLoading: boolean;
  message?: string;
  variant?: "page" | "card" | "list" | "profile" | "blog" | "dashboard";
}

interface UseLoadingReturn {
  loadingState: LoadingState;
  startLoading: (message?: string, variant?: LoadingState["variant"]) => void;
  stopLoading: () => void;
  setLoadingMessage: (message: string) => void;
  setLoadingVariant: (variant: LoadingState["variant"]) => void;
}

/**
 * Custom hook for managing loading states throughout the application
 * Provides centralized loading state management with customizable messages and variants
 */
export const useLoading = (
  initialState: LoadingState = { isLoading: false }
): UseLoadingReturn => {
  const [loadingState, setLoadingState] = useState<LoadingState>(initialState);

  const startLoading = useCallback(
    (message?: string, variant?: LoadingState["variant"]) => {
      setLoadingState({
        isLoading: true,
        ...(message && { message }),
        variant: variant || "page",
      });
    },
    []
  );

  const stopLoading = useCallback(() => {
    setLoadingState((prev) => ({
      ...prev,
      isLoading: false,
    }));
  }, []);

  const setLoadingMessage = useCallback((message: string) => {
    setLoadingState((prev) => ({
      ...prev,
      message,
    }));
  }, []);

  const setLoadingVariant = useCallback((variant: LoadingState["variant"]) => {
    setLoadingState((prev) => ({
      ...prev,
      ...(variant && { variant }),
    }));
  }, []);

  return {
    loadingState,
    startLoading,
    stopLoading,
    setLoadingMessage,
    setLoadingVariant,
  };
};