import React from "react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { SiLinktree, SiWakatime } from "react-icons/si";



function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black backdrop-filter backdrop-blur-lg bg-opacity-30 border-t border-black shadow-lg z-0">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-2 sm:py-4 lg:py-6">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link href="/" className="flex items-center z-10">
                            <span className="text-white">ColdByDefault</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link
                                        href="https://nextjs.org/"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        className="hover:underline"
                                    >
                                        NEXT.JS
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://tailwindcss.com/"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        className="hover:underline"
                                    >
                                        Tailwind CSS
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow me</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link
                                        href="https://github.com/ColdByDefault"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        className="hover:underline"
                                    >
                                        Github
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://linktr.ee/ColdByDefault"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        className="hover:underline"
                                    >
                                        Linktree
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link
                                        href="/privacy-policy"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        className="hover:underline"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://github.com/ColdByDefault"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        className="hover:underline"
                                    >
                                        Credits &amp; Development
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-6" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        {currentYear}{" "}
                        <Link
                            href="https://coldbydefault.com/"
                            rel="noopener noreferrer"
                            target="_blank"
                            className="hover:underline"
                        >
                            AnotherProject™
                        </Link>. All Rights Reserved.
                    </span>
                    <div className="flex gap-2 mt-2 sm:justify-center sm:mt-0">
                        <Link
                            href="https://www.instagram.com/cold.by.default/"
                            rel="noopener noreferrer"
                            target="_blank"
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            aria-label="Instagram"
                        >
                            <FaInstagram className="w-6 h-6" />
                        </Link>
                        <Link
                            href="https://twitter.com/ColdByDefault"
                            rel="noopener noreferrer"
                            target="_blank"
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            aria-label="Twitter/X"
                        >
                            <BsTwitterX className="w-6 h-6" />
                        </Link>
                        <Link
                            href="https://linktr.ee/ColdByDefault"
                            rel="noopener noreferrer"
                            target="_blank"
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            aria-label="Linktree"
                        >
                            <SiLinktree className="w-6 h-6" />
                        </Link>
                        <Link
                            href="https://wakatime.com/@ColdByDefault"
                            rel="noopener noreferrer"
                            target="_blank"
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            aria-label="WakaTime"
                        >
                            <SiWakatime className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;