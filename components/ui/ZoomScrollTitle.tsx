"use client";

import { useEffect, useState, useRef } from "react";
import "@/styles/ParallaxComponent.css"

export default function ZoomScrollTitle() {
  const [scale, setScale] = useState(1);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollDirection = scrollY > lastScrollY.current ? 'down' : 'up';
      lastScrollY.current = scrollY;
      
      // Adjust these values to control zoom sensitivity:
      const minScale = 0.5;     // Minimum size
      const maxScale = 3;       // Maximum zoom level
      const scrollRange = 300;  // How many pixels to reach max/min scale

      let newScale;
      if (scrollDirection === 'down') {
        // Scrolling down - zoom in
        newScale = Math.min(
          minScale + (scrollY / scrollRange) * (maxScale - minScale),
          maxScale
        );
      } else {
        // Scrolling up - zoom out
        newScale = Math.max(
          maxScale - (scrollY / scrollRange) * (maxScale - minScale),
          minScale
        );
      }
      
      setScale(newScale);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="zoom-container">
      <h1 
        className="zoom-title"
        style={{
          transform: `scale(${scale})`,
          fontSize: "5rem" // Initial huge size
        }}>
        Projects
      </h1>
    </div>
  );
}