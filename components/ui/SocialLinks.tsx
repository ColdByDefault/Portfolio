import Link from "next/link";
import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SocialLinksProps {
  href: string;
  altText: string;
  label: string;
  isMail?: boolean;
  className?: string;
  icon?: IconDefinition;
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  href,
  altText,
  label,
  isMail = false,
  className = "",
  icon,
}) => {
  return (
    <div className={`flex flex-col items-center gap-2 border-b border-black/30 p-2 rounded-lg shadow-[0px_2px_5px_rgba(5,5,5,0.3)] w-14 ${className}`}>
      <Link href={href}
        aria-label={altText}
        target={isMail ? undefined : "_blank"}
        rel={isMail ? undefined : "noopener noreferrer"}
        className="font-bold flex items-center justify-center">
        {icon && <FontAwesomeIcon icon={icon} className="m-2 text-lg" />}
        {label}
      </Link>
    </div>
  );
};

export default SocialLinks;
