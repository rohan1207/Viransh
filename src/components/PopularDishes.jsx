import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";
import { motion, useAnimation } from "framer-motion";
import AddToCartButton from "./AddToCartButton";
import ProductDetailPopup from "./ProductDetailPopup";

const DishCard = ({ dish, onSelect }) => (
  <div
    className="flex-shrink-0 w-80 mr-6 last:mr-0 cursor-pointer"
    onClick={() => onSelect(dish)}
  >
    <div className="relative bg-white rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 h-[480px] flex flex-col">
      {/* Image Container with fixed aspect ratio */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={dish.images?.[0] || "/placeholder-dish.jpg"}
          alt={dish.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder-dish.jpg";
          }}
        />
        {dish.bestSeller && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            ⭐ Bestseller
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-amber-400 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-gray-700 font-semibold text-sm">
              {dish.ratings?.toFixed(1) || "4.0"}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow relative">
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
            {dish.name}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
            {dish.description ||
              "Delicious and authentic dish prepared with premium ingredients."}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">
                ₹{dish.discountedPrice}
              </span>
              {dish.originalPrice &&
                dish.originalPrice > dish.discountedPrice && (
                  <span className="text-sm text-gray-400 line-through ml-2">
                    ₹{dish.originalPrice}
                  </span>
                )}
            </div>
            <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
              Serves {dish.serves || 1}
            </div>
          </div>
        </div>

        {/* Add Button */}
        <div className="mt-auto pt-4 flex justify-between items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(dish);
            }}
            className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
          >
            View Details
          </button>
          <AddToCartButton item={dish} />
        </div>
      </div>
    </div>
  </div>
);

const PopularDishes = () => {
  const [popularDishes, setPopularDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchPopularDishes = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/menu`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const categories = await response.json();
        const allItems = categories.flatMap((category) => category.items);
        const bestsellers = allItems
          .filter((item) => item.bestSeller)
          .slice(0, 12);
        setPopularDishes(bestsellers);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch popular dishes:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularDishes();
  }, []);

  const controls = useAnimation();
  const cardWidth = 320; // From w-80
  const cardMargin = 24; // From mr-6
  const totalWidth = (cardWidth + cardMargin) * popularDishes.length;

  useEffect(() => {
    if (loading || popularDishes.length === 0) return;

    let index = 0;
    const numDishes = popularDishes.length;

    const sequence = async () => {
      while (true) {
        // Pause for 3 seconds
        await new Promise((res) => setTimeout(res, 3000));

        index++;

        // Animate to the next card
        await controls.start({
          x: -index * (cardWidth + cardMargin),
          transition: { type: "spring", stiffness: 80, damping: 20 },
        });

        // If we've reached the end of the first set of cards, reset instantly
        if (index >= numDishes) {
          // A tiny pause to ensure the animation is complete before the jump
          await new Promise((res) => setTimeout(res, 100));
          controls.set({ x: 0 });
          index = 0;
        }
      }
    };

    sequence();
  }, [controls, popularDishes.length]);

  if (loading) {
    return (
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">Loading popular dishes...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-red-600 font-semibold">
            Error: Could not load popular dishes. {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <p className="text-orange-500 font-semibold tracking-[0.2em] text-sm mb-4 uppercase">
            Customer Favorites
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
            Popular Dishes
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our most loved dishes, handpicked by our customers and
            crafted to perfection
          </p>
        </div>
      </div>

      <div className="relative">
        <motion.div className="flex pl-4" animate={controls}>
          {[...popularDishes, ...popularDishes].map((dish, index) => (
            <DishCard
              key={`${dish.sku || dish.name}-${index}`}
              dish={dish}
              onSelect={setSelectedProduct}
            />
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

export default PopularDishes;
