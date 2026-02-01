import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, ChevronUp, Layers, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Assets & Icons ---
const OpenAIIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z" opacity="0.4"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 9.5 12 12l2.5-2.5M12 12v6" />
  </svg>
);

const GeminiIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5">
     <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" fill="currentColor" fillOpacity="0.2" />
     <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PerplexityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" strokeOpacity="0.5"/>
    <path d="M8 12h8m-4-4v8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
  </svg>
);

// --- 3D Tilt Card Component ---
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    // Only calculate tilt on desktop
    if (window.innerWidth < 768) return;
    
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);
  const sheenOpacity = useTransform(mouseY, [-300, 300], [0, 0.4]); 

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative transition-all duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
      {/* Glossy Sheen Overlay */}
      <motion.div 
         style={{ opacity: sheenOpacity }}
         className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none rounded-2xl z-20 mix-blend-overlay"
      />
    </motion.div>
  );
};

// --- FAQ Item Component ---
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 group">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 md:py-8 flex justify-between items-center text-left px-2 md:px-4 transition-all hover:bg-white/[0.02] cursor-hover"
      >
        <span className={`text-lg md:text-xl font-medium tracking-tight transition-all duration-300 pr-4 ${isOpen ? 'text-blue-400' : 'text-white/90 group-hover:text-white'}`}>
          {question}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
           <ChevronUp className={`transition-colors ${isOpen ? "text-blue-400" : "text-gray-600 group-hover:text-white"}`} />
        </motion.div>
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="pb-8 pt-2 px-2 md:px-4 text-gray-400 leading-relaxed max-w-2xl text-base md:text-lg font-light">{answer}</p>
      </motion.div>
    </div>
  );
};

