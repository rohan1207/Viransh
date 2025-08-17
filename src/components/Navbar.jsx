import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import AuthContext from '../context/AuthContext';

import { FaCalendarAlt, FaUser, FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
        const { cartCount } = useCart();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    return (
        <header className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
            <nav className='flex items-center justify-between h-20 px-12'>
                <a href="/">
                    <img src="/logo.png" alt="logo" className='w-[125px] h-[125px]' />
                </a>
                <div className='hidden lg:flex items-center gap-8'>
                    {['Home', 'Menu', 'Offers', 'About','Gallery', 'Contact'].map((link) => (
                        <a href={`/${link.toLowerCase()}`} key={link} className={`uppercase font-bold tracking-widest text-sm hover:text-yellow-500 transition-colors duration-300 ${scrolled ? 'text-black' : 'text-white'}`}>
                            {link}
                        </a>
                    ))}
                </div>
                <div className='hidden lg:flex items-center gap-4'>
                    {/* Account Icon */}
                                        {user ? (
                        <Link to="/account" className={`flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors duration-300 ${scrolled ? 'text-black' : 'text-white'}`}>
                            <FaUser size={18} />
                            <span className="font-bold text-sm">{user.name.split(' ')[0]}</span>
                        </Link>
                    ) : (
                        <Link to="/account" className={`p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 ${scrolled ? 'text-black hover:text-yellow-500' : 'text-white hover:text-yellow-500'}`}>
                            <FaUser size={18} />
                        </Link>
                    )}
                    
                    {/* Cart Icon */}
                    <Link to="/cart" className={`p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 relative ${scrolled ? 'text-black hover:text-yellow-500' : 'text-white hover:text-yellow-500'}`}>
                        <FaShoppingCart size={18} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-orange-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    
                    {/* Book a Table Button */}
                    <button className='flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-gray-700 transition-colors duration-300'>
                        <FaCalendarAlt />
                        <span>Book a Table</span>
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
