import { Button } from "@/components/ui/button";
import {
  Check,
  Compass,
  Anchor,
  HeartHandshake,
  Star,
  Shield,
  Clock,
  Users,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

const PricingSection = () => {
  const basisFeatures = [
    "Simpel hjemmeside med forside + kontakt/om os side",
    "Grundlæggende responsivt design",
    "Hosting og domæne inkluderet",
    "Basal SEO-optimering",
    "E-mail support",
  ];

  const standardFeatures = [
    "Alt det du får i Basis-pakken – plus mere",
    "Op til 10 sider og undersider", 
    "Mere avanceret hjælp til at blive fundet på Google",
    "Opsætning af Google Analytics, så du kan se hvem der besøger din side",
    "En blog eller nyhedssektion til at dele indhold",
    "Forbindelse til dine sociale medier",
    "Kontaktformular og andre interaktive elementer",
    "Hurtigere support – vi svarer inden for 1 arbejdsdag",
    "Månedlig backup og sikkerhedsovervågning",
  ];

  const proFeatures = [
    "Alt det du får i Standard-pakken – plus det hele taget til næste niveau",
    "Ubegrænset antal sider og avanceret funktionalitet",
    "Admin panel til selv at redigere indhold og billeder",
    "Avanceret hjælp til at blive fundet på Google og få din side til at køre lynhurtigt",
    "Webshop-funktion, så du kan sælge online",
    "Detaljerede analyser og rapporter, så du kan følge med i alt",
    "Skræddersyede funktioner bygget specielt til dig",
    "Ekstra hurtig support – svar inden for 4 timer",
    "Fast månedlig rådgivning og sparring",
    "Integration med andre systemer og apps via API",
    "Prioriteret teknisk support og vedligeholdelse",
  ];

  return (
    <section
      id="pricing"
      className="py-24 bg-gradient-to-b from-secondary/30 via-background to-secondary/30"
    >
      <div className="container mx-auto px-6">

        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Compass className="text-primary mr-2" size={36} />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-fjord dark:text-white">
            Vores løsninger
          </h2>

          <p className="text-xl text-muted-foreground dark:text-gray-200 mb-4">
            Abonnement og opstart
          </p>

          <p className="text-lg text-muted-foreground dark:text-gray-200 max-w-3xl mx-auto mb-6">
            Fast opstartspris og månedligt abonnement – vi sørger for alt det
            tekniske.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basis Package */}
          <div className="nordic-hover-card nordic-card rounded-3xl p-8 border-2 border-transparent hover:border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-full -mr-16 -mt-16"></div>

            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mr-4">
                  <Anchor className="text-primary" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-fjord dark:text-white">
                    Basis
                  </h3>
                  <p className="text-muted-foreground dark:text-gray-200">
                    Simpel startpakke til små virksomheder
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold text-fjord dark:text-white">
                    4.999 kr.
                  </span>
                  <span className="text-muted-foreground dark:text-gray-300 ml-2">opstart</span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-primary">
                    Fra 299 kr.
                  </span>
                  <span className="text-muted-foreground dark:text-gray-300 ml-2">/md. ekskl. moms</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {basisFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check
                      className="text-nordic-gold mr-3 mt-0.5 flex-shrink-0"
                      size={18}
                    />
                    <span className="text-muted-foreground dark:text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full nordic-button-primary py-6 text-lg font-semibold">
                Vælg Basis
                <Anchor className="ml-2" size={20} />
              </Button>
            </div>
          </div>

          {/* Standard Package - Featured */}
          <div className="nordic-hover-card nordic-card rounded-3xl p-8 border-2 border-nordic-gold/50 relative overflow-hidden bg-gradient-to-br from-card via-card to-nordic-gold/5">
            <div className="absolute top-2 right-6 bg-nordic-gold text-nordic-gold-foreground px-4 py-1 rounded-full text-sm font-semibold shadow-md">
              POPULÆR
            </div>

            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-nordic-gold/15 to-transparent rounded-full -mr-16 -mt-16"></div>

            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-nordic-gold/15 flex items-center justify-center mr-4">
                  <Compass className="text-nordic-gold" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-fjord dark:text-white">
                    Standard
                  </h3>
                  <p className="text-muted-foreground dark:text-gray-200">
                    Til voksende virksomheder med flere behov
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold text-fjord dark:text-white">
                    9.999 kr.
                  </span>
                  <span className="text-muted-foreground dark:text-gray-300 ml-2">opstart</span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-primary">
                    Fra 599 kr.
                  </span>
                  <span className="text-muted-foreground dark:text-gray-300 ml-2">/md. ekskl. moms</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {standardFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check
                      className="text-nordic-gold mr-3 mt-0.5 flex-shrink-0"
                      size={18}
                    />
                    <span className="text-muted-foreground dark:text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full nordic-button-primary py-6 text-lg font-semibold">
                Vælg Standard
                <Compass className="ml-2" size={20} />
              </Button>
            </div>
          </div>

          {/* Pro Package */}
          <div className="nordic-hover-card nordic-card rounded-3xl p-8 border-2 border-transparent hover:border-primary/20 relative overflow-hidden">
            <div className="absolute top-2 right-6 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold shadow-md">
              PREMIUM
            </div>

            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/15 to-transparent rounded-full -mr-16 -mt-16"></div>

            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mr-4">
                  <Star className="text-primary" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-fjord dark:text-white">
                    Pro
                  </h3>
                  <p className="text-muted-foreground dark:text-gray-200">
                    Komplet løsning til større virksomheder som har hensigt i en webshop.
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold text-fjord dark:text-white">
                    9.999 kr.
                  </span>
                  <span className="text-muted-foreground dark:text-gray-300 ml-2">opstart</span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-primary">
                    Fra 999 kr.
                  </span>
                  <span className="text-muted-foreground dark:text-gray-300 ml-2">/md. ekskl. moms</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {proFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check
                      className="text-nordic-gold mr-3 mt-0.5 flex-shrink-0"
                      size={18}
                    />
                    <span className="text-muted-foreground dark:text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full nordic-button-primary py-6 text-lg font-semibold">
                Vælg Pro
                <Star className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </div>
                <br />
{/* CTA Section */}
        <div className="text-center nordic-card rounded-3xl p-12 bg-gradient-to-br from-primary/5 via-card to-nordic-gold/5 border border-primary/10">
          <h3 className="text-3xl font-bold text-fjord mb-4">
            Klar til at komme i gang?
          </h3>
          <p className="text-xl text-muted-foreground dark:text-gray-300 mb-8 max-w-2xl mx-auto">
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
        {/* Subscription benefits */}
        <div className="mt-16 p-8 nordic-card rounded-2xl max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <HeartHandshake className="text-primary mx-auto mb-4" size={40} />
            <h3 className="text-2xl font-bold text-fjord dark:text-white mb-4">
              Hvad inkluderer abonnementet?
            </h3>
            <p className="text-muted-foreground dark:text-gray-200">
              Alle pakker inkluderer følgende ydelser som standard:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              "Hosting af hjemmeside og domæneadministration",
              "Teknisk vedligeholdelse og opdateringer",
              "Backup og sikkerhedsovervågning",
              "Support efter behov",
              "Basal SEO-optimering",
              "12 måneders binding",
              "Du ejer din hjemmeside",
              "Responstid: 2 arbejdsdage",
            ].map((benefit, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-nordic-gold mb-2"></div>
                <span className="text-sm text-muted-foreground dark:text-gray-200">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800/50">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="text-green-600 dark:text-green-400" size={20} />
              <span className="font-semibold text-green-800 dark:text-green-200">
                Du ejer din hjemmeside
              </span>
            </div>
            <p className="text-center text-green-700 dark:text-green-300 text-sm">
              Ønsker du at stoppe abonnementet efter bindingsperioden, kan vi
              overlevere hjemmesiden til dig.
            </p>
          </div>

          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800/50">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="text-blue-600 dark:text-blue-400" size={20} />
              <span className="font-semibold text-blue-800 dark:text-blue-200">
                Support og responstid
              </span>
            </div>
            <p className="text-center text-blue-700 dark:text-blue-300 text-sm">
              Vi svarer inden for 2 arbejdsdage i normal arbejdstid og håndterer 
              fejlrettelser, mindre ændringer og tekniske spørgsmål.
            </p>
          </div>

          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800/50">
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertTriangle className="text-red-600 dark:text-red-400" size={20} />
              <span className="font-semibold text-red-800 dark:text-red-200">
                Vigtig information om binding
              </span>
            </div>
            <p className="text-center text-red-700 dark:text-red-300 text-sm">
              Ved opsigelse inden bindingsperiodens udløb forfalder resterende 
              betalinger for hele bindingsperioden til betaling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
