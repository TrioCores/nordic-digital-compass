import { motion } from "framer-motion";
import Footer from "@/components/Footer";

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
          {/* Udvidet privatlivspolitik */}
          <h2 className="text-2xl font-semibold text-foreground mt-8">
            2. Formål med behandling af personoplysninger
          </h2>
          <ul className="list-disc ml-6">
            <li>
              Kundeservice og levering af ydelser
              <ul className="list-disc ml-6">
                <li>Administration af din abonnementsaftale</li>
                <li>Fakturering og betaling</li>
                <li>Support og opdateringer af hjemmesider</li>
              </ul>
            </li>
            <li>
              Drift og forbedring af vores egen hjemmeside
              <ul className="list-disc ml-6">
                <li>Analyse af besøgsstatistik (cookies)</li>
                <li>Optimering af brugeroplevelse</li>
              </ul>
            </li>
            <li>
              Markedsføring
              <ul className="list-disc ml-6">
                <li>Udsendelse af nyhedsbreve (kun med samtykke)</li>
                <li>Tilbud og kampagner (kun med samtykke)</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            3. Typer af personoplysninger
          </h2>
          <ul className="list-disc ml-6">
            <li>
              Navn, firmanavn og kontaktoplysninger (adresse, e-mail,
              telefonnummer)
            </li>
            <li>CVR-nummer</li>
            <li>Betalingsoplysninger</li>
            <li>IP-adresse og browserdata (ved brug af vores hjemmeside)</li>
            <li>
              Loginoplysninger til kundesystemer (hvis nødvendigt for opgaven)
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            4. Retsgrundlag
          </h2>
          <ul className="list-disc ml-6">
            <li>
              Opfyldelse af kontrakt (Databeskyttelsesforordningens artikel 6,
              stk. 1, litra b)
            </li>
            <li>
              Retlig forpligtelse (fx bogføringsloven – artikel 6, stk. 1, litra
              c)
            </li>
            <li>Samtykke (artikel 6, stk. 1, litra a) for markedsføring</li>
            <li>
              Legitim interesse (artikel 6, stk. 1, litra f) for
              driftsoptimering
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            5. Deling af personoplysninger
          </h2>
          <ul className="list-disc ml-6">
            <li>Vores hostingudbydere</li>
            <li>Underleverandører (fx domæneregistratorer)</li>
            <li>Revisor og bogholder</li>
            <li>Offentlige myndigheder, hvor lovgivningen kræver det</li>
          </ul>
          <p>Alle underleverandører har indgået databehandleraftaler med os.</p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            6. Overførsel til tredjelande
          </h2>
          <p>
            Vi overfører som udgangspunkt ikke dine oplysninger til lande uden
            for EU/EØS. Hvis det sker (fx ved brug af visse cloudtjenester),
            sikrer vi, at der er gyldigt overførselsgrundlag, typisk
            EU-Kommissionens standardkontrakter.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            7. Opbevaringsperiode
          </h2>
          <ul className="list-disc ml-6">
            <li>
              Bogføringsmateriale: 5 år efter regnskabsårets afslutning (jf.
              bogføringsloven)
            </li>
            <li>
              Kundeoplysninger: Slettes senest 12 måneder efter ophør af
              kundeforhold, medmindre andet aftales
            </li>
            <li>
              Samtykke til markedsføring: Gemmes, indtil det trækkes tilbage
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            8. Dine rettigheder
          </h2>
          <ul className="list-disc ml-6">
            <li>Få indsigt i de oplysninger, vi behandler om dig</li>
            <li>Få rettet urigtige oplysninger</li>
            <li>Få slettet oplysninger (“retten til at blive glemt”)</li>
            <li>Begrænse behandlingen</li>
            <li>
              Modtage dine oplysninger i et struktureret, maskinlæsbart format
              (dataportabilitet)
            </li>
            <li>Tilbagekalde samtykke til behandling (fx markedsføring)</li>
          </ul>
          <p>Anmodninger sendes til [E-mail].</p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            9. Sikkerhed
          </h2>
          <p>
            Vi har truffet tekniske og organisatoriske foranstaltninger for at
            beskytte dine oplysninger mod uautoriseret adgang, ændring, sletning
            eller offentliggørelse.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            10. Klage
          </h2>
          <p>
            Hvis du ønsker at klage over vores behandling af dine
            personoplysninger, kan du kontakte:
            <br />
            Datatilsynet
            <br />
            Carl Jacobsens Vej 35
            <br />
            2500 Valby
            <br />
            <a
              href="https://www.datatilsynet.dk"
              className="underline text-primary"
            >
              www.datatilsynet.dk
            </a>
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            11. Ændringer i privatlivspolitikken
          </h2>
          <p>
            Vi forbeholder os retten til at opdatere denne politik. Ændringer
            offentliggøres på vores hjemmeside med ny opdateringsdato.
          </p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
