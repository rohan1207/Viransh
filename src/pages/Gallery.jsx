import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';







const allImages = [
  { id: 1, src: "/Paneer_Tikka.jpg", category: 'vegetarian' },
  { id: 2, src: "/Veg_Biryani.jpg", category: 'dessert' },
  { id: 3, src: "/Veg_Pulao.webp", category: 'drinks' },
  { id: 4, src: "/Veg_Spring_Rolls.jpeg", category: 'vegetarian' },
  { id: 5, src: "/Paneer_Butter_Masala.jpeg", category: 'dessert' },
  { id: 6, src: "/Dal_Tadka.webp", category: 'drinks' },
  { id: 7, src: "/Paneer_Butter_Masala.jpeg", category: 'vegetarian' },
  { id: 8, src: "/footer.jpg", category: 'dessert' },
  { id: 9, src: "/Fresh_Lime_Soda.jpeg", category: 'drinks' },
  { id: 10, src: "/Gulab_Jamun.jpg", category: 'vegetarian' },
  { id: 11, src: "/kesar_kulfi.jpeg", category: 'dessert' },
  { id: 12, src: "/masala_chai.jpeg", category: 'drinks' },
  { id: 13, src: "/Masala_Papad.jpg", category: 'vegetarian' },
  { id: 14, src: "/Mint_Mojito.jpeg", category: 'dessert' },
  { id: 15, src: "/parking_space.webp", category: 'Ambience' },
  { id: 16, src: "/Rasmalai.jpeg", category: 'vegetarian' },
  { id: 17, src: "/Sweet_Lassi.jpeg", category: 'dessert' },
  { id: 18, src: "/dining_space.png", category: 'Ambience' },
];

const Gallery = () => {
  const [filteredImages, setFilteredImages] = useState(allImages);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredImages(allImages);
    } else {
      setFilteredImages(allImages.filter(image => image.category === activeFilter));
    }
  }, [activeFilter]);

  const filters = ['all', 'vegetarian', 'drinks', 'dessert','Ambience'];

  return (
    <div className="relative min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Elements */}
      <motion.img
        src="/corindor.png"
        alt="decorative sketch"
        className="absolute top-20 left-72 w-48 h-48 opacity-100"
        animate={{ y: [-10, 10], rotate: [-5, 5] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />
     

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-5xl md:text-6xl font-black text-gray-800 tracking-tight">PHOTO GALLERY</h1>
          <p className="text-orange-400 font-semibold text-sm tracking-widest mt-2">- LUXURY RESTAURANT -</p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 md:gap-8 mb-12">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`capitalize text-lg font-medium transition-colors duration-300 ${
                activeFilter === filter
                  ? 'text-gray-900 border-b-2 border-orange-400'
                  : 'text-gray-500 hover:text-gray-900'
              }`}>
              {filter}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredImages.map(image => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <img src={image.src} alt={`gallery image ${image.id}`} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;
