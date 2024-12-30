import React from 'react'
import { FaTree } from "react-icons/fa"
import Image from 'next/image'
import Link from 'next/link'
import { Spotlight } from '@components/ui/Spotlight'
import '@styles/globals.css'

const Hero = () => {
  return (
    <section className="relative min-h-screen">
      <div>
        <Spotlight className="absolute top-0 left-0"/>
      </div>
      {/* Container for background images */}
      <div className="fixed inset-0 -z-10">
        {/* Large screen background */}
        <div className="hidden lg:block w-full h-full">
          <Image 
            src="/m123.jpg" 
            alt="Background" 
            className="object-cover"
            quality={100}
            priority
            fill
            sizes="100vw"/>
        </div>
        {/* Small/Medium screen background */}
        <div className="block lg:hidden w-full h-full">
          <Image 
            src="/m12345.jpg" 
            alt="Background" 
            className="object-cover"
            quality={100}
            priority
            fill
            sizes="100vw"/>
        </div>
      </div>
      {/* Content Container */}
      <div className="container mx-auto px-6 py-12 min-h-screen flex items-center">
        <div className="w-full md:max-w-2xl lg:max-w-3xl space-y-8">
          {/* Name Section */}
          <h1 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-bold text-white">
            Yazan Abo<span className="text-blue-500">-</span>Ayash
          </h1>
          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-gray-300">
            Hi, I am currently learning to become a software developer, 
            focusing on Python and Machine Learning, with a passion for 
            building and exploring new technologies.
            This website is Next.Js project, 
            showcasing my journey into Fullstack development.
            Check out my other projects and the source code for this website on my
            <Link  href='https://github.com/ColdByDefault/coldbydefault.github.io' 
              target='_blank' 
              rel='noopener noreferrer' 
              className='text-blue-500 hover:text-blue-200 transition-colors ml-1'>
              GitHub
            </Link>.
          </p>
          {/* Social Links */}
          <div className="flex gap-6">
            <Link 
              href="https://linktr.ee/ColdByDefault"
              rel="noopener noreferrer"
              target="_blank"
              className="flex items-center gap-2 text-gray-300 hover:text-green-500 transition-colors">
              <span>Link</span>
              <FaTree className="w-5 h-5" />
            </Link>
            <a href="#timeline" className="inline-flex h-12 animate-hero-btn items-center justify-center hero-btn transition-all scroll-smooth
            rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] 
            bg-[length:200%_100%] px-6 font-medium text-slate-400 focus:outline-none focus:ring-2 
            focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            View Journy
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero





      