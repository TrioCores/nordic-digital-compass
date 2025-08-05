import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ArrowRight, Globe, Smartphone, Search } from "lucide-react";

const Portfolio = () => {
  const projects = [
    {
      title: "Nordisk Catering",
      description: "Moderne hjemmeside for cateringvirksomhed med online bestilling og menukort",
      category: "Restaurant & Mad",
      technologies: ["React", "SEO", "Booking System"],
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      features: ["Online bestilling", "Responsive design", "SEO optimeret"],
      results: "300% stigning i online bookinger"
    },
    {
      title: "Grøn Arkitekt",
      description: "Portfolio-site for bæredygtig arkitektfirma med fokus på miljøvenlige løsninger",
      category: "Arkitektur",
      technologies: ["Portfolio", "Mobil-venlig", "Analytics"],
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80",
      features: ["Interaktivt portfolio", "Projekt galleries", "Kontakt integration"],
      results: "150% flere henvendelser fra nye kunder"
    },
    {
      title: "FitLife Gym",
      description: "Dynamisk fitness-site med medlemsskab, holdplan og online træning",
      category: "Fitness & Sundhed",
      technologies: ["Booking", "Medlemssystem", "Video"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
      features: ["Holdplan integration", "Medlemsportal", "Online betalinger"],
      results: "200% stigning i nye medlemmer"
    },
    {
      title: "Nordisk Design Studio",
      description: "Kreativ portfolio for designstudio med fokus på brugeroplevelse og conversion",
      category: "Design & Kreativ",
      technologies: ["Portfolio", "Animation", "SEO"],
      image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&w=800&q=80",
      features: ["Animeret portfolio", "Case studies", "Klient testimonials"],
      results: "400% stigning i projektforespørgsler"
    },
    {
      title: "TechConsult AS",
      description: "Professionel B2B-site for konsulentvirksomhed med lead generation fokus",
      category: "Konsulenting",
      technologies: ["B2B", "Lead Generation", "Analytics"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      features: ["Lead capture forms", "Resource downloads", "Blog integration"],
      results: "250% flere kvalificerede leads"
    },
    {
      title: "Naturlig Wellness",
      description: "Holistisk wellness-center med booking system og e-commerce integration",
      category: "Wellness & Spa",
      technologies: ["E-commerce", "Booking", "SEO"],
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
      features: ["Online produktsalg", "Behandlingsbooking", "Kundeportal"],
      results: "180% stigning i online salg"
    }
  ];

  const stats = [
    { number: "50+", label: "Projekter leveret" },
    { number: "95%", label: "Kundetilfredshed" },
    { number: "200%", label: "Gennemsnitlig ROI" },
    { number: "24t", label: "Support responstid" }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-background via-secondary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-fjord">
              Vores portfolio
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Se hvordan vi har hjulpet virksomheder i hele Norden med at skabe stærke digitale tilstedeværelser 
              og opnå målbare resultater online.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-card to-nordic-gold/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-fjord mb-6">
              Udvalgte projekter
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hver hjemmeside er skræddersyet til kundens behov og målgruppe. 
              Her er nogle eksempler på vores arbejde.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {projects.map((project, index) => (
              <Card key={index} className="nordic-hover-card nordic-card rounded-3xl overflow-hidden group">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                      {project.category}
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      <ExternalLink size={16} />
                    </Button>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-fjord mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6">
                    {project.description}
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-fjord mb-2">Teknologier</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-fjord mb-2">Features</h4>
                      <ul className="space-y-1">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-nordic-gold mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <div className="flex items-center gap-2 text-nordic-gold font-semibold">
                      <Globe size={16} />
                      <span className="text-sm">{project.results}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-b from-background via-secondary/20 to-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-fjord mb-6">
              Vores proces
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Vi følger en struktureret proces for at sikre det bedste resultat for dit projekt.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <Search className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold text-fjord mb-4">1. Analyse & Planlægning</h3>
              <p className="text-muted-foreground">
                Vi analyserer dine behov, målgruppe og konkurrenter for at skabe den bedste strategi.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <Globe className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold text-fjord mb-4">2. Design & Udvikling</h3>
              <p className="text-muted-foreground">
                Vi designer og udvikler din hjemmeside med fokus på brugervenlighed og performance.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <Smartphone className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold text-fjord mb-4">3. Lancering & Support</h3>
              <p className="text-muted-foreground">
                Vi lancerer din site og sørger for løbende support, vedligeholdelse og optimering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-card to-nordic-gold/5">
        <div className="container mx-auto px-6">
          <div className="text-center nordic-card rounded-3xl p-12 bg-gradient-to-br from-primary/5 via-card to-nordic-gold/5 border border-primary/10 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-fjord mb-4">
              Klar til dit næste projekt?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Lad os skabe noget fantastisk sammen. Kontakt os i dag for en gratis konsultation 
              om dit næste digitale projekt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="nordic-button-primary px-8 py-6 text-lg"
                onClick={() => window.location.href = "/contact"}
              >
                Start dit projekt
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-6 text-lg border-primary/20 hover:bg-primary/5"
                onClick={() => window.location.href = "/solutions"}
              >
                Se vores løsninger
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;