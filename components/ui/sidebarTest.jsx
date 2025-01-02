import React, { useState } from "react";
import navItems from "@data/SidebarNav";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const SidebarNav = () => {
  const [isOpen, setIsOpen] = useState(false); // Burger menu toggle
  const [expandedSections, setExpandedSections] = useState({}); // Track expanded lists

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderNestedItems = (items, depth = 0) => {
    return (
      <ul className={`mt-2 ml-${depth * 4} space-y-2 border-l border-gray-700 pl-4 text-sm `}>
        {items.map((item, index) => (
          <li key={index} className="cursor-pointer ">
            {item.items ? (
              <>
                <div
                  onClick={() => toggleSection(item.title)}
                  className="flex items-center text-sm hover:text-gray-500 pb-1">
                  {expandedSections[item.title] ? (
                    <FaChevronDown className="mr-2" />
                  ) : (
                    <FaChevronRight className="mr-2" />
                  )}
                  {item.title}
                </div>
                {expandedSections[item.title] && renderNestedItems(item.items, depth + 1)}
              </>
            ) : (
              <a href={item.href} className="hover:text-gray-600">
                {item.title}
              </a>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      {/* Burger Menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-2 left-4 z-50 border-b text-white p-1 rounded lg:hidden ">
        {isOpen ? "Close" : "Docs"}
      </button>
      {/* Sidebar */}
      <div className="flex flex-col justify-center items-center">
        <div className="hidden lg:block pt-4">Hello</div>
        <div className={`fixed lg:relative top-0 left-0 h-full w-64 bg-black
            lg:bg-transparent text-white p-6 shadow-lg transform pt-20 lg:pt-4 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300 z-40 overflow-y-auto`}>
          <ul className="space-y-6">
            {navItems.map((section, index) => (
              <li key={index}>
                <div
                  onClick={() => toggleSection(section.section)}
                  className="flex items-center cursor-pointer hover:text-gray-300 border-b pb-1 border-gray-700">
                  {expandedSections[section.section] ? (
                    <FaChevronDown className="mr-2" />
                  ) : (
                    <FaChevronRight className="mr-2" />
                  )}
                  {section.section}
                </div>
                {expandedSections[section.section] &&
                  renderNestedItems(section.items)}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
    </>
  );
};

export default SidebarNav;
