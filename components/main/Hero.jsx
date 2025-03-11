import React from 'react';
import { FaTree } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';
import { Spotlight } from '@components/ui/Spotlight';
import DynamicBtn from '@components/ui/DynamicBtn';
import '@styles/globals.css';
import { FaFly } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full">
      <div>
          <Spotlight className="absolute top-0 left-0 z-10 h-[30vh] lg:h-[80vh]" fill="#2c2cc471"/>
          <Spotlight className="absolute top-12 left-20 z-10 h-[30vh] lg:h-auto" fill="#5c106b54"/>
          <Spotlight className="absolute left-12 h-[30vh] lg:h-[90vh] z-10 lg:left-48" fill="#2c2cc471"/>
      </div>
      {/* Background Image Container */}
      <div className="realtive inset-0 z-0 mt-12 md:mt-4 lg:mt-0">
        <Image 
          src="/m123.jpg" 
          alt="Background" 
          className="object-scale-down object-top lg:object-cover lg:object-center"
          quality={100}
          priority
          fill
          sizes="100vw"/>
      </div>
      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen items-center sm:justify-evenly px-6 lg:px-8">
        <div className="max-w-4xl p-4">
          {/* Name Section */}
          <h1 className="mb-6 text-left font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Yazan <br className='block lg:hidden'/>Abo<span className="text-blue-400">-</span>Ayash
          </h1>
          {/* Description */}
          <p className="mb-8 max-w-2xl text-left text-sm text-slate-300 sm:text-base md:text-lg lg:text-xl">
            I am currently learning to become a software developer, with a passion for building web apps and exploring new technologies. 
            I'm also deeply interested in Python and Machine Learning.<br />Check out my other projects and the source code for this Next.js portfolio on my
            {' '}
            <Link href='https://github.com/ColdByDefault/Almighty' 
              target='_blank' 
              rel='noopener noreferrer' 
              className='text-white underline decoration-blue-400 underline-offset-2 transition-colors hover:text-gray-600'>
              GitHub
            </Link>.
          </p>
          {/* Social Links */}
          <div className="flex items-start gap-4 sm:gap-6">
            <Link href="https://linktr.ee/ColdByDefault"
              rel="noopener noreferrer"
              target="_blank"
              className="inline-flex h-12 items-center justify-center rounded-md 
              border border-slate-600 bg-black/20 px-6 font-medium text-slate-300 
              backdrop-blur-sm transition-all hover:bg-black/30 hover:text-white 
              focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
              <span>Link</span>
              <FaTree className="ml-2 h-5 w-5" />
            </Link>
            <DynamicBtn title="View Journey" icon={FaFly} targetId="timeline" />
          </div>
        </div>
        <div className="hidden lg:block lg:max-w-4xl lg:ml-12"></div>
      </div>
    </section>
  );
};

export default Hero;
