import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SimpleHeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-secondary/30 to-background pt-32"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo and compass icon */}
          <div className="flex items-center justify-center mb-8">
            <Compass className="mr-3 text-primary" size={48} />
            <h1 className="text-3xl font-bold text-primary">NORDWEB</h1>
          </div>

          {/* Main heading */}
          <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-fjord via-primary to-nordic-gold bg-clip-text text-transparent leading-tight">
            <span>Få en stærk digital base</span>
            <span className="block text-4xl md:text-6xl mt-2">
              – bygget i Norden
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
            Hos Nordweb hjælper vi nystartede og mindre virksomheder med at
            komme professionelt online. Vi bygger hjemmesider med nordisk
            enkelhed, æstetik og en fast pris – uden bøvl.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="nordic-button-primary px-8 py-6 text-lg font-semibold min-w-[250px]"
              onClick={() => navigate("/solutions")}
            >
              Se vores løsninger
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-semibold min-w-[250px]"
              onClick={() => navigate("/contact")}
            >
              Få gratis konsultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleHeroSection;
