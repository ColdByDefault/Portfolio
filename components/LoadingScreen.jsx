// Desc: Loading screen component
// On refresh or when the page is loaded, the loading screen will be displayed for 2.2 seconds
import React, { useEffect, useState } from "react";
import "@styles/glitchEffect.css";

const chars = "-sd_sdf~`gdf!@#dfg$g%gh^&qwe*fdg()+sdf=[]{fg}|sad;:,.<>?";

const TextEncrypted = ({ text, interval = 50 }) => {
  const [outputText, setOutputText] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let timer;

    if (outputText !== text) {
      timer = setInterval(() => {
        if (outputText.length < text.length) {
          setOutputText((prev) => prev + text[prev.length]);
        } else {
          clearInterval(timer);
        }
      }, interval);
    }

    return () => clearInterval(timer);
  }, [text, interval, outputText]);

  const remainder =
    outputText.length < text.length
      ? text
          .slice(outputText.length)
          .split("")
          .map(() => chars[Math.floor(Math.random() * chars.length)]).join("")
      : "";

  if (!isMounted) {
    return <span> </span>;
  }

  return (
    <span
      className="glitch-effect"
      data-text={`${outputText}${remainder}`}>
      {outputText}
      {remainder}
    </span>
  );
};

function LoadingScreen({ onComplete, text = "Loading..." }) { // Accept text as a prop
  const [isFading, setIsFading] = useState(false);

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
      }`}>
      <h1 className="text-xl mb-8 font-bold drop-shadow-black">
        <TextEncrypted text={text} interval={120} /> {/* Pass the text prop */}
      </h1>
    </div>
  );
}

export default LoadingScreen;
