"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";

type ImageData = {
  src: string;
  blurDataURL: string;
};

const Gallery = ({ images }: { images: ImageData[] }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div>
        <h2 className="text-3xl text-center font-bold mt-4">Gallery</h2>
      </div>
      <div id="gallery" className="p-5 bg-white dark:bg-gray-900">
        <div className="columns-3xs lg:columns-4 gap-3">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt={`Photo ${index + 1}`}
              width={500}
              height={500}
              className="w-full mb-4 cursor-pointer hover:scale-90 transition-transform"
              onClick={() => openLightbox(index)}
              placeholder="blur"
              blurDataURL={image.blurDataURL}
            />
          ))}
        </div>
        {isOpen && (
          <Lightbox
            slides={images.map((image) => ({ src: image.src }))}
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
