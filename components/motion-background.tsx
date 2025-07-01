// SPDX-License-Identifier: LicenseRef-BRH-1.0
"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "next-themes";

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
}

export function Background() {
  const { theme, resolvedTheme } = useTheme();

  const hasMounted = useHasMounted();

  const isDarkTheme =
    hasMounted && (theme === "dark" || resolvedTheme === "dark");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const gridX = useSpring(mouseX, { stiffness: 50, damping: 20, mass: 0.5 });
  const gridY = useSpring(mouseY, { stiffness: 50, damping: 20, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(((e.clientX - centerX) / centerX) * 20);
      mouseY.set(((e.clientY - centerY) / centerY) * 20);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (!hasMounted) {
    return null;
  }
  const gridColor = isDarkTheme
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(0, 0, 0, 0.1)";

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
