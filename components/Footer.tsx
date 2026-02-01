import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Globe } from 'lucide-react';
import { DiscovrrLogo } from './Navbar';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#030303] border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
      {/* Footer Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <DiscovrrLogo className="w-12 h-12" />
              <span className="text-3xl font-bold tracking-tighter font-display">discovrr.ai</span>
            </div>
            <p className="text-gray-500 max-w-sm text-lg font-light leading-relaxed">
              The dashboard for the AI era. Monitor, optimize, and dominate your brand's presence across generative engines.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs opacity-50">Product</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-500 hover:text-white transition-colors text-lg">Home</Link></li>
              <li><Link to="/about" className="text-gray-500 hover:text-white transition-colors text-lg">About Us</Link></li>
              <li><Link to="/team" className="text-gray-500 hover:text-white transition-colors text-lg">Team</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-white transition-colors text-lg">Request Demo</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs opacity-50">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors text-lg">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors text-lg">Terms of Service</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors text-lg">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6">
          <p className="text-gray-600 text-sm">© 2024 Discovrr.ai. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-gray-500 hover:text-[#FFCD1E] transition-colors transform hover:scale-110"><Twitter size={24} /></a>
            <a href="#" className="text-gray-500 hover:text-[#2A52BE] transition-colors transform hover:scale-110"><Linkedin size={24} /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors transform hover:scale-110"><Github size={24} /></a>
            <a href="#" className="text-gray-500 hover:text-[#FF4D4D] transition-colors transform hover:scale-110"><Globe size={24} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;