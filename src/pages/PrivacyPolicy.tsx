import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-6 text-primary">
            Privatlivspolitik
          </h1>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Velkommen til vores privatlivspolitik. Vi værdsætter dit privatliv
              og er forpligtet til at beskytte dine personlige oplysninger.
            </p>
            <h2 className="text-2xl font-semibold text-foreground">
              Indsamling af oplysninger
            </h2>
            <p>
              Vi indsamler kun de oplysninger, der er nødvendige for at levere
              vores tjenester. Dette inkluderer navn, e-mail og andre relevante
              data.
            </p>
            <h2 className="text-2xl font-semibold text-foreground">
              Brug af oplysninger
            </h2>
            <p>
              Dine oplysninger bruges kun til at forbedre vores tjenester og
              sikre en bedre brugeroplevelse.
            </p>
            <p>Hvis du har spørgsmål, er du velkommen til at kontakte os.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
