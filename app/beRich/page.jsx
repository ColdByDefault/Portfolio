'use client';
import { useState, useEffect } from "react";
import Intro from './components/Intro';
import LoadingScreen from "@components/LoadingScreen";





const beRichHome = () => {
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2200);
      return () => clearTimeout(timer);
    }, []);
 
  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full z-50 bg-black">
          <LoadingScreen onComplete={() => setIsLoading(false)} 
          text="beRich.Hub"/>
      </div>
      )}
      <section className='w-full'>  
        <div className="relative left-0
         w-full">
            <div className="line absolute h-[92vh]"></div>
            <div className="line absolute h-[92vh]"></div>
            <div className="line absolute h-[92vh]"></div>
        </div>
        <Intro />
      </section>
    </>
    
  );
}

export default beRichHome;