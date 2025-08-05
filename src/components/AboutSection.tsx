import { Users, Heart, MapPin, Globe } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Users className="text-primary mr-2" size={36} />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-fjord">
            Om os – Mød Nordweb
          </h2>
          
          <p className="text-2xl text-primary mb-6 font-semibold">
            To gutter. Én mission: At få dig online.
          </p>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Vi er to danske webnørder med passion for design, teknologi og brugervenlighed.
            Nordweb blev skabt for at hjælpe iværksættere og små virksomheder med at komme trygt og professionelt online – uden stress og uden dyre bureauer.
          </p>
        </div>

        {/* Quote */}
        <div className="max-w-2xl mx-auto mb-16">
          <blockquote className="nordic-card rounded-2xl p-8 text-center relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 bg-nordic-gold rounded-full flex items-center justify-center">
                <Heart className="text-nordic-gold-foreground" size={16} fill="currentColor" />
              </div>
            </div>
            
            <p className="text-xl text-fjord font-medium italic">
              "Vi tror på kvalitet, gennemsigtighed og personlig kontakt."
            </p>
          </blockquote>
        </div>

        {/* Nordic Coverage */}
        <div className="nordic-card rounded-2xl p-8 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <MapPin className="text-primary mx-auto mb-4" size={40} />
            <h3 className="text-2xl font-bold text-fjord mb-4">Vi arbejder i hele Norden</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Hos Nordweb er vi baseret i Danmark – men vi hjælper kunder i hele Norden.
            </p>
          </div>

          <div className="flex items-center justify-center mb-8">
            <Globe className="text-primary mr-3" size={24} />
            <p className="text-fjord">
              Vi arbejder 100% digitalt – det betyder, at uanset om du sidder i Aarhus, Oslo eller på Færøerne, så kan vi hjælpe dig online.
            </p>
          </div>

          {/* Nordic countries */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { country: "Danmark", flag: "🇩🇰", status: "Hovedbase" },
              { country: "Sverige", flag: "🇸🇪", status: "Support" },
              { country: "Norge", flag: "🇳🇴", status: "Support" },
              { country: "Finland", flag: "🇫🇮", status: "Support" }
            ].map((item, index) => (
              <div 
                key={index}
                className="nordic-hover-card p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-all duration-300"
              >
                <div className="text-3xl mb-2">{item.flag}</div>
                <h4 className="font-semibold text-fjord">{item.country}</h4>
                <p className="text-sm text-muted-foreground">{item.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;