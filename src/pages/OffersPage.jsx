import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaUsers,
  FaGift,
  FaBirthdayCake,
  FaCalendarAlt,
  FaPercent,
  FaCrown,
  FaMagic,
} from "react-icons/fa";

const OffersPage = () => {
  const [featuredOffer, setFeaturedOffer] = useState(0);
  const [mobileSlideIndex, setMobileSlideIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const offers = [
    {
      id: 1,
      title: "Corporate Group Special",
      subtitle: "Perfect for Business Meetings",
      description:
        "Groups of 5-6 people get exclusive discounts on our premium menu",
      discount: "25% OFF",
      icon: <FaUsers className="text-3xl" />,
      color: "from-blue-500 to-blue-700",
      features: [
        "Priority Seating",
        "Complimentary Appetizers",
        "Business-friendly Ambiance",
        "Group Photo Service",
      ],
      validUntil: "Valid till 31st Dec 2024",
      minOrder: "Minimum order ₹2000",
    },
    {
      id: 2,
      title: "Premium Order Bonus",
      subtitle: "Luxury Dining Experience",
      description:
        "Special discounts on orders above ₹1500 with exclusive perks",
      discount: "30% OFF",
      icon: <FaCrown className="text-3xl" />,
      color: "from-purple-500 to-purple-700",
      features: [
        "Free Premium Dessert",
        "Complimentary Beverages",
        "VIP Table Service",
        "Chef's Special Recommendation",
      ],
      validUntil: "Valid till 31st Dec 2024",
      minOrder: "Minimum order ₹1500",
    },
    {
      id: 3,
      title: "Birthday Celebration",
      subtitle: "Make Your Day Special",
      description:
        "Celebrate your special day with our exclusive birthday package",
      discount: "40% OFF",
      icon: <FaBirthdayCake className="text-3xl" />,
      color: "from-pink-500 to-pink-700",
      features: [
        "Free Birthday Cake",
        "Special Decoration",
        "Birthday Song Performance",
        "Complimentary Photo Session",
      ],
      validUntil: "Valid throughout the year",
      minOrder: "Minimum order ₹1000",
    },
    {
      id: 4,
      title: "Party & Event Package",
      subtitle: "Unforgettable Celebrations",
      description: "Perfect for parties, anniversaries, and special events",
      discount: "35% OFF",
      icon: <FaCalendarAlt className="text-3xl" />,
      color: "from-green-500 to-green-700",
      features: [
        "Event Planning Support",
        "Custom Menu Options",
        "Live Music Arrangement",
        "Photography Service",
      ],
      validUntil: "Book 7 days in advance",
      minOrder: "Minimum order ₹3000",
    },
    {
      id: 5,
      title: "Weekend Special",
      subtitle: "Saturday & Sunday Delights",
      description: "Exclusive weekend offers with premium dining experience",
      discount: "20% OFF",
      icon: <FaMagic className="text-3xl" />,
      color: "from-orange-500 to-orange-700",
      features: [
        "Weekend Special Menu",
        "Live Entertainment",
        "Extended Hours",
        "Family-friendly Activities",
      ],
      validUntil: "Every Weekend",
      minOrder: "Minimum order ₹800",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setFeaturedOffer((prev) => (prev + 1) % offers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [offers.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setMobileSlideIndex((prev) => (prev + 1) % offers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [offers.length, isAutoPlaying]);

  const handleMobilePrev = () => {
    setIsAutoPlaying(false);
    setMobileSlideIndex((prev) => (prev === 0 ? offers.length - 1 : prev - 1));
    // Resume auto-play after 8 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const handleMobileNext = () => {
    setIsAutoPlaying(false);
    setMobileSlideIndex((prev) => (prev + 1) % offers.length);
    // Resume auto-play after 8 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    rotate: [0, 5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Floating Decorative Elements */}
      <motion.img
        src="/corindor.png"
        alt="decorative leaf"
        className="absolute top-20 right-16 w-32 h-32 opacity-100 hidden lg:block"
        animate={floatingAnimation}
        style={{ animationDelay: "0s" }}
      />
      <motion.img
        src="/samosa.png"
        alt="decorative dish"
        className="absolute top-40 left-8 w-28 h-28 opacity-100 hidden lg:block"
        animate={floatingAnimation}
        style={{ animationDelay: "1s" }}
      />
      <motion.img
        src="/mojito.png"
        alt="decorative mojito"
        className="absolute bottom-40 right-8 w-40 h-40 opacity-100 hidden lg:block"
        animate={floatingAnimation}
        style={{ animationDelay: "2s" }}
      />
      <motion.img
        src="/starter.png"
        alt="decorative starter"
        className="absolute bottom-20 left-16 w-50 h-40 opacity-100 hidden lg:block"
        animate={floatingAnimation}
        style={{ animationDelay: "3s" }}
      />

      {/* Luxury Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-red-400 to-red-600 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
        {/* Luxury Header */}
        <motion.div
          className="text-center mb-12 sm:mb-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-7xl font-black text-gray-800 tracking-wider mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            EXCLUSIVE OFFERS
          </motion.h1>
          <div className="flex items-center justify-center mb-6 px-4">
            <div className="w-8 md:w-12 h-0.5 bg-orange-400 mr-2 md:mr-4"></div>
            <span className="text-orange-400 font-semibold text-xs md:text-sm tracking-widest text-center">
              LUXURY DINING EXPERIENCES
            </span>
            <div className="w-8 md:w-12 h-0.5 bg-orange-400 ml-2 md:ml-4"></div>
          </div>
          <motion.p
            className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Indulge in our exclusive offers designed to make every dining
            experience extraordinary. From corporate gatherings to birthday
            celebrations, we have something special for every occasion.
          </motion.p>
        </motion.div>

        {/* Featured Offer Carousel */}
        <motion.div
          className="max-w-6xl mx-auto mb-12 sm:mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={featuredOffer}
                className="bg-white rounded-xl shadow-2xl overflow-hidden"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={`bg-gradient-to-r ${offers[featuredOffer].color} p-4 sm:p-8 text-white relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-center relative z-10">
                    <div>
                      <div className="flex items-center mb-3 md:mb-4">
                        {offers[featuredOffer].icon}
                        <span className="ml-3 text-xs md:text-sm font-semibold tracking-widest opacity-90">
                          {offers[featuredOffer].subtitle}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 md:mb-4 leading-tight">
                        {offers[featuredOffer].title}
                      </h2>
                      <p className="text-sm md:text-lg mb-4 md:mb-6 opacity-90 leading-relaxed">
                        {offers[featuredOffer].description}
                      </p>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                        <span className="bg-white text-gray-800 px-4 md:px-6 py-2 rounded-full font-black text-lg md:text-xl">
                          {offers[featuredOffer].discount}
                        </span>
                        <span className="text-xs md:text-sm opacity-75">
                          {offers[featuredOffer].minOrder}
                        </span>
                      </div>
                    </div>

                    <div className="text-center mt-4 lg:mt-0">
                      <motion.img
                        src="/menu_plater.png"
                        alt="featured dish"
                        className="w-40 h-40 sm:w-48 sm:h-48 md:w-80 md:h-80 object-contain mx-auto"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                        What's Included:
                      </h3>
                      <ul className="space-y-2">
                        {offers[featuredOffer].features.map(
                          (feature, index) => (
                            <motion.li
                              key={index}
                              className="flex items-center text-gray-600 text-sm sm:text-base"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <FaStar className="text-yellow-400 mr-2 text-sm flex-shrink-0" />
                              {feature}
                            </motion.li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-sm text-gray-500 mb-2">
                        {offers[featuredOffer].validUntil}
                      </p>
                      <motion.button
                        className="bg-gradient-to-r from-orange-400 to-red-600 text-white px-6 sm:px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        CLAIM OFFER
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
              {offers.map((_, index) => (
                <motion.button
                  key={index}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === featuredOffer
                      ? "bg-orange-400 w-8"
                      : "bg-gray-300 w-3"
                  }`}
                  onClick={() => setFeaturedOffer(index)}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* All Offers Grid/Slider */}
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 text-center mb-8 md:mb-12"
            variants={cardVariants}
          >
            ALL EXCLUSIVE OFFERS
          </motion.h2>

          {/* Mobile Slider Navigation */}
          <div className="md:hidden flex justify-center items-center gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleMobilePrev}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg text-gray-700 hover:text-orange-500 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>

            <div className="flex gap-2">
              {offers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setMobileSlideIndex(index);
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 8000);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === mobileSlideIndex
                      ? "bg-orange-500 w-6"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleMobileNext}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg text-gray-700 hover:text-orange-500 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>

          {/* Desktop Grid - No changes to functionality */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.id}
                className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div
                  className={`bg-gradient-to-r ${offer.color} p-6 text-white relative`}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    {offer.icon}
                    <span className="bg-white text-gray-800 px-3 py-1 rounded-full font-bold text-sm">
                      {offer.discount}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black mb-2">{offer.title}</h3>
                  <p className="text-sm opacity-90">{offer.subtitle}</p>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {offer.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    {offer.features.slice(0, 2).map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-sm text-gray-500"
                      >
                        <FaStar className="text-yellow-400 mr-2 text-xs" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>{offer.validUntil}</span>
                    <span>{offer.minOrder}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Slider - Improved */}
          <div className="md:hidden relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${mobileSlideIndex * 100}%)`,
                }}
              >
                {offers.map((offer) => (
                  <div key={offer.id} className="w-full flex-shrink-0 px-4">
                    <motion.div
                      className="bg-white rounded-xl shadow-xl overflow-hidden max-w-sm mx-auto"
                      variants={cardVariants}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={`bg-gradient-to-r ${offer.color} p-5 text-white relative`}
                      >
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
                        <div className="flex items-center justify-between mb-3 relative z-10">
                          {offer.icon}
                          <span className="bg-white text-gray-800 px-4 py-1.5 rounded-full font-bold text-sm">
                            {offer.discount}
                          </span>
                        </div>
                        <h3 className="text-xl font-black mb-2 leading-tight">
                          {offer.title}
                        </h3>
                        <p className="text-sm opacity-90">{offer.subtitle}</p>
                      </div>

                      <div className="p-5">
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                          {offer.description}
                        </p>
                        <div className="space-y-2 mb-4">
                          {offer.features.slice(0, 3).map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-start text-sm text-gray-600"
                            >
                              <FaStar className="text-yellow-400 mr-2 text-xs flex-shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col gap-3">
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span className="truncate">{offer.validUntil}</span>
                            <span className="truncate">{offer.minOrder}</span>
                          </div>
                          <motion.button
                            className="w-full bg-gradient-to-r from-orange-400 to-red-600 text-white py-3 rounded-lg font-bold text-sm hover:shadow-lg transition-all duration-300"
                            whileTap={{ scale: 0.95 }}
                          >
                            CLAIM OFFER
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12 sm:mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="text-2xl sm:text-3xl font-black text-gray-800 mb-4">
            Ready to Experience Luxury?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Book your table now and enjoy these exclusive offers. Limited time
            only!
          </p>
          <motion.button
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:shadow-xl transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            BOOK NOW & SAVE
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default OffersPage;
