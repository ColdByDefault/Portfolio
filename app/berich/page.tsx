'use client'
import React from "react"
import { useTheme } from "next-themes"
import Image from "next/image"

export default function BeRichHome() {
  const { theme } = useTheme()

  return (
    <div className={`flex flex-col flex-grow mx-auto p-4 sm:p-8 ${theme === "dark" ? "dark" : "light"}`}>
      <main className="flex-1">
        {/* Introduction Section */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Introduction</h1>
          <p className="text-lg">
            This section provides an overview of the Library.
          </p>
        </section>

        {/* Cube Icon and Documents Section */}
        <section className="mb-8">
          <div className="bg-opacity-30 backdrop-blur-md shadow-lg rounded-lg p-6 flex flex-col items-center">
            <div className="h-52 w-full flex justify-center items-center mb-4">
              {theme === "dark" ? <Image src="/library2.png" width={200} height={200} alt="Folder Icon" /> : 
              <Image src="/library.png" width={200} height={200} alt="Folder Icon" />}
              
            </div>
            <h4 className="text-sm text-center">
              "You can do anything you set your mind to"
            </h4>
          </div>
        </section>

        {/* Description Section */}
        <section className="text-center mb-8">
          <p className="text-lg">
            Welcome to <span className="font-bold">beRich.Library</span>, a powerful and flexible Next.js documentation page.
          </p>
          <p className=" text-md">
            Built with <span className="font-semibold">React</span>, <span className="font-semibold">Tailwind CSS</span>, and <span className="font-bold">JavaScript</span>.
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

        {/* Key Features Table */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <table className="table-auto w-full text-left ">
            <thead className="">
              <tr>
                <th className="px-4 py-2">Feature</th>
                <th className="px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Structured Resources</td>
                <td className="border px-4 py-2">Organized categories for easy navigation.</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Curated Tools</td>
                <td className="border px-4 py-2">Handpicked software for productivity.</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Interactive Content</td>
                <td className="border px-4 py-2">Engaging tools and links for learning.</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Multilingual Support</td>
                <td className="border px-4 py-2">Available in English, Arabic, and German.</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Open Collaboration</td>
                <td className="border px-4 py-2">Welcomes contributions to improve content.</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Updated Regularly</td>
                <td className="border px-4 py-2">Ensures up-to-date resources are available.</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  )
}
