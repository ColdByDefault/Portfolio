"use client"

import { useEffect, useRef, useState } from "react"

export default function Timeline() {
  const timelineRef = useRef(null)
  const lineRef = useRef(null)
  const [lineHeight, setLineHeight] = useState(0)

  const timelineItems = [
    { id: "1", title: "Project Inception", date: "January 2023", content: "" },
    { id: "2", title: "Design Phase", date: "March 2023", content: "" },
    { id: "3", title: "Development Kickoff", date: "May 2023", content: "" },
    { id: "4", title: "Beta Release", date: "August 2023", content: "" },
    { id: "5", title: "Public Launch", date: "October 2023", content: "" },
  ]

  useEffect(() => {
    if (!timelineRef.current || !lineRef.current) return;
  
    const timeline = timelineRef.current;
    const line = lineRef.current;
  
    const handleScroll = () => {
      const timelineRect = timeline.getBoundingClientRect();
      const totalHeight = timelineRect.height;
      const viewportHeight = window.innerHeight;
      const scrollPos = Math.max(0, viewportHeight - timelineRect.top);
  
      const progress = Math.min(scrollPos / totalHeight, 1);
      setLineHeight(progress * 100);
    };
  
    window.addEventListener("scroll", handleScroll);
    handleScroll();
  
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative max-w-3xl mx-auto px-4 py-16">
      <div ref={timelineRef} className="relative ml-9">
        {/* Timeline line container */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300 -ml-9">
          {/* Dynamic growing line */}
          <div
            ref={lineRef}
            className="absolute left-0 top-0 w-full bg-blue-500 transition-all duration-500 ease-out"
            style={{ height: `${lineHeight}%` }}
          />
        </div>

        {/* Timeline items */}
        {timelineItems.map((item) => (
          <div key={item.id} className="relative mb-16 last:mb-0">
            {/* Timeline dot */}
            <div className="absolute w-5 h-5 rounded-full -ml-[42px] mt-1.5 border-4 border-white bg-gray-300" />

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <span className="text-sm text-gray-500">{item.date}</span>
              </div>
              <p className="text-gray-700">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
