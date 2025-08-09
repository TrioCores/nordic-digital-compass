import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Globe,
  Smartphone,
  Search,
  Palette,
  Headphones,
  BarChart,
} from "lucide-react";
import { motion } from "framer-motion";

const SolutionsSection = () => {
  const solutions = [
    {
      icon: Globe,
      title: "Hjemmeside udvikling",
      description:
        "Professionelle og moderne hjemmesider bygget med de nyeste teknologier",
      features: ["Responsivt design", "SEO-optimeret", "Hurtig indlæsning"],
    },
    {
      icon: Smartphone,
      title: "Mobil-optimering",
      description:
        "Sikr dig at din hjemmeside fungerer perfekt på alle enheder",
      features: [
        "Mobile-first design",
        "Touch-venlig",
        "App-lignende oplevelse",
      ],
    },
    {
      icon: Search,
      title: "SEO & Synlighed",
      description: "Bliv fundet på Google og andre søgemaskiner",
      features: [
        "Keyword optimering",
        "Google Analytics",
        "Søgemaskine indeksering",
      ],
    },
    {
      icon: Palette,
      title: "Design & Branding",
      description: "Unikt design der afspejler dit brand og dine værdier",
      features: ["Nordisk æstetik", "Brand guidelines", "Visuel identitet"],
    },
    {
      icon: BarChart,
      title: "Performance & Analytics",
      description: "Følg din hjemmesides performance og få værdifuld indsigt",
      features: [
        "Performance monitoring",
        "Bruger analytics",
        "Månedlige rapporter",
      ],
    },
    {
      icon: Headphones,
      title: "Løbende support",
      description: "Vi er her når du har brug for hjælp eller ændringer",
      features: ["Mail & chat support", "Månedlige timer", "Akut hjælp"],
    },
  ];

  return (
    <section
      id="solutions"
      className="py-24 bg-gradient-to-b from-background via-secondary/20 to-background"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-fjord">
            Vores løsninger
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Vi tilbyder omfattende webløsninger der hjælper din virksomhed med
            at vokse online. Fra design til drift - vi håndterer det hele.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="nordic-hover-card nordic-card rounded-2xl p-8 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <solution.icon className="text-primary" size={32} />
              </div>

              <h3 className="text-xl font-bold text-fjord mb-4">
                {solution.title}
              </h3>

              <p className="text-muted-foreground mb-6">
                {solution.description}
              </p>

              <ul className="space-y-2">
                {solution.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-sm text-muted-foreground"
                  >
                    <div className="w-2 h-2 rounded-full bg-nordic-gold mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Domain Check Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="nordic-card rounded-2xl p-6 md:p-8 border-2 border-nordic-gold/20 bg-gradient-to-br from-nordic-gold/5 to-primary/5"
          >
            <div className="text-center mb-6">
              <motion.div
                className="w-16 h-16 bg-nordic-gold/10 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Globe className="text-nordic-gold" size={28} />
              </motion.div>

              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-fjord mb-4 px-2">
                ⚠️ Vigtig: Tjek dit domænenavn først!
              </h3>

              <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto px-4 leading-relaxed">
                Inden du booker et møde med os, skal du sikre dig at dit ønskede
                domænenavn (f.eks. ditfirma.dk) ikke allerede er optaget. Det
                sparer os alle for tid og undgår skuffelser senere i processen.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mb-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/50 rounded-xl p-4 md:p-6"
              >
                <h4 className="font-semibold text-fjord mb-3 flex items-center flex-wrap">
                  <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm mr-2 flex-shrink-0">
                    ✓
                  </span>
                  <span>Hvordan tjekker jeg?</span>
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="break-words">
                    • Gå til <strong>dk-hostmaster.dk</strong> eller{" "}
                    <strong>one.com</strong>
                  </li>
                  <li>• Søg på dit ønskede navn (f.eks. "mitfirma")</li>
                  <li>• Se om .dk, .com eller andre endelser er ledige</li>
                  <li>• Notér hvilke der er tilgængelige</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/50 rounded-xl p-4 md:p-6"
              >
                <h4 className="font-semibold text-fjord mb-3 flex items-center flex-wrap">
                  <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mr-2 flex-shrink-0">
                    i
                  </span>
                  <span>Gode råd</span>
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Vælg et kort og nemt navn</li>
                  <li>• Undgå bindestreger hvis muligt</li>
                  <li>• .dk er ofte bedst for danske virksomheder</li>
                  <li>• Overvej at sikre både .dk og .com</li>
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center"
            >
              <p className="text-amber-800 font-medium text-sm md:text-base leading-relaxed">
                <strong>Husk:</strong> Vi kan ikke starte dit projekt hvis dit
                ønskede domæne ikke er ledigt. Tjek det derfor før vores møde,
                så vi kan komme direkte i gang! 🚀
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <div className="text-center nordic-card rounded-3xl p-12 bg-gradient-to-br from-primary/5 via-card to-nordic-gold/5 border border-primary/10">
          <h3 className="text-3xl font-bold text-fjord mb-4">
            Klar til at komme i gang?
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Lad os skabe den perfekte digitale løsning til din virksomhed. Book
            et uforpligtende møde og hør hvordan vi kan hjælpe dig.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="nordic-button-primary px-8 py-6 text-lg"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Book gratis samtale
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg border-primary/20 hover:bg-primary/5"
              onClick={() =>
                document
                  .getElementById("pricing")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Se vores priser
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
