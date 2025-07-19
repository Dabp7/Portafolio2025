import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { useState } from 'react';
import { SiAbbott } from 'react-icons/si';

export const Footer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const openModal = (image) => {
    setModalImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <footer className="bg-[#000000] text-[#E6E6E9] py-8 px-6 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[#F4F4F6]">Contacto</h3>
            <div className="flex flex-wrap gap-4">
              <motion.a
                whileHover={{ y: -2 }}
                href="https://github.com/Dabp7" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#E6E6E9] hover:text-[#F4F4F6] transition-colors text-sm"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                href="https://linkedin.com/in/tu-usuario" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#E6E6E9] hover:text-[#F4F4F6] transition-colors text-sm"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                href="mailto:tu-email@ejemplo.com" 
                className="flex items-center gap-2 text-[#E6E6E9] hover:text-[#F4F4F6] transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </motion.a>
            </div>
          </div>

          {/* Documents */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[#F4F4F6]">Documentos</h3>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ y: -2 }}
                onClick={() => openModal('/cv-preview.jpg')}
                className="flex items-center gap-2 text-[#E6E6E9] hover:text-[#F4F4F6] transition-colors text-sm"
              >
                <FileText className="w-4 h-4" />
                <span>CV</span>
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                onClick={() => openModal('/computrabajo-preview.jpg')}
                className="flex items-center gap-2 text-[#E6E6E9] hover:text-[#F4F4F6] transition-colors text-sm"
              >
                <SiAbbott className="w-4 h-4" />
                <span>CompuTrabajo</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#66666E] pt-6 text-center text-sm text-[#9999A1]">
          <p>© {new Date().getFullYear()} Todos los derechos reservados</p>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeModal}
              className="absolute -top-8 right-0 text-white hover:text-[#E6E6E9]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <img 
              src={modalImage} 
              alt="Preview" 
              className="w-full h-auto max-h-[70vh] object-contain rounded border border-[#66666E]"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = '/placeholder-doc.jpg';
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </footer>
  );
};