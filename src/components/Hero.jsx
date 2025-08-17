import React, { useState, useEffect } from 'react';


import { FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const rotatingWords = ["FRESH", "DESI", "FLAVOURFUL"];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 2000); // Change word every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${"hero1.png"})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center p-10 mt-20"
        >
          <h1 className="text-7xl font-bold uppercase tracking-tighter leading-none text-transparent" style={{ WebkitTextStroke: '2px white' }}>
            TASTE UNLIMITED
          </h1>
          <div className="text-7xl font-bold uppercase tracking-tighter leading-none mt-4 h-20">
            <AnimatePresence mode='wait'>
              <motion.span
                key={rotatingWords[index]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="block text-white"
              >
                {rotatingWords[index]}
              </motion.span>
            </AnimatePresence>
          </div>
          <p className="text-2xl mt-6 text-white font-light tracking-wider">
            FOOD
          </p>
          <button className="mt-8 flex items-center space-x-2 bg-black text-white px-8 py-4 rounded-md text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors duration-300">
            <span>ORDER NOW</span>
            <FiArrowRight />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-[5px] right-[-70px]  flex items-center justify-center text-center p-4 "
        >
         <motion.img
            src="/circle_logo.png"
            alt="Floating Logo"
            className="w-48 h-48"
            animate={{
              y: ["-8px", "8px"],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
