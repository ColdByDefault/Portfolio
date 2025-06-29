"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";

import { techGroups } from "@/data/tech";



export default function Technologies() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any


  return (
    <section className="px-4 max-w-full mx-auto flex flex-col">
      <div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-light text-gray-200 m-12 text-center"
        >
          Technologies I Use
        </motion.h2>
      </div>

      {/* Horizontal Layout */}
      <div className="flex flex-wrap gap-8 justify-center">
        {techGroups.map((group, index) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-zinc-900/30 backdrop-blur-sm rounded-xl p-6 border border-zinc-800 min-w-[280px] flex-1 max-w-[600px]"
          >
            <h3 className="text-xl font-semibold text-amber-100 mb-4 text-center">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {group.items.map((tech) => (
                <motion.div
                  key={tech.name}
                  className="flex items-center gap-2 p-2 rounded-lg"
                >
                  <div className="w-6 h-6">
                    <Image
                      src={tech.iconSrc}
                      alt={`${tech.name} Icon`}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm text-zinc-300 font-medium">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8 text-zinc-400"
        >
          <p>...and many more technologies in my toolkit</p>
        </motion.div>
      </div>
    </section>
  );
}
