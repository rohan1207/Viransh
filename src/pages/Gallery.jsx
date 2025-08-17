import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const allImages = [
  { id: 1, src: "/Paneer_Tikka.jpg", category: "Food" },
  { id: 2, src: "/Veg_Biryani.jpg", category: "Food" },
  { id: 3, src: "/food1.jpeg", category: "Food" },
  { id: 4, src: "/food2.jpeg", category: "Food" },
  { id: 5, src: "/food3.jpeg", category: "Food" },
  { id: 6, src: "/Dal_Tadka.webp", category: "Food" },
  
  { id: 10, src: "/Gulab_Jamun.jpg", category: "Dessert" },
  { id: 11, src: "/desert1.jpeg", category: "Dessert" },
  { id: 12, src: "/desert2.jpeg", category: "Dessert" },
  { id: 13, src: "/desert3.jpeg", category: "Dessert" },
  { id: 14, src: "/desert4.jpeg", category: "Dessert" },
  { id: 15, src: "/desert5.jpeg", category: "Dessert" },

  { id: 20, src: "/parking_space.webp", category: "Ambience" },
  { id: 21, src: "/dining_space.png", category: "Ambience" },
  { id: 22, src: "/ambience1.jpeg", category: "Ambience" },
  { id: 23, src: "/ambience2.jpeg", category: "Ambience" },
  { id: 24, src: "/ambience3.jpeg", category: "Ambience" },
  { id: 25, src: "/ambience4.jpeg", category: "Ambience" },
  
  { id: 30, src: "/drink1.jpeg", category: "Drinks" },
  { id: 31, src: "/drink2.jpeg", category: "Drinks" },
  { id: 32, src: "/drink3.jpeg", category: "Drinks" },
  { id: 33, src: "/drink4.jpeg", category: "Drinks" },
  { id: 34, src: "/drink5.jpeg", category: "Drinks" },
];

const Gallery = () => {
  const [filteredImages, setFilteredImages] = useState(allImages);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredImages(allImages);
    } else {
      setFilteredImages(
        allImages.filter((image) => image.category === activeFilter)
      );
    }
  }, [activeFilter]);

  const filters = ["All", "Food", "Drinks", "Dessert", "Ambience"];

  return (
    <div className="relative min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Elements - Hidden on mobile for better performance */}
      <motion.img
        src="/corindor.png"
        alt="decorative sketch"
        className="absolute top-20 sm:left-72 right-0 w-12 h-12 sm:w-48 sm:h-48 opacity-100  md:block"
        animate={{ y: [-10, 10], rotate: [-5, 5] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto z-10 relative sm:mt-0 mt-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-800 tracking-tight">
            PHOTO GALLERY
          </h1>
          <p className="text-orange-400 font-semibold text-xs sm:text-sm tracking-widest mt-2">
            - LUXURY RESTAURANT -
          </p>
        </motion.div>

        {/* Filter Buttons - Mobile Optimized */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-8 mb-8 sm:mb-12 px-2">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileTap={{ scale: 0.95 }}
              className={`capitalize text-sm sm:text-lg font-medium transition-all duration-300 px-3 py-2 sm:px-4 sm:py-2 rounded-full sm:rounded-none ${
                activeFilter === filter
                  ? "text-white bg-orange-400 sm:text-gray-900 sm:bg-transparent sm:border-b-2 sm:border-orange-400"
                  : "text-gray-500 bg-gray-100 sm:bg-transparent hover:text-gray-900 hover:bg-gray-200 sm:hover:bg-transparent"
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </div>

        {/* Image Grid - Responsive */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={`${image.category}-${image.id}`}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  transition: { 
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: "easeOut"
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.8, 
                  y: -20,
                  transition: { duration: 0.3 }
                }}
                whileHover={{ 
                  scale: 1.05, 
                  transition: { duration: 0.2 }
                }}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer aspect-square"
              >
                <img
                  src={image.src}
                  alt={`${image.category} gallery image`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Loading State */}
        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No images found in this category.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Gallery;