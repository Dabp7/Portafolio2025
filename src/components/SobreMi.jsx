import { motion } from 'framer-motion';
import { User, Briefcase, BookOpen, Mail, MapPin } from 'lucide-react';
import { Navbar } from './Navbar';

export const SobreMi = () => {
  return (
    <div className="min-h-screen bg-[#F4F4F6] py-3 px-6">
        <Navbar />
      <div className="max-w-6xl m-10 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#000000] mb-4">Sobre Mí</h1>
          <div className="w-20 h-1 bg-[#66666E] mx-auto"></div>
        </motion.div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Photo Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-xl overflow-hidden border-4 border-[#E6E6E9] shadow-lg">
              {/* Espacio para tu foto - Reemplaza el div por tu imagen */}
              <div className="w-full h-full bg-[#9999A1] flex items-center justify-center">
                <User className="w-32 h-32 text-[#E6E6E9]" />
                <p className="absolute text-sm text-[#E6E6E9] bottom-4">Tu foto aquí</p>
              </div>
              {/* Ejemplo de cómo sería con tu imagen:
                <img 
                  src="/tu-foto.jpg" 
                  alt="Tu nombre" 
                  className="w-full h-full object-cover"
                />
              */}
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#000000] mb-6">
              Hola, soy <span className="text-[#66666E]">Diego Bercian</span>
            </h2>
            
            <p className="text-lg text-[#66666E] mb-8 leading-relaxed">
              [Breve introducción sobre ti. Ejemplo: "Soy un desarrollador full-stack con 5 años de experiencia especializado en tecnologías Java y JavaScript. Apasionado por crear soluciones tecnológicas eficientes y escalables que resuelvan problemas reales."]
            </p>

            {/* Personal Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-[#000000]" />
                <span className="text-[#66666E]">Estudiante</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#000000]" />
                <span className="text-[#66666E]">Guatemala City, Guatemala</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#000000]" />
                <span className="text-[#66666E]"> dabercianperez@gmail.com</span>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Skills Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-24 bg-white rounded-xl shadow-sm border border-[#E6E6E9] p-8"
        >
          <h3 className="text-2xl font-bold text-[#000000] mb-6">Mis habilidades principales</h3>
          <div className="flex flex-wrap gap-3">
            {['Java', 'JavaScript', 'React', 'Spring Boot', 'Node.js', 'MySQL', 'HTML5', 'CSS3', 'Git'].map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="px-4 py-2 bg-[#F4F4F6] text-[#66666E] rounded-full text-sm font-medium"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};