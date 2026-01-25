/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
*/

"use client";
import React, { useEffect, useState, useSyncExternalStore } from "react";
import "@/styles/glitchEffect.css";

const chars = "-sd_sdf~`gdf!@#dfg$g%gh^&qwe*fdg()+sdf=[]{fg}|sad;:,.<>?";

const emptySubscribe = () => () => {};

interface TextEncryptedProps {
  text: string;
  interval?: number;
}

const TextEncrypted: React.FC<TextEncryptedProps> = ({
  text,
  interval = 30, // Reduced from 50 for faster animation
}) => {
  const [outputText, setOutputText] = useState<string>("");
  const [randomChars, setRandomChars] = useState<string>("");

  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (outputText !== text) {
      timer = setInterval(() => {
        if (outputText.length < text.length) {
          setOutputText((prev) => prev + text[prev.length]);
          // Generate random chars for the remainder on each update
          const remainingLength = text.length - outputText.length - 1;
          if (remainingLength > 0) {
            const newRandomChars = Array.from(
              { length: remainingLength },
              () => chars[Math.floor(Math.random() * chars.length)]
            ).join("");
            setRandomChars(newRandomChars);
          }
        } else {
          setRandomChars("");
          clearInterval(timer);
        }
      }, interval);
    }

    return () => clearInterval(timer);
  }, [text, interval, outputText]);

  if (!isMounted) {
    return <span> </span>;
  }

  return (
    <span className="glitch-effect" data-text={`${outputText}${randomChars}`}>
      {outputText}
      {randomChars}
    </span>
  );
};

interface LoadingScreenProps {
  onComplete: () => void;
  text?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  text = "Loading...",
}) => {
  const [isFading, setIsFading] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        onComplete();
      }, 800); // Reduced from 1100
    }, 1500); // Reduced from 2200
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-black flex flex-col items-center justify-center 
      transition-opacity duration-800 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio content"
    >
      <h1
        className="text-xl mb-8 font-bold drop-shadow-black"
        aria-hidden="true"
      >
        <TextEncrypted text={text} interval={80} />
      </h1>
      <span className="sr-only">Loading portfolio, please wait...</span>
    </div>
  );
};

export default LoadingScreen;
