/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { CentralizedLoading } from "@/components/visuals";

/**
 * Loading UI for admin section
 * Displays dashboard-style loading skeleton for admin pages
 */
export default function AdminLoading() {
  return (
    <CentralizedLoading
      variant="dashboard"
      title="Loading Admin Dashboard..."
      description="Preparing administrative interface"
    />
  );
}
