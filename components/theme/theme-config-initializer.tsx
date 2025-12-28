/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */
"use client";

import { initializeThemeConfig } from "./theme-config-validator";
import { useEffect } from "react";
/**
 * Client-side CSS performance initialization component
 */
export function ThemeConfigInitializer() {
  useEffect(() => {
    initializeThemeConfig();
  }, []);

  return null; // This component renders nothing
}
