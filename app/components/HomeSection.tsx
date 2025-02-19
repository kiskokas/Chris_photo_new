"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const HomeSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div
        id="home"
        className="hero h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      >
        <div>
          <h1 className="text-5xl font-bold mb-4 text-white">I am your Photographer</h1>
          <p className="text-2xl text-center font-bold mb-4 text-white">Capturing Moments, Creating Memories</p>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeSection;