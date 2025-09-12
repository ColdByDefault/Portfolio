/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { CentralizedLoading } from "@/components/visuals";

/**
 * Loading UI for blog section
 * Displays blog-specific loading skeleton with multiple posts
 */
export default function BlogLoading() {
  return (
    <CentralizedLoading
      variant="blog"
      title="Loading Blog Posts..."
      description="Fetching latest articles and content"
      count={3}
    />
  );
}
