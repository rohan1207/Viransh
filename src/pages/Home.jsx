import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SecondSection from "../components/second_Section";
import WhyChooseUs from "../components/WhyChooseUs";
import PopularDishes from "../components/PopularDishes";
import Ribbon from "../components/Ribbon";
import OwnerMessage from "../components/OwnerMessage";
import LocationPopup from "../components/LocationPopup";

const Home = () => {
  const [deliveryAllowed, setDeliveryAllowed] = useState(null);
  const [location, setLocation] = useState(null);
  const [blocked, setBlocked] = useState(false);

  return (
    <div>
      <LocationPopup
        onAllowed={(loc) => {
          setDeliveryAllowed(true);
          setLocation(loc);
        }}
        onBlocked={(loc) => {
          setDeliveryAllowed(false);
          setBlocked(true);
          setLocation(loc);
        }}
      />
      <Navbar />
      <Hero />
      <SecondSection />
      <WhyChooseUs />
      <PopularDishes />
      <Ribbon />
      <OwnerMessage />
      {/* Block site if not allowed */}
      {blocked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-xl p-7 max-w-sm w-full text-center border border-amber-100 relative animate-fadeIn">
            <h2 className="text-2xl font-bold mb-3 text-gray-800 tracking-tight">
              Outside Delivery Zone
            </h2>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              We currently deliver only within a{" "}
              <span className="font-semibold text-amber-600">5 km</span> radius
              of our restaurant. Your location is outside our delivery area, but
              you can still explore our menu & offerings.
            </p>
            <button
              onClick={() => setBlocked(false)}
              className="inline-flex items-center justify-center w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl shadow-md transition focus:outline-none focus:ring-4 focus:ring-amber-300"
              autoFocus
            >
              OK, Browse Website
            </button>
            <p className="mt-3 text-[10px] text-gray-400">
              Ordering will be disabled outside service area.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
