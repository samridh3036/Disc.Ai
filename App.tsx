import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Team from './pages/Team';
import About from './pages/About';
import Contact from './pages/Contact';
import { AnimatePresence, motion } from 'framer-motion';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Custom Cursor Component - Optimized for Performance
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on devices with a fine pointer (mouse) to save resources on mobile
    const mediaQuery = window.matchMedia('(pointer: fine)');
    
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const updateMousePosition = (e: MouseEvent) => {
      // Use requestAnimationFrame for smoother updates if needed, 
      // but state updates in React 18 are batched well enough usually.
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      // specific check for hoverable elements
      const hoverable = target.closest('a') || target.closest('button') || target.tagName === 'INPUT' || target.classList.contains('cursor-hover');
      setIsHovering(!!hoverable);
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        body { cursor: none; }
        a, button, input, textarea, select { cursor: none; }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block will-change-transform"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "white" : "transparent"
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          mass: 0.1
        }}
      />
      <motion.div
          className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block will-change-transform"
          animate={{
              x: mousePosition.x - 2,
              y: mousePosition.y - 2,
          }}
          transition={{ duration: 0 }}
      />
    </>
  );
};

// Particle Component - Optimized count
const ParticleBackground = () => {
  const [particles, setParticles] = useState<Array<{x: number, y: number, size: number, duration: number, delay: number}>>([]);

  useEffect(() => {
    // Reduced count for better mobile performance
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 15 : 25; 
    
    const newParticles = Array.from({ length: count }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Deep Space Gradients - Optimized with opacity */}
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow will-change-transform" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen will-change-transform" />
      
      {/* Grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>
      
      {/* Floating Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/20 blur-[1px] will-change-transform"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -50, 0], // Reduced movement range for performance
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
      
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <CustomCursor />
      <div className="relative min-h-screen bg-[#020202] text-white selection:bg-white selection:text-black font-sans">
        
        <ParticleBackground />
        
        <Navbar />
        
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/team" element={<Team />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;