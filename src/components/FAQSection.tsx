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
        "Ja, vi har 12 måneders binding på alle vores abonnementer. Bindingsperioden skyldes blandt andet domænekøb, som har en standard løbetid på 12 måneder. Dette giver os også mulighed for at holde priserne lave og investere fuldt ud i din succes. Efter bindingsperioden kan du opsige med blot 1 måneds varsel. Hvis du opsiger inden bindingsperiodens udløb, forfalder de resterende månedlige betalinger til betaling.",
    },
    {
      question: "Hvad koster det at komme i gang?",
      answer:
        "Du betaler en engangspris på 9.999 kr. ekskl. moms for opsætning, design og initial konfiguration. Derefter betaler du en fast månedlig pris fra 399 kr. ekskl. moms afhængig af den pakke du vælger. Alle priser er transparente - ingen skjulte gebyrer.",
    },
    {
      question: "Kan jeg opsige efter bindingsperioden?",
      answer:
        "Ja, efter de første 12 måneder kan du opsige dit abonnement med blot 1 måneds varsel. Send os en mail, og vi sørger for en smidig afvikling. Du beholder fuldt ejerskab til din hjemmeside og kan overtage driften selv eller finde en anden leverandør.",
    },
    {
      question: "Hvad sker der hvis jeg opsiger tidligt?",
      answer:
        "Hvis du opsiger inden de 12 måneder er gået, forfalder de resterende månedlige betalinger for hele bindingsperioden til betaling. Dette er for at sikre en fair aftale for begge parter, da vi investerer betydeligt i opsætning og udvikling af din hjemmeside.",
    },
    {
      question: "Hvad er inkluderet i den månedlige pris?",
      answer:
        "Alt det tekniske er inkluderet: hosting i EU, SSL-certifikater, automatiske backups, sikkerhedsopdateringer, teknisk vedligeholdelse og support inden for 2 arbejdsdage. Du skal ikke bekymre dig om noget teknisk - vi håndterer det hele.",
    },
    {
      question: "Hvor hurtigt kan I levere en hjemmeside?",
      answer:
        "Typisk har vi en funktionel hjemmeside klar inden for 2-3 uger efter vi har modtaget alt indhold fra dig (tekster, billeder, logo etc.). Vi starter altid med en grundig briefing, så du ved præcis hvad du kan forvente og hvornår.",
    },
    {
      question: "Kan I lave specialfunktioner?",
      answer:
        "Absolut! Ud over vores standardpakker kan vi skræddersy løsninger til dine specifikke behov. Det kan være booking-systemer, medlemsområder, e-commerce funktioner eller integration med eksisterende systemer. Kontakt os med dine ønsker, så laver vi et tilbud der passer til dit budget.",
    },
    {
      question: "Hvad hvis jeg har brug for ændringer?",
      answer:
        "Mindre ændringer og justeringer er inkluderet i dit månedlige abonnement. Det kan være opdatering af tekster, nye billeder eller mindre designjusteringer. Større ændringer som nye sider eller funktioner prissættes separat, men vi giver altid et klart tilbud på forhånd.",
    },
    {
      question: "Får jeg support og hjælp?",
      answer:
        "Ja, support er inkluderet i alle pakker. Vi svarer inden for 2 arbejdsdage i normal arbejdstid og håndterer fejlrettelser, mindre ændringer og tekniske spørgsmål. Vi hjælper også gerne med råd om optimering og forbedringer af din hjemmeside.",
    },
    {
      question: "Ejer jeg min hjemmeside?",
      answer:
        "Ja, du ejer din hjemmeside fuldt ud. Efter bindingsperioden kan vi overlevere alle filer, billeder og data til dig, hvis du ønsker at overtage driften selv. Vi holder aldrig din hjemmeside som 'gidsel' - du har altid fuld kontrol og ejerskab.",
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

          <p className="text-lg text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto">
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
                  <AccordionContent className="text-muted-foreground dark:text-gray-300 pb-6 pt-2">
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
