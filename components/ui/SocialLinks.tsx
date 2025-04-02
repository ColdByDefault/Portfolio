import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import React from "react";

interface SocialLinksProps {
  href: string;
  iconSrc: StaticImageData | string;
  altText: string;
  label: string;
  isMail?: boolean;
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  href,
  iconSrc,
  altText,
  label,
  isMail = false,
  className = "",
}) => {
  // Use regular <a> tag for mailto links
  if (isMail) {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        <Image src={iconSrc} alt={altText} width={30} height={30} />
        <a
          href={href}
          aria-label={altText}
          className="font-bold border-b border-black/30 px-2 rounded-full shadow-[0px_2px_5px_rgba(5,5,5,0.3)]
          hover:bg-black/10 transition duration-300 ease-in-out">
          {label}
        </a>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <Image src={iconSrc} alt={altText} width={30} height={30} />
      <Link
        href={href}
        aria-label={altText}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold border-b border-black/30 px-2 rounded-full shadow-[0px_2px_5px_rgba(5,5,5,0.3)]
        hover:bg-black/10 transition duration-300 ease-in-out">
        {label}
      </Link>
    </div>
  );
};

export default SocialLinks;