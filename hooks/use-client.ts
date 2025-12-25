/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Custom hook to safely check if component is mounted on client-side
 * Prevents hydration mismatches by ensuring code only runs on client
 */
export function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/**
 * Custom hook to safely access window object
 * Returns undefined on server-side to prevent hydration issues
 */
export function useWindow() {
  return useSyncExternalStore(
    emptySubscribe,
    () => window,
    () => undefined
  );
}
