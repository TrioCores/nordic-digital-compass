import { Users, Heart, User, Code } from "lucide-react";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-secondary/30 to-background"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Users className="text-primary mr-2" size={36} />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-fjord">
            Om os – Mød Nordweb
          </h2>

          <p className="text-2xl text-primary mb-6 font-semibold">
            To gutter. Én mission: At få dig og din virksomhed online.
          </p>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Vi er to danske webnørder med passion for design, teknologi og
            brugervenlighed. Nordweb blev skabt for at hjælpe iværksættere og
            små virksomheder med at komme trygt og professionelt online – uden
            stress og uden dyre bureauer.
          </p>
        </div>

        {/* Quote */}
        <div className="max-w-2xl mx-auto mb-16">
          <blockquote className="nordic-card rounded-2xl p-8 text-center relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 bg-nordic-gold rounded-full flex items-center justify-center">
                <Heart
                  className="text-nordic-gold-foreground"
                  size={16}
                  fill="currentColor"
                />
              </div>
            </div>

            <p className="text-xl text-fjord font-medium italic">
              "Vi tror på kvalitet, gennemsigtighed og personlig kontakt."
            </p>
          </blockquote>
        </div>

        {/* Meet the team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-fjord mb-4">
              Mød holdet bag Nordweb
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              To passionerede udviklere med forskellige styrker, to hjerner
              samme vision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Team Member 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateY: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
              className="nordic-card rounded-2xl p-8 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <motion.div
                className="w-20 h-20 bg-nordic-gold/10 rounded-full flex items-center justify-center mx-auto mb-6"
                whileHover={{
                  scale: 1.1,
                  transition: { type: "spring", stiffness: 500, damping: 20 },
                }}
              >
                <Code className="text-nordic-gold" size={32} />
              </motion.div>

              <motion.h4
                className="text-2xl font-bold mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Emil Hytting
              </motion.h4>
              <motion.p
                className="text-nordic-gold font-semibold mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Direktør & Udvikler
              </motion.p>

              <motion.div
                className="flex justify-center gap-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {["React", "Backend", "DesignAI"].map((skill, index) => (
                  <motion.div
                    key={skill}
                    className="px-3 py-1 bg-primary/15 rounded-full text-sm text-primary hover:bg-primary/20 transition-colors duration-200"
                    whileHover={{
                      scale: 1.05,
                      transition: {
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                      },
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>

              <motion.p
                className="text-muted-foreground mb-6 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Full-Stack udvikler med fokus på frontend og brugeroplevelse
                stærk indefor backend.
              </motion.p>

              <motion.div
                className="border-t pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <p className="text-sm font-medium mb-2">Seneste projekter:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {[
                    "Portfolie hjemmeside bygget i React.",
                    "AdminPanel til din hjemmeside med backend.",
                    "Database udvikling via SSMS.",
                  ].map((project, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0 + index * 0.1 }}
                    >
                      • {project}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Team Member 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateY: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
              className="nordic-card rounded-2xl p-8 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <motion.div
                className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
                whileHover={{
                  scale: 1.1,
                  transition: { type: "spring", stiffness: 500, damping: 20 },
                }}
              >
                <User className="text-primary" size={32} />
              </motion.div>

              <motion.h4
                className="text-2xl font-bold text-fjord mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Mikkel Wang
              </motion.h4>
              <motion.p
                className="text-primary font-semibold mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Direktør & Salgschef
              </motion.p>

              <motion.div
                className="flex justify-center gap-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {["Salg", "Ledelse", "Administration"].map((skill, index) => (
                  <motion.div
                    key={skill}
                    className="px-3 py-1 bg-primary/15 rounded-full text-sm text-primary hover:bg-primary/20 transition-colors duration-200"
                    whileHover={{
                      scale: 1.05,
                      transition: {
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                      },
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>

              <motion.p
                className="text-muted-foreground mb-6 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                Salgs- og ledelsesekspert med fokus på kundetilfredshed og
                forretningsudvikling.
              </motion.p>

              <motion.div
                className="border-t pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <p className="text-sm primary/15  font-medium mb-2">
                  Seneste projekter:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {["Udvikling af salgsstrategier og processer."].map(
                    (project, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + index * 0.1 }}
                      >
                        • {project}
                      </motion.li>
                    )
                  )}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
