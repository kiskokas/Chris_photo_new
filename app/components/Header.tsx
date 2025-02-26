"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsDropdownOpen(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
        setIsDropdownOpen(false);
      } else {
        setIsDropdownOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-cyan-300 text-cyan-700 p-5 flex justify-between items-center fixed w-full top-0 z-50">
      <h1 className="text-2xl">Chris Photo</h1>
      <nav className="hidden md:flex space-x-4">
        <Link href="/" className="hover:underline">Kezdőoldal</Link>
        <a href="#about" className="hover:underline">Rólam</a>
        <a href="#prices" className="hover:underline">Csomagok és árak</a>
        <div className="relative inline-block text-left">
          <button 
            onClick={toggleDropdown}
            className="hover:underline focus:outline-none flex items-center">
            Galéria <span className="ml-1">▼</span>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-cyan-300 rounded-md shadow-lg z-50">
              <div className="py-1" role="menu">
                <Link href="/gallery#portrait" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                  Portré
                </Link>
                <Link href="/gallery#family" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                  Családi
                </Link>
                <Link href="/gallery#child" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                  Gyerek
                </Link>
                <Link href="/gallery#nature" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                  Természet
                </Link>
              </div>
            </div>
          )}
        </div>
        <a href="#contact" className="hover:underline">Kapcsolat</a>
      </nav>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="text-2xl">
            {isOpen ? "✖" : "☰"}
          </motion.div>
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 right-0 bg-cyan-300 text-cyan-700 flex flex-col py-1 z-50 shadow-lg"
          >
            <Link href="/" className="py-1 text-center" onClick={toggleMenu}>Kezdőoldal</Link>
            <a href="#about" className="py-1 text-center" onClick={toggleMenu}>Rólam</a>
            <a href="#prices" className="py-1 text-center" onClick={toggleMenu}>Csomagok és árak</a>
            <div className="py-2 text-center">
              <span className="font-bold">Galéria</span>
              <div className="bg-cyan-50 text-cyan-700 rounded-md shadow-lg w-full">
                <Link href="/gallery#portrait" className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600" onClick={toggleMenu}>
                  Portré
                </Link>
                <Link href="/gallery#family" className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600" onClick={toggleMenu}>
                  Családi
                </Link>
                <Link href="/gallery#child" className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600" onClick={toggleMenu}>
                  Gyerek
                </Link>
                <Link href="/gallery#nature" className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600" onClick={toggleMenu}>
                  Természet
                </Link>
              </div>
            </div>
            <a href="#contact" className="py-1 text-center" onClick={toggleMenu}>Kapcsolat</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
