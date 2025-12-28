/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

import { CentralizedLoading } from "@/components/visuals";


export default function AdminBlogLoading() {
  return (
    <CentralizedLoading
      variant="dashboard"
      title="Loading Blog Management..."
      description="Preparing blog administration tools"
    />
  );
}
