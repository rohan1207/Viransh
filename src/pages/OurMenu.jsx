import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Import assets

import SpecialProposals from '../components/SpecialProposals';

import FullMenu from '../components/Full_Menu';


const OurMenu = () => {
  // Scroll-based rotation for main dish - elegant and noticeable
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Background decorative elements */}
      
      {/* Decorative leaves - top right */}
      <motion.img 
        src="/samosa.png"
        alt="decorative leaves"
        className="absolute top-16 right-8 w-32 h-32 opacity-100"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      
      {/* Small chili pepper - left side */}
      <motion.img 
        src="/mojito.png"
        alt="chili pepper"
        className="absolute top-40 left-3 w-40 h-50 opacity-100"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />

      {/* Additional small decorative elements */}
    
      {/* <motion.img 
        src="/starter.png"
        alt="decorative starter"
        className="absolute bottom-[55%] right-3 w-50 h-40 opacity-100"
        animate={{ 
          y: [0, -4, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
      
        }}
      /> */}
     

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-7xl font-black text-gray-800 tracking-wider mb-2">
            OUR MENU
          </h1>
          <div className="flex items-center justify-center">
            <div className="w-8 h-0.5 bg-orange-400 mr-3"></div>
            <span className="text-orange-400 font-semibold text-sm tracking-widest">
              REMARKABLE RECIPES
            </span>
            <div className="w-8 h-0.5 bg-orange-400 ml-3"></div>
          </div>
        </motion.div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          
          {/* Left Side - Main Dish Image */}
          <motion.div 
            className="relative flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative">
              {/* Main dish image with scroll-based rotation */}
              <motion.img 
                src="/menu_plater.png"
                alt="Delicious dish"
                className="w-100 h-100 object-contain"
                style={{ rotate }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 30,
                  mass: 1
                }}
              />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Best Quality Food Label */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-0.5 bg-orange-400"></div>
              <span className="text-orange-400 font-semibold text-sm tracking-widest">
                BEST QUALITY FOOD
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-5xl md:text-6xl font-black text-gray-800 leading-tight">
            VIRANSH PURE VEG
              <br />
              <span className="text-gray-700">Fine Dining, Vegetarian Soul</span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-lg max-w-md">
            Indulge in a premium dining experience where every bite is pure and flavorful.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <motion.button 
                className="bg-gray-800 text-white px-8 py-4 font-semibold tracking-wider hover:bg-gray-700 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ABOUT RESTAURANT
              </motion.button>
              
              <motion.button 
                className="flex items-center gap-3 text-gray-800 font-semibold tracking-wider hover:text-gray-600 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                RESTAURANT STORY
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
<FullMenu/>
      <SpecialProposals />

    </div>
  );
};

export default OurMenu;