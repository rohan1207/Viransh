import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/solid";
import AddToCartButton from "./AddToCartButton";

const RecommendedItemCard = ({ item }) => (
  <div className="flex-shrink-0 w-40 text-center">
    <div className="relative h-32 w-32 mx-auto rounded-md overflow-hidden bg-gray-100 mb-2 shadow-sm">
      <img
        src={item.images?.[0] || "/placeholder-dish.jpg"}
        alt={item.name}
        className="w-full h-full object-cover"
      />
    </div>
    <h4 className="text-sm font-semibold text-gray-800 truncate">
      {item.name}
    </h4>
    <p className="text-sm font-bold text-amber-600">₹{item.discountedPrice}</p>
    <AddToCartButton item={item} />
  </div>
);

const ProductDetailPopup = ({ product, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recommendedItems, setRecommendedItems] = useState([]);

  useEffect(() => {
    const fetchRecommended = async () => {
      if (product?.recommended && product.recommended.length > 0) {
        try {
          const response = await fetch("/api/menu");
          const allCategories = await response.json();
          const allItems = allCategories.flatMap((cat) => cat.items);

          const foundItems = product.recommended
            .map((sku) => allItems.find((item) => item.sku === sku))
            .filter(Boolean); // Filter out any undefined items if SKU not found

          setRecommendedItems(foundItems);
        } catch (error) {
          console.error("Failed to fetch recommended items:", error);
        }
      } else {
        setRecommendedItems([]);
      }
    };

    fetchRecommended();
  }, [product]);

  useEffect(() => {
    if (product?.images?.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % product.images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [product]);

  if (!product) return null;

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? product.images.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === product.images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: {
      y: "0",
      opacity: 1,
      transition: { delay: 0.2, type: "spring", stiffness: 120 },
    },
    exit: { y: "100vh", opacity: 0 },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-lg shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 max-w-4xl mx-auto flex flex-col h-full max-h-[95vh]"
          variants={modalVariants}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 h-full overflow-hidden">
            <div className="relative h-full overflow-y-auto p-4">
              {product.images && product.images.length > 0 ? (
                <div className="flex flex-col gap-4 h-full">
                  {product.images.slice(0, 2).map((image, index) => (
                    <div
                      key={index}
                      className="w-full h-auto aspect-w-1 aspect-h-1 rounded-lg overflow-hidden shadow-md"
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>
            <div className="p-6 flex flex-col overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-3xl font-bold text-gray-800">
                  {product.name}
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <XIcon className="h-7 w-7" />
                </button>
              </div>
              <p className="text-gray-600 mb-4">{product.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <StarIcon className="w-6 h-6 text-yellow-500 mr-1" />
                  <span className="text-xl font-bold text-gray-800">
                    {product.ratings}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({product.reviews?.length || 0} reviews)
                  </span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-amber-600 mr-3">
                    ₹{product.discountedPrice}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ₹{product.mrp}
                  </span>
                </div>
              </div>

              <div className="text-sm text-gray-500 mb-4">
                Serves: {product.serves}
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Ingredients:
                </h3>
                <p className="text-gray-600 text-sm">
                  {Array.isArray(product.ingredients)
                    ? product.ingredients.join(", ")
                    : product.ingredients}
                </p>
              </div>

              <div className="mt-auto pt-4">
                <AddToCartButton item={product} />
              </div>

              {product.reviews && product.reviews.length > 0 && (
                <div className="pt-6 mt-6 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Customer Reviews
                  </h3>
                  <div className="space-y-4">
                    {product.reviews.map((review, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-100 pb-2 last:border-b-0"
                      >
                        <div className="flex items-center mb-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.ratings
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="ml-2 text-sm font-semibold text-gray-700">
                            {review.user || "Anonymous"}
                          </p>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {recommendedItems.length > 0 && (
                <div className="pt-6 mt-6 border-t border-gray-200 bg-gray-50 -mx-6 px-6 pb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Pairs Well With
                  </h3>
                  <div className="flex gap-4 overflow-x-auto pb-4">
                    {recommendedItems.map((item) => (
                      <RecommendedItemCard key={item.sku} item={item} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDetailPopup;
