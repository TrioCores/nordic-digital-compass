import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Compass } from "lucide-react";
import { LoginDialog } from "@/components/auth/LoginDialog";
import { UserMenu } from "@/components/auth/UserMenu";
import { supabase } from "@/lib/supabase";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navigateToPage = (path: string) => {
    window.location.href = path;
    setIsOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const navItems = [
    { name: "Hjem", path: "/" },
    { name: "Løsninger", path: "/solutions" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Om os", path: "/about" },
    { name: "Kontakt", path: "/contact" },
  ];

  return (
    <>
      {/* Demo Banner */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-2 px-4 text-sm font-medium shadow-lg">
        <div className="flex items-center justify-center gap-2">
          <span className="animate-pulse">🚧</span>
          <span>DEMO VERSION - Hjemmeside under udvikling</span>
          <span className="animate-pulse">🚧</span>
        </div>
      </div>

      <nav className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-card/95 backdrop-blur-lg border-b border-border/10 shadow-lg top-10" 
          : "bg-transparent top-10"
      }`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer hover-scale"
            onClick={() => navigateToPage("/")}
          >
            <Compass className="text-primary mr-2 animate-spin-slow" size={28} />
            <span className="text-xl font-bold text-fjord">Nordweb</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigateToPage(item.path)}
                className="text-fjord/80 hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
            <div className="flex items-center space-x-4">
              {user ? (
                <UserMenu />
              ) : (
                <LoginDialog />
              )}
              <Button 
                onClick={() => navigateToPage("/contact")}
                className="nordic-button-primary"
              >
                Kom i gang
              </Button>
            </div>
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
                  key={item.path}
                  onClick={() => navigateToPage(item.path)}
                  className="text-left text-fjord/80 hover:text-primary transition-colors duration-200 font-medium py-2"
                >
                  {item.name}
                </button>
              ))}
              <div className="flex flex-col space-y-2 mt-4">
                {user ? (
                  <UserMenu />
                ) : (
                  <LoginDialog />
                )}
                <Button 
                  onClick={() => navigateToPage("/contact")}
                  className="nordic-button-primary w-full"
                >
                  Kom i gang
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  );
};

export default Navigation;