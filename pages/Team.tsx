import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, GraduationCap } from 'lucide-react';

// Team Member Data
const teamMembers = [
  {
    name: "Samridh Joshi",
    role: "Tech Lead",
    subtitle: "IIT Kharagpur 2026",
    major: "Chemical Engineering",
    imgUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop", // Professional Male Placeholder
    delay: 0.1
  },
  {
    name: "Amarpreet Singh",
    role: "Strategy Lead",
    subtitle: "IIT Kharagpur 2026",
    major: "Economics",
    imgUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop", // Professional Male Placeholder
    delay: 0.2
  },
  {
    name: "Unnat Agrawal",
    role: "Outreach Lead",
    subtitle: "IIT Kharagpur 2026",
    major: "Mathematics and Computing",
    imgUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop", // Professional Male Placeholder
    delay: 0.3
  }
];

const TeamMember: React.FC<typeof teamMembers[0]> = ({ name, role, subtitle, major, imgUrl, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className="group relative flex flex-col h-full"
  >
    {/* Card Container */}
    <div className="relative bg-[#0A2A30] rounded-t-[100px] rounded-b-xl overflow-hidden pt-8 pb-8 px-6 text-center border border-white/5 hover:border-white/20 transition-all duration-300 shadow-2xl h-full flex flex-col items-center">
        
        {/* Background Arc Effect */}
        <div className="absolute top-0 left-0 w-full h-40 bg-teal-800/20 rounded-t-[100px]"></div>

        {/* Image Container */}
        <div className="relative w-48 h-48 mb-6 mx-auto rounded-full overflow-hidden border-4 border-[#0A2A30] shadow-xl z-10 group-hover:scale-105 transition-transform duration-500">
           <img 
             src={imgUrl} 
             alt={name} 
             className="w-full h-full object-cover"
           />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center flex-grow w-full">
            <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
            <p className="text-teal-400 font-bold mb-4 uppercase text-sm tracking-wider">{role}</p>
            
            <div className="w-12 h-0.5 bg-white/10 mb-6"></div>

            <div className="mt-auto space-y-1">
                <p className="text-white text-lg font-medium">{subtitle}</p>
                <p className="text-gray-400 text-sm font-light">{major}</p>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-4 mt-6 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white hover:text-black transition-colors">
                    <Linkedin size={18} />
                </a>
                <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white hover:text-black transition-colors">
                    <Twitter size={18} />
                </a>
            </div>
        </div>
    </div>
  </motion.div>
);

const Team: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
       {/* Background Elements */}
       <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-teal-900/20 to-transparent pointer-events-none" />
       
       <div className="container mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
             <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-teal-900/30 border border-teal-500/30 text-teal-400 text-xs font-bold uppercase tracking-widest mb-6">
                <GraduationCap size={14} /> IIT Kharagpur Alumni
             </div>
             <h1 className="text-5xl md:text-7xl font-bold mb-6 font-heading">The Builders</h1>
             <p className="text-xl text-gray-400 font-light">
                We are a team of engineers and strategists from <span className="text-white font-medium">IIT Kharagpur</span>, obsessed with the future of search.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
             {teamMembers.map((member) => (
                <TeamMember key={member.name} {...member} />
             ))}
          </div>

          <div className="mt-32 text-center">
             <h2 className="text-3xl font-bold mb-8">Join the mission</h2>
             <a href="/contact" className="inline-block px-8 py-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors font-medium">
                View Open Roles
             </a>
          </div>
       </div>
    </div>
  );
};

export default Team;