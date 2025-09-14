/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { CentralizedLoading } from "@/components/visuals";

/**
 * Loading UI for privacy policy page
 * Displays simple page loading skeleton
 */
export default function PrivacyLoading() {
  return (
    <CentralizedLoading
      variant="page"
      title="Loading Privacy Policy..."
      description="Preparing privacy information"
    />
  );
}
