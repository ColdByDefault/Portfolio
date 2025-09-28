/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
import { MediaDashboard } from "@/components/mediaDashboard";
import { Background } from "@/components/visuals";
import { NoSSR } from "@/components/NoSSR";

export default function MediaPage() {
  return (
    <div>
      <MediaDashboard />
      <NoSSR>
        <Background />
      </NoSSR>
    </div>
  );
}
