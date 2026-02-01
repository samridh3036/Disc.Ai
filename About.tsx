import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
         
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
         >
            <h1 className="text-5xl md:text-8xl font-bold mb-12 tracking-tight">
               The search paradigm <br/> has <span className="text-blue-500">shifted.</span>
            </h1>
         </motion.div>

         <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="col-span-1 md:col-span-8">
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.4, duration: 0.8 }}
                 className="prose prose-lg prose-invert"
               >
                  <p className="text-2xl text-gray-200 leading-relaxed font-light mb-8">
                     For two decades, 10 blue links ruled the internet. SEO was the game, and Google was the referee. That game is over.
                  </p>
                  <p className="text-gray-400 mb-6">
                     Generative AI models like ChatGPT, Gemini, and Claude are now the primary interface for information discovery. They don't give lists; they give answers.
                  </p>
                  <p className="text-gray-400 mb-6">
                     At <strong>Discovrr.ai</strong>, we realized that brands were flying blind in this new era. Traditional SEO tools couldn't parse LLM hallucinations, sentiment, or citation frequency. 
                  </p>
                  <p className="text-gray-400">
                     We built the first GEO (Generative Engine Optimization) dashboard to give control back to the creators, ensuring that when the world asks AI about you, the answer is accurate, positive, and authoritative.
                  </p>
               </motion.div>
            </div>

            <div className="col-span-1 md:col-span-4">
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.6, duration: 0.8 }}
                 className="bg-white/5 border border-white/10 rounded-2xl p-8"
               >
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Our Values</h3>
                  <ul className="space-y-6">
                     <li className="flex flex-col">
                        <span className="text-white font-bold text-lg">Truth in AI</span>
                        <span className="text-gray-500 text-sm">Combating hallucinations with structured data.</span>
                     </li>
                     <li className="flex flex-col">
                        <span className="text-white font-bold text-lg">Speed matters</span>
                        <span className="text-gray-500 text-sm">Real-time monitoring for a real-time world.</span>
                     </li>
                     <li className="flex flex-col">
                        <span className="text-white font-bold text-lg">Privacy First</span>
                        <span className="text-gray-500 text-sm">Your data strategies remain yours.</span>
                     </li>
                  </ul>
               </motion.div>
            </div>
         </div>

      </div>
    </div>
  );
};

export default About;