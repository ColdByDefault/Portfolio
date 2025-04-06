
/**
 * BeRichHome Component
 *
 * This component represents the home page for the "beRich.Hub" platform.
 * It is a client-side rendered component that utilizes the `useTheme` hook
 * from `next-themes` to dynamically adjust its appearance based on the current theme.
 *
 * @ component
 * @ returns {JSX.Element} The rendered BeRichHome component.
 *
 * @ description
 * The BeRichHome component is structured into several sections:
 * - **Introduction Section**: Displays a heading introducing the page.
 * - **Cube Icon and Documents Section**: Shows a themed image (dark/light) and a motivational quote.
 * - **Description Section**: Provides an overview of the "beRich.Hub" platform, highlighting its technologies.
 * - **Why This Digital Library Section**: Explains the purpose of the digital library and lists its key features.
 *
 * @ remarks
 * - The component uses Tailwind CSS for styling.
 * - The `theme` variable determines whether the dark or light theme is applied.
 * - Images are conditionally rendered based on the current theme.
 *
 * @ dependencies
 * - `next-themes`: For theme management.
 * - `next/image`: For optimized image rendering.
 * - `react`: For building the component.
 * ```
 */
'use client'
import React from "react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"

export default function BeRichHome() {
  const { theme } = useTheme()

  return (
    <div className={`flex flex-col flex-grow w-full p-4 ${theme === "dark" ? "dark" : "light"}`}>
      
      <main className="flex flex-col">
        
        {/* Introduction Section */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Introduction</h1>
        </section>
        {/* Cube Icon and Documents Section */}
        <section className="mb-8">
          <div className="bg-opacity-30 backdrop-blur-md shadow-lg rounded-lg p-6 flex flex-col items-center">
            <div className="h-52 w-full flex justify-center items-center mb-4">
              {theme === "dark" ? <Image src="/library2.png" width={200} height={200} alt="Folder Icon" /> : 
              <Image src="/library.png" width={200} height={200} alt="Folder Icon" />}
            </div>
            <h4 className="text-sm text-center">
              "You can do anything you set your mind to."
            </h4>
          </div>

        </section>
        {/* Description Section */}
        <section className="text-center mb-8">
          <p className="text-lg">
            Welcome to <span className="font-bold">beRich.Hub</span>, a powerful and flexible Next.js learning platform.
          </p>
          <p className=" text-md">
            Built with <span className="font-semibold">React</span>, <span className="font-semibold">Tailwind CSS</span>, and <span className="font-bold">TypeScript</span>.
          </p>
        </section>
        {/* Why This Digital Library Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Why This Digital Library?</h2>
          <p className=" mb-4">
            This digital library was created to serve as a free and accessible hub for anyone looking to expand
            their knowledge and skills. It's a collection of curated resources, tools, and insights gathered
            during my own learning journey, tailored to inspire and support learners of all levels.
          </p>
          <ul className="list-disc list-inside ">
            <li>Learning Materials: Discover courses, books, and guides across various domains.</li>
            <li>Tools for Growth: Find the most effective tools and software for productivity and skill-building.</li>
            <li>Curated Links: Access a well-organized collection of websites and platforms to enhance your journey.</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
