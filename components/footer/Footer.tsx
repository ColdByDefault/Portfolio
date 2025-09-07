/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";
import Link from "next/link";
import { Links } from "@/components/footer";
import {
  legalLinks,
  resourceLinks,
  socialLinks,
  creditLinks,
} from "@/data/footerLinks";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60  border-t">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 py-6">
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
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold text-prime dark:text-gray-600 uppercase tracking-wider">
              Resources
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {resourceLinks.map((columnLinks, columnIndex) => (
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
        </div>{" "}
        <div className="border-t border-gray-200 dark:border-gray-800 py-4">
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0">
            <div className="text-xs text-gray-500 dark:text-gray-400 sm:flex-1">
              <div className="flex flex-col">
                <span>
                  {new Date().getFullYear()} ColdByDefault&#174;. All rights
                  reserved.
                </span>
                <span className="text-xs text-gray-300 dark:text-gray-500">
                  {" "}
                  The journey was sparked in Stockholm, 2021.
                </span>
              </div>
              {/* Photo Credit for small screens only - hidden on md+ screens, only visible in dark mode */}
              <div className="dark:block hidden md:dark:hidden text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span>
                  Photo by{" "}
                  <Links links={[creditLinks[0]!]} className="inline" /> on{" "}
                  <Links links={[creditLinks[1]!]} className="inline" />
                </span>
              </div>
            </div>
            <div className="flex space-x-6 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2">
              <Links links={socialLinks} className="flex space-x-6" />
            </div>
            <div className="flex-1 flex justify-end items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                madridista since 2007
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
