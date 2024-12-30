{/* NEED TO PROVIDE CORRECT LINK FOR GITHUB */}
import React from 'react'
import { FaTree } from "react-icons/fa"
import Image from 'next/image'
import Link from 'next/link'
import { Spotlight } from '@components/ui/Spotlight'
import DynamicBtn from '@components/ui/DynamicBtn'
import '@styles/globals.css'
import { FaFly } from "react-icons/fa";


const Hero = () => {
  return (
    <section className="relative min-h-screen">
      <div className='hidden lg:block'>
        <Spotlight className="absolute top-0 left-0 h-scree z-5" fill="#2c2cc471"/>
        <Spotlight className="absolute top-24 left-48 h-scree z-5" fill="#5c106b54"/>
        <Spotlight className="absolute left-12 h-[90vh] z-5" fill="#2c2cc471"/>
      </div>
      {/* Container for background images */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
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
      <div className="absolute top-32 left-2 lg:left-24 mx-auto px-6 py-12 min-h-screen flex items-center z-10">
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
            <DynamicBtn title="View Journy" icon={FaFly} targetId="timeline" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero





      