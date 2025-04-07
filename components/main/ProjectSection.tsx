"use client"

import { Parallax } from "react-scroll-parallax"
import Image from "next/image"
import Link from "next/link"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card" 
import { orbitron } from '@/lib/fonts'
import { LiaExternalLinkAltSolid } from "react-icons/lia";


export default function ProjectSection() {
  return (
    /* py-20 relative overflow-hidden text-white */
    <section className={`font-orbitron ${orbitron.variable} py-4 relative overflow-hidden text-white`}>
      {/* Sectio Title */}
      <Parallax translateY={[10, -10]} className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-light mb-4">Projects</h2>
        <div className="h-1 w-20 bg-primary mx-auto"></div>
      </Parallax>
      {/* First Project */}
      {/* beRich Project div */}
      <div className="container flex flex-col gap-24 mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Parallax */}
          <Parallax translateX={[30, -30]} opacity={[0.8, 1]}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-primary/20 to-zinc-500/20 blur-xl w-52 h-20"></div>
              <Image
                src="/logo44.png"
                alt="Profile"
                width={300}
                height={300}
                className="rounded-xl relative"/>
            </div>
            {/* Bottom Card */}
            <Card className="w-full max-w-md mx-auto p-4 z-50">
              <CardHeader>
                <CardTitle>
                  <Link href={"/berichHub"} className="text-blue-400 flex gap-2 font-semibold hover:text-zinc-400 hover:underline"
                  aria-label="beRich.Hub"
                  target='_blank' 
                  rel='noopener noreferrer'>beRich.Hub<LiaExternalLinkAltSolid /></Link>
                </CardTitle>
                <CardDescription>The Ultimate Hub for developers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Web Application for developers</p>
                <p className="text-gray-700 text-sm">Temporary on Desktop Devices only</p> 
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-400">Last update: 04.2025</p>
              </CardFooter>
            </Card>
          </Parallax>
          <div className="lg:ml-32 lg:mt-32">
          <Parallax translateX={[-30, 30]} opacity={[0.8, 1]}>
            <Card className="w-full max-w-md mx-auto p-4 z-50">
              <CardHeader>
                <CardTitle>
                  <Link href={"/berichHub"} className="text-blue-400 flex gap-2 font-semibold hover:text-zinc-400 hover:underline"
                  aria-label="beRich.Hub"
                  target='_blank' 
                  rel='noopener noreferrer'>beRich.Hub<LiaExternalLinkAltSolid /></Link>
                  </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  A hub where I share my knowledge, learning journey, and development experiences. 
                  It's a space for connecting with others, exchanging ideas, and growing together through shared insights, questions, and solutions.
                </p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500">Next.Js 15 - React 19 - Tailwindcss v4</p>
              </CardFooter>
            </Card>
          </Parallax>
          </div>
        </div>
      </div>
    </section>
  )
}
