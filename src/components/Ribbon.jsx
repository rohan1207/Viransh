import React from 'react';
import { motion } from 'framer-motion';

const words = ['Pure', 'Fresh', 'Flavorful', 'Desi'];

const Ribbon = () => {
  const marqueeVariants = {
    animate: {
      x: [0, '-50%'],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 25, // Slower duration for a more elegant scroll
          ease: 'linear',
        },
      },
    },
  };

  const Word = ({ children, isOutlined }) => (
    <span 
      className={`text-8xl font-black uppercase whitespace-nowrap mx-8 ${isOutlined ? 'text-transparent' : 'text-gray-900'}`}
      style={isOutlined ? { WebkitTextStroke: '2px #b45309' } : {}}
    >
      {children}
    </span>
  );

  return (
    <section className="py-12 bg-[#F3F4F6] overflow-hidden">
      <motion.div
        className="flex"
        variants={marqueeVariants}
        animate="animate"
      >
        <div className="flex">
          {[...words, ...words].map((word, index) => (
            <React.Fragment key={index}>
              <Word isOutlined={index % 2 !== 0}>{word}</Word>
           
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Ribbon;
