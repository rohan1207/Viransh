import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import AddToCartButton from "./AddToCartButton";
import ProductDetailPopup from "./ProductDetailPopup";

const SpecialProposals = () => {
  const [specialItems, setSpecialItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto slide functionality
  useEffect(() => {
    if (!isAutoPlaying || specialItems.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % specialItems.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, [specialItems.length, isAutoPlaying]);

  const handlePrevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) =>
      prev === 0 ? specialItems.length - 1 : prev - 1
    );
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleNextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % specialItems.length);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    const fetchSpecialItems = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/menu`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const categories = await response.json();
        const allItems = categories.flatMap((category) => category.items);

        // Using the same hardcoded SKUs but fetching from live data
        const specialSKUs = [
          "RICE-DAL-TADKA-015",
          "RICE-HYDERABADI-012",
          "IMC057",
        ];

        const foundItems = specialSKUs
          .map((sku) => allItems.find((item) => item.sku === sku))
          .filter(Boolean);

        setSpecialItems(foundItems);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch special proposals:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialItems();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  if (loading) {
    return (
      <section className="bg-gray-50 py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>Loading Chef's Specials...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-50 py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600">Error loading specials: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-orange-400 font-semibold tracking-[0.3em] text-sm mb-4">
            - CHEF'S SPECIALS -
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-wide">
            SPECIAL PROPOSALS
          </h2>
        </motion.div>

        {/* Mobile Slider Navigation - Only show if more than 1 item */}
        {specialItems.length > 1 && (
          <div className="md:hidden flex justify-center items-center gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevSlide}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg text-gray-700 hover:text-orange-500 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300"
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
              {specialItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index);
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 10000);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-orange-500 w-6"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNextSlide}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg text-gray-700 hover:text-orange-500 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300"
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
        )}

        {/* Desktop Grid - No changes */}
        <motion.div
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {specialItems.map((item) => (
            <motion.div
              key={item.sku}
              className="bg-white rounded-lg shadow-md overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
              variants={cardVariants}
              onClick={() => setSelectedProduct(item)}
            >
              <div className="relative">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-bold text-gray-800 text-sm">
                    {item.ratings}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow h-12 overflow-hidden">
                  {item.description}
                </p>
                <div className="flex justify-between items-center mt-4 mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{item.discountedPrice}
                    </span>
                    <span className="ml-2 text-gray-500 line-through">
                      ₹{item.mrp}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    Serves {item.serves}
                  </span>
                </div>
                <div className="mt-auto flex justify-between items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(item);
                    }}
                    className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    View Details
                  </button>
                  <AddToCartButton item={item} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Slider - Improved */}
        <motion.div
          className="md:hidden relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="overflow-hidden">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {specialItems.map((item) => (
                <motion.div
                  key={item.sku}
                  className="w-full flex-shrink-0 px-4"
                  variants={cardVariants}
                >
                  <div
                    className="bg-white rounded-xl shadow-lg overflow-hidden max-w-sm mx-auto cursor-pointer hover:shadow-xl transition-shadow duration-300"
                    onClick={() => setSelectedProduct(item)}
                  >
                    <div className="relative">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-56 object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-bold text-gray-800 text-sm">
                          {item.ratings}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight">
                        {item.name}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-gray-900">
                            ₹{item.discountedPrice}
                          </span>
                          <span className="text-gray-500 line-through text-sm">
                            ₹{item.mrp}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          Serves {item.serves}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(item);
                          }}
                          className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors px-3 py-1 rounded-md hover:bg-orange-50"
                        >
                          View Details
                        </button>
                        <div onClick={(e) => e.stopPropagation()}>
                          <AddToCartButton item={item} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {selectedProduct && (
        <ProductDetailPopup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

export default SpecialProposals;
