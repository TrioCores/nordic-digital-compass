import { Shield, Lock, Users, FileText, RefreshCw, Coins } from "lucide-react";

const TrustSection = () => {
  const trustBadges = [
    {
      icon: Shield,
      title: "Dansk udviklet",
      description: "Skabt og drevet fra Danmark",
    },
    {
      icon: Lock,
      title: "GDPR-sikret hosting i EU",
      description: "Fuld databeskyttelse",
    },
    {
      icon: Users,
      title: "Support inkluderet i prisen",
      description: "Altid hjælp når du har brug for det",
    },
    {
      icon: FileText,
      title: "12 måneders binding",
      description: "Derefter kun 1 måneds opsigelse",
    },
    {
      icon: RefreshCw,
      title: "Backup og opdateringer med i abonnementet",
      description: "Vi passer på din hjemmeside",
    },
    {
      icon: Coins,
      title: "Fast pris fra 399 kr/md",
      description: "Ingen skjulte gebyrer eller overraskelser",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Shield className="text-nordic-gold mr-2" size={36} />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-fjord">
            Tryghed og transparens
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Når du vælger Nordweb, får du fuld ro i maven. Vores løsninger er
            skabt med sikkerhed, ejerskab og gennemsigtighed i centrum.
          </p>
        </div>

        {/* Trust badges grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {trustBadges.map((badge, index) => (
            <div
              key={index}
              className="nordic-hover-card nordic-card rounded-2xl p-6 group text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-nordic-gold/20 transition-all duration-300">
                <badge.icon
                  className="text-primary group-hover:text-nordic-gold transition-colors duration-300"
                  size={28}
                />
              </div>

              <h3 className="font-semibold text-fjord mb-2 group-hover:text-primary transition-colors duration-300">
                {badge.title}
              </h3>

              <p className="text-sm text-muted-foreground group-hover:text-fjord/80 transition-colors duration-300">
                {badge.description}
              </p>
            </div>
          ))}
        </div>

        {/* Danish flag and motto */}
        {/* <div className="mt-16 text-center">
          <div className="nordic-card rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="text-6xl mb-4">🇩🇰</div>
            <h3 className="text-xl font-bold text-fjord mb-2">Skabt i Danmark.</h3>
            <h3 className="text-xl font-bold text-primary mb-2">Inspireret af Norden.</h3>
            <h3 className="text-xl font-bold text-nordic-gold">Din digitale partner.</h3>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default TrustSection;
