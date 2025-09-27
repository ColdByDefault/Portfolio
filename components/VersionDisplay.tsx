/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
import { getPortfolioVersion } from "@/lib/utils";

interface VersionDisplayProps {
  prefix?: string;
  className?: string;
  versionOnly?: boolean;
}

export default function VersionDisplay({
  prefix = "v",
  className = "",
  versionOnly = false,
}: VersionDisplayProps) {
  const version = getPortfolioVersion();
  const displayText = versionOnly ? version : `${prefix}${version}`;
  return (
    <span className={className} title={`Portfolio Version ${version}`}>
      {displayText}
    </span>
  );
}
