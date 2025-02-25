"use client";

import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsDropdownOpen(false); // Ensure dropdown closes when toggling main menu
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-cyan-300 text-cyan-700 p-5 flex justify-between items-center fixed w-full top-0 z-50">
      <h1 className="text-2xl">Chris Photo</h1>
      <nav className="hidden md:flex space-x-4">
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
            className="hover:underline focus:outline-none"
          >
            Galéria
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-50">
              <div className="py-1" role="menu">
                <Link href="/gallery?category=portrait" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600" onClick={closeMenu}>
                  Portré
                </Link>
                <Link href="/gallery?category=family" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600" onClick={closeMenu}>
                  Családi
                </Link>
                <Link href="/gallery?category=child" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600" onClick={closeMenu}>
                  Gyerek
                </Link>
                <Link href="/gallery?category=nature" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600" onClick={closeMenu}>
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
        <div className="absolute top-16 left-0 right-0 bg-gray-800 text-white flex flex-col items-center md:hidden z-50">
          <Link href="/" className="py-2" onClick={closeMenu}>
            Kezdőoldal
          </Link>
          <a href="#about" className="py-2" onClick={closeMenu}>
            Rólam
          </a>
          <a href="#prices" className="py-2" onClick={closeMenu}>
            Csomagok és árak
          </a>
          <button onClick={toggleDropdown} className="py-2">
            Galéria
          </button>
          {isDropdownOpen && (
            <div className="bg-white dark:bg-gray-700 rounded-md shadow-lg w-full text-center">
              <Link href="/gallery?category=portrait" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600" onClick={closeMenu}>
                Portré
              </Link>
              <Link href="/gallery?category=family" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600" onClick={closeMenu}>
                Családi
              </Link>
              <Link href="/gallery?category=child" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600" onClick={closeMenu}>
                Gyerek
              </Link>
              <Link href="/gallery?category=nature" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600" onClick={closeMenu}>
                Természet
              </Link>
            </div>
          )}
          <a href="#contact" className="py-2" onClick={closeMenu}>
            Kapcsolat
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;