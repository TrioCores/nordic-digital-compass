import { Button } from "@/components/ui/button";
import {
  Compass,
  Mountain,
  Star,
  ArrowRight,
  Sparkles,
  Globe,
  Zap,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const OptimizedHeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background pt-32"
    >
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Extended starfield with more stars */}
        <motion.div
          className="absolute top-20 left-1/4 text-primary/40"
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
          className="absolute top-32 right-1/3 text-primary/30"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 180, 360],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Star size={12} fill="currentColor" />
        </motion.div>

        <motion.div
          className="absolute top-48 left-1/6 text-primary/50"
          animate={{
            y: [0, -25, 0],
            opacity: [0.5, 1, 0.5],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Star size={14} fill="currentColor" />
        </motion.div>

        {/* Additional stars */}
        <motion.div
          className="absolute top-60 right-1/4 text-nordic-gold/40"
          animate={{
            y: [0, 15, 0],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Sparkles size={18} />
        </motion.div>

        <motion.div
          className="absolute top-40 left-1/3 text-primary/35"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <Star size={10} fill="currentColor" />
        </motion.div>

        {/* Floating tech icons */}
        <motion.div
          className="absolute top-1/3 left-12 text-primary/20"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Globe size={40} />
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 right-12 text-nordic-gold/25"
          animate={{
            y: [0, 20, 0],
            x: [0, -15, 0],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        >
          <Zap size={35} />
        </motion.div>

        <motion.div
          className="absolute top-2/3 left-1/5 text-fjord/20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, -180, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Shield size={32} />
        </motion.div>

        {/* Multiple rotating compasses */}
        <motion.div
          className="absolute top-16 right-16 text-primary/10"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Compass size={120} />
        </motion.div>

        <motion.div
          className="absolute top-1/4 left-8 text-nordic-gold/15"
          animate={{
            rotate: -360,
            y: [0, -20, 0],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Compass size={60} />
        </motion.div>

        {/* Enhanced floating mountains */}
        <motion.div
          className="absolute bottom-32 left-1/4 text-fjord/10"
          animate={{
            y: [0, -15, 0],
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
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
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <Mountain size={100} />
        </motion.div>

        <motion.div
          className="absolute bottom-24 center text-fjord/8"
          animate={{
            y: [0, -10, 0],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        >
          <Mountain size={60} />
        </motion.div>

        {/* Enhanced aurora effect with movement */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-nordic-gold/5"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            background: [
              "linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0%, transparent 50%, rgba(251, 191, 36, 0.05) 100%)",
              "linear-gradient(90deg, rgba(251, 191, 36, 0.05) 0%, transparent 50%, rgba(59, 130, 246, 0.05) 100%)",
              "linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0%, transparent 50%, rgba(251, 191, 36, 0.05) 100%)",
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${20 + i * 12}%`,
              top: `${30 + i * 8}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo and compass icon with simple animation */}
          <motion.div
            className="flex items-center justify-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.8,
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
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
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
                  scale: [1, 1.01, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                – bygget i norden
                <br />
                <br />
              </motion.span>
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground dark:text-gray-200 mb-12 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Hos Nordweb hjælper vi nystartede og mindre virksomheder med at
            komme professionelt online. <strong className="text-fjord dark:text-white">Fra kun 299 kr/md</strong> bygger vi hjemmesider med nordisk
            enkelhed, æstetik og en fast pris – <span className="text-primary">alt inkluderet</span>.
          </motion.p>

          {/* CTA Buttons with hover animations */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
                rotate: [0, -1, 1, 0],
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
                className="nordic-button-primary px-8 py-6 text-lg font-semibold min-w-[250px] relative overflow-hidden"
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
                  animate={{ x: [0, 3, 0] }}
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
                borderColor: "hsl(var(--primary))",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-semibold min-w-[250px]"
                onClick={() => navigate("/contact")}
              >
                Få gratis konsultation
              </Button>
            </motion.div>
          </motion.div>

          {/* Features preview with staggered animation */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mt-16 text-muted-foreground dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            {[
              "✓ Fast månedlig pris",
              "✓ 12 måneders binding",
              "✓ Support inden for 2 arbejdsdage",
              "✓ GDPR-sikret hosting",
            ].map((feature, index) => (
              <motion.span
                key={feature}
                className="text-sm font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1.7 + index * 0.1,
                }}
              >
                {feature}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OptimizedHeroSection;
