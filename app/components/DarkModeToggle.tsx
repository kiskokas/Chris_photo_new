"use client";

import { useTheme } from "@/app/components/ThemeProvider";
import { FaSun, FaMoon } from 'react-icons/fa';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col items-center"> {/* Adjusted positioning and flex container */}
      <button
        onClick={toggleDarkMode}
        className="relative inline-flex items-center h-6 rounded-full transition-colors duration-200 focus:outline-none mb-2" // Added mb-2 for spacing
        style={{ width: '3rem' }}
      >
        <span
          className={`absolute inset-0 rounded-full shadow-inner transition-colors duration-200 ${
            isDarkMode ? 'bg-header-light' : 'bg-header-dark'
          }`}
        />
        <span
          className={`absolute left-1 flex items-center justify-center w-4 h-4 text-header-light dark:text-header-dark rounded-full shadow transition-transform duration-200 ${
            isDarkMode ? 'transform translate-x-full' : ''
          }`}
          style={{transitionProperty: 'transform', transitionDuration: '200ms'}}
        >
          {isDarkMode ? <FaMoon /> : <FaSun />}
        </span>
      </button>
    </div>
  );
};

export default DarkModeToggle;