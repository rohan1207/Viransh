import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FiThumbsUp, FiAward, FiSmile } from 'react-icons/fi';
import { GiTomato, GiChefToque, GiFullPizza } from 'react-icons/gi';
import { MdEmojiFoodBeverage } from 'react-icons/md';



const features = [
  {
    icon: <GiTomato size={32} className="text-green-600" />,
    title: '100% PURE VEG FRESHNESS',
    description: 'Farm-fresh vegetables, sourced daily for wholesome meals.',
  },
  {
    icon: <FiThumbsUp size={32} className="text-green-600" />,
    title: 'QUALITY YOU CAN TRUST',
    description: 'Hygienic cooking and standardized authentic recipes.',
  },
  {
    icon: <GiChefToque size={32} className="text-green-600" />,
    title: 'SKILLED & PASSIONATE CHEFS',
    description: 'Masters in crafting flavorful vegetarian delicacies.',
  },
  {
    icon: <MdEmojiFoodBeverage size={32} className="text-green-600" />,
    title: 'TRADITIONAL DESI FLAVORS',
    description: 'Aromatic spices and homely taste in every dish.',
  },
  {
    icon: <GiFullPizza size={32} className="text-green-600" />,
    title: 'SIGNATURE VEG PIZZAS',
    description: 'Crispy base loaded with farm-fresh vegetarian toppings.',
  },
  {
    icon: <FiAward size={32} className="text-green-600" />,
    title: 'MEMORABLE DINING EXPERIENCE',
    description: 'Warm ambience & service that makes you feel at home.',
  },
];

const WhyChooseUs = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const yRange = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const y = useSpring(yRange, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div ref={containerRef} className="relative bg-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h3 className="text-sm font-bold text-orange-400 tracking-widest uppercase">WHY CHOOSE US?</h3>
          <h2 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">WE ARE KNOWN</h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0">
                {feature.icon}
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-bold text-gray-900">{feature.title}</h4>
                <p className="mt-1 text-base text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Animated Tomato Image */}
        <motion.div
          className="absolute top-[-15%] right-[-10%] w-60 h-60 z-0 pointer-events-none"
          style={{ y }}
        >
          <img src="/tomato.png" alt="Fresh Tomato" />
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
