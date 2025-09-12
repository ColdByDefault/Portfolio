/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";
import React, { useEffect, useState } from "react";
import "@/styles/glitchEffect.css";

const chars = "-sd_sdf~`gdf!@#dfg$g%gh^&qwe*fdg()+sdf=[]{fg}|sad;:,.<>?";

interface TextEncryptedProps {
  text: string;
  interval?: number;
}

const TextEncrypted: React.FC<TextEncryptedProps> = ({
  text,
  interval = 50,
}) => {
  const [outputText, setOutputText] = useState<string>("");
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [randomChars, setRandomChars] = useState<string>("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      }, 1100);
    }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-black flex flex-col items-center justify-center 
      transition-opacity duration-1000 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <h1 className="text-xl mb-8 font-bold drop-shadow-black">
        <TextEncrypted text={text} interval={120} />
      </h1>
    </div>
  );
};

export default LoadingScreen;
