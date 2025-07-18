import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, School, BookOpen, GraduationCap, Notebook } from 'lucide-react';
import { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Educacion = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const educationData = {
    preprimaria: [
      {
        id: 1,
        schoolName: "Jardín Infantil [Nombre]",
        years: "2005 - 2007",
        description: "Primera etapa educativa donde desarrollé mis habilidades sociales y cognitivas básicas.",
        image: "../../public/logo.png" 
      }
    ],
    primaria: [
      {
        id: 1,
        schoolName: "Colegio Primario [Nombre]",
        years: "2008 - 2011",
        description: "Educación primaria donde adquirí las bases de matemáticas, lenguaje y ciencias.",
        image: "/placeholder-school.jpg"
      },
      {
        id: 2,
        schoolName: "Colegio Primario [Nombre]",
        years: "2012 - 2013",
        description: "Continuación de educación primaria con enfoque en pensamiento crítico.",
        image: "/placeholder-school.jpg"
      }
    ],
    basicos: [
      {
        id: 1,
        schoolName: "Instituto Básico [Nombre]",
        years: "2014 - 2016",
        description: "Ciclo de educación básica con especialización en [área específica].",
        image: "/placeholder-school.jpg"
      }
    ],
    diversificado: [
      {
        id: 1,
        schoolName: "Instituto Diversificado [Nombre]",
        years: "2017 - 2018",
        description: "Educación diversificada con orientación en [especialidad técnica o bachillerato].",
        image: "/placeholder-school.jpg"
      }
    ]
  };

  const SectionHeader = ({ title, icon, isOpen, onClick }) => (
    <motion.div
      whileHover={{ backgroundColor: '#E6E6E9' }}
      className="flex items-center justify-between p-6 cursor-pointer rounded-lg"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-[#000000] text-white">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-[#000000]">{title}</h3>
      </div>
      {isOpen ? <ChevronUp className="text-[#66666E]" /> : <ChevronDown className="text-[#66666E]" />}
    </motion.div>
  );

  const EducationCard = ({ school }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-lg shadow-sm border border-[#E6E6E9] mb-4"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-lg bg-[#F4F4F6] flex items-center justify-center overflow-hidden border border-[#E6E6E9]">
            <img 
              src={school.image} 
              alt={school.schoolName} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "/placeholder-school.jpg";
              }}
            />
          </div>
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-medium text-[#000000] mb-2">{school.schoolName}</h4>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm px-3 py-1 bg-[#F4F4F6] text-[#66666E] rounded-full">
              {school.years}
            </span>
          </div>
          <p className="text-[#66666E]">{school.description}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#F4F4F6] py-3 px-6">
        <Navbar />
      <div className="max-w-4xl my-11 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-[#000000] mb-4">Mi Educación</h1>
          <p className="text-lg text-[#66666E]">Recorrido completo de mi formación académica</p>
        </motion.div>

        {/* Education Sections */}
        <div className="space-y-4">
          {/* Preprimaria */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <SectionHeader
              title="Preprimaria"
              icon={<School size={20} />}
              isOpen={expandedSection === 'preprimaria'}
              onClick={() => toggleSection('preprimaria')}
            />
            {expandedSection === 'preprimaria' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-6"
              >
                {educationData.preprimaria.map(school => (
                  <EducationCard key={school.id} school={school} />
                ))}
              </motion.div>
            )}
          </div>

          {/* Primaria */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <SectionHeader
              title="Primaria"
              icon={<BookOpen size={20} />}
              isOpen={expandedSection === 'primaria'}
              onClick={() => toggleSection('primaria')}
            />
            {expandedSection === 'primaria' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-6 space-y-4"
              >
                {educationData.primaria.map(school => (
                  <EducationCard key={school.id} school={school} />
                ))}
              </motion.div>
            )}
          </div>

          {/* Básicos */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <SectionHeader
              title="Básicos"
              icon={<Notebook size={20} />}
              isOpen={expandedSection === 'basicos'}
              onClick={() => toggleSection('basicos')}
            />
            {expandedSection === 'basicos' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-6"
              >
                {educationData.basicos.map(school => (
                  <EducationCard key={school.id} school={school} />
                ))}
              </motion.div>
            )}
          </div>

          {/* Diversificado */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <SectionHeader
              title="Diversificado"
              icon={<GraduationCap size={20} />}
              isOpen={expandedSection === 'diversificado'}
              onClick={() => toggleSection('diversificado')}
            />
            {expandedSection === 'diversificado' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-6"
              >
                {educationData.diversificado.map(school => (
                  <EducationCard key={school.id} school={school} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};