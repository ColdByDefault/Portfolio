/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { CentralizedLoading } from "@/components/visuals";

/**
 * Loading UI for admin blog management
 * Displays blog-specific loading skeleton for admin view
 */
export default function AdminBlogLoading() {
  return (
    <CentralizedLoading
      variant="dashboard"
      title="Loading Blog Management..."
      description="Preparing blog administration tools"
    />
  );
}
