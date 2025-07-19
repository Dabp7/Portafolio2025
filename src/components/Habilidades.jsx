import { motion } from 'framer-motion';
import { 
  SiJavascript, 
  SiSpringboot, 
  SiReact, 
  SiNodedotjs, 
  SiMysql, 
  SiMongodb, 
  SiHtml5, 
  SiCss3, 
  SiGit, 
  SiGithub,
  SiCisco
} from 'react-icons/si';
import {
  DiJava,
  DiNpm
} from 'react-icons/di';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

const skills = [
  { name: 'Java', icon: <DiJava size={40} />, level: 80 },
  { name: 'Java EE', icon: <DiJava size={40} />, level: 80 },
  { name: 'JavaScript', icon: <SiJavascript size={40} />, level: 90 },
  { name: 'Springboot', icon: <SiSpringboot size={40} />, level: 75 },
  { name: 'React', icon: <SiReact size={40} />, level: 90 },
  { name: 'Node.js', icon: <SiNodedotjs size={40} />, level: 85 },
  { name: 'MySQL', icon: <SiMysql size={40} />, level: 75 },
  { name: 'MongoDB', icon: <SiMongodb size={40} />, level: 80 },
  { name: 'HTML5', icon: <SiHtml5 size={40} />, level: 95 },
  { name: 'CSS3', icon: <SiCss3 size={40} />, level: 90 },
  { name: 'Git', icon: <SiGit size={40} />, level: 80 },
  { name: 'GitHub', icon: <SiGithub size={40} />, level: 80 },
  { name: 'CCNA v7', icon: <SiCisco size={40} />, level: 65 },
  { name: 'Cisco', icon: <SiCisco size={40} />, level: 70 },
  { name: 'Npm', icon: <DiNpm size={40} />, level: 90 }
];

const skillList = [
  {
    title: "Fundamentos de redes y protocolos de comunicación",
    tech: ["HTTP", "HTTPS", "TCP", "UDP"],
    icon: <SiCisco size={24} className="text-[#000000]" />,
    description: "En base a módulo 1 de CCNA v7"
  },
  {
    title: "Mantenimiento y reparación de equipo de cómputo",
    tech: [],
    icon: <SiCisco size={24} className="text-[#000000]" />,
    description: "En base a curso IT Essentials de CISCO"
  },
  {
    title: "Paradigmas de programación",
    tech: ["Orientado a objetos", "Orientado a eventos"],
    icon: <DiJava size={24} className="text-[#000000]" />
  },
  {
    title: "Patrones de diseño",
    tech: ["DAO", "Singleton", "MVC"],
    icon: <SiSpringboot size={24} className="text-[#000000]" />
  },
  {
    title: "Arquitectura de software",
    tech: ["Monolítica", "Microservicios"],
    icon: <SiNodedotjs size={24} className="text-[#000000]" />
  },
  {
    title: "Programación Backend",
    tech: ["Node.js", "Express", "API REST"],
    icon: <SiNodedotjs size={24} className="text-[#000000]" />
  },
  {
    title: "Uso de bases de datos",
    tech: ["MySQL", "MongoDB"],
    icon: <SiMongodb size={24} className="text-[#000000]" />
  },
  {
    title: "Desarrollo Frontend",
    tech: ["React"],
    icon: <SiReact size={24} className="text-[#000000]" />
  },
  {
    title: "Desarrollo de aplicaciones de escritorio",
    tech: ["JavaFX"],
    icon: <DiJava size={24} className="text-[#000000]" />
  },
  {
    title: "Metodología ágil",
    tech: ["SCRUM"],
    icon: <div className="w-6 h-6 bg-[#000000] rounded-full flex items-center justify-center text-white text-xs font-bold">S</div>
  },
  {
    title: "Control de versiones",
    tech: ["Git", "GitHub"],
    icon: <SiGithub size={24} className="text-[#000000]" />
  },
  {
    title: "Maquetación web",
    tech: ["HTML", "CSS"],
    icon: <SiHtml5 size={24} className="text-[#000000]" />
  }
];

export const Habilidades = () => {
  return (
    <div className="min-h-screen bg-[#F4F4F6]">
      <Navbar />
      <div className="max-w-7xl mx-auto m-11">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#000000] mb-4">Tecnologías</h1>
          <p className="text-lg text-[#66666E] max-w-2xl mx-auto">
            Tecnologías y herramientas que domino, con mi nivel de experiencia en cada una.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-24">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-xl p-6 shadow-md border border-[#E6E6E9] flex flex-col items-center"
            >
              <div className="text-[#000000] mb-4">
                {skill.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#000000] mb-2">{skill.name}</h3>
              
              {/* Progress Bar */}
              <div className="w-full h-2 bg-[#E6E6E9] rounded-full mb-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                  className="h-full bg-gradient-to-r from-[#66666E] to-[#000000] rounded-full"
                />
              </div>
              
              <span className="text-sm font-medium text-[#66666E]">{skill.level}%</span>
            </motion.div>
          ))}
        </div>

        {/* Habilidades Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-4">Habilidades</h2>
            <p className="text-lg text-[#66666E] max-w-2xl mx-auto">
              Conocimientos y competencias adquiridas a lo largo de mi experiencia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillList.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-[#E6E6E9]"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#F4F4F6] flex-shrink-0">
                    {skill.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#000000] mb-2">{skill.title}</h3>
                    {skill.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {skill.tech.map((tech, i) => (
                          <span key={i} className="px-3 py-1 bg-[#F4F4F6] text-[#66666E] rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {skill.description && (
                      <p className="text-sm text-[#9999A1]">{skill.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};