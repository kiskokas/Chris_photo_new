"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from 'next/image';
import { useEffect } from "react";

const Gallery = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const images = [
    "/images/photo1.jpg",
    "/images/photo2.jpg",
    "/images/photo3.jpg",
    "/images/photo4.jpg",
    "/images/photo5.jpg",
    "/images/photo6.jpg",
    "/images/photo7.jpg",
    "/images/photo8.jpg",
    "/images/photo9.jpg",
    "/images/photo10.jpg",
    // Add more images as needed
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  useEffect(() => {
    console.log("Gallery component mounted");
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div>
        <h2 className="text-3xl text-center font-bold mt-4">Gallery</h2>
      </div>
      <div id="gallery" className="p-5">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {images.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Photo ${index + 1}`}
              width={300}
              height={300}
              className="w-full mb-4 cursor-pointer hover:scale-90 transition-transform"
              onClick={() => openLightbox(index)}
              priority={index < 4}
            />
          ))}
        </div>
        {isOpen && (
          <Lightbox
            slides={images.map((src) => ({ src }))}
            open={isOpen}
            index={currentIndex}
            close={() => setIsOpen(false)}
            controller={{ closeOnBackdropClick: true }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default Gallery;