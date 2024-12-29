'use client';

import { usePathname } from 'next/navigation';
import { IoIosArrowForward } from "react-icons/io";
import { PiArrowBendUpLeftLight } from "react-icons/pi";

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter((segment) => segment);

  return (
    <nav className="text-gray-500 text-sm">
      <ul className="flex items-center space-x-2 style-none">
        <li>
          <IoIosArrowForward />
        </li>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;

          return (
            <li key={index} className="flex items-center">
              <span className="mx-1">
                <PiArrowBendUpLeftLight />
              </span>
              <span className={isLast ? "text-white" : "text-gray-300"}>
                {segment.charAt(0).toUpperCase() + segment.slice(1)}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}


