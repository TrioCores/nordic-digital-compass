import { Button } from "@/components/ui/button";
import { Check, Compass, Anchor, Zap, HeartHandshake } from "lucide-react";

const PricingSection = () => {
  const fyrtaarnFeatures = [
    "Op til 5 sider (fx forside, ydelser, kontakt)",
    "Mobilvenligt responsivt design", 
    "Kontaktformular",
    "Hosting & domæneopsætning",
    "Basis SEO",
    "1 times support hver måned",
    "Løbende opdateringer & backups"
  ];

  const kompasFeatures = [
    "Alt fra Fyrtårn-pakken",
    "Blog eller nyhedssektion",
    "Google Analytics", 
    "Integration af sociale medier",
    "Flere design-tilpasninger",
    "2 timers support pr. måned",
    "Løbende performance-optimering"
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 via-background to-secondary/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Compass className="text-primary mr-2" size={36} />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-fjord">
            Vores løsninger
          </h2>
          
          <p className="text-xl text-muted-foreground mb-4">
            abonnement og opstart
          </p>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Vi gør det simpelt: Du betaler en lav opstartspris og et fast månedligt abonnement – så sørger vi for alt det tekniske.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Fyrtårn Package */}
          <div className="nordic-hover-card nordic-card rounded-3xl p-8 border-2 border-transparent hover:border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-full -mr-16 -mt-16"></div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mr-4">
                  <Anchor className="text-primary" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-fjord">Fyrtårn-pakken</h3>
                  <p className="text-muted-foreground">Perfekt til dig, der skal online for første gang</p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold text-fjord">2.495 kr.</span>
                  <span className="text-muted-foreground ml-2">opstart</span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-primary">249 kr.</span>
                  <span className="text-muted-foreground ml-2">/md.</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {fyrtaarnFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-nordic-gold mr-3 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full nordic-button-primary py-6 text-lg font-semibold">
                Vælg Fyrtårn
                <Anchor className="ml-2" size={20} />
              </Button>
            </div>
          </div>

          {/* Kompas Package - Featured */}
          <div className="nordic-hover-card nordic-card rounded-3xl p-8 border-2 border-nordic-gold/50 relative overflow-hidden bg-gradient-to-br from-card via-card to-nordic-gold/5">
            <div className="absolute top-4 right-4 bg-nordic-gold text-nordic-gold-foreground px-3 py-1 rounded-full text-sm font-semibold">
              POPULÆR
            </div>
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-nordic-gold/15 to-transparent rounded-full -mr-16 -mt-16"></div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-nordic-gold/15 flex items-center justify-center mr-4">
                  <Compass className="text-nordic-gold" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-fjord">Kompas-pakken</h3>
                  <p className="text-muted-foreground">Til dig, der ønsker mere funktionalitet og fleksibilitet</p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold text-fjord">3.995 kr.</span>
                  <span className="text-muted-foreground ml-2">opstart</span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-primary">349 kr.</span>
                  <span className="text-muted-foreground ml-2">/md.</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {kompasFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-nordic-gold mr-3 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full nordic-button-gold py-6 text-lg font-semibold hover:scale-105">
                Vælg Kompas
                <Compass className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Subscription benefits */}
        <div className="mt-16 p-8 nordic-card rounded-2xl max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <HeartHandshake className="text-primary mx-auto mb-4" size={40} />
            <h3 className="text-2xl font-bold text-fjord mb-4">Hvad får du i dit abonnement?</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              "Hosting og drift",
              "Sikkerhedsopdateringer", 
              "Tekniske rettelser",
              "Support på mail/chat",
              "Designjusteringer",
              "Fremtidig adgang til kundeportal",
              "Altid adgang til din hjemmeside",
              "Vi passer på den"
            ].map((benefit, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-nordic-gold mb-2"></div>
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/20">
            <p className="text-center text-fjord/80 text-sm">
              <strong>🛡️ Du ejer din hjemmeside.</strong> Ønsker du at stoppe abonnementet, kan vi overlevere den til dig.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;