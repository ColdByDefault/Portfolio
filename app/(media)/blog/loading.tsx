/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
*/

import { CentralizedLoading } from "@/components/visuals";

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
