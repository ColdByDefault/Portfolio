/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import { useSyncExternalStore } from "react";

interface NoSSRProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const emptySubscribe = () => () => {};

/**
 * NoSSR component prevents server-side rendering of its children
 * to avoid hydration mismatches for client-only components
 */
export function NoSSR({ children, fallback = null }: NoSSRProps) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isClient) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
