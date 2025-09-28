/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "next-themes";
import { useIsMobile } from "@/hooks/use-mobile";

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
}

function useIsMediumScreen() {
  const [isMediumScreen, setIsMediumScreen] = useState<boolean>(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: 1024px)`);
    const onChange = () => {
      setIsMediumScreen(window.innerWidth <= 1024);
    };
    mql.addEventListener("change", onChange);
    setIsMediumScreen(window.innerWidth <= 1024);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMediumScreen;
}

export function Background() {
  const { theme, resolvedTheme } = useTheme();

  const hasMounted = useHasMounted();
  const isMobile = useIsMobile();
  const isMediumScreen = useIsMediumScreen();

  const isDarkTheme =
    hasMounted && (theme === "dark" || resolvedTheme === "dark");

  // Only create motion values for desktop
  const shouldUseMotion = hasMounted && !isMobile && !isMediumScreen;
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const gridX = useSpring(mouseX, { stiffness: 50, damping: 20, mass: 0.5 });
  const gridY = useSpring(mouseY, { stiffness: 50, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (!shouldUseMotion) return;

    // Throttle mouse move events for better performance
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          mouseX.set(((e.clientX - centerX) / centerX) * 15); // Reduced movement intensity
          mouseY.set(((e.clientY - centerY) / centerY) * 15);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, shouldUseMotion]);

  if (!hasMounted) {
    return null;
  }
  
  const gridColor = isDarkTheme
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(0, 0, 0, 0.08)";

  // Use static background for mobile/medium screens for better performance
  if (!shouldUseMotion) {
    return (
      <div className="fixed inset-0 -z-5">
        <div
          className={`absolute inset-0 ${
            isDarkTheme ? "bg-black/3" : "bg-white/3"
          }`}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
            backgroundSize: "clamp(25px, 5vw, 35px) clamp(25px, 5vw, 35px)",
          }}
        />
      </div>
    );
  }

  return (
    <motion.div className="fixed inset-0 -z-5">
      <div
        className={`absolute inset-0 ${
          isDarkTheme ? "bg-black/5" : "bg-white/5"
        }`}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: "clamp(20px, 4vw, 40px) clamp(20px, 4vw, 40px)",
          x: gridX,
          y: gridY,
        }}
      />
    </motion.div>
  );
}
