'use client';
import { useState, useEffect } from 'react';
import { IoIosArrowDropup } from "react-icons/io";
import React from "react";

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = (): void => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = (): void => {
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
          aria-label="Scroll to top"
        >
          <IoIosArrowDropup size={25} />
          <span>Top</span>
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;