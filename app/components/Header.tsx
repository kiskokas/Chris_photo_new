// components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import { FaSortDown } from "react-icons/fa";

const MotionLink = motion(Link);

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
  };

  return (
    <header className={`bg-header-light dark:bg-header-dark text-gray-700 p-5 flex justify-between items-center fixed w-full top-0 z-50`}>
      <Link href="/" className="hover:shadow-lg">
        <Image
          src="/images/logo.png"
          alt="Krisztian PhotoArt Logo"
          width={150}
          height={300}
          className="logo"
        />
      </Link>
      <nav className="hidden md:flex space-x-4">
        <MotionLink
          href="/"
          className="hover:shadow-lg"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          Kezdőoldal
        </MotionLink>
        <MotionLink
          href="/#about"
          className="hover:shadow-lg"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          Rólam
        </MotionLink>
        <MotionLink
          href="/#prices"
          className="hover:shadow-lg"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          Csomagok és Árak
        </MotionLink>
        <div
          className="relative inline-block text-left"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button className="hover:shadow-lg focus:outline-none flex items-center">
            Galéria <FaSortDown />
          </button>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="absolute right-0 mt-2 w-48 bg-header-light dark:bg-header-dark rounded-md shadow-lg z-50"
              >
                <div className="py-1" role="menu">
                  <Link
                    href="/gallery#portré"
                    className="block px-4 py-2 text-sm text-gray-700 rounded-md dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-gray-50"
                  >
                    Portré
                  </Link>
                  <Link
                    href="/gallery#családi"
                    className="block px-4 py-2 text-sm text-gray-700 rounded-md dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-gray-50"
                  >
                    Családi
                  </Link>
                  <Link
                    href="/gallery#szezonális"
                    className="block px-4 py-2 text-sm text-gray-700 rounded-md dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-gray-50"
                  >
                    Szezonális
                  </Link>
                  <Link
                    href="/gallery#természet"
                    className="block px-4 py-2 text-sm text-gray-700 rounded-md dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-gray-50"
                  >
                    Természet
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <MotionLink
          href="/#contact"
          className="hover:shadow-lg"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          Kapcsolat
        </MotionLink>
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
            className="absolute top-16 left-2rem right-0 bg-header-light dark:bg-header-dark text-gray-700 flex flex-col py-1 z-50 rounded-2xl shadow-lg"
          >
            <Link href="/" className="py-1 text-center hover:shadow-lg" onClick={toggleMenu}>
              Kezdőoldal
            </Link>
            <Link href="/#about" className="py-1 text-center hover:shadow-lg" onClick={toggleMenu}>
              Rólam
            </Link>
            <Link href="/#prices" className="py-1 text-center hover:shadow-lg" onClick={toggleMenu}>
              Csomagok és árak
            </Link>
            <div className="py-2 text-center">
              <span className="font-bold">Galéria</span>
              <div className="bg-header-light_dark dark:bg-header-dark text-gray-700 rounded-md shadow-lg w-full">
                <Link
                  href="/gallery#portré"
                  className="block px-4 py-1 text-sm text-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-gray-50"
                  onClick={toggleMenu}
                >
                  Portré
                </Link>
                <Link
                  href="/gallery#családi"
                  className="block px-4 py-1 text-sm text-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-gray-50"
                  onClick={toggleMenu}
                >
                  Családi
                </Link>
                <Link
                  href="/gallery#szezonális"
                  className="block px-4 py-1 text-sm text-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-gray-50"
                  onClick={toggleMenu}
                >
                  Szezonális
                </Link>
                <Link
                  href="/gallery#természet"
                  className="block px-4 py-1 text-sm text-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-gray-50"
                  onClick={toggleMenu}
                >
                  Természet
                </Link>
              </div>
            </div>
            <Link href="/#contact" className="py-1 text-center hover:shadow-lg" onClick={toggleMenu}>
              Kapcsolat
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;