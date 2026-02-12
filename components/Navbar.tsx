import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// DiscovrrLogo now renders an image from the public folder
export const DiscovrrLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <img
    src="/images/d-logo.png"
    alt="discovrr logo"
    className={className}
    loading="lazy"
    draggable={false}
  />
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Team', path: '/team' },
  ];

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="liquid-glass rounded-full px-2 py-2 flex items-center justify-between gap-4 max-w-5xl w-full md:w-auto"
        >
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 pl-2 pr-6 group cursor-hover">
             <DiscovrrLogo className="w-8 h-8 transition-transform group-hover:scale-110" />
             <span className="font-bold text-lg tracking-tight hidden md:block group-hover:text-white/80 transition-colors font-heading">discovrr.ai</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 bg-black/20 rounded-full px-1 py-1 border border-white/5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-6 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 cursor-hover ${
                  location.pathname === link.path 
                    ? 'text-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-2 pl-2">
            <Link 
              to="/contact"
              className="hidden md:flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all group cursor-hover"
            >
              Get Access
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-hover"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#020202]/98 backdrop-blur-xl pt-32 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-bold tracking-tighter text-white/90 hover:text-white font-heading"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-8 bg-white text-black px-6 py-5 rounded-2xl text-xl font-bold"
              >
                Get Access
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
