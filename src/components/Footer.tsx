import {
  Compass,
  Linkedin,
  Instagram,
  Github,
  Mail,
  Phone,
  MapPin,
  Facebook,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-fjord via-fjord/95 to-fjord/90 text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company info */}
          <div>
            <div className="flex items-center mb-6">
              <Compass
                className="mr-3 text-nordic-gold animate-spin-slow"
                size={40}
              />
              <h3 className="text-2xl font-bold">NORDWEB</h3>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-lg leading-relaxed">
                <span className="text-nordic-gold font-semibold">
                  Skabt i Danmark.
                </span>{" "}
                Inspireret af norden.
              </p>
              <p className="text-white/80 leading-relaxed">
                Vi skaber moderne digitale løsninger med nordisk kvalitet og
                enkelhed. Din partner til at bringe din virksomhed online med
                stil og funktionalitet.
              </p>
            </div>

            {/* Contact info */}
            <div className="space-y-2 text-white/70">
              <div className="flex items-center">
                <Mail className="mr-3 text-nordic-gold" size={16} />
                <span>kontakt@nordweb.dk</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 text-nordic-gold" size={16} />
                <span>+45 12 34 56 78</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-3 text-nordic-gold" size={16} />
                <span>Aalborg, Danmark</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-nordic-gold">
              Tjenester
            </h4>
            <ul className="space-y-3 text-white/80">
              <li>
                <a
                  href="/solutions"
                  className="hover:text-nordic-gold transition-colors duration-300"
                >
                  Webudvikling
                </a>
              </li>
              <li>
                <a
                  href="/solutions"
                  className="hover:text-nordic-gold transition-colors duration-300"
                >
                  E-commerce
                </a>
              </li>
              <li>
                <a
                  href="/solutions"
                  className="hover:text-nordic-gold transition-colors duration-300"
                >
                  SEO Optimering
                </a>
              </li>
              <li>
                <a
                  href="/solutions"
                  className="hover:text-nordic-gold transition-colors duration-300"
                >
                  Digital Markedsføring
                </a>
              </li>
              <li>
                <a
                  href="/solutions"
                  className="hover:text-nordic-gold transition-colors duration-300"
                >
                  Branding
                </a>
              </li>
            </ul>
          </div>

          {/* Company & Policy */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-nordic-gold">
              Virksomhed
            </h4>
            <ul className="space-y-3 text-white/80">
              <li>
                <a
                  href="/about"
                  className="hover:text-nordic-gold transition-colors duration-300"
                >
                  Om os
                </a>
              </li>
              <li>
                <a
                  href="/portfolio"
                  className="hover:text-nordic-gold transition-colors duration-300"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-nordic-gold transition-colors duration-300"
                >
                  Kontakt
                </a>
              </li>
              <li>
                <Link
                  to="/privatlivspolitik"
                  className="hover:text-nordic-gold transition-colors duration-300"
                >
                  Privatlivspolitik
                </Link>
              </li>
              <li>
                <Link
                  to="/handelsbetingelser"
                  className="hover:text-nordic-gold transition-colors duration-300"
                >
                  Handelsbetingelser
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social media section */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4 text-nordic-gold">
                Følg os
              </h4>
              <div className="flex items-center space-x-4">
                <a
                  href="#"
                  className="group w-12 h-12 rounded-full bg-white/10 hover:bg-nordic-gold hover:scale-110 flex items-center justify-center transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin
                    className="text-white group-hover:text-fjord transition-colors duration-300"
                    size={20}
                  />
                </a>

                <a
                  href="#"
                  className="group w-12 h-12 rounded-full bg-white/10 hover:bg-nordic-gold hover:scale-110 flex items-center justify-center transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram
                    className="text-white group-hover:text-fjord transition-colors duration-300"
                    size={20}
                  />
                </a>

                <a
                  href="#"
                  className="group w-12 h-12 rounded-full bg-white/10 hover:bg-nordic-gold hover:scale-110 flex items-center justify-center transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook
                    className="text-white group-hover:text-fjord transition-colors duration-300"
                    size={20}
                  />
                </a>
              </div>
            </div>

            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-end mb-2">
                <Compass className="mr-2 text-nordic-gold" size={16} />
                <span className="text-white/70 text-sm">
                  Nordisk webudvikling med hjerte
                </span>
              </div>
              <p className="text-white/70 text-sm">
                &copy; 2025 Nordweb. Alle rettigheder forbeholdes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="h-1 bg-gradient-to-r from-nordic-gold via-nordic-gold/50 to-transparent"></div>
    </footer>
  );
};

export default Footer;
