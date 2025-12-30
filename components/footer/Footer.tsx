/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */
import { Links } from "@/components/footer";
import {
  legalLinks,
  developerLinks,
  socialLinks,
  footerNavLinks,
} from "@/data/footerLinks";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-background/95 backdrop-blur border-t min-h-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-prime dark:text-gray-600 uppercase tracking-wider">
              Navigation
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {footerNavLinks.map((columnLinks, columnIndex) => (
                <ul key={columnIndex} className="space-y-2">
                  {columnLinks.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Links links={[link]} />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-prime dark:text-gray-600 uppercase tracking-wider">
              For Developers
            </h3>
            <ul className="space-y-2">
              {developerLinks.map((link, index) => (
                <li key={index}>
                  <Links links={[link]} />
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-prime dark:text-gray-600 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Links links={[link]} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 py-4">
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0">
            <div className="flex space-x-6 sm:flex-1">
              <Links links={socialLinks} className="flex space-x-6" />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              <div className="flex flex-col text-center sm:text-right">
                <span>
                  {currentYear} ColdByDefault&#174;. All rights reserved.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
