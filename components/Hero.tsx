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

import SocialLinks from "@/components/ui/SocialLinks";



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
            Aspiring software developer building modern web apps and exploring cutting-edge technologies. 
            Passionate about Python, Machine Learning, and crafting full-stack applications.<br />Check out my other projects and the source code for this portfolio<br />&#40;built with Next.js&#41; on my
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
              <DrawerTrigger>Collaborate</DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle></DrawerTitle>
                  <DrawerDescription>
                  </DrawerDescription>
                  <div className="flex justify-center gap-8 items-center w-full mt-2">
                    <SocialLinks
                      href="https://github.com/ColdByDefault"
                      iconSrc="/assets/icons/githubContact.png"
                      altText="GitHub Account"
                      label="GitHub"/>
                    <SocialLinks
                      href="mailto:abo.ayash.yazan@gmail.com?subject=Hello&body=Hi there!"
                      iconSrc="/assets/icons/mail.png"
                      altText="Email Contact"
                      label="Email"
                      isMail={true}/>
                    <SocialLinks
                      href='https://www.instagram.com/cold.by.default/'
                      iconSrc="/assets/icons/instagram.png"
                      altText="Email Contact"
                      label="IG"
                      isMail={true}/>
                    <SocialLinks
                      href='https://www.x.com/ccoldbydefault/' 
                      iconSrc="/assets/icons/twitter.png"
                      altText="Email Contact"
                      label="X"
                      isMail={true}/>
                  </div>
                </DrawerHeader>
                <DrawerFooter>
                  <DrawerClose> 
                    <div className='w-full flex justify-center items-center'>
                      <div className='rounded-full text-center p-2 text-white
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



/* <div className="flex flex-col items-center gap-2">
                      <Image src={"/assets/icons/githubContact.png"} alt="GitHub" width={30} height={30} />
                      <Link 
                        href='https://github.com/ColdByDefault' 
                        aria-label="GitHub Account"
                        target='_blank' 
                        rel='noopener noreferrer' 
                        className='font-bold border-b-1 shadow-[0px_5px_5px_rgba(5,5,5,0.5)] border-black px-2 rounded-full'>GitHub
                      </Link>
                    </div>                  
                    <div className="flex flex-col items-center gap-2">
                      <Image src={"/assets/icons/instagram.png"} alt="IG" width={30} height={30} />
                      <Link 
                        href='https://www.instagram.com/cold.by.default/' 
                        aria-label="Instagram Account"
                        target='_blank' 
                        rel='noopener noreferrer' 
                        className='font-bold border-b-2 px-2 rounded-full'>Instagram
                      </Link>
                    </div>                  
                    <div className="flex flex-col items-center gap-2">
                      <Image src={"/assets/icons/twitter.png"} alt="X" width={30} height={30} />
                      <Link 
                        href='https://www.x.com/ccoldbydefault/' 
                        aria-label="X Account"
                        target='_blank' 
                        rel='noopener noreferrer' 
                        className='font-bold border-b-2 px-2 rounded-full'>X
                      </Link>
                    </div>                  
                    <div className="flex flex-col items-center gap-2">
                      <Image src={"/assets/icons/mail.png"} alt="G-Mail" width={30} height={30} />
                      <Link 
                        href='mailto:abo.ayash.yazan@gmail.com?subject=Hello&body=Hi%20there!' 
                        aria-label="email"
                        target='_blank' 
                        rel='noopener noreferrer' 
                        className='font-bold border-b-2 px-2 rounded-full'>Email
                      </Link>
                    </div>                   */