import { Button } from "@/components/ui/button";
import { Compass, Mountain, Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background pt-20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Enhanced Starfield with different speeds */}
        <motion.div
          className="star-float absolute top-20 left-1/4 text-primary/40"
          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Star size={16} fill="currentColor" />
        </motion.div>

        <motion.div
          className="star-float absolute top-32 right-1/3 text-primary/30"
          animate={{
            y: [0, 15, 0],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Star size={12} fill="currentColor" />
        </motion.div>

        <motion.div
          className="star-float absolute top-48 left-1/6 text-primary/50"
          animate={{
            y: [0, -25, 0],
            x: [0, 10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <Star size={14} fill="currentColor" />
        </motion.div>

        <motion.div
          className="star-float absolute top-40 right-1/4 text-primary/35"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -90, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <Star size={18} fill="currentColor" />
        </motion.div>

        {/* Enhanced rotating compass with multiple animations */}
        <motion.div
          className="absolute top-16 right-16 text-primary/10"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Compass size={120} />
        </motion.div>

        {/* Floating secondary compass */}
        <motion.div
          className="absolute top-1/3 left-8 text-nordic-gold/20"
          animate={{
            rotate: -360,
            y: [0, -30, 0],
            x: [0, 15, 0],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Compass size={60} />
        </motion.div>

        {/* Floating mountains in background */}
        <motion.div
          className="absolute bottom-32 left-1/4 text-fjord/10"
          animate={{
            y: [0, -15, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Mountain size={80} />
        </motion.div>

        <motion.div
          className="absolute bottom-40 right-1/3 text-fjord/15"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <Mountain size={100} />
        </motion.div>

        {/* Enhanced Aurora effect with movement */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-nordic-gold/5"
          animate={{
            opacity: [0.3, 0.8, 0.3],
            background: [
              "linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0%, transparent 50%, rgba(251, 191, 36, 0.05) 100%)",
              "linear-gradient(90deg, rgba(251, 191, 36, 0.05) 0%, transparent 50%, rgba(59, 130, 246, 0.05) 100%)",
              "linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0%, transparent 50%, rgba(251, 191, 36, 0.05) 100%)",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Subtle grid pattern animation */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "40px 40px", "0px 0px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo and compass icon with enhanced animation */}
          <motion.div
            className="flex items-center justify-center mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 100,
              delay: 0.2,
            }}
          >
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <Compass className="mr-3 text-primary" size={48} />
            </motion.div>
            <motion.h1
              className="text-3xl font-bold text-primary"
              animate={{
                textShadow: [
                  "0 0 10px rgba(59, 130, 246, 0.3)",
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 10px rgba(59, 130, 246, 0.3)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              NORDWEB
            </motion.h1>
          </motion.div>

          {/* Main heading with enhanced gradient animation */}
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-fjord via-primary to-nordic-gold bg-clip-text text-transparent leading-tight pt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: 0,
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              opacity: { duration: 1, delay: 0.5 },
              y: { duration: 1, delay: 0.5 },
              backgroundPosition: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            style={{ backgroundSize: "200% 200%" }}
          >
            <motion.span
              animate={{
                scale: [1, 1.02, 1],
                filter: [
                  "brightness(1) contrast(1)",
                  "brightness(1.1) contrast(1.1)",
                  "brightness(1) contrast(1)",
                ],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Få en stærk digital base
            </motion.span>
            <span className="block text-4xl md:text-6xl mt-2">
              <motion.span
                animate={{
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                – bygget i Norden
              </motion.span>
            </span>
          </motion.h2>

          {/* Subtitle with typing effect */}
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Hos Nordweb hjælper vi nystartede og mindre virksomheder med at
            komme professionelt online. Vi bygger hjemmesider med nordisk
            enkelhed, æstetik og en fast pris – uden bøvl.
          </motion.p>

          {/* Enhanced CTA Buttons with more complex animations */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                rotate: [0, -1, 1, 0],
                boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 5px 15px rgba(59, 130, 246, 0.2)",
                  "0 8px 25px rgba(59, 130, 246, 0.4)",
                  "0 5px 15px rgba(59, 130, 246, 0.2)",
                ],
              }}
              transition={{
                boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <Button
                size="lg"
                className="nordic-button-primary px-8 py-6 text-lg font-semibold min-w-[250px] pulse-cta relative overflow-hidden"
                onClick={() => navigate("/solutions")}
              >
                <motion.span
                  className="relative z-10"
                  animate={{
                    textShadow: [
                      "0 0 5px rgba(255, 255, 255, 0.5)",
                      "0 0 10px rgba(255, 255, 255, 0.8)",
                      "0 0 5px rgba(255, 255, 255, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Se vores løsninger
                </motion.span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="ml-2" size={20} />
                </motion.div>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05,
                rotate: [0, 1, -1, 0],
                boxShadow: "0 10px 30px rgba(251, 191, 36, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                borderColor: [
                  "rgba(251, 191, 36, 0.8)",
                  "rgba(251, 191, 36, 1)",
                  "rgba(251, 191, 36, 0.8)",
                ],
              }}
              transition={{
                borderColor: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <Button
                variant="outline"
                size="lg"
                className="nordic-button-gold px-8 py-6 text-lg font-semibold min-w-[250px] border-2 border-nordic-gold text-nordic-gold hover:bg-nordic-gold hover:text-nordic-gold-foreground relative overflow-hidden"
              >
                <motion.span
                  animate={{
                    color: [
                      "rgb(251, 191, 36)",
                      "rgb(255, 215, 80)",
                      "rgb(251, 191, 36)",
                    ],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Book en gratis samtale
                </motion.span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  <ArrowRight className="ml-2" size={20} />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Mountain silhouette bottom with parallax movement */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 text-fjord/20 w-full"
        animate={{
          y: [0, -8, 0],
          x: [0, -3, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.svg
          viewBox="0 0 1920 120"
          className="w-full h-24 md:h-32"
          preserveAspectRatio="none"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <motion.path
            d="M0,120 L0,60 L150,30 L300,50 L450,20 L600,40 L750,25 L900,35 L1050,15 L1200,30 L1350,45 L1500,20 L1650,35 L1800,25 L1920,30 L1920,120 Z"
            fill="currentColor"
            animate={{
              d: [
                "M0,120 L0,60 L150,30 L300,50 L450,20 L600,40 L750,25 L900,35 L1050,15 L1200,30 L1350,45 L1500,20 L1650,35 L1800,25 L1920,30 L1920,120 Z",
                "M0,120 L0,55 L150,25 L300,45 L450,15 L600,35 L750,20 L900,30 L1050,10 L1200,25 L1350,40 L1500,15 L1650,30 L1800,20 L1920,25 L1920,120 Z",
                "M0,120 L0,60 L150,30 L300,50 L450,20 L600,40 L750,25 L900,35 L1050,15 L1200,30 L1350,45 L1500,20 L1650,35 L1800,25 L1920,30 L1920,120 Z",
              ],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Secondary mountain layer for depth */}
          <motion.path
            d="M0,120 L0,80 L200,70 L400,75 L600,65 L800,70 L1000,60 L1200,65 L1400,70 L1600,60 L1800,65 L1920,70 L1920,120 Z"
            fill="currentColor"
            opacity="0.4"
            animate={{
              d: [
                "M0,120 L0,80 L200,70 L400,75 L600,65 L800,70 L1000,60 L1200,65 L1400,70 L1600,60 L1800,65 L1920,70 L1920,120 Z",
                "M0,120 L0,75 L200,65 L400,70 L600,60 L800,65 L1000,55 L1200,60 L1400,65 L1600,55 L1800,60 L1920,65 L1920,120 Z",
                "M0,120 L0,80 L200,70 L400,75 L600,65 L800,70 L1000,60 L1200,65 L1400,70 L1600,60 L1800,65 L1920,70 L1920,120 Z",
              ],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </motion.svg>
      </motion.div>
    </section>
  );
};

export default HeroSection;
