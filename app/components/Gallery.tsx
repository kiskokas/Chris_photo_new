"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";

type ImageData = {
  src: string;
  blurDataURL: string;
};

type Category = {
  name: string;
  images: ImageData[];
};

const Gallery = ({ categories }: { categories: Category[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  const openLightbox = (category: Category) => {
    setCurrentCategory(category);
    setIsOpen(true);
  };

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="pt-20"
    >
      <div className="p-5 bg-gray-50 dark:bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-700 text-center mb-8">Galéria</h2>
        <div id="gallery" className="flex flex-col md:flex-row items-center justify-around p-5 gap-4">
          {categories.map((category) => (
            <div
              id={category.name.toLowerCase()} // Ensure IDs are unique and lowercase
              key={category.name}
              className="relative w-[300px] h-[400px] overflow-hidden flex justify-center items-center cursor-pointer hover:scale-105 hover:shadow-lg"
              onClick={() => openLightbox(category)}
            >
              <Image
                src={category.images[0].src}
                alt={`${category.name} Image`}
                width={300}
                height={400}
                className="object-cover w-full h-full rounded-lg shadow-lg transition-transform"
                placeholder="blur"
                blurDataURL={category.images[0].blurDataURL}
              />
              <div className="absolute bottom-0 left-0 w-full bg-gray-300 text-center py-2 rounded-b-lg text-gray-700 font-medium  hover:bg-gray-700 hover:shadow-lg hover:text-gray-50">
                {category.name}
              </div>
            </div>
          ))}
          {isOpen && currentCategory && (
            <Lightbox
              slides={currentCategory.images.map((image) => ({ src: image.src }))}
              open={isOpen}
              close={() => setIsOpen(false)}
              controller={{ closeOnBackdropClick: true }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Gallery;