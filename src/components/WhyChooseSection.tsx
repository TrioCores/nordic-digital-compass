import {
  Shield,
  HeartHandshake,
  Palette,
  Zap,
  Package,
  Star,
  Bot,
} from "lucide-react";

const features = [
  {
    icon: HeartHandshake,
    title: "En fast digital partner",
    description: "Vi er med dig på hele rejsen",
  },
  {
    icon: Shield,
    title: "Løbende support og vedligeholdelse",
    description: "Du skal ikke bekymre dig om det tekniske",
  },
  {
    icon: Palette,
    title: "Et design der matcher dit brand",
    description: "Skræddersyet til netop din virksomhed",
  },
  {
    icon: Zap,
    title: "Simpelt, elegant og nordisk udtryk",
    description: "Ren æstetik der konverterer",
  },
  {
    icon: Bot,
    title: "Kunstig intelligens, der arbejder for dig",
    description:
      "Smart teknologi, der optimerer din hjemmeside for mest mulig effekt.",
  },
  {
    icon: Package,
    title: "Alt samlet ét sted – for én lav pris",
    description: "Ingen skjulte omkostninger eller overraskelser",
  },
];

const WhyChooseSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Star
              className="text-nordic-gold mr-2"
              size={32}
              fill="currentColor"
            />
            <Star className="text-primary mr-2" size={40} fill="currentColor" />
            <Star className="text-nordic-gold" size={32} fill="currentColor" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-fjord">
            Hvorfor vælge Nordweb?
          </h2>

          <p className="text-xl text-primary mb-4 font-semibold">
            Vi guider dig hele vejen – som dit digitale kompas.
          </p>

          <p className="text-lg text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto">
            Med Nordweb får du mere end bare en hjemmeside. Du får:
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="nordic-hover-card nordic-card rounded-2xl p-8 group"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                    <feature.icon
                      className="text-primary group-hover:text-nordic-gold transition-colors duration-300"
                      size={24}
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 rounded-full bg-nordic-gold mr-3"></div>
                    <h3 className="font-semibold text-fjord group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground dark:text-gray-300 group-hover:text-fjord/80 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
