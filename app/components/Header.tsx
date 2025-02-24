"use client";

import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="bg-gray-800 text-white p-5 flex justify-between items-center fixed w-full top-0 z-50">
      <h1 className="text-2xl">My Portfolio</h1>
      <nav className="hidden md:flex space-x-4">
        <a href="/" className="hover:underline" onClick={closeMenu}>Home</a>
        <a href="#about" className="hover:underline" onClick={closeMenu}>About</a>
        <a href="/gallery" className="hover:underline" onClick={closeMenu}>Gallery</a>
        <a href="#contact" className="hover:underline" onClick={closeMenu}>Contact</a>
      </nav>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          <span className="text-2xl">☰</span>
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-gray-800 text-white flex flex-col items-center md:hidden z-50">
          <a href="/" className="hover:underline" onClick={closeMenu}>Home</a>
          <a href="#about" className="hover:underline" onClick={closeMenu}>About</a>
          <a href="/gallery" className="hover:underline" onClick={closeMenu}>Gallery</a>
          <a href="#contact" className="hover:underline" onClick={closeMenu}>Contact</a>
        </div>
      )}
    </header>
  );
};

export default Header;