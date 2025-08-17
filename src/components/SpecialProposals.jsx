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
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-wide">
            SPECIAL PROPOSALS
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
