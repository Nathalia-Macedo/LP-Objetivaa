import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

import { useLanguage } from "../context/LanguageContext";
import useDynamicTranslation from "../hooks/useDynamicTranslaction";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { language, setLanguage } = useLanguage();
  const [translatedLabels, setTranslatedLabels] = useState({});
  const { translateText } = useDynamicTranslation();

  const navItems = [
    { id: "home", original: "Home", path: "/" },
    { id: "empreendimentos", original: "Empreendimentos", path: "/empreendimentos" },
    { id: "construcoes", original: "Construções", path: "/construcoes" },
    { id: "quem-somos", original: "Quem Somos", path: "/quem-somos" },
    { id: "contato", original: "Contato", path: "/contato" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  useEffect(() => {
    const fetchTranslations = async () => {
      const updates = {};
      for (const item of navItems) {
        const translated = language === "eng"
          ? await translateText(item.original, "en")
          : item.original;
        updates[item.id] = translated;
      }
      setTranslatedLabels(updates);
    };

    fetchTranslations();
  }, [language]);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black bg-opacity-80 shadow-lg" : "bg-black bg-opacity-60"
      }`}
    >
      <div className="w-full px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo || "/placeholder.svg"} alt="Objetiva" className="h-8 w-auto" />
        </Link>

        {/* Navigation Menu - Desktop */}
        <nav className="hidden md:flex items-center justify-center flex-1 mx-16">
          <div className="flex items-center space-x-12">
            {navItems.map((item) => (
              <motion.div key={item.id} whileHover={{ scale: 1.05 }} className="relative">
                <Link
                  to={item.path}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-normal transition-colors duration-300 ${
                    activeSection === item.id ? "text-[#c84a20]" : "text-gray-300 hover:text-[#c84a20]"
                  }`}
                >
                  {translatedLabels[item.id] || item.original}
                </Link>
              </motion.div>
            ))}
          </div>
        </nav>

        {/* Language Selector - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => setLanguage("port")}
            className={`text-sm transition-colors duration-300 ${
              language === "port" ? "text-gray-300 font-normal" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            Port
          </button>
          <button
            onClick={() => setLanguage("eng")}
            className={`text-sm transition-colors duration-300 ${
              language === "eng" ? "text-gray-300 font-normal" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            Eng
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white z-50"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Abrir menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black bg-opacity-90 text-white absolute w-full top-full left-0 z-40 p-6 space-y-6"
          >
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => scrollToSection(item.id)}
                className="block text-sm font-medium text-white hover:text-[#c84a20] transition"
              >
                {translatedLabels[item.id] || item.original}
              </Link>
            ))}

            {/* Language toggle */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-700">
              <button
                onClick={() => setLanguage("port")}
                className={`text-sm ${language === "port" ? "text-white" : "text-gray-400"}`}
              >
                Port
              </button>
              <button
                onClick={() => setLanguage("eng")}
                className={`text-sm ${language === "eng" ? "text-white" : "text-gray-400"}`}
              >
                Eng
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
