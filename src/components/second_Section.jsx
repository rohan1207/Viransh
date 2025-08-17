import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Phone, Box, Award, ShoppingBag } from 'lucide-react';


const SecondSection = () => {
  const features = [
    { Icon: Box, title: "FAST DELIVERY", subtitle: "Within 30 minutes" },
    { Icon: Award, title: "ABSOLUTE DINING", subtitle: "Best buffet restaurant" },
    { Icon: ShoppingBag, title: "PICKUP DELIVERY", subtitle: "Grab your food order" },
  ];
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

      const springConfig = { stiffness: 50, damping: 40, restDelta: 0.001 };

  const rotate = useTransform(scrollYProgress, [0, 1], [-90, 90]);
  const smoothRotate = useSpring(rotate, springConfig);

  const yPasta = useTransform(scrollYProgress, [0, 1], [50, -100]);
  const rotatePasta = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const smoothYPasta = useSpring(yPasta, springConfig);
  const smoothRotatePasta = useSpring(rotatePasta, springConfig);

  const yChili = useTransform(scrollYProgress, [0, 1], [-50, 100]);
  const rotateChili = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const smoothYChili = useSpring(yChili, springConfig);
  const smoothRotateChili = useSpring(rotateChili, springConfig);

  return (
    <section ref={targetRef} className="relative bg-white py-20 px-8 overflow-hidden min-h-screen">
      {/* Background Text */}
      <motion.div 
        className="absolute top-0 left-0 right-0 text-center text-[10vw] font-black text-gray-200 whitespace-nowrap z-0 leading-none select-none pointer-events-none"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ letterSpacing: '0.1em' }}
      >
        EXPERIENCE
      </motion.div>

      {/* Main Layout Container */}
      <div className="relative z-10 flex items-center justify-between max-w-7xl mx-auto pt-32">
        {/* Left Side - Food Images */}
        <div className="w-1/2 relative flex justify-center items-center">
          {/* Small green salad bowl - top left
                              <motion.div 
            className="absolute top-[45%] left-[-20%] w-28 h-28 z-30"
            style={{ y: smoothYChili, rotate: smoothRotateChili }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <img 
              src="/second_section3.png" 
              alt="Chili Bowl" 
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </motion.div> */}

          {/* Main dish in center */}
                              <motion.div 
            className="relative z-20"
            style={{ rotate: smoothRotate }}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img 
              src="/maindish2.png"
              alt="Grilled Fish Main Dish" 
              className="w-[95%] h-[95%] object-contain drop-shadow-2xl "
            />
          </motion.div>

          {/* Small decorative elements scattered around */}
          
        
          
          
        </div>

        {/* Right Side - Text Content */}
        <div className="w-1/2 pl-16">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            
            
            <h2 className="text-5xl font-black text-gray-900 leading-tight mb-6 z-40" style={{ letterSpacing: '0.02em' }}>
              WONDERFUL DINING<br />
              AMBIENCE & FOOD.
            </h2>
            
            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-lg">
              Lorem ipsum dolor sit amet consectetur adipiscing elit 
              do eiusmod tempor incididunt ut labore et dolore 
              magna minim veniam nostrud exercitation.
            </p>
            
            <div className="flex items-center gap-12">
              <button className="bg-gray-900 text-white px-8 py-4 text-sm font-bold tracking-[0.1em] hover:bg-gray-800 transition-colors">
               ORDER NOW
              </button>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center">
                  <Phone size={20} className="text-white" />
                </div>
                <span className="text-gray-900 font-bold text-lg">8855817434</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Pasta Dish - Right Side */}
                  <motion.div 
        className="absolute right-[-1.5%] top-[16%] w-60 h-60 z-30"
        style={{ y: smoothYPasta, rotate: smoothRotatePasta }}
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
                <img 
          src="/second_section2.png" 
          alt="Pasta Dish" 
          className="w-full h-full object-contain drop-shadow-xl"
        />
      </motion.div>

      {/* Features Ribbon */}
      <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-full max-w-4xl z-20 mt-20">
        <motion.div 
          className="flex justify-around items-center"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
                    {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <feature.Icon className="text-gray-700" size={32} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 tracking-wider">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SecondSection;