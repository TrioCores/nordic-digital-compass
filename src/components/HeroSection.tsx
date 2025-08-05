import { Button } from "@/components/ui/button";
import { Compass, Mountain, Star, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Starfield */}
        <div className="star-float absolute top-20 left-1/4 text-primary/40">
          <Star size={16} fill="currentColor" />
        </div>
        <div className="star-float absolute top-32 right-1/3 text-primary/30" style={{ animationDelay: '1s' }}>
          <Star size={12} fill="currentColor" />
        </div>
        <div className="star-float absolute top-48 left-1/6 text-primary/50" style={{ animationDelay: '2s' }}>
          <Star size={14} fill="currentColor" />
        </div>
        <div className="star-float absolute top-40 right-1/4 text-primary/35" style={{ animationDelay: '0.5s' }}>
          <Star size={18} fill="currentColor" />
        </div>
        
        {/* Rotating compass background */}
        <div className="compass-rotate absolute top-16 right-16 text-primary/10">
          <Compass size={120} />
        </div>
        
        {/* Aurora effect */}
        <div className="aurora-bg absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-nordic-gold/5 opacity-60"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo and compass icon */}
          <div className="flex items-center justify-center mb-8">
            <Compass className="mr-3 text-primary" size={48} />
            <h1 className="text-3xl font-bold text-primary">NORDWEB</h1>
          </div>
          
          {/* Main heading */}
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-fjord via-primary to-nordic-gold bg-clip-text text-transparent leading-tight">
            Få en stærk digital base
            <span className="block text-4xl md:text-6xl mt-2">bygget i Norden</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
            Hos Nordweb hjælper vi nystartede og mindre virksomheder med at komme professionelt online. 
            Vi bygger hjemmesider med nordisk enkelhed, æstetik og en fast pris – uden bøvl.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="nordic-button-primary px-8 py-6 text-lg font-semibold min-w-[250px] pulse-cta"
            >
              Se vores løsninger
              <ArrowRight className="ml-2" size={20} />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="nordic-button-gold px-8 py-6 text-lg font-semibold min-w-[250px] border-2 border-nordic-gold text-nordic-gold hover:bg-nordic-gold hover:text-nordic-gold-foreground"
            >
              Book en gratis samtale
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mountain silhouette bottom */}
      <div className="absolute bottom-0 left-0 right-0 text-fjord/20">
        <svg viewBox="0 0 1200 120" className="w-full h-24">
          <path d="M0,120 L0,60 L200,30 L400,50 L600,20 L800,40 L1000,25 L1200,35 L1200,120 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;