import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQSection = () => {
  const faqs = [
    {
      question: "Er der binding?",
      answer:
        "Nej, vi tror ikke på lange bindingsperioder. Du har kun løbende måned + 1 måneds opsigelse. Dette giver dig frihed til at vælge til og fra, baseret på hvordan vores service fungerer for dig. Vi foretrækker at beholde vores kunder gennem god service frem for tvang.",
    },
    {
      question: "Kan jeg opsige når som helst?",
      answer:
        "Ja, du kan opsige dit abonnement når som helst med blot 1 måneds varsel. Send os en mail, og vi sørger for en smidig afvikling. Der er ingen skjulte gebyrer eller komplicerede procedurer – vi gør det så enkelt som muligt for dig.",
    },
    {
      question: "Hvad sker der hvis jeg opsiger?",
      answer:
        "Du beholder fuldt ejerskab til din hjemmeside, indhold og domæne. Vi leverer alle filer, billeder og data til dig i et format, du kan bruge videre. Hosting og løbende support stopper naturligvis, men du kan selv overtage driften eller finde en anden leverandør. Vi hjælper gerne med overlevering.",
    },
    {
      question: "Er hosting inkluderet?",
      answer:
        "Ja, hosting er inkluderet i alle vores abonnementer. Vi sørger for hurtig, sikker hosting i EU med automatiske backups, SSL-certifikater og regelmæssige opdateringer. Du skal ikke bekymre dig om tekniske detaljer – vi håndterer det hele, så din hjemmeside altid kører optimalt.",
    },
    {
      question: "Kan I lave specialfunktioner?",
      answer:
        "Absolut! Ud over vores standardpakker kan vi skræddersy løsninger til dine specifikke behov. Det kan være booking-systemer, medlemsområder, e-commerce funktioner eller integration med eksisterende systemer. Kontakt os med dine ønsker, så laver vi et tilbud der passer til dit budget og behov.",
    },
    {
      question: "Hvor hurtigt kan I levere en hjemmeside?",
      answer:
        "Typisk har vi en funktionel hjemmeside klar inden for 1-2 uger efter vi har modtaget alt indhold fra dig (tekster, billeder, logo etc.). Mere komplekse sider kan tage 3-4 uger. Vi starter altid med en grundig briefing, så du ved præcis hvad du kan forvente og hvornår.",
    },
    {
      question: "Hvad hvis jeg har brug for ændringer?",
      answer:
        "Mindre ændringer og justeringer er inkluderet i dit månedlige abonnement. Det kan være opdatering af tekster, nye billeder eller mindre designjusteringer. Større ændringer som nye sider eller funktioner prissættes separat, men vi giver altid et klart tilbud på forhånd.",
    },
    {
      question: "Får jeg hjælp til at skrive indhold?",
      answer:
        "Vi hjælper gerne med at strukturere dit indhold og giver råd om tekster der konverterer godt. Har du brug for professionel tekstforfatning, kan vi henvise til dygtige copywriters vi samarbejder med. Vores fokus er at sikre din hjemmeside kommunikerer tydeligt og effektivt.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <HelpCircle className="text-primary mr-2" size={36} />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-fjord">
            Ofte stillede spørgsmål
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Her finder du svar på de mest almindelige spørgsmål om vores
            tjenester og abonnementer.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="nordic-card rounded-2xl p-8">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border rounded-xl px-6 hover:border-primary/30 transition-colors duration-300"
                >
                  <AccordionTrigger className="text-left font-semibold text-fjord hover:text-primary py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
