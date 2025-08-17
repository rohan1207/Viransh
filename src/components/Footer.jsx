import React from "react";
import {
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

const InfoCard = ({ icon, title, lines }) => (
  <div className="text-center">
    <div className="flex justify-center mb-2 sm:mb-4">{icon}</div>
    <h3 className="font-bold text-xs sm:text-sm uppercase tracking-widest text-white mb-2 sm:mb-3">
      {title}
    </h3>
    {lines.map((line, index) => (
      <p key={index} className="text-gray-300 text-xs sm:text-sm">
        {line}
      </p>
    ))}
  </div>
);

const Footer = () => {
  const info = [
    {
      icon: <MessageSquare className="w-8 h-8 text-white" />,
      title: "About Restaurant",
      lines: ["Enjoy a wonderful cafe", "dining experience"],
    },
    {
      icon: <Phone className="w-8 h-8 text-white" />,
      title: "Let's Talk",
      lines: ["Phone: 9876543210", "Fax: 1234567890"],
    },
    {
      icon: <Mail className="w-8 h-8 text-white" />,
      title: "Book a Table",
      lines: ["info@viransh.com", "hr@viransh.com"],
    },
    {
      icon: <MapPin className="w-8 h-8 text-white" />,
      title: "Contact Us",
      lines: ["Viransh", "Baner"],
    },
  ];

  return (
    <footer
      className="relative bg-cover bg-center pt-24 pb-12"
      style={{ backgroundImage: `url(/footer.jpg)` }}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-70"
        aria-hidden="true"
      ></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Info Section */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-16 sm:mb-20 lg:mb-24">
          {info.map((item, index) => (
            <InfoCard
              key={index}
              icon={item.icon}
              title={item.title}
              lines={item.lines}
            />
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-xs sm:text-sm mb-4 md:mb-0">
            © Copyright {new Date().getFullYear()} Viransh
          </p>

          <div className="mb-4 md:mb-0">
            <img
              src="/circle_logo.png"
              alt="Viransh Logo"
              className="h-16 sm:h-20 md:h-24"
            />
          </div>

          <div className="flex space-x-6 sm:space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">
              <Facebook size={18} />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <Instagram size={18} />
            </a>
          </div>
        </div>
        {/* Attribution */}
        <div className="mt-6 sm:mt-8 text-center text-[10px] sm:text-[11px] tracking-wide text-gray-400">
          Designed &amp; Developed By{" "}
          <span className="text-gray-300 font-semibold">TheSocialKollab</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
