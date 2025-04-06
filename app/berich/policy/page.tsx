'use client'
import React from 'react';
import { useTheme } from "next-themes"


const PrivacyPolicy = () => {
    const { theme } = useTheme()
    
  return (
    <div className={`w-full h-full flex flex-col flex-grow p-4 ${theme === "dark" ? "dark" : "light"}`}>
      <div className='min-h-2/3 mx-auto px-4 py-10 flex flex-col items-center justify-center text-center mt-24 mb-72'>
        <h1 className="text-3xl font-bold mb-6">🛡️ Privacy Policy</h1>
        <p className="text-sm mb-2">Last updated: April 6, 2025</p>

        <p className="mb-4">
            Hello! This personal portfolio website does <strong>not collect or store any personal data</strong>,
            cookies, or any user credentials like names, emails, or passwords.
        </p>
        <p className="mb-4">
            However, since this site is hosted on{' '}
            <a
            href="https://vercel.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
            >
            Vercel
            </a>
            , <strong>Vercel may collect anonymous usage data</strong> to help analyze and improve website performance.
            This may include:
        </p>

        <ul className="list-disc pl-6 mb-4 space-y-1 text-start">
            <li>The country you're visiting from (based on IP, anonymized)</li>
            <li>Download and upload speeds in your browser</li>
            <li>Your browser and device type</li>
        </ul>

        <p className="mb-4">
            🔒 No personal identifiers are collected. All data is anonymous and used purely for technical analytics.
        </p>

        <p>If you have questions, feel free to get in touch!</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
