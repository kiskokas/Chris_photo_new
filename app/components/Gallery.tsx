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
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">Galéria</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>
      {isOpen && currentCategory && (
          <Lightbox
            slides={currentCategory.images.map((image) => ({ src: image.src }))}
            open={isOpen}
            close={() => setIsOpen(false)}
            controller={{ closeOnBackdropClick: true }}
            />
      )}
    </div>
  );
};

export default Gallery;
