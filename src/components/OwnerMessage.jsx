import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';





const FloatingDish = ({ src, alt, className, animation }) => (
  <motion.div
    className={`absolute ${className}`}
    animate={animation}
  >
    <img src={src} alt={alt} className="w-full h-full object-contain drop-shadow-2xl" />
  </motion.div>
);

const Annotation = ({ text, subtext, className, arrowClassName }) => (
    <div className={`absolute ${className} text-center`}>
        <p className="font-serif text-lg italic text-yellow-700">{text}</p>
        <p className="text-sm text-gray-500">{subtext}</p>
        <div className={`absolute ${arrowClassName}`}>
            <svg width="60" height="40" viewBox="0 0 60 40">
                <path d="M5,35 Q20,5 55,5" stroke="#b45309" strokeWidth="2" fill="none" strokeDasharray="4 4" />
            </svg>
        </div>
    </div>
);

const OwnerMessage = () => {
  return (
    <section className="bg-white py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 relative z-10 mb-20">
        
        {/* Quote Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-600 rounded-full">
            <Quote className="w-10 h-10 text-white" strokeWidth={1.5} />
          </div>
        </div>

        {/* Main Message */}
        <p className="text-2xl sm:text-3xl font-bold text-gray-800 text-center leading-relaxed tracking-wide">
        In our kitchen, food is more than just taste — it’s a part of our life. From fresh vegetables to age-old recipes, every plate carries the warmth of home and the love of our culture. We cook the way our families have for generations — simple, pure, and from the heart
        </p>

        {/* Author */}
        <p className="text-center text-yellow-700 font-semibold text-lg mt-8">VIRANSH PURE VEG</p>

       
      </div>

      {/* Floating Decorative Elements */}
      <FloatingDish 
        src="/he.png"
        alt="Delicious Soup" 
        className="w-72 h-72 top-[35%] -translate-y-1/2 left-[-2%]"
        animation={{ y: [0, -15, 0], transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
      />
      <FloatingDish 
        src="/df.png" 
        alt="Healthy Chicken" 
        className="w-72 h-72 top-[10%] -translate-y-[70%] right-[0%]"
        animation={{ y: [0, 15, 0], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
      />

    

    </section>
  );
};

export default OwnerMessage;
