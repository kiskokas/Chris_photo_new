"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div id="about" className="flex flex-col md:flex-row items-center justify-around p-10 bg-gray-100">
        <img src="/images/about-photo.jpg" alt="Your Name" className="w-1/3 rounded-full" />
        <div className="md:w-1/2 mt-5 md:mt-0 text-center md:text-left text-black">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p>Hello! I'm Christian, a passionate photographer based in Szombathely. I love capturing the beauty of the world through my lens. My journey into photography started [Your Story]...</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutSection;