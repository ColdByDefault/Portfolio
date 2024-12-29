import React from 'react';
import Intro from './components/Intro';



const beRichHome = () => {
 
  return (
      <section className='w-full'>  
        <div className="relative left-0
         w-full">
            <div className="line absolute h-[92vh]"></div>
            <div className="line absolute h-[92vh]"></div>
            <div className="line absolute h-[92vh]"></div>
        </div>
        <Intro />
      </section>
    
  );
}

export default beRichHome;