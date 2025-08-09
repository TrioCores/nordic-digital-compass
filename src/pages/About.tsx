import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Heart,
  Coffee,
  Code,
  Globe,
  Users,
  Award,
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion for design",
      description:
        "Vi brænder for at skabe smukke og funktionelle digitale oplevelser",
    },
    {
      icon: Coffee,
      title: "Nordisk arbejdskultur",
      description:
        "Vi tror på balance, kvalitet og ærlighed i alt hvad vi laver",
    },
    {
      icon: Code,
      title: "Teknisk excellence",
      description: "Vi bruger de nyeste teknologier og best practices",
    },
    {
      icon: Globe,
      title: "Digital tilgængelighed",
      description: "Alle skal kunne være online - simpelt og overkommeligt",
    },
  ];

  const stats = [
    { number: "50+", label: "Tilfredse kunder" },
    { number: "100+", label: "Projekter leveret" },
    { number: "2", label: "År i branchen" },
    { number: "100%", label: "Kundetilfredshed" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-background via-secondary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-fjord">
              Om Nordweb
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              To danske webnørder med passion for design, teknologi og
              brugervenlighed. Vi hjælper iværksættere og små virksomheder med
              at komme trygt og professionelt online.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-gradient-to-b from-background via-secondary/20 to-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-fjord mb-6">
                Vores historie
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  Nordweb blev skabt ud fra en simpel observation: For mange små
                  virksomheder kæmper med at komme professionelt online uden at
                  skulle betale formuer til store bureauer eller kæmpe med
                  komplicerede systemer.
                </p>
                <p>
                  Vi troede på, at det kunne gøres bedre. Simplere. Mere
                  gennemsigtigt. Med nordisk kvalitet og uden skjulte
                  omkostninger.
                </p>
                <p>
                  I dag hjælper vi virksomheder i hele norden med at få en stærk
                  digital tilstedeværelse gennem vores abonnementsmodel, der gør
                  det muligt for alle at have en professionel hjemmeside.
                </p>
              </div>
            </div>
            <div className="nordic-card rounded-3xl p-8 bg-gradient-to-br from-primary/5 to-nordic-gold/5">
              <blockquote className="text-xl italic text-fjord mb-6">
                "Vi tror på kvalitet, gennemsigtighed og personlig kontakt. Hver
                kunde fortjener den bedste service - uanset størrelse."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="text-primary" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-fjord">Nordweb Team</p>
                  <p className="text-muted-foreground">Grundlæggere</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-fjord mb-6">
              Vores værdier
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Disse principper styrer alt hvad vi laver - fra den første skitse
              til den løbende support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="nordic-hover-card nordic-card rounded-2xl p-6 text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors duration-300">
                  <value.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-bold text-fjord mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-card to-nordic-gold/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-fjord mb-6">
              Nordweb i tal
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-8 mx-auto">
              <Award className="text-primary" size={32} />
            </div>
            <h2 className="text-4xl font-bold text-fjord mb-6">
              Vores mission
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              At gøre professionel webudvikling tilgængelig for alle
              virksomheder i Norden. Vi tror på, at enhver virksomhed fortjener
              en stærk digital tilstedeværelse - uden at skulle bruge en formue
              eller blive ekspert i teknologi.
            </p>
            <Button
              size="lg"
              className="nordic-button-primary px-8 py-6 text-lg"
              onClick={() => (window.location.href = "/contact")}
            >
              Bliv en del af historien
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
