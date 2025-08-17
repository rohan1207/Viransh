import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Import assets

import SpecialProposals from "../components/SpecialProposals";

import FullMenu from "../components/Full_Menu";

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
        className="absolute top-10 sm:top-16 right-2 sm:right-8 w-12 sm:w-32 h-12 sm:h-32 opacity-100 sm:opacity-100"
        initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
        }}
      />

      {/* Small chili pepper - left side */}
      <motion.img
        src="/mojito.png"
        alt="chili pepper"
        className="absolute top-32  sm:top-40 -left-1 sm:left-3 w-24 sm:w-40 h-30 sm:h-50 opacity-100 sm:opacity-100"
        initial={{ opacity: 0, x: -20, rotate: 15 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
        }}
      />

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 sm:mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl sm:text-6xl md:text-7xl font-black text-gray-800 tracking-wider mb-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            OUR MENU
          </motion.h1>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="w-6 sm:w-8 h-0.5 bg-orange-400 mr-2 sm:mr-3"></div>
            <span className="text-orange-400 font-semibold text-xs sm:text-sm tracking-widest">
              REMARKABLE RECIPES
            </span>
            <div className="w-6 sm:w-8 h-0.5 bg-orange-400 ml-2 sm:ml-3"></div>
          </motion.div>
        </motion.div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left Side - Main Dish Image */}
          <motion.div
            className="relative flex justify-center lg:justify-start px-4 sm:px-0 -mb-16"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative w-[100%] sm:w-auto">
              {/* Main dish image with scroll-based rotation */}
              <motion.img
                src="/menu_plater.png"
                alt="Delicious dish"
                className="w-full h-full object-contain drop-shadow-2xl"
                style={{ rotate }}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 30,
                  mass: 1,
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
            <h2 className="text-4xl sm:text-4xl md:text-6xl font-black text-gray-800 leading-tight">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                VIRANSH PURE VEG
              </motion.span>
              <br />
              <motion.span
                className="text-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Fine Dining, Vegetarian Soul
              </motion.span>
            </h2>

            {/* Description */}
            <motion.p
              className="text-gray-600 leading-relaxed text-base sm:text-lg max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Indulge in a premium dining experience where every bite is pure
              and flavorful.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4 sm:pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <motion.button
                className="bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold tracking-wider hover:bg-gray-700 transition-colors duration-300 shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ABOUT RESTAURANT
              </motion.button>

              <motion.button
                className="flex items-center justify-center sm:justify-start gap-3 text-gray-800 font-semibold tracking-wider hover:text-gray-600 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center shadow-md">
                  <svg
                    className="w-4 sm:w-5 h-4 sm:h-5 text-gray-800"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base">RESTAURANT STORY</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <FullMenu />
      <SpecialProposals />
    </div>
  );
};

export default OurMenu;
