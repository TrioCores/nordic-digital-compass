import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Globe,
  Smartphone,
  Search,
  Palette,
  Headphones,
  BarChart,
  CheckCircle,
} from "lucide-react";

const Solutions = () => {
  const solutions = [
    {
      icon: Globe,
      title: "Hjemmeside udvikling",
      description:
        "Professionelle og moderne hjemmesider bygget med de nyeste teknologier for optimal performance og brugeroplevelse.",
      features: [
        "Responsivt design der fungerer på alle enheder",
        "SEO-optimeret struktur og indhold",
        "Hurtig indlæsning og optimal performance",
        "Moderne teknologier som React og TypeScript",
        "Sikker hosting i EU med SSL-certifikat",
        "Google Analytics integration",
      ],
      price: "Fra 2.495 kr. opstart",
    },
    {
      icon: Smartphone,
      title: "Mobil-optimering",
      description:
        "Sikr dig at din hjemmeside fungerer perfekt på alle enheder med vores mobile-first tilgang.",
      features: [
        "Mobile-first design filosofi",
        "Touch-venlig navigation og interaktion",
        "App-lignende brugeroplevelse",
        "Optimeret til små skærme",
        "Hurtig loading på mobile netværk",
        "Progressive Web App muligheder",
      ],
      price: "Inkluderet i alle pakker",
    },
    {
      icon: Search,
      title: "SEO & Synlighed",
      description:
        "Bliv fundet på Google og andre søgemaskiner med vores omfattende SEO-strategi.",
      features: [
        "Keyword research og optimering",
        "Google Analytics og Search Console setup",
        "Teknisk SEO optimering",
        "Indhold optimering for søgemaskiner",
        "Local SEO for lokale virksomheder",
        "Månedlig SEO rapportering",
      ],
      price: "Fra 349 kr./md.",
    },
    {
      icon: Palette,
      title: "Design & Branding",
      description:
        "Unikt design der afspejler dit brand og dine værdier med nordisk æstetik og moderne trends.",
      features: [
        "Nordisk design filosofi",
        "Brand guidelines og visuel identitet",
        "Custom illustrations og ikoner",
        "Farvepalette og typografi",
        "Logo design og optimization",
        "Style guide til fremtidig brug",
      ],
      price: "Fra 3.995 kr.",
    },
    {
      icon: Headphones,
      title: "Løbende support",
      description:
        "Vi er her når du har brug for hjælp, ændringer eller har spørgsmål til din hjemmeside.",
      features: [
        "Mail og chat support i åbningstiden",
        "Månedlige timer til ændringer",
        "Akut hjælp ved kritiske problemer",
        "Teknisk support og fejlretning",
        "Indhold opdateringer og tilføjelser",
        "Backup og sikkerhedsopdateringer",
      ],
      price: "1-2 timer inkluderet",
    },
    {
      icon: BarChart,
      title: "Performance & Analytics",
      description:
        "Følg din hjemmesides performance og få værdifuld indsigt i dine besøgendes adfærd.",
      features: [
        "Performance monitoring og alerts",
        "Detaljeret bruger analytics",
        "Månedlige performance rapporter",
        "Conversion tracking og optimering",
        "A/B testing muligheder",
        "Anbefalinger til forbedringer",
      ],
      price: "Fra 349 kr./md.",
    },
  ];

  return (
    <>
      <SEO
        title="Løsninger - Professionel webudvikling og hjemmesider"
        description="Se vores komplette løsninger for hjemmesider, webshops, SEO og digital markedsføring. Specialiseret i danske virksomheder med fast pris og ingen binding."
        keywords="hjemmeside løsninger, webudvikling, webshop, SEO tjenester, digital markedsføring, responsive design, e-commerce"
        canonical="https://nordweb.dk/solutions"
      />

      <div className="min-h-screen">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-b from-background via-secondary/10 to-background">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-fjord">
                Vores løsninger
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Vi tilbyder omfattende webløsninger der hjælper din virksomhed
                med at vokse online. Fra design til drift - vi håndterer det
                hele med nordisk kvalitet og gennemsigtighed.
              </p>
              <Button
                size="lg"
                className="nordic-button-primary px-8 py-6 text-lg"
                onClick={() =>
                  document
                    .getElementById("solutions-grid")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Se alle løsninger
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section
          id="solutions-grid"
          className="py-24 bg-gradient-to-b from-background via-secondary/20 to-background"
        >
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="nordic-hover-card nordic-card rounded-3xl p-8 group"
                >
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 flex-shrink-0">
                      <solution.icon className="text-primary" size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-fjord mb-2">
                        {solution.title}
                      </h3>
                      <p className="text-nordic-gold font-semibold">
                        {solution.price}
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 text-lg">
                    {solution.description}
                  </p>

                  <ul className="space-y-3">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle
                          className="text-nordic-gold mt-0.5 flex-shrink-0"
                          size={18}
                        />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 via-card to-nordic-gold/5">
          <div className="container mx-auto px-6">
            <div className="text-center nordic-card rounded-3xl p-12 bg-gradient-to-br from-primary/5 via-card to-nordic-gold/5 border border-primary/10 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-fjord mb-4">
                Klar til at komme i gang?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Lad os skabe den perfekte digitale løsning til din virksomhed.
                Book et uforpligtende møde og hør hvordan vi kan hjælpe dig.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="nordic-button-primary px-8 py-6 text-lg"
                  onClick={() => (window.location.href = "/contact")}
                >
                  Book gratis samtale
                  <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg border-primary/20 hover:bg-primary/5"
                  onClick={() => (window.location.href = "/")}
                >
                  Se vores priser
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Solutions;
