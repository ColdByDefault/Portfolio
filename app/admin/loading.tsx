/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

import { CentralizedLoading } from "@/components/visuals";

export default function AdminLoading() {
  return (
    <CentralizedLoading
      variant="dashboard"
      title="Loading Admin Dashboard..."
      description="Preparing administrative interface"
    />
  );
}
