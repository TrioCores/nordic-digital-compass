// import { Button } from "@/components/ui/button";
// import {
//   ArrowRight,
//   Globe,
//   Smartphone,
//   Search,
//   Palette,
//   Headphones,
//   BarChart,
// } from "lucide-react";
// import { motion } from "framer-motion";

// const SolutionsSection = () => {
//   const solutions = [
//     {
//       icon: Globe,
//       title: "Hjemmeside udvikling",
//       description:
//         "Professionelle og moderne hjemmesider bygget med de nyeste teknologier",
//       features: ["Responsivt design", "SEO-optimeret", "Hurtig indlæsning"],
//     },
//     {
//       icon: Smartphone,
//       title: "Mobil-optimering",
//       description:
//         "Sikr dig at din hjemmeside fungerer perfekt på alle enheder",
//       features: [
//         "Mobile-first design",
//         "Touch-venlig",
//         "App-lignende oplevelse",
//       ],
//     },
//     {
//       icon: Search,
//       title: "SEO & Synlighed",
//       description: "Bliv fundet på Google og andre søgemaskiner",
//       features: [
//         "Keyword optimering",
//         "Google Analytics",
//         "Søgemaskine indeksering",
//       ],
//     },
//     {
//       icon: Palette,
//       title: "Design & Branding",
//       description: "Unikt design der afspejler dit brand og dine værdier",
//       features: ["Nordisk æstetik", "Brand guidelines", "Visuel identitet"],
//     },
//     {
//       icon: BarChart,
//       title: "Performance & Analytics",
//       description: "Følg din hjemmesides performance og få værdifuld indsigt",
//       features: [
//         "Performance monitoring",
//         "Bruger analytics",
//         "Månedlige rapporter",
//       ],
//     },
//     {
//       icon: Headphones,
//       title: "Løbende support",
//       description: "Vi er her når du har brug for hjælp eller ændringer",
//       features: ["Mail & chat support", "Månedlige timer", "Akut hjælp"],
//     },
//   ];

//   return (
//     <section
//       id="solutions"
//       className="py-24 bg-gradient-to-b from-background via-secondary/20 to-background"
//     >

//         Solutions Grid
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
//           {solutions.map((solution, index) => (
//             <div
//               key={index}
//               className="nordic-hover-card nordic-card rounded-2xl p-8 group"
//             >
//               <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
//                 <solution.icon className="text-primary" size={32} />
//               </div>

//               <h3 className="text-xl font-bold text-fjord mb-4">
//                 {solution.title}
//               </h3>

//               <p className="text-muted-foreground dark:text-gray-300 mb-6">
//                 {solution.description}
//               </p>

//               <ul className="space-y-2">
//                 {solution.features.map((feature, featureIndex) => (
//                   <li
//                     key={featureIndex}
//                     className="flex items-center text-sm text-muted-foreground dark:text-gray-300"
//                   >
//                     <div className="w-2 h-2 rounded-full bg-nordic-gold mr-3"></div>
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//     </section>
//   );
// };

// export default SolutionsSection;
