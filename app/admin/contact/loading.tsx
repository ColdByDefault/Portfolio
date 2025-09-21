/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { CentralizedLoading } from "@/components/visuals";

export default function AdminContactLoading() {
  return (
    <CentralizedLoading
      variant="list"
      title="Loading Contact Management..."
      description="Preparing contact administration tools"
      count={5}
    />
  );
}
