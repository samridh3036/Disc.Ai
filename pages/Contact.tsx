import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-10">
          <div className="inline-block p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-6">
            <MessageSquare size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get Access</h1>
          <p className="text-gray-400 text-lg">
            Join the waitlist for the Discovrr dashboard or book a personalized demo.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
           <form className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Work Email</label>
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              
              <div>
                 <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
                 <input 
                    type="text" 
                    placeholder="Acme Inc." 
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                 />
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-300 mb-2">Message (Optional)</label>
                 <textarea 
                    rows={4}
                    placeholder="Tell us about your needs..." 
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                 />
              </div>

              <button 
                type="button"
                className="w-full bg-white text-black font-bold text-lg py-4 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group"
              >
                Request Access
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
           </form>

           <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <p className="text-gray-500 text-sm">Or email us directly at</p>
              <a href="mailto:hello@discovrr.ai" className="text-blue-400 hover:text-blue-300 font-medium flex items-center justify-center gap-2 mt-2">
                 <Mail size={16} /> Amarpreet@discovrr.ai
              </a>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
