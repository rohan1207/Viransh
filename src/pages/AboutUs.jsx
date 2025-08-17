import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { FaStar, FaHeart } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const pageRef = useRef(null);
  const leafRef = useRef(null);
  const leafStartRef = useRef(null);
  const leafEndRef = useRef(null);

  // About section refs and state
  const containerRef = useRef(null);
  const imageStackRef = useRef(null);
  const [imageContainerHeight, setImageContainerHeight] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Function to handle next testimonial
  const showNextTestimonial = () => {
    setCurrentTestimonialIndex(
      (prevIndex) => (prevIndex + 1) % testimonials.length
    );
  };

  // Function to handle previous testimonial
  const showPrevTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Auto-slide effect for mobile testimonials
  useEffect(() => {
    if (window.innerWidth < 768) {
      // Only run on mobile
      const timer = setInterval(() => {
        showNextTestimonial();
      }, 3000); // Change testimonial every 3 seconds

      return () => clearInterval(timer);
    }
  }, [currentTestimonialIndex]);

  // Restaurant Facilities data
  const facilities = [
    {
      id: 1,
      title: "SPACIOUS & COMFORTABLE SEATING",
      description: "Perfect for families, friends, and group gatherings.",
      image: "/dining_space.png",
    },
    {
      id: 2,
      title: "HYGIENIC & FRESHLY PREPARED MEALS",
      description: "Every dish made with care and cleanliness.",
      image: "/fresh_food.png",
    },
    {
      id: 3,
      title: "AMPLE PARKING SPACE",
      description: "Hassle-free parking for a relaxed dining experience.",
      image: "/parking_space.webp",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Samruddhi Deshmukh",
      role: "Local Guide · 60 reviews",
      time: "2 weeks ago",
      review:
        "A delightful new addition to Baner's food scene! The ambience is absolutely lovely—both indoor and outdoor seating areas are beautifully done and perfect for a relaxed meal with friends or family.",
      rating: 5,
    },
    {
      id: 2,
      name: "Deepanshu Gehlot",
      role: "Local Guide · 14 reviews",
      time: "a week ago",
      review:
        "Tried South Indian breakfast and it was good experience. Good service and ambience is at par. Food was excellent.",
      rating: 5,
    },
    {
      id: 3,
      name: "Madhura Barangale",
      role: "4 reviews",
      time: "2 weeks ago",
      review:
        "I had a really good time here. The food was very tasty, and the staff was kind and helpful. The place was clean and comfortable. I would recommend this restaurant to everyone.",
      rating: 5,
    },
    {
      id: 4,
      name: "M D Enterprises",
      role: "7 reviews",
      time: "2 weeks ago",
      review:
        "A great pure veg restaurant with everything you'd want — a prime location, delicious food, and excellent service. The menu offers fresh and flavorful dishes, and the staff is polite and attentive.",
      rating: 5,
    },
    {
      id: 5,
      name: "Prateek Agrawal",
      role: "1 review",
      time: "a week ago",
      review:
        "Absolutely loved this pure veg gem! 💚 The food was bursting with flavor — every dish was fresh, authentic, and mouthwatering.",
      rating: 5,
    },
    {
      id: 6,
      name: "Samruddhi Waykos",
      role: "2 reviews",
      time: "2 weeks ago",
      review:
        "I had a wonderful experience at this hotel. The atmosphere is really pleasant and welcoming, making it a perfect place to relax. The food is absolutely delicious—I loved the taste of every dish I tried.",
      rating: 5,
    },
    {
      id: 7,
      name: "Payal Vitthaldas",
      role: "8 reviews",
      time: "2 weeks ago",
      review:
        "We had a lovely experience with Viransh! The hospitality, the ambiance, and the delicious pure veg food made our time truly memorable. You can feel the warmth and care in every little detail.",
      rating: 5,
    },
    {
      id: 8,
      name: "Abhishek",
      role: "Local Guide · 21 reviews",
      time: "2 weeks ago",
      review:
        "Absolutely loved this new veg spot in Baner! The food is fresh, tasty, and full of flavour. Nice ambience, polite staff, quick service, and great vibes - perfect place for family dinners.",
      rating: 5,
    },
  ];

  // Get scroll progress for About section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress to scale values for images
  const backImageScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.6]);
  const frontImageScale = useTransform(scrollYProgress, [0, 1], [0.85, 1.5]);
  const backImageY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const frontImageY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  // Animation variants for Restaurant Facilities
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
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
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

  const imageVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // Simple scroll-based leaf animation using Framer Motion
  const { scrollYProgress: leafScrollProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  // Transform scroll progress to leaf position and rotation
  const leafY = useTransform(leafScrollProgress, [0, 1], [0, 800]); // Falls down 800px
  const leafX = useTransform(leafScrollProgress, [0, 1], [0, -100]); // Slight drift left
  const leafRotation = useTransform(leafScrollProgress, [0, 1], [0, 180]); // Gentle rotation
  const leafSway = useTransform(
    leafScrollProgress,
    (progress) => Math.sin(progress * 8) * 20
  ); // Natural swaying

  // About section effects
  useEffect(() => {
    if (imageStackRef.current) {
      setImageContainerHeight(imageStackRef.current.offsetHeight);

      const handleResize = () => {
        setImageContainerHeight(imageStackRef.current.offsetHeight);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate images with staggered effect
    tl.fromTo(
      ".food-image",
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
      }
    )
      .fromTo(
        ".badge-16",
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" },
        "-=0.4"
      )
      .fromTo(
        ".quote-section",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      );

    // Floating animation for decorative elements
    gsap.to(".floating-leaf", {
      y: -10,
      rotation: 5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.5,
    });
  }, []);

  return (
    <div ref={pageRef} className="relative">
      {/* ABOUT SECTION */}
      <div
        ref={containerRef}
        className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 overflow-hidden"
      >
        {/* Background Decorative Elements */}

        <div
          ref={leafStartRef}
          className="absolute top-60 sm:right-32 right-5 w-40 h-45 opacity-0"
        >
          <img
            src="/corindor.png"
            alt="decorative dish"
            className="w-full h-full"
          />
        </div>

        <div className="container mx-auto px-6 py-16">
          {/* Header */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 tracking-wider px-4">
              ABOUT US
            </h2>
            <div className="flex items-center justify-center gap-2 md:gap-4 px-4">
              <div className="w-8 md:w-12 h-0.5 bg-orange-400"></div>
              <span className="text-orange-400 font-semibold text-xs md:text-sm tracking-widest">
                LUXURY RESTAURANT
              </span>
              <div className="w-8 md:w-12 h-0.5 bg-orange-400"></div>
            </div>
          </motion.div>

          <div className="flex flex-col items-center gap-8 md:gap-16 mt-8 md:mt-0">
            {/* Image Stack */}
            <div
              className="relative w-full flex justify-center items-center h-[400px] md:h-[600px]"
              ref={imageStackRef}
            >
              {/* Back Image - Paneer Tikka */}
              <motion.div
                className="food-image absolute w-[90%] md:w-[850px] h-[300px] md:h-[550px] z-10"
                style={{
                  top: "40px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="w-full h-full bg-white rounded-md shadow-2xl overflow-hidden">
                  <motion.img
                    src={"./Paneer_Tikka.jpg"}
                    alt="Paneer Tikka"
                    className="w-full h-full object-cover"
                    style={{
                      scale: backImageScale,
                      transformOrigin: "center center",
                      willChange: "transform",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </div>
              </motion.div>

              {/* Front Image - Spring Rolls */}
              <motion.div
                className="food-image absolute w-[65%] md:w-[500px] h-[200px] md:h-[350px] z-20"
                style={{
                  top: "260px",
                  right: "2%",
                  "@media (min-width: 768px)": {
                    top: "350px",
                    right: "calc(50% - 450px)",
                  },
                }}
              >
                <div className="w-full h-full bg-white rounded-md shadow-2xl overflow-hidden">
                  <motion.img
                    src={"./fresh_food.png"}
                    alt="Veg Spring Rolls"
                    className="w-full h-full object-cover"
                    style={{
                      scale: frontImageScale,
                      transformOrigin: "center center",
                      willChange: "transform",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </div>
              </motion.div>

              {/* 16 Years Badge */}
              <div
                className="badge-16 absolute z-30"
                style={{
                  top: "10px",
                  left: "10px",
                  "@media (min-width: 768px)": {
                    top: "30px",
                    left: "calc(50% - 500px)",
                  },
                }}
              >
                <div className="relative w-28 h-28 md:w-40 md:h-40">
                  {/* Circular Badge Background */}
                  <div className="absolute inset-0 bg-white rounded-full shadow-xl border-4 border-orange-200"></div>
                  <div className="absolute inset-2 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full"></div>

                  {/* Badge Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <div className="text-[10px] md:text-xs font-medium mb-0.5 md:mb-1 tracking-wider">
                      From Our
                    </div>
                    <div className="text-2xl md:text-4xl font-bold leading-none">
                      Kitchen
                    </div>
                    <div className="text-sm md:text-lg font-light italic">
                      to Your Heart
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Section */}
            <div className="w-full max-w-2xl quote-section mt-8 px-4 md:px-0">
              <div className="relative flex flex-col md:flex-row items-start gap-4">
                {/* Quote Icon */}
                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg mt-2">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                  </svg>
                </div>

                {/* Quote Text */}
                <div className="flex-grow mt-4 md:mt-10">
                  <p className="text-base md:text-xl text-gray-700 leading-relaxed font-light">
                    We believe every bite should bring happiness, health, and a
                    little magic to your day. Food is the bridge that connects
                    hearts, creates memories,{" "}
                    <span className="font-semibold border-b-2 border-orange-400 pb-1">
                      and makes life flavorful.
                    </span>
                  </p>

                  <div className="flex items-center gap-4 mt-4">
                    <div className="w-12 h-0.5 bg-orange-400"></div>
                    <p className="text-md text-gray-600 font-medium">Viransh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RESTAURANT FACILITIES SECTION */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-orange-400 text-sm font-medium tracking-widest mb-2">
              - RESTAURANT FACILITIES -
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-800 tracking-tight">
              RESTAURANT SPECIAL
            </h1>
          </motion.div>

          {/* Facilities Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.id}
                className="bg-white rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={cardVariants}
                whileHover={{ y: -5 }}
              >
                {/* Image Container */}
                <motion.div
                  className="relative h-64 overflow-hidden"
                  variants={imageVariants}
                  initial="rest"
                  whileHover="hover"
                >
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </motion.div>

                {/* Content */}
                <motion.div
                  className="p-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <h3 className="text-xl font-black text-gray-800 mb-4 tracking-wide">
                    {facility.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {facility.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="w-16 h-1 bg-orange-400 rounded-full"></div>
          </motion.div>
        </div>
      </div>

      {/* ABOUT RESTAURANT SECTION */}
      <div className="bg-[#F9F5F2] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Background text */}
            <div className="hidden lg:block absolute -right-20 top-1/2 transform -translate-y-1/2">
              <span className="text-9xl font-extrabold text-[#EADBC8] opacity-50 transform -rotate-90 whitespace-nowrap">
                DELICIOUS DINING
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-0.5 bg-orange-400"></div>
                  <span className="text-orange-400 font-semibold text-sm tracking-widest">
                    ABOUT RESTAURANT
                  </span>
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
                  EXPERIENCE THE ORIGINAL
                  <br />
                  FLAVORS OF INDIA
                </h2>
                <p className="text-gray-500 mb-8">
                  Fresh, flavorful, and pure vegetarian — crafted with love,
                  tradition, and the finest ingredients. Every bite brings you
                  closer to the heart of Indian taste.
                </p>

                {/* Review Box */}
                <div className="bg-white p-6 rounded-md shadow-lg mb-8 inline-block">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold text-gray-800">
                      4.8
                    </span>
                    <div>
                      <div className="flex text-yellow-500">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                      <p className="text-gray-500 text-sm">Review by Google</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <FaHeart className="text-orange-400" />
                  <span>Authentic cultural experience.</span>
                </div>
              </div>

              {/* Right Content - Images */}
              <div className="relative h-[400px] sm:h-[600px] mt-8 sm:mt-0">
                <img
                  src="/chef_placeholder.png"
                  alt="Chef"
                  className="absolute z-10 w-full h-full object-contain scale-90 sm:scale-100"
                />

                {/* Decorative background circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-orange-100 rounded-full opacity-50"></div>

                {/* Dish images */}
                <div className="absolute top-[-5%] sm:top-[-10%] right-[-5%] sm:right-[-20%] w-32 sm:w-48 h-32 sm:h-50">
                  <img
                    src="/veg_pulao_bowl.png"
                    alt="Dish"
                    className="w-full h-full object-contain sm:object-cover"
                  />
                  <div
                    ref={leafEndRef}
                    className="absolute top-1/2 left-1/2 w-1 h-1"
                  ></div>
                </div>

                <img
                  src="/pulao.png"
                  alt="Dish"
                  className="absolute -bottom-4 sm:-bottom-8 left-[-10%] sm:left-[-40%] w-32 sm:w-48 h-32 sm:h-58 object-contain sm:object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS SECTION */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-16">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-orange-400 text-sm font-medium tracking-widest mb-2">
              - WHAT OUR GUESTS SAY -
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-800 tracking-tight">
              TESTIMONIALS
            </h1>
            <div className="flex items-center justify-center mt-4">
              <div className="flex text-yellow-500 text-2xl">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <span className="ml-3 text-gray-600 font-medium">
                25,000+ happy food lovers visited our authentic restaurant
              </span>
            </div>

            {/* Mobile Navigation Arrows */}
            <div className="flex justify-center items-center gap-4 mt-6 md:hidden">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-orange-400"
                onClick={() => {
                  const cards = document.querySelectorAll(
                    ".testimonial-card-mobile"
                  );
                  const activeCard = document.querySelector(
                    ".testimonial-card-mobile.active"
                  );
                  const currentIndex = Array.from(cards).indexOf(activeCard);
                  const prevIndex =
                    (currentIndex - 1 + cards.length) % cards.length;
                  activeCard.classList.remove("active");
                  cards[prevIndex].classList.add("active");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-orange-400"
                onClick={() => {
                  const cards = document.querySelectorAll(
                    ".testimonial-card-mobile"
                  );
                  const activeCard = document.querySelector(
                    ".testimonial-card-mobile.active"
                  );
                  const currentIndex = Array.from(cards).indexOf(activeCard);
                  const nextIndex = (currentIndex + 1) % cards.length;
                  activeCard.classList.remove("active");
                  cards[nextIndex].classList.add("active");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
          </motion.div>
        </div>

        {/* Desktop Infinite Scrolling Testimonials */}
        <div className="relative hidden md:block">
          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -100 * testimonials.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: testimonials.length * 8,
                ease: "linear",
              },
            }}
            whileHover={{
              animationPlayState: "paused",
            }}
            style={{
              width: `${testimonials.length * 2 * 400}px`,
            }}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={`desktop-${testimonial.id}`}
                className="flex-shrink-0 w-96 bg-white rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 mx-3"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex text-yellow-500 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-sm" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 text-sm line-clamp-4">
                  "{testimonial.review}"
                </p>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500 text-xs">
                        {testimonial.role}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-xs">
                        {testimonial.time}
                      </p>
                      <div className="flex items-center mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        <span className="text-xs text-green-600 font-medium">
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {/* Second set for seamless loop */}
            {testimonials.map((testimonial) => (
              <motion.div
                key={`desktop-second-${testimonial.id}`}
                className="flex-shrink-0 w-96 bg-white rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 mx-3"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex text-yellow-500 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-sm" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 text-sm line-clamp-4">
                  "{testimonial.review}"
                </p>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500 text-xs">
                        {testimonial.role}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-xs">
                        {testimonial.time}
                      </p>
                      <div className="flex items-center mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        <span className="text-xs text-green-600 font-medium">
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Desktop Gradient Overlays */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-amber-50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-amber-50 to-transparent pointer-events-none z-10"></div>
        </div>

        {/* Mobile Navigation Arrows */}
        <div className="md:hidden relative px-4 mb-8">
          <div className="flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={showPrevTestimonial}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-orange-400 z-20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={showNextTestimonial}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-orange-400 z-20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
        </div>

        {/* Mobile Single Card View */}
        <div className="md:hidden relative px-4">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonialIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full bg-white rounded-md shadow-lg p-6 mx-auto"
              >
                <div className="flex text-yellow-500 mb-4">
                  {[...Array(testimonials[currentTestimonialIndex].rating)].map(
                    (_, i) => (
                      <FaStar key={i} className="text-sm" />
                    )
                  )}
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                  "{testimonials[currentTestimonialIndex].review}"
                </p>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {testimonials[currentTestimonialIndex].name}
                      </h4>
                      <p className="text-gray-500 text-xs">
                        {testimonials[currentTestimonialIndex].role}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-xs">
                        {testimonials[currentTestimonialIndex].time}
                      </p>
                      <div className="flex items-center mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        <span className="text-xs text-green-600 font-medium">
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-12">
          <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full"></div>
        </div>
      </div>

      {/* Animated corindor Leaf */}
      <motion.img
        src="/corindor.png"
        alt="Floating corindor leaf"
        className="w-12 h-12 sm:w-20 sm:h-20 pointer-events-none"
        style={{
          position: "fixed",
          top: "80px",
          right: window.innerWidth < 640 ? "20px" : "80px", // Adjust right position for mobile
          zIndex: 1000,
          x: useTransform([leafX, leafSway], ([x, sway]) => x + sway),
          y: leafY,
          rotate: leafRotation,
          opacity: 1,
        }}
      />
    </div>
  );
};

export default AboutUs;
