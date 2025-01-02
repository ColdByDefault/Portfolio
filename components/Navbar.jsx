'use client';

import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { FaLaptopCode } from "react-icons/fa6";
import { FiMenu, FiX } from "react-icons/fi";

const NavLink = ({ href, children, onClick, className = "" }) => (
  <Link
    href={href}
    className={`block px-4 py-2 text-gray-300 hover:text-white transition-all ${className}`}
    onClick={onClick}>
    {children}
  </Link>
);

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: <AiOutlineHome /> },
    { href: "/beRich", label: "beRich.Hub", icon: <FaLaptopCode /> },
  ];

  return (
    <nav className="fixed z-50 w-full lg:w-1/2 mx-auto right-0 left-0
    lg:mt-2 lg:rounded-full
    bg-black/20 backdrop-blur-md text-white border-b border-black/20">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-2">
      <Link
      href="/"
      className="flex items-center font-bold text-center w-full justify-center sm:justify-start sm:w-auto">
        <div className="text-white block sm:hidden">
          <span className="text-white">Cold</span>
          <span className="text-blue-500">ByDefault</span>
        </div>
        <div className="hidden sm:block">
          <span className="text-white">Cold</span>
          <span className="text-blue-500">ByDefault</span>
        </div>
      </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} className="flex items-center space-x-2">
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>
        {/* Burger Menu Button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full 
          text-white focus:outline-none focus:ring-2 
          focus:ring-blue-500"
          onClick={() => setShowMobileMenu((prev) => !prev)}
          aria-label="Toggle menu">
          {showMobileMenu ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {showMobileMenu && (
        <div className="realtive w-full text-white z-40">
          <div className="flex flex-col items-start p-4 space-y-4 ">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                onClick={() => setShowMobileMenu(false)}
                className="text-lg w-full">
                <div className="flex items-center space-x-3">
                  {link.icon}
                  <span>{link.label}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
