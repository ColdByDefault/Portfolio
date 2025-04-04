import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '@/styles/globals.css';


import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"


import SocialLinks from "@/components/ui/SocialLinks";
import { faGithub, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'; 
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


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
          sizes="100vw"/>
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
            I'm a full-stack junior developer and entrepreneur, building web apps, and digital solutions. Check out my other projects and the source code for this portfolio<br />&#40;built with 
            <span className='text-blue-400 cursor-pointer font-semibold'>
              <HoverCard>
                <HoverCardTrigger>{' '}Next.Js</HoverCardTrigger>
                <HoverCardContent>
                  React Framework.<br />
                  Deployment on @vercel.
                </HoverCardContent>
              </HoverCard>
            </span>
            &#41; on my
            {' '}
            <Link 
              href='https://github.com/ColdByDefault/Almighty' 
              aria-label="GitHub Repository"
              target='_blank' 
              rel='noopener noreferrer' 
              className='text-white underline decoration-blue-400 underline-offset-2 
              transition-colors hover:text-gray-600'>
              GitHub
            </Link>.
          </p>
          <div className="rounded-full text-center p-2 text-white
          bg-zinc-900/30 backdrop-blur-sm border border-zinc-400
            w-28 text-md
            lg:w-32 lg:text-lg
            md:w-28 md:text-sm
            sm:w-24 sm:pr-2">
            <Drawer>
              <DrawerTrigger>Get in Touch</DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle></DrawerTitle>
                  <DrawerDescription>
                  </DrawerDescription>
                  <div className="flex justify-center gap-8 items-center w-full mt-2">
                  <SocialLinks
                      href="https://github.com/coldbydefault"
                      altText="GitHub Profile"
                      label=""
                      icon={faGithub}/>
                  <SocialLinks
                      href="mailto:abo.ayash.yazan@gmail.com?subject=Hello&body=Hi there!"
                      altText="GMAIL"
                      label=""
                      icon={faPaperPlane}/>
                  <SocialLinks
                      href="https://instagram.com/cold.by.default"
                      altText="IG"
                      label=""
                      icon={faInstagram}/>
                  <SocialLinks
                      href="https://x.com/ccoldbydefault"
                      altText="X"
                      label=""
                      icon={faXTwitter}/>
                  </div>
                </DrawerHeader>
                <DrawerFooter>
                  <DrawerClose> 
                    <div className='w-full flex justify-center items-center'>
                      <div className='rounded-full text-center p-2 text-white cursor-pointer
                    bg-zinc-900 backdrop-blur-sm border border-zinc-400'>Close</div> 
                    </div>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
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
