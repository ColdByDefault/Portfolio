'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import React from "react";


interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with React, Node.js, and PostgreSQL",
    image: "/assets/logo44.png",
    tags: ["React", "Node.js", "PostgreSQL", "TailwindCSS"],
    link: "#",
    github: "#"
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "A modern portfolio built with Next.js and Framer Motion",
    image: "/assets/logo44.png",
    tags: ["Next.js", "Framer Motion", "TailwindCSS"],
    link: "#",
    github: "#"
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A productivity app with drag-and-drop functionality",
    image: "/assets/logo44.png",
    tags: ["React", "Firebase", "Dnd Kit"],
    link: "#",
    github: "#"
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "Real-time weather data visualization",
    image: "/assets/logo44.png",
    tags: ["JavaScript", "API Integration", "Chart.js"],
    link: "#",
    github: "#"
  },
  {
    id: 5,
    title: "Social Media Analytics",
    description: "Dashboard for tracking social media metrics",
    image: "/assets/logo44.png",
    tags: ["Python", "Flask", "D3.js"],
    link: "#",
    github: "#"
  },
  {
    id: 6,
    title: "AI Image Generator",
    description: "Web interface for Stable Diffusion models",
    image: "/assets/logo44.png",
    tags: ["Python", "FastAPI", "React"],
    link: "#",
    github: "#"
  }
];

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-light text-gray-200 mb-12 text-center"
      >
        My Projects
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-zinc-900/30 backdrop-blur-sm rounded-xl border border-zinc-800 overflow-hidden"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300"
                style={{
                  transform: hoveredProject === project.id ? "scale(1.05)" : "scale(1)"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
            </div>

            <div className="p-6">
              <motion.h3
                className="text-xl font-semibold text-amber-100 mb-2"
                whileHover={{ color: "#f59e0b" }}
              >
                {project.title}
              </motion.h3>

              <p className="text-zinc-300 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <motion.a
                  href={project.link}
                  className="text-sm text-amber-100 hover:text-amber-200 border-b border-amber-100/0 hover:border-amber-100 transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  Live Demo
                </motion.a>
                <motion.a
                  href={project.github}
                  className="text-sm text-zinc-400 hover:text-zinc-200 border-b border-zinc-400/0 hover:border-zinc-400 transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  View Code
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mt-8 text-zinc-400"
      >
        <p>...and many more projects in development</p>
      </motion.div>
    </section>
  );
}
