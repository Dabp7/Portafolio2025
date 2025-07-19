import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import compo2 from "../../public/compo2.png";
import { Navbar } from "./Navbar";

export const Home = () => {
  const [displayedText, setDisplayedText] = useState("");
  const welcomeText = "Bienvenidos";
  const subtitleText = "Me llamo Diego Bercian, soy desarrollador fullstack y vivo en Ciudad de Guatemala, Guatemala. He trabajado en una amplia gama de proyectos, desde aplicaciones web intregrando front-end y back-end hasta programas de gestión bancario, con el objetivo de crear interfaces limpias y bien diseñadas que no solo tengan un aspecto atractivo, sino que también ofrezcan una experiencia de usuario fluida.";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= welcomeText.length) {
        setDisplayedText(welcomeText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F4F6] flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 space-y-8">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl font-bold text-[#000000] tracking-tight"
            >
              {displayedText.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
              {displayedText.length === welcomeText.length && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  className="ml-1"
                >
                  |
                </motion.span>
              )}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: welcomeText.length * 0.15 + 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-[#66666E] leading-relaxed"
            >
              {subtitleText}
            </motion.p>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex-1 flex justify-center"
          >
            <img 
              src={compo2} 
              alt="Ian Dunkerley" 
              className="w-full max-w-md rounded-lg"
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
};