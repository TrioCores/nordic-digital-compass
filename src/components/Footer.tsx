import { Compass, Linkedin, Instagram, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-fjord text-white py-16">
      <div className="container mx-auto px-6">
        
        {/* Main footer content */}
        <div className="text-center mb-12">
          
          {/* Logo and tagline */}
          <div className="flex items-center justify-center mb-8">
            <Compass className="mr-3 text-nordic-gold" size={48} />
            <h3 className="text-3xl font-bold">NORDWEB</h3>
          </div>
          
          {/* Nordic motto */}
          <div className="space-y-2 mb-8">
            <p className="text-lg">Skabt i Danmark.</p>
            <p className="text-lg text-nordic-gold">Inspireret af Norden.</p>
            <p className="text-lg">Din digitale partner.</p>
            <p className="text-lg">CVR: 45785513</p>
          </div>
          
          {/* Social links */}
          <div className="flex items-center justify-center space-x-6 mb-8">
            <a 
              href="#" 
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-nordic-gold/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="text-white hover:text-nordic-gold transition-colors duration-300" size={20} />
            </a>
            
            <a 
              href="#" 
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-nordic-gold/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Instagram className="text-white hover:text-nordic-gold transition-colors duration-300" size={20} />
            </a>
          </div>
        </div>
        
        {/* Bottom border */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/70">
            <p>&copy; 2025 Nordweb. Alle rettigheder forbeholdes.</p>
            <div className="flex items-center mt-4 md:mt-0">
              <Compass className="mr-2 text-nordic-gold" size={16} />
              <span>Nordisk webudvikling med hjerte</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;