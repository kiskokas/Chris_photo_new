"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from 'next/image';

const AboutSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div id="about" className="flex flex-col md:flex-row items-center justify-around p-10 bg-header-light dark:bg-header-dark">
        <Image 
          src="/images/cover_photo.png" 
          alt="Nagy Krisztian" 
          width={500}
          height={500}
          className="w-1/3 rounded-full" />
        <div className="md:w-1/2 mt-5 md:mt-0 text-center md:text-left text-black">
          <h2 className="text-3xl font-bold mb-4">Rólam</h2>
          <p>Helló! Krisztián vagyok, szenvedélyes fotós Szombathelyen. Szeretem lencsevégre kapni a világ szépségét. Elindult az utam a fotózás felé...</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutSection;