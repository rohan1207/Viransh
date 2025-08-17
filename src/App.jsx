import React from 'react';
import Home from './pages/Home';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import AboutUs from './pages/AboutUs';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OurMenu from './pages/OurMenu';
import Gallery from './pages/Gallery';
import ContactPage from './pages/ContactPage';
import OffersPage from './pages/OffersPage';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';
import Account from './pages/Account';
import Checkout from './pages/Checkout';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route  path="/menu" element={<OurMenu />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/offers" element={<OffersPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/account" element={<Account />} />
      <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
