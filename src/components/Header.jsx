// "use client"

// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import { motion } from "framer-motion"
// import logo from "../assets/logo.png"

// const Header = () => {
//   const [scrolled, setScrolled] = useState(false)
//   const [activeSection, setActiveSection] = useState("home")
//   const [language, setLanguage] = useState("port")

//   useEffect(() => {
//     const handleScroll = () => {
//       const isScrolled = window.scrollY > 10
//       if (isScrolled !== scrolled) {
//         setScrolled(isScrolled)
//       }
//     }

//     document.addEventListener("scroll", handleScroll)
//     return () => {
//       document.removeEventListener("scroll", handleScroll)
//     }
//   }, [scrolled])

//   const scrollToSection = (sectionId) => {
//     setActiveSection(sectionId)
//     const element = document.getElementById(sectionId)
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" })
//     }
//   }

//   const navItems = [
//     { id: "home", label: "Home", path: "/" },
//     { id: "empreendimentos", label: "Empreendimentos", path: "/empreendimentos" },
//     { id: "construcoes", label: "Construções", path: "/construcoes" },
//     { id: "quem-somos", label: "Quem Somos", path: "/quem-somos" },
//     { id: "contato", label: "Contato", path: "/contato" },
//   ]

//   return (
//     <motion.header
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className={`fixed w-full z-50 transition-all duration-300 ${
//         scrolled ? "bg-black bg-opacity-80 shadow-lg" : "bg-black bg-opacity-60"
//       }`}
//     >
//       <div className="w-full px-8 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/" className="flex items-center">
//           <img src={logo || "/placeholder.svg"} alt="Objetiva" className="h-8 w-auto" />
//         </Link>

//         {/* Navigation Menu - Centralizado */}
//         <nav className="hidden md:flex items-center justify-center flex-1 mx-16">
//           <div className="flex items-center space-x-12">
//             {navItems.map((item) => (
//               <motion.div key={item.id} whileHover={{ scale: 1.05 }} className="relative">
//                 <Link
//                   to={item.path}
//                   onClick={() => scrollToSection(item.id)}
//                   className={`text-sm font-normal transition-colors duration-300 ${
//                     activeSection === item.id ? "text-[#c84a20]" : "text-gray-300 hover:text-[#c84a20]"
//                   }`}
//                 >
//                   {item.label}
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         </nav>

//         {/* Language Selector */}
//         <div className="hidden md:flex items-center space-x-4">
//           <button
//             onClick={() => setLanguage("port")}
//             className={`text-sm transition-colors duration-300 ${
//               language === "port" ? "text-gray-300 font-normal" : "text-gray-500 hover:text-gray-300"
//             }`}
//           >
//             Port
//           </button>
//           <button
//             onClick={() => setLanguage("eng")}
//             className={`text-sm transition-colors duration-300 ${
//               language === "eng" ? "text-gray-300 font-normal" : "text-gray-500 hover:text-gray-300"
//             }`}
//           >
//             Eng
//           </button>
//         </div>

//         {/* Mobile Menu Button */}
//         <button className="md:hidden text-white">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         </button>
//       </div>
//     </motion.header>
//   )
// }

// export default Header
"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

import { useLanguage } from "../context/LanguageContext";
import useDynamicTranslation from "../hooks/useDynamicTranslaction";
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const { language, setLanguage } = useLanguage();
  const [translatedLabels, setTranslatedLabels] = useState({});
  const { translateText } = useDynamicTranslation();

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

  const navItems = [
    { id: "home", original: "Home", path: "/" },
    { id: "empreendimentos", original: "Empreendimentos", path: "/empreendimentos" },
    { id: "construcoes", original: "Construções", path: "/construcoes" },
    { id: "quem-somos", original: "Quem Somos", path: "/quem-somos" },
    { id: "contato", original: "Contato", path: "/contato" },
  ];

  // Traduz apenas se o idioma for inglês
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

        {/* Navigation Menu - Centralizado */}
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

        {/* Language Selector */}
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
        <button className="md:hidden text-white">
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
    </motion.header>
  );
};

export default Header;
