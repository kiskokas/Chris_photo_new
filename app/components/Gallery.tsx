"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const openLightbox = (category: Category) => {
    setCurrentCategory(category);
    setCurrentIndex(0);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setCurrentCategory(null);
  };

  const nextImage = () => {
    if (currentCategory) {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % currentCategory.images.length
      );
    }
  };

  const prevImage = () => {
    if (currentCategory) {
      setCurrentIndex((prevIndex) => 
        (prevIndex - 1 + currentCategory.images.length) % currentCategory.images.length
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (lightboxRef.current && !lightboxRef.current.contains(event.target as Node)) {
        closeLightbox();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <motion.div 
      className="container mx-auto px-4 pt-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-4xl font-bold text-center my-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Galéria
      </motion.h1>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {categories.map((category) => (
          <motion.div
            key={category.name}
            className="relative cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openLightbox(category)}
          >
            <Image
              src={category.images[0].src}
              alt={category.name}
              width={300}
              height={200}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
              <h2 className="text-white text-2xl font-semibold">{category.name}</h2>
            </div>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-sm">
              {category.images.length} photos
            </div>
          </motion.div>
        ))}
      </motion.div>
      {isOpen && currentCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div ref={lightboxRef} className="bg-gray rounded-lg overflow-hidden max-w-4xl w-full">
            <div className="relative h-[calc(100vh-200px)] overflow-y-auto">
              <button 
                className="absolute top-4 right-4 text-white text-2xl z-10"
                onClick={closeLightbox}
              >
                &times;
              </button>
              <Image
                src={currentCategory.images[currentIndex].src}
                alt={`Image ${currentIndex + 1}`}
                layout="fill"
                objectFit="contain"
              />
              <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl"
                onClick={prevImage}
              >
                &#8249;
              </button>
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl"
                onClick={nextImage}
              >
                &#8250;
              </button>
            </div>
            <div className="bg-gray p-4 flex justify-center">
              {currentCategory.images.map((_, index) => (
                <span
                  key={index}
                  className={`h-3 w-3 rounded-full transition-colors mx-1 ${
                    index === currentIndex ? "bg-gray-500" : "bg-gray-300"
                  }`}
                ></span>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Gallery;
