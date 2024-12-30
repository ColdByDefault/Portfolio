import React from "react";

export function Step({ children }) {
  return <div className="max-w-3xl space-y-8">{children}</div>;
}

export function StepItem({ title, children, number }) {
  return (
    <div className="bg-black
    backdrop-filter backdrop-blur-lg bg-opacity-30
    rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center bg-gradient-to-r from-neutral-950 to-zinc-950 p-4">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-white text-blue-600 rounded-full font-bold text-xl">
          {number}
        </div>
        <h4 className="ml-4 text-xl font-semibold text-white">{title}</h4>
      </div>
      <div className="p-6 text-gray-300">{children}</div>
    </div>
  );
}

