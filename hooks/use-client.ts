/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
import { useEffect, useState } from "react";

/**
 * Custom hook to safely check if component is mounted on client-side
 * Prevents hydration mismatches by ensuring code only runs on client
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

/**
 * Custom hook to safely access window object
 * Returns undefined on server-side to prevent hydration issues
 */
export function useWindow() {
  const [windowObj, setWindowObj] = useState<Window | undefined>(undefined);

  useEffect(() => {
    setWindowObj(window);
  }, []);

  return windowObj;
}