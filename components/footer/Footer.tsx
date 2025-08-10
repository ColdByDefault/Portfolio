/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";
import Link from "next/link";
import { FaGithub, FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin, FaInstagramSquare } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60  border-t">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-prime dark:text-gray-600 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/impressum"
                  className="text-gray-600 dark:text-gray-300 hover:text-prime dark:hover:text-white transition-colors duration-200"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/contact"
                  className="text-gray-600 dark:text-gray-300 hover:text-prime dark:hover:text-white transition-colors duration-200"
                >
                  <span className="text-xs text-green-500 dark:text-gray-400">
                    {" "}
                    <code>Admin Dashboard</code>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-prime dark:text-gray-600 uppercase tracking-wider">
              Resources
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ul className="space-y-3">
                <li>
                  <Link
                    target="_blanck"
                    rel="noopener noreferrer"
                    href="https://nextjs.org"
                    className="text-gray-600 dark:text-gray-300 hover:text-prime dark:hover:text-white 
                        transition-colors duration-200"
                  >
                    Next.js
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blanck"
                    rel="noopener noreferrer"
                    href="https://react.dev"
                    className="text-gray-600 dark:text-gray-300 hover:text-prime dark:hover:text-white transition-colors duration-200"
                  >
                    React
                  </Link>
                </li>
              </ul>
              <ul className="space-y-3">
                <li>
                  <Link
                    target="_blanck"
                    rel="noopener noreferrer"
                    href="https://ui.shadcn.com"
                    className="text-gray-600 dark:text-gray-300 hover:text-prime dark:hover:text-white transition-colors duration-200"
                  >
                    Shadcn-UI
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blanck"
                    rel="noopener noreferrer"
                    href="https://vercel.com/"
                    className="text-gray-600 dark:text-gray-300 hover:text-prime dark:hover:text-white transition-colors duration-200"
                  >
                    Vercel
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>{" "}
        {/* <-- Add this closing div for the grid */}
        <div className="border-t border-gray-200 dark:border-gray-800 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date().getFullYear()} ColdByDefault&#174;. All rights
              reserved.
              <span className="text-xs text-gray-600">
                {" "}
                The journey was sparked - Stockholm, 2021.
              </span>
            </p>
            <div className="flex space-x-6">
              <Link
                href="https://x.com/ccoldbydefault"
                target="_blanck"
                rel="noopener noreferrer"
                aria-label="x"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
              >
                <span className="sr-only">X</span>
                <FaSquareXTwitter />
              </Link>
              <Link
                href="https://www.instagram.com/cold.by.default/#"
                target="_blanck"
                rel="noopener noreferrer"
                aria-label="instagram"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
              >
                <span className="sr-only">Instagram</span>
                <FaInstagramSquare />
              </Link>
              <Link
                href="https://github.com/ColdByDefault"
                target="_blanck"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
              >
                <span className="sr-only">GitHub</span>
                <FaGithub />
              </Link>
              <Link
                href="https://www.linkedin.com/in/yazan-a-a-465b44312/"
                target="_blanck"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
              >
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
