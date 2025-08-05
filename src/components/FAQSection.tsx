import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQSection = () => {
  const faqs = [
    {
      question: "Er der binding?",
      answer: "Nej, kun løbende måned + 1."
    },
    {
      question: "Kan jeg opsige når som helst?",
      answer: "Ja – med 1 måneds varsel."
    },
    {
      question: "Hvad sker der hvis jeg opsiger?",
      answer: "Du ejer din hjemmeside. Drift og support stopper, men vi kan overlevere alt til dig."
    },
    {
      question: "Er hosting inkluderet?",
      answer: "Ja – vi håndterer det hele for dig."
    },
    {
      question: "Kan I lave specialfunktioner?",
      answer: "Ja – kontakt os, så skræddersyr vi en løsning."
    }
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
            Her finder du svar på de mest almindelige spørgsmål om vores tjenester og abonnementer.
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