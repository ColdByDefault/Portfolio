"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const techGroups = [
  {
    category: "Frontend",
    items: [
      { name: "React", iconSrc: "/assets/icons/react.png" },
      { name: "Next.js", iconSrc: "/assets/icons/next.png" },
      { name: "TailwindCSS", iconSrc: "/assets/icons/tailwind.png" },
      { name: "JavaScript", iconSrc: "/assets/icons/js.png" },
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", iconSrc: "/assets/icons/node.png" },
      { name: "PostgreSQL", iconSrc: "/assets/icons/postgre2.png" },
      { name: "MySQL", iconSrc: "/assets/icons/mysql.png" },
      { name: "Docker", iconSrc: "/assets/icons/docker1.png" },
      { name: "Python", iconSrc: "/assets/icons/python.png" },
      { name: "Flask (Python)", iconSrc: "/assets/icons/flask.png" },
    ]
  },
  {
    category: "Tools",
    items: [
      { name: "Git", iconSrc: "/assets/icons/git.png" },
      { name: "GitHub", iconSrc: "/assets/icons/github.png" },
      { name: "Figma", iconSrc: "/assets/icons/figma1.png" },
      { name: "ChatGPT", iconSrc: "/assets/icons/chatgpt.png" },
      { name: "Jira", iconSrc: "/assets/icons/jira.png" },
      { name: "Notion", iconSrc: "/assets/icons/notion.png" },
      { name: "Miro", iconSrc: "/assets/icons/miro.svg" },
      { name: "VSCode", iconSrc: "/assets/icons/vsc.png" },
      { name: "SCRUM", iconSrc: "/assets/icons/scrum.png" },
    ]
  }
];

export default function Technologies() {
  const [hoveredTech, setHoveredTech] = useState(null);

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-light text-gray-200 mb-12 text-center"
      >
        Technologies I Use
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {techGroups.map((group, index) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800"
          >
            <h3 className="text-xl font-semibold text-amber-100 mb-4">
              {group.category}
            </h3>
            
            <div className="grid grid-cols-3 gap-4">
              {group.items.map((tech) => (
                <motion.div
                  key={tech.name}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                  className="flex flex-col items-center p-3 rounded-lg relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 mb-2 relative">
                    <img
                      src={tech.iconSrc}
                      alt=""
                      className="w-full h-full object-contain"
                      aria-hidden="true"
                    />
                    
                    {hoveredTech === tech.name && (
                      <motion.div
                        className="absolute inset-0 bg-amber-400/10 rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                  </div>

                  <span className="text-center text-sm text-zinc-300 font-medium">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mt-8 text-zinc-400"
      >
        ...and many more technologies in my toolkit
      </motion.div>
    </section>
  );
}