import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Import assets



const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
     

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-black text-gray-800 mb-3 tracking-wide">
            CONTACT US
          </h1>
          <div className="flex items-center justify-center">
            <div className="h-0.5 w-16 bg-orange-400 mr-4"></div>
            <span className="text-orange-400 font-semibold text-sm tracking-widest">
            Delicious Meals, Happy Hearts.
            </span>
            <div className="h-0.5 w-16 bg-orange-400 ml-4"></div>
          </div>
        </motion.div>

        {/* Main Content: Map and Form */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-5xl mx-auto mb-8">
          {/* Left side - Map Image */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="/map.png"
              alt="Map of India with food"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Right side - Contact Form */}
          <motion.div
            className="flex-1 max-w-md"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white p-6 rounded-md shadow-lg">
              <h2 className="text-3xl font-black text-gray-800 mb-6 leading-tight">
                Let’s Cook Up a <br />Conversation
              </h2>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <h2 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h2>
                  <p className="text-gray-700">Your message has been sent successfully. We will get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name*"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email address*"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      placeholder="Your message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full bg-gray-800 text-white px-6 py-3 font-semibold tracking-widest hover:bg-gray-700 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    SEND A MESSAGE
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
          
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-12 max-w-7xl mx-auto">
          {/* Left side - Map */}
          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-full h-96 bg-gray-200 rounded-md overflow-hidden shadow-lg">
              {/* Placeholder for Google Maps - you'll replace this iframe src */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509347!2d144.95373531531603!3d-37.81627997975133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sau!4v1635123456789!5m2!1sen!2sau"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;