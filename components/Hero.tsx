import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '@/styles/globals.css';


function Hero() {
  return (
    <section className="relative w-full">
       <div>
        {/* SPOTLIGHTS */}
      </div>
      
      {/* Background Image Container */}
      <div className="inset-0 z-0 mt-12 md:mt-4 lg:mt-0">
        <Image 
          src="/m123.jpg" 
          alt="Background" 
          className="object-scale-down object-top lg:object-cover lg:object-center"
          quality={100}
          priority
          fill
          sizes="100vw"
        />
      </div>
      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen items-center sm:justify-evenly px-6 lg:px-8">
        <div className="max-w-4xl p-4">
          {/* Name Section */}
          <h1 className="mb-6 text-left text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Yazan <br className='block lg:hidden'/>Abo<span className="text-blue-400">- </span>Ayash
          </h1>
          {/* Description */}
          <p className="mb-8 max-w-2xl text-left text-sm text-slate-300 sm:text-base md:text-lg lg:text-xl">
            Aspiring software developer building modern web apps and exploring cutting-edge technologies. 
            Passionate about Python, Machine Learning, and crafting full-stack applications.<br />Check out my other projects and the source code for this portfolio<br />&#40;built with Next.js&#41; on my
            {' '}
            <Link 
              href='https://github.com/ColdByDefault/Almighty' 
              aria-label="GitHub Repository"
              target='_blank' 
              rel='noopener noreferrer' 
              className='text-white underline decoration-blue-400 underline-offset-2 transition-colors hover:text-gray-600'
            >
              GitHub↗
            </Link>.
          </p>
          {/* Social Links */}
          <div className="flex items-start gap-4">
          </div>
        </div>
        <div className="hidden lg:block lg:max-w-4xl lg:ml-12"></div>
      </div>
    </section>
  );
};

export default Hero;