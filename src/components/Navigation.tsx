import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Compass } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const navItems = [
    { name: "Hjem", id: "hero" },
    { name: "Løsninger", id: "solutions" },
    { name: "Priser", id: "pricing" },
    { name: "Om os", id: "about" },
    { name: "Kontakt", id: "contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-card/95 backdrop-blur-lg border-b border-border/10 shadow-lg" 
        : "bg-transparent"
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer hover-scale"
            onClick={() => scrollToSection("hero")}
          >
            <Compass className="text-primary mr-2 animate-spin-slow" size={28} />
            <span className="text-xl font-bold text-fjord">Nordweb</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-fjord/80 hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
            <Button 
              onClick={() => scrollToSection("contact")}
              className="nordic-button-primary"
            >
              Kom i gang
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-fjord hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-fjord/80 hover:text-primary transition-colors duration-200 font-medium py-2"
                >
                  {item.name}
                </button>
              ))}
              <Button 
                onClick={() => scrollToSection("contact")}
                className="nordic-button-primary w-full mt-4"
              >
                Kom i gang
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;