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
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Code, Lightbulb, Rocket } from "lucide-react"

export default function BeRichHome() {
  const { theme } = useTheme()

  return (
    <div className={`flex flex-col flex-grow p-4 mt-12 ${theme === "dark" ? "dark" : "light"}`}>
        <div className="mb-4 lg:mb-8 text-center">
          For Developers, By Developers
        </div>
        <section className="mb-8">
          <div className="bg-opacity-30 backdrop-blur-md shadow-lg shadow-[#25252566] rounded-lg p-6 flex flex-col items-center">
            <div className="h-48 w-full flex justify-center items-center mb-4">
              {theme === "dark" ? <Image src="/logo44.png" width={200} height={200} alt="Folder Icon" /> : 
              <Image src="/logoBlack.png" width={200} height={200} alt="Folder Icon" />}
            </div>
            <h4 className="text-sm text-center">
              "You can do anything you set your mind to."
            </h4>
          </div>
        </section>
        <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Why Choose beRich.Hub?</h2>
                <p className="text-lg   max-w-2xl mx-auto">
                  A digital library created to serve as a free and accessible hub for expanding your knowledge and skills.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard
                  icon={<BookOpen className="h-10 w-10" />}
                  title="Learning Materials"
                  description="Discover courses, books, and guides across various domains of software development."/>
                <FeatureCard
                  icon={<Code className="h-10 w-10" />}
                  title="Tools for Growth"
                  description="Find the most effective tools and software for productivity and skill-building."/>
                <FeatureCard
                  icon={<Lightbulb className="h-10 w-10" />}
                  title="Curated Links"
                  description="Access a well-organized collection of websites and platforms to enhance your journey."/>
                <FeatureCard
                  icon={<Rocket className="h-10 w-10" />}
                  title="Project Ideas"
                  description="Get inspired with practical project ideas to apply your knowledge and build your portfolio."/>
                <FeatureCard
                  icon={<BookOpen className="h-10 w-10" />}
                  title="Community Support"
                  description="Connect with fellow learners and experienced developers to share knowledge and experiences."/>
                <FeatureCard
                  icon={<Code className="h-10 w-10" />}
                  title="Latest Technologies"
                  description="Stay updated with the latest frameworks, libraries, and development practices."/>
              </div>
            </div>
          </section>
        <footer className="py-8 px-4 ">
          <div className="max-w-6xl mx-auto text-center">
            <p className=" ">
              Built with <span className="font-semibold">React</span>, <span className="font-semibold">Next.js</span>,
              <span className="font-semibold"> Tailwind CSS</span>, and <span className="font-bold">TypeScript</span>.
            </p>
            <p className="mt-2">
              © {new Date().getFullYear()} beRich.Hub. All rights reserved.
            </p>
          </div>
      </footer>
    </div>
  )
}


interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const { theme } = useTheme()

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${theme === "dark" ? "dark" : "light"}`}>
      <CardContent className="p-6 text-center">
        <div className="mb-4 flex justify-center">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="">{description}</p>
      </CardContent>
    </Card>
  )
}

/* 









*/