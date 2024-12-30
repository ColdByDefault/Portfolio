import React from 'react'
import { Spotlight } from '@components/ui/Spotlight'
import { FaTree } from "react-icons/fa";
import { RxGithubLogo } from "react-icons/rx";
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section>
      <div>
        <Spotlight className="absolute top-0 left-0"/>
      </div>
        <div className="relativ">
          {/* Background Image for Large Screens */}
          <div className="hidden lg:block absolute inset-0 w-full h-full z-0">
            <Image src="/m123.jpg" alt="ProfilePicture"
            fill className="object-cover" sizes="(min-width: 1024px) 100vw"/>
          </div>
          {/* Background Image for Medium and Small Screens */}
          <div className="block lg:hidden absolute inset-0 w-full h-full z-0">
          <Image src="/m12345.jpg" alt="ProfilePicture"
            fill className="object-cover" sizes="(max-width: 1024px) 100vw"/>
          </div>
          {/* Profile Section */}
          <div className="absolute lg:top-48 lg:left-12 left-0 z-20 p-6 flex flex-col rounded-2xl 
          md:p-6 md:flex-row md:flex-wrap items-center
          md:justify-between w-full max-w-screen-2xl mx-auto
          bottom-32">
            <div className="md:mb-0 md:w-[50%] lg:w-auto flex flex-col justify-center 
            items-start text-white px-6">
              {/* Name Section */}
              <h1 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Yazan Abo<span className="text-cyan-400">-</span>Ayash
              </h1>
              {/* Paragraph Section */}
              <p className="text-sm sm:text-base md:text-lg max-w-lg mb-6 text-white">
              Hi, I am currently learning to become a software developer, 
              focusing on Python and Machine Learning, with a passion for 
              building and exploring new technologies.
              This website is Next.Js project, 
              showcasing my journey into Fullstack development.
              Check out my other projects and the source code for this website on my
              <Link href='https://github.com/ColdByDefault/coldbydefault.github.io' target='_blank' 
              rel='noopener noreferrer' class='text-cyan-400'>GitHub</Link>.
              </p>
              {/* Links */}
              <div className="flex justify-center md:justify-start flex-wrap gap-6">
                <Link href="https://linktr.ee/ColdByDefault"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="font-medium text-gray-300 hover:text-green-500 hover:scale-95 duration-200 
                  focus:outline-none 
                  focus:text-green-500 flex items-center gap-2">Link
                  <FaTree />
                </Link>
                <Link href="https://github.com/ColdByDefault"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="font-medium text-gray-300 hover:text-blue-500 hover:scale-95 duration-200 
                  focus:outline-none 
                  focus:text-green-500 flex items-center gap-2"><RxGithubLogo />
                </Link>
              </div>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Hero