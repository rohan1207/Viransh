import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FiThumbsUp, FiAward, FiSmile } from "react-icons/fi";
import { GiTomato, GiChefToque, GiFullPizza } from "react-icons/gi";
import { MdEmojiFoodBeverage } from "react-icons/md";

const features = [
  {
    icon: <GiTomato size={32} className="text-green-600" />,
    title: "100% PURE VEG FRESHNESS",
    description: "Farm-fresh vegetables, sourced daily for wholesome meals.",
  },
  {
    icon: <FiThumbsUp size={32} className="text-green-600" />,
    title: "QUALITY YOU CAN TRUST",
    description: "Hygienic cooking and standardized authentic recipes.",
  },
  {
    icon: <GiChefToque size={32} className="text-green-600" />,
    title: "SKILLED & PASSIONATE CHEFS",
    description: "Masters in crafting flavorful vegetarian delicacies.",
  },
  {
    icon: <MdEmojiFoodBeverage size={32} className="text-green-600" />,
    title: "TRADITIONAL DESI FLAVORS",
    description: "Aromatic spices and homely taste in every dish.",
  },
  {
    icon: <GiFullPizza size={32} className="text-green-600" />,
    title: "SIGNATURE VEG PIZZAS",
    description: "Crispy base loaded with farm-fresh vegetarian toppings.",
  },
  {
    icon: <FiAward size={32} className="text-green-600" />,
    title: "MEMORABLE DINING EXPERIENCE",
    description: "Warm ambience & service that makes you feel at home.",
  },
];

const WhyChooseUs = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const yRange = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scaleRange = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const rotateRange = useTransform(scrollYProgress, [0, 1], [0, 45]);

  const y = useSpring(yRange, { stiffness: 50, damping: 30, restDelta: 0.001 });
  const scale = useSpring(scaleRange, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001,
  });
  const rotate = useSpring(rotateRange, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      ref={containerRef}
      className="relative bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-orange-400 tracking-widest uppercase"
          >
            WHY CHOOSE US?
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight lg:text-4xl"
          >
            WE ARE KNOWN
          </motion.h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start bg-white p-4 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex-shrink-0 bg-gray-50 p-3 rounded-full">
                {feature.icon}
              </div>
              <div className="ml-4">
                <h4 className="text-base sm:text-lg font-bold text-gray-900">
                  {feature.title}
                </h4>
                <p className="mt-1 text-sm sm:text-base text-gray-500">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated Tomato Image */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:left-auto sm:top-[-15%] sm:right-[-10%] sm:translate-x-0 sm:translate-y-0 w-52 sm:w-60 h-52 sm:h-60 z-0 pointer-events-none opacity-40 sm:opacity-100"
          style={{ y, scale, rotate }}
        >
          <img
            src="/tomato.png"
            alt="Fresh Tomato"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
