import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import { FaCalendarAlt, FaUser, FaShoppingCart } from "react-icons/fa";
import { HiOutlineMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useCart();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [mobileOpen]);

  const links = ["Home", "Menu", "Offers", "About", "Gallery", "Contact"];

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`fixed w-full top-0 left-0 z-40 transition-colors duration-300 ${
          scrolled ? "bg-white/95 shadow-md backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <nav className="flex items-center justify-between h-16 lg:h-20 px-5 sm:px-8 lg:px-12">
          <a href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="logo"
              className="w-24 lg:w-[125px] h-24 lg:h-[125px] object-contain  lg:mt-0"
            />
          </a>
          {/* Desktop Primary Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a
                href={`/${link.toLowerCase()}`}
                key={link}
                className={`uppercase font-bold tracking-widest text-sm hover:text-amber-500 transition-colors duration-300 ${
                  scrolled ? "text-black" : "text-white"
                }`}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <Link
                to="/account"
                className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors duration-300 ${
                  scrolled
                    ? "text-black hover:bg-gray-100"
                    : "text-white hover:bg-white/20"
                }`}
              >
                <FaUser size={18} />
                <span className="font-semibold text-sm tracking-wide">
                  {user.name.split(" ")[0]}
                </span>
              </Link>
            ) : (
              <Link
                to="/account"
                className={`p-2 rounded-full transition-colors duration-300 ${
                  scrolled
                    ? "text-black hover:text-amber-500 hover:bg-gray-100"
                    : "text-white hover:text-amber-400 hover:bg-white/20"
                }`}
              >
                <FaUser size={18} />
              </Link>
            )}
            <Link
              to="/cart"
              className={`p-2 rounded-full transition-colors duration-300 relative ${
                scrolled
                  ? "text-black hover:text-amber-500 hover:bg-gray-100"
                  : "text-white hover:text-amber-400 hover:bg-white/20"
              }`}
            >
              <FaShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-gray-800 transition-colors duration-300 shadow-sm">
              <FaCalendarAlt />
              <span>Book a Table</span>
            </button>
          </div>

          {/* Mobile Right Section */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/cart"
              className={`p-2 rounded-full transition-colors duration-300 relative ${
                scrolled || mobileOpen
                  ? "text-black hover:bg-gray-100"
                  : "text-white hover:bg-white/20"
              }`}
            >
              <FaShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              aria-label="Toggle navigation"
              className={`p-2 rounded-md transition-colors duration-300 ${
                scrolled || mobileOpen ? "text-gray-900" : "text-white"
              }`}
              onClick={() => setMobileOpen(true)}
            >
              <HiOutlineMenu size={28} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Overlay Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={closeMobile}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-full bg-white shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-gray-200 mt-4">
            <a href="/" className="flex items-center">
              <img src="/logo.png" alt="logo" className="w-20 object-contain mt-5" />
            </a>
            <button
              onClick={closeMobile}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <HiX size={20} />
            </button>
          </div>
          <nav className="flex-grow flex flex-col gap-4 p-5">
            {links.map((link) => (
              <a
                key={link}
                href={`/${link.toLowerCase()}`}
                onClick={closeMobile}
                className="text-gray-800 font-semibold tracking-wide text-lg hover:text-amber-600 transition-all duration-300"
              >
                {link}
              </a>
            ))}
          </nav>
          <div className="p-5 border-t border-gray-200">
            <button className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-3 rounded-xl text-base font-semibold tracking-wide shadow-sm transition-colors">
              <FaCalendarAlt /> Book a Table
            </button>
            <div className="text-center mt-4">
              {user ? (
                <Link
                  to="/account"
                  onClick={closeMobile}
                  className="font-semibold text-gray-700 hover:text-black"
                >
                  View Account
                </Link>
              ) : (
                <Link
                  to="/account"
                  onClick={closeMobile}
                  className="font-semibold text-gray-700 hover:text-black"
                >
                  Login or Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
