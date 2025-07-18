import { motion } from 'framer-motion';
import { User, BookOpen, Code, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full px-6 py-4 bg-[#F4F4F6] border-b border-[#E6E6E9]"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#000000] flex items-center justify-center">
            <img src="../../public/logo.png"  className="text-[#F4F4F6] w-4 h-4"/>
          </div>
          <h1 className="text-lg font-bold text-[#000000]">
            Diego Bercian
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link 
            to="/sobre-mi" 
            className="text-[#66666E] hover:text-[#000000] transition-colors flex items-center gap-1"
          >
            <User className="w-4 h-4" /> Sobre mí
          </Link>
          <Link 
            to="/educacion" 
            className="text-[#66666E] hover:text-[#000000] transition-colors flex items-center gap-1"
          >
            <BookOpen className="w-4 h-4" /> Educación
          </Link>
          <Link 
            to="/habilidades" 
            className="text-[#66666E] hover:text-[#000000] transition-colors flex items-center gap-1"
          >
            <Code className="w-4 h-4" /> Habilidades
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-[#000000] focus:outline-none"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden mt-4 pb-4 space-y-4"
        >
          <Link 
            to="/sobre-mi" 
            className="px-4 py-2 text-[#66666E] hover:text-[#000000] hover:bg-[#E6E6E9] rounded-lg transition-colors flex items-center gap-2"
            onClick={toggleMenu}
          >
            <User className="w-4 h-4" /> Sobre mí
          </Link>
          <Link 
            to="/educacion" 
            className="px-4 py-2 text-[#66666E] hover:text-[#000000] hover:bg-[#E6E6E9] rounded-lg transition-colors flex items-center gap-2"
            onClick={toggleMenu}
          >
            <BookOpen className="w-4 h-4" /> Educación
          </Link>
          <Link 
            to="/habilidades" 
            className="px-4 py-2 text-[#66666E] hover:text-[#000000] hover:bg-[#E6E6E9] rounded-lg transition-colors flex items-center gap-2"
            onClick={toggleMenu}
          >
            <Code className="w-4 h-4" /> Habilidades
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
};