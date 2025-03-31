'use client';
import { useState, useEffect } from 'react';
import { IoIosArrowDropup } from "react-icons/io";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="hidden lg:flex fixed bottom-24 right-10 z-10 text-white rounded-full w-15
          bg-zinc-900/30 backdrop-blur-sm border border-zinc-800
          p-2 h-15 items-center justify-center"
          aria-label="Scroll to top">
          <IoIosArrowDropup  size={25} />Top
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;

