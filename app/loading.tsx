/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { CentralizedLoading } from "@/components/visuals";

/**
 * Root loading UI for the entire application
 * Automatically displayed by Next.js when navigating between routes
 */
export default function Loading() {
  return (
    <CentralizedLoading
      variant="page"
      title="Loading Portfolio..."
      description="Please wait while we prepare your experience"
    />
  );
}
