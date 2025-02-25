"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
    setIsDropdownOpen(false); // Ensure dropdown closes when toggling main menu
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="bg-cyan-300 text-cyan-700 p-5 flex justify-between items-center fixed w-full top-0 z-50">
      <h1 className="text-2xl">Chris Photo</h1>
      <nav className={`hidden md:flex space-x-4 ${isOpen ? "hidden" : "flex"}`}>
        <Link href="/" className="hover:underline" onClick={closeMenu}>
          Kezdőoldal
        </Link>
        <a href="#about" className="hover:underline" onClick={closeMenu}>
          Rólam
        </a>
        <a href="#prices" className="hover:underline" onClick={closeMenu}>
          Csomagok és árak
        </a>
        <div className="relative inline-block text-left">
          <button 
            onClick={toggleDropdown}
            className="hover:underline focus:outline-none flex items-center">
            Galéria <span className="ml-1">▼</span>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-cyan-300 rounded-md shadow-lg z-50">
              <div className="py-1" role="menu">
                <Link href="/gallery#portrait" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600" onClick={closeMenu}>
                  Portré
                </Link>
                <Link href="/gallery#family" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600" onClick={closeMenu}>
                  Családi
                </Link>
                <Link href="/gallery#child" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600" onClick={closeMenu}>
                  Gyerek
                </Link>
                <Link href="/gallery#nature" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600" onClick={closeMenu}>
                  Természet
                </Link>
              </div>
            </div>
          )}
        </div>
        <a href="#contact" className="hover:underline" onClick={closeMenu}>
          Kapcsolat
        </a>
      </nav>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          <span className="text-2xl">☰</span>
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-cyan-300 text-cyan-700 flex flex-col items-center z-50">
          <Link href="/" className="py-2" onClick={closeMenu}>
            Kezdőoldal
          </Link>
          <a href="#about" className="py-2" onClick={closeMenu}>
            Rólam
          </a>
          <a href="#prices" className="py-2" onClick={closeMenu}>
            Csomagok és árak
          </a>
          <div className="py-2">
            <span className="font-bold">Galéria</span>
            <div className="bg-white dark:bg-cyan-50 text-cyan-700 rounded-md shadow-lg w-full text-center">
              <Link href="/gallery#portrait" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600" onClick={closeMenu}>
                Portré
              </Link>
              <Link href="/gallery#family" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600" onClick={closeMenu}>
                Családi
              </Link>
              <Link href="/gallery#child" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600" onClick={closeMenu}>
                Gyerek
              </Link>
              <Link href="/gallery#nature" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600" onClick={closeMenu}>
                Természet
              </Link>
            </div>
          </div>
          <a href="#contact" className="py-2" onClick={closeMenu}>
            Kapcsolat
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
