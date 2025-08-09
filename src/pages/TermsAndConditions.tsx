import { motion } from "framer-motion";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-6 text-primary">
            Handelsbetingelser
          </h1>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Velkommen til vores handelsbetingelser. Læs venligst disse
              betingelser grundigt, før du bruger vores tjenester.
            </p>
            <h2 className="text-2xl font-semibold text-foreground">Betaling</h2>
            <p>
              Alle betalinger skal foretages via de accepterede betalingsmetoder
              på vores platform.
            </p>
            <h2 className="text-2xl font-semibold text-foreground">
              Refundering
            </h2>
            <p>
              Refunderinger behandles i henhold til vores politik. Kontakt os
              for yderligere information.
            </p>
            <p>Hvis du har spørgsmål, er du velkommen til at kontakte os.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