// --- Main Page Component ---
const Home: React.FC = () => {
  const [currentEngine, setCurrentEngine] = useState(0);
  const containerRef = useRef(null);
  
  // Scroll Logic for Line Drawing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Dot Glow Synced to Line Progress
  const dot1Opacity = useTransform(scrollYProgress, [0, 0.1], [0.2, 1]);
  const dot1Scale = useTransform(scrollYProgress, [0, 0.1], [0.5, 1]);
  const dot1Shadow = useTransform(scrollYProgress, [0, 0.1], ["0 0 0px rgba(59,130,246,0)", "0 0 30px rgba(59,130,246,0.8)"]);

  const dot2Opacity = useTransform(scrollYProgress, [0.4, 0.5], [0.2, 1]);
  const dot2Scale = useTransform(scrollYProgress, [0.4, 0.5], [0.5, 1]);
  const dot2Shadow = useTransform(scrollYProgress, [0.4, 0.5], ["0 0 0px rgba(239,68,68,0)", "0 0 30px rgba(239,68,68,0.8)"]);

  const dot3Opacity = useTransform(scrollYProgress, [0.9, 1], [0.2, 1]);
  const dot3Scale = useTransform(scrollYProgress, [0.9, 1], [0.5, 1]);
  const dot3Shadow = useTransform(scrollYProgress, [0.9, 1], ["0 0 0px rgba(234,179,8,0)", "0 0 30px rgba(234,179,8,0.8)"]);


  // Mouse Parallax for Hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const handleHeroMouseMove = (e: React.MouseEvent) => {
    // Disable parallax on mobile
    if (window.innerWidth < 768) return;
    
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };
  const heroX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 100, damping: 20 });
  const heroY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), { stiffness: 100, damping: 20 });


  const engines = [
    { name: "ChatGPT", icon: <OpenAIIcon />, color: "text-green-400" },
    { name: "Gemini", icon: <GeminiIcon />, color: "text-blue-400" },
    { name: "Perplexity", icon: <PerplexityIcon />, color: "text-teal-400" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEngine((prev) => (prev + 1) % engines.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden" onMouseMove={handleHeroMouseMove}>
      
      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-24 md:pt-32 pb-20 overflow-hidden perspective-1000">
        
        {/* Dynamic Background Image - Spatial & Motion-like */}
        <div className="absolute inset-0 z-0">
           <motion.div 
             animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
             transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
             className="absolute inset-0 bg-cover bg-center opacity-60" 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')" }}
           />
           <div className="absolute inset-0 bg-[#020202]/50"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]/80"></div>
        </div>

        {/* Planet/Orb Effect with Parallax */}
        <motion.div 
            style={{ x: heroX, y: heroY }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow pointer-events-none z-0"
        />

        <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center justify-center relative mt-10">
          
          {/* Main Headline with Staggered Reveal */}
          <motion.div
             initial="hidden"
             animate="visible"
             variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
             }}
             className="relative mb-8 md:mb-10 w-full"
          >
              <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter leading-[0.95] text-white font-heading text-shadow-glow relative drop-shadow-xl break-words">
                <span className="block overflow-hidden mb-2">
                   <motion.span variants={{ hidden: { y: 100 }, visible: { y: 0, transition: { type: "spring", damping: 20 } } }} className="block">
                     TRANSFORM YOUR
                   </motion.span>
                </span>
                <span className="block overflow-hidden">
                   <motion.span variants={{ hidden: { y: 100 }, visible: { y: 0, transition: { type: "spring", damping: 20, delay: 0.1 } } }} className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-gray-400">
                     BRAND'S AI VISIBILITY
                   </motion.span>
                </span>
                {/* Glow behind text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/20 blur-[90px] -z-10"></div>
              </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-2xl text-gray-200 max-w-2xl font-light leading-relaxed mb-12 md:mb-16 drop-shadow-lg text-shadow-sm px-4"
          >
            The first GEO platform to monitor, optimize, and control your brand's narrative across the AI ecosystem.
          </motion.p>

          {/* New Prompt Bar Design */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="w-full max-w-3xl relative group mb-20 px-4"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-60 group-hover:opacity-80 blur transition duration-500 animate-gradient-x"></div>
            <div className="relative flex flex-col sm:flex-row items-center bg-[#0F0F0F]/90 backdrop-blur-xl rounded-3xl sm:rounded-full p-2 shadow-2xl ring-1 ring-white/20 gap-2 sm:gap-0">
              
              {/* Fake Dropdown - No Arrow */}
              <div className="flex items-center gap-2 px-5 py-3 bg-white/5 rounded-full border border-white/10 min-w-[150px] justify-center sm:justify-start w-full sm:w-auto hover:bg-white/10 transition-colors">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentEngine}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    className={`flex items-center gap-2 font-medium text-sm ${engines[currentEngine].color}`}
                  >
                     {engines[currentEngine].icon}
                     {engines[currentEngine].name}
                  </motion.div>
                </AnimatePresence>
              </div>

              <input 
                 type="text" 
                 disabled
                 placeholder="How is my brand ranking..." 
                 className="bg-transparent flex-1 text-white placeholder-gray-500 focus:outline-none font-medium h-12 px-6 text-lg w-full text-center sm:text-left"
              />
              <Link to="/contact" className="w-full sm:w-auto bg-white text-black px-8 py-3.5 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg cursor-hover whitespace-nowrap flex justify-center">
                Start Free
              </Link>
            </div>
          </motion.div>

          {/* Supported By Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col items-center gap-6 md:gap-8 px-4"
          >
             <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-semibold border-b border-gray-800 pb-2">Supported By</span>
             <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-60 hover:opacity-100 transition-opacity duration-500">
                <motion.span whileHover={{ scale: 1.1, color: '#fff' }} className="text-lg md:text-2xl font-bold text-gray-400 font-heading cursor-hover tracking-wide text-center">SNITCH</motion.span>
                <div className="w-1.5 h-1.5 bg-gray-800 rounded-full hidden md:block"></div>
                <motion.span whileHover={{ scale: 1.1, color: '#fff' }} className="text-lg md:text-2xl font-bold text-gray-400 font-heading cursor-hover tracking-wide text-center">Z21 Ventures</motion.span>
                <div className="w-1.5 h-1.5 bg-gray-800 rounded-full hidden md:block"></div>
                <motion.span whileHover={{ scale: 1.1, color: '#fff' }} className="text-lg md:text-2xl font-bold text-gray-400 font-heading cursor-hover tracking-wide text-center">IIT Kharagpur</motion.span>
             </div>
          </motion.div>

        </div>
      </section>

      {/* --- LADDER SECTION (Interactive & Moving Background) --- */}
      <section ref={containerRef} className="relative w-full bg-[#020202] py-24 md:py-40 overflow-hidden">
        
        {/* MOVING BACKGROUND LAYER */}
        <div className="absolute inset-0 z-0 pointer-events-none">
             {/* Scrolling Grid */}
             <div className="absolute inset-0 bg-grid opacity-[0.07] animate-grid"></div>
             
             {/* Drifting Blobs */}
             <motion.div 
               animate={{ x: [0, 100, 0], y: [0, -50, 0], opacity: [0.3, 0.6, 0.3] }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] will-change-transform" 
             />
             <motion.div 
               animate={{ x: [0, -100, 0], y: [0, 50, 0], opacity: [0.2, 0.5, 0.2] }}
               transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 5 }}
               className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] will-change-transform" 
             />
        </div>

        <div className="container max-w-6xl mx-auto px-6 relative z-10">
            
            {/* Central Connector Line - perfectly centered on mobile (left-8) and desktop (50%) */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2">
                <motion.div 
                  style={{ height: lineHeight }}
                  className="w-full bg-gradient-to-b from-blue-500 via-red-500 to-yellow-500 shadow-[0_0_15px_rgba(255,255,255,0.5)] will-change-transform"
                />
            </div>

            {/* ITEM 1: DISCOVRR */}
            <div className="relative flex flex-col md:flex-row items-center justify-between mb-32 md:mb-48 gap-8 md:gap-24">
                {/* Text Side (Left) */}
                <motion.div 
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.8 }}
                   viewport={{ once: true, margin: "-50px" }}
                   className="w-full md:w-[45%] text-left md:text-right pl-16 md:pl-0 md:pr-12"
                >
                    <span className="text-blue-500 font-mono text-xs md:text-sm tracking-widest uppercase mb-2 md:mb-4 block">01 Detection</span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-6 tracking-tight font-heading uppercase break-words">Discovrr</h2>
                    <p className="text-base md:text-xl text-gray-400 leading-relaxed font-light">
                       Visibility starts with measurement. Our engine probes 15+ LLMs simultaneously to map your brand's citation frequency and context.
                    </p>
                </motion.div>
                
                {/* Center Marker - Synced to Line */}
                <motion.div 
                  style={{ opacity: dot1Opacity, scale: dot1Scale, boxShadow: dot1Shadow }}
                  className="absolute left-8 md:left-1/2 -translate-x-1/2 w-6 h-6 bg-[#020202] border-[3px] border-blue-500 rounded-full z-20 top-0 md:top-1/2 md:-translate-y-1/2 flex items-center justify-center transform will-change-transform"
                >
                   <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </motion.div>

                {/* Visual Side (Right) - 3D Tilt */}
                <div className="w-full md:w-[45%] pl-16 md:pl-12 perspective-1000">
                   <TiltCard className="w-full aspect-video bg-[#0A0A0A] border border-white/10 rounded-2xl p-1 shadow-[0_0_50px_rgba(59,130,246,0.1)] group cursor-hover">
                       <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-transparent rounded-xl"></div>
                       <div className="w-full h-full bg-[#050505] rounded-xl border border-white/5 flex items-center justify-center relative overflow-hidden">
                          {/* Radar Visual */}
                          <div className="absolute w-[140%] h-[140%] border border-blue-500/20 rounded-full animate-spin-slow"></div>
                          <div className="absolute w-[100%] h-[100%] border border-blue-500/10 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
                          
                          {/* Floating Elements inside Visual */}
                          <motion.div 
                             animate={{ y: [-5, 5, -5] }} 
                             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                             className="relative z-10 flex flex-col items-center gap-4"
                          >
                             <Globe size={48} className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                             <div className="px-4 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-mono backdrop-blur-md">
                                SCANNING ECOSYSTEM
                             </div>
                          </motion.div>

                          {/* Data points */}
                          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                          <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s'}}></div>
                       </div>
                   </TiltCard>
                </div>
            </div>

            {/* ITEM 2: MONITOR */}
            <div className="relative flex flex-col md:flex-row-reverse items-center justify-between mb-32 md:mb-48 gap-8 md:gap-24">
                {/* Text Side (Right) */}
                <motion.div 
                   initial={{ opacity: 0, x: 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.8 }}
                   viewport={{ once: true, margin: "-50px" }}
                   className="w-full md:w-[45%] text-left pl-16 md:pl-12"
                >
                    <span className="text-red-500 font-mono text-xs md:text-sm tracking-widest uppercase mb-2 md:mb-4 block">02 Intelligence</span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-6 tracking-tight font-heading uppercase break-words">Monitor</h2>
                    <p className="text-base md:text-xl text-gray-400 leading-relaxed font-light">
                       Real-time telemetry for the AI age. Track hallucinations, sentiment shifts, and competitive share of voice as they happen.
                    </p>
                </motion.div>

                {/* Center Marker - Synced to Line */}
                <motion.div 
                  style={{ opacity: dot2Opacity, scale: dot2Scale, boxShadow: dot2Shadow }}
                  className="absolute left-8 md:left-1/2 -translate-x-1/2 w-6 h-6 bg-[#020202] border-[3px] border-red-500 rounded-full z-20 top-0 md:top-1/2 md:-translate-y-1/2 flex items-center justify-center transform will-change-transform"
                >
                   <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </motion.div>

                {/* Visual Side (Left) - 3D Tilt */}
                <div className="w-full md:w-[45%] pl-16 md:pl-0 md:pr-12 perspective-1000">
                    <TiltCard className="w-full aspect-video bg-[#0A0A0A] border border-white/10 rounded-2xl p-1 shadow-[0_0_50px_rgba(239,68,68,0.1)] group cursor-hover">
                        <div className="absolute inset-0 bg-gradient-to-tr from-red-900/10 via-transparent to-transparent rounded-xl"></div>
                        <div className="w-full h-full bg-[#050505] rounded-xl border border-white/5 flex items-end justify-center p-8 gap-4 relative overflow-hidden">
                           {/* Live Pulsing Chart */}
                           <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 backdrop-blur-sm">
                              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                              <span className="text-[10px] text-red-400 font-mono uppercase">Live Feed</span>
                           </div>
                           
                           {/* Animated Bars */}
                           <div className="w-12 bg-red-500/20 h-[40%] rounded-t-lg relative overflow-hidden group-hover:bg-red-500/30 transition-colors">
                              <div className="absolute bottom-0 w-full bg-red-500/50 animate-[height_3s_ease-in-out_infinite]" style={{ height: '100%' }}></div>
                           </div>
                           <div className="w-12 bg-red-500/20 h-[70%] rounded-t-lg relative overflow-hidden group-hover:bg-red-500/30 transition-colors">
                              <div className="absolute bottom-0 w-full bg-red-500/50 animate-[height_2s_ease-in-out_infinite]" style={{ height: '80%' }}></div>
                           </div>
                           <div className="w-12 bg-red-500/20 h-[50%] rounded-t-lg relative overflow-hidden group-hover:bg-red-500/30 transition-colors">
                              <div className="absolute bottom-0 w-full bg-red-500/50 animate-[height_4s_ease-in-out_infinite]" style={{ height: '60%' }}></div>
                           </div>
                           
                           {/* Graph Line overlay */}
                           <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" preserveAspectRatio="none">
                              <path d="M0 150 C 50 150, 100 100, 150 120 C 200 140, 250 50, 300 80" stroke="#EF4444" strokeWidth="2" fill="none" className="drop-shadow-lg" />
                           </svg>
                        </div>
                    </TiltCard>
                </div>
            </div>

            {/* ITEM 3: OPTIMIZE */}
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-24">
                {/* Text Side (Left) */}
                <motion.div 
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.8 }}
                   viewport={{ once: true, margin: "-50px" }}
                   className="w-full md:w-[45%] text-left md:text-right pl-16 md:pl-0 md:pr-12"
                >
                    <span className="text-yellow-500 font-mono text-xs md:text-sm tracking-widest uppercase mb-2 md:mb-4 block">03 Growth</span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-6 tracking-tight font-heading uppercase break-words">Optimize</h2>
                    <p className="text-base md:text-xl text-gray-400 leading-relaxed font-light">
                       Don't just be found—be the answer. We inject structured data and semantic context to position your brand as the authoritative source.
                    </p>
                </motion.div>
                
                {/* Center Marker - Synced to Line */}
                <motion.div 
                  style={{ opacity: dot3Opacity, scale: dot3Scale, boxShadow: dot3Shadow }}
                  className="absolute left-8 md:left-1/2 -translate-x-1/2 w-6 h-6 bg-[#020202] border-[3px] border-yellow-500 rounded-full z-20 top-0 md:top-1/2 md:-translate-y-1/2 flex items-center justify-center transform will-change-transform"
                >
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                </motion.div>

                {/* Visual Side (Right) - 3D Tilt */}
                <div className="w-full md:w-[45%] pl-16 md:pl-12 perspective-1000">
                    <TiltCard className="w-full aspect-video bg-[#0A0A0A] border border-white/10 rounded-2xl p-1 shadow-[0_0_50px_rgba(234,179,8,0.1)] group cursor-hover">
                        <div className="absolute inset-0 bg-gradient-to-bl from-yellow-500/10 via-transparent to-transparent rounded-xl"></div>
                        <div className="w-full h-full bg-[#050505] rounded-xl border border-white/5 flex items-center justify-center relative overflow-hidden">
                           {/* Neural Network Connections */}
                           <div className="absolute w-full h-full opacity-30 animate-pulse-slow">
                              <svg className="w-full h-full">
                                 <line x1="10%" y1="10%" x2="50%" y2="50%" stroke="#FFCD1E" strokeWidth="1" />
                                 <line x1="90%" y1="10%" x2="50%" y2="50%" stroke="#FFCD1E" strokeWidth="1" />
                                 <line x1="10%" y1="90%" x2="50%" y2="50%" stroke="#FFCD1E" strokeWidth="1" />
                                 <line x1="90%" y1="90%" x2="50%" y2="50%" stroke="#FFCD1E" strokeWidth="1" />
                                 <circle cx="50%" cy="50%" r="4" fill="#FFCD1E" />
                              </svg>
                           </div>
                           <motion.div 
                              whileHover={{ scale: 1.1, rotate: 180 }}
                              transition={{ duration: 0.5 }}
                              className="bg-[#0F0F0F] border border-yellow-500/30 p-6 rounded-full shadow-[0_0_60px_rgba(234,179,8,0.2)] relative z-10"
                           >
                              <Layers size={48} className="text-[#FFCD1E]" />
                           </motion.div>
                           
                           {/* Code snippets background */}
                           <div className="absolute top-4 left-6 text-[8px] text-yellow-500/20 font-mono">
                              {"{ \"@context\": \"https://schema.org\", \"@type\": \"Organization\" }"}
                           </div>
                           <div className="absolute bottom-4 right-6 text-[8px] text-yellow-500/20 font-mono text-right">
                              {"<meta name=\"ai-optimization\" content=\"true\" />"}
                           </div>
                        </div>
                    </TiltCard>
                </div>
            </div>

        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="w-full py-24 md:py-40 flex justify-center relative overflow-hidden bg-[#020202]">
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A] to-transparent"></div>
         <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-8xl font-black mb-8 md:mb-12 tracking-tighter text-white uppercase font-heading">
               Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Dominate?</span>
            </h2>
            <Link to="/contact" className="inline-flex items-center gap-4 bg-white hover:bg-gray-200 text-black px-8 md:px-12 py-4 md:py-6 rounded-full text-lg md:text-xl font-bold transition-all hover:scale-105 active:scale-95 group shadow-[0_0_40px_rgba(255,255,255,0.3)] cursor-hover">
               Request Access
               <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </Link>
         </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="w-full py-24 md:py-32 bg-[#020202] border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center tracking-tight uppercase font-heading text-white/50">Common Questions</h2>
          <div className="flex flex-col gap-2">
            <FAQItem 
              question="What is GEO optimization?" 
              answer="GEO (Generative Engine Optimization) is the systematic process of optimizing digital assets to be preferentially selected and synthesized by Large Language Models like ChatGPT, Gemini, and Claude." 
            />
            <FAQItem 
              question="How does Discovrr track AI sentiment?" 
              answer="We utilize a proprietary layer of analyzer agents that continuously query major LLMs with variations of buyer-intent prompts, analyzing the output for sentiment tone and factual accuracy." 
            />
            <FAQItem 
              question="Can I benchmark against competitors?" 
              answer="Yes. The dashboard allows for side-by-side comparison of Share of Voice (SOV) and citation frequency against defined competitor sets." 
            />
            <FAQItem 
              question="Is this different from traditional SEO?" 
              answer="Fundamentally. SEO optimizes for a list of blue links. GEO optimizes for the single, synthesized answer provided by an AI. The strategies for authority building differ significantly." 
            />
          </div>
        </div>
      </section>

      <style>{`
        .text-shadow-glow {
          text-shadow: 0 0 40px rgba(255,255,255,0.1);
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        .animate-gradient-x {
           background-size: 200% 200%;
           animation: gradient-x 3s ease infinite;
        }
        @keyframes gradient-x {
           0% { background-position: 0% 50%; }
           50% { background-position: 100% 50%; }
           100% { background-position: 0% 50%; }
        }
        .perspective-1000 {
           perspective: 1000px;
        }
        .perspective-origin-center {
           perspective-origin: center;
        }
      `}</style>
    </div>
  );
};

export default Home;