import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram } from 'lucide-react';

// Team Member type
interface TeamMemberProps {
  name: string;
  role: string;
  subtitle: string;
  major?: string;
  imgUrl: string;
  delay?: number;
  linkedin?: string;
  instagram?: string;
}

// Team Member Data
const teamMembers: TeamMemberProps[] = [
  {
    name: "Samridh Joshi",
    role: "Tech Lead",
    subtitle: "IIT Kharagpur",
    imgUrl: "https://res.cloudinary.com/dq32hf0bc/image/upload/v1771147807/Samridh-removebg-preview_1_sc5bxy.png",
    delay: 0.1,
    linkedin: "https://www.linkedin.com/in/samridh-joshi-a570b0259/?originalSubdomain=in", // replace with real URL
    instagram: "https://www.instagram.com/_sxmridh/" // replace with real URL
  },
  {
    name: "Amarpreet Singh",
    role: "Strategy Lead",
    subtitle: "IIT Kharagpur",
    imgUrl: "https://res.cloudinary.com/dq32hf0bc/image/upload/v1770932402/1abd144c-68c8-497f-9849-ddea2e4022a3_eq3pho.jpg",
    delay: 0.2,
    linkedin: "https://www.linkedin.com/in/amarpreetonline/?originalSubdomain=in", // replace with real URL
    instagram: "https://www.instagram.com/preet22chill?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" // replace with real URL
  },
  {
    name: "Unnat Agrawal",
    role: "AI Lead",
    subtitle: "IIT Kharagpur",
    imgUrl: "https://res.cloudinary.com/dq32hf0bc/image/upload/v1770932044/unnat_om9rrq.jpg",
    delay: 0.3,
    linkedin: "https://www.linkedin.com/in/unnat-agrawal/?originalSubdomain=in", // replace with real URL
    instagram: "https://www.instagram.com/unnat_22?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" // replace with real URL
  }
];

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  role,
  subtitle,
  major,
  imgUrl,
  delay = 0,
  linkedin,
  instagram
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className="group relative flex flex-col h-full"
  >
    {/* Card Container */}
    <div className="relative bg-[#0A2A30] rounded-t-[100px] rounded-b-xl overflow-hidden pt-8 pb-8 px-6 text-center border border-white/5 hover:border-white/20 transition-all duration-300 shadow-2xl h-full">
      {/* Background Arc Effect */}
      <div className="absolute top-0 left-0 w-full h-40 bg-teal-800/20 rounded-t-[100px]" />

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
        
        <div className="w-12 h-0.5 bg-white/10 mb-6" />

        <div className="mt-auto space-y-1">
          <p className="text-white text-lg font-medium">{subtitle}</p>
          <p className="text-gray-400 text-sm font-light">{major}</p>
        </div>
        
        {/* Social Icons */}
        <div className="flex gap-4 mt-6 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/5 rounded-full hover:bg-white hover:text-black transition-colors"
              aria-label={`${name} LinkedIn`}
            >
              <Linkedin size={18} />
            </a>
          )}

          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/5 rounded-full hover:bg-white hover:text-black transition-colors"
              aria-label={`${name} Instagram`}
            >
              <Instagram size={18} />
            </a>
          )}
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
