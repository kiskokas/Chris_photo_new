"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { useEffect, useRef } from "react"; // Import useRef and useEffect

const HomeSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.pageYOffset;
        heroRef.current.style.backgroundPositionY = `${scrollPosition * 0.4}px`; // Adjust the parallax speed
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div
        id="home"
        className="hero h-screen bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        ref={heroRef} // Add the ref
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-4 text-header-light drop-shadow-lg">
            Lehetek a fotósod?
          </h1>
          <p className="text-2xl font-bold mb-8 text-header-light drop-shadow-lg">
            Pillanatok megörökítése, emlékek teremtése
          </p>
          <Link
            href="#prices"
            className="bg-header-dark text-header-light font-bold py-3 px-6 rounded-lg transition-all hover:bg-slate-700 hover:shadow-lg inline-block"
          >
            Csomagok megtekintése
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeSection;