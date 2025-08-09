import { motion } from "framer-motion";
import Footer from "@/components/Footer";

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
          {/* Udvidede handelsbetingelser */}
          <h2 className="text-2xl font-semibold text-foreground mt-8">
            2. Ydelser
          </h2>
          <p>
            NordWeb leverer hosting, domæneregistrering, vedligeholdelse,
            opdatering, SEO og support i henhold til den valgte abonnementsplan.
            <br />
            Det præcise indhold af ydelsen fremgår af abonnementsaftalen eller
            ordrebekræftelsen.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            3. Aftaleindgåelse
          </h2>
          <ul className="list-disc ml-6">
            <li>
              En aftale er bindende, når NordWeb har bekræftet kundens
              bestilling skriftligt (f.eks. via e-mail).
            </li>
            <li>Ved aftaleindgåelse accepterer kunden disse vilkår.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            4. Betaling
          </h2>
          <ul className="list-disc ml-6">
            <li>
              Abonnementet faktureres månedligt eller årligt forud, medmindre
              andet er aftalt.
            </li>
            <li>Betaling skal ske senest 8 dage efter fakturadato.</li>
            <li>
              Ved forsinket betaling kan der pålægges rykkergebyr og morarenter
              i henhold til renteloven.
            </li>
            <li>
              Manglende betaling kan medføre midlertidig suspension af
              tjenesterne.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            5. Kundens forpligtelser
          </h2>
          <ul className="list-disc ml-6">
            <li>At give korrekte oplysninger ved oprettelse.</li>
            <li>
              At overholde gældende lovgivning ved brug af NordWebs tjenester.
            </li>
            <li>
              Ikke at anvende tjenesterne til ulovlige formål, spam, malware
              eller lignende aktiviteter.
            </li>
            <li>At sikre, at loginoplysninger opbevares sikkert.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            6. Brugsret
          </h2>
          <ul className="list-disc ml-6">
            <li>
              Kunden får en ikke-eksklusiv, ikke-overdragelig licens til at
              bruge den leverede hjemmeside og software i abonnementsperioden.
            </li>
            <li>Alt indhold leveret af kunden tilhører kunden.</li>
            <li>
              Kode, scripts og tekniske funktioner udviklet af NordWeb forbliver
              NordWebs ejendom, medmindre andet er skriftligt aftalt.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            7. Oppetid &amp; SLA
          </h2>
          <ul className="list-disc ml-6">
            <li>NordWeb tilstræber en oppetid på 99,9 % pr. måned.</li>
            <li>
              Planlagt vedligeholdelse varsles minimum 48 timer i forvejen.
            </li>
            <li>
              SLA-detaljer fremgår af særskilt dokument (Service Level
              Agreement).
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            8. Support
          </h2>
          <ul className="list-disc ml-6">
            <li>
              Support ydes inden for åbningstiderne mandag–fredag kl.
              09:00–16:00 (CET).
            </li>
            <li>Kritiske fejl besvares inden for 2 timer i åbningstiden.</li>
            <li>
              Support uden for åbningstid kan tilbydes efter særskilt aftale.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            9. Ansvarsbegrænsning
          </h2>
          <ul className="list-disc ml-6">
            <li>
              NordWeb er ikke ansvarlig for driftstab, tab af data eller
              indirekte tab, medmindre dette skyldes grov uagtsomhed.
            </li>
            <li>
              Kompensation ved overskridelse af SLA-garanti kan højst udgøre en
              måneds abonnementsbetaling.
            </li>
            <li>
              NordWeb er ikke ansvarlig for fejl forårsaget af
              tredjepartstjenester eller kundens egen software.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            10. Opsigelse
          </h2>
          <ul className="list-disc ml-6">
            <li>
              Abonnementet kan opsiges med 30 dages skriftligt varsel til
              udgangen af en betalingsperiode.
            </li>
            <li>
              Ved opsigelse slettes kundens data 14 dage efter ophør, medmindre
              andet aftales.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            11. Ændringer af vilkår
          </h2>
          <p>
            NordWeb kan ændre disse vilkår med 30 dages varsel.
            <br />
            Ændringer meddeles via e-mail og/eller på NordWebs hjemmeside.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            12. Databehandling
          </h2>
          <ul className="list-disc ml-6">
            <li>
              NordWeb behandler personoplysninger i overensstemmelse med
              gældende databeskyttelseslovgivning (GDPR).
            </li>
            <li>
              En særskilt Databehandleraftale er en integreret del af denne
              aftale, hvis NordWeb behandler data på vegne af kunden.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            13. Lovvalg og værneting
          </h2>
          <p>
            Aftalen er underlagt dansk ret, og eventuelle tvister afgøres ved
            byretten i NordWebs hjemting.
          </p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
