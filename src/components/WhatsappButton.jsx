import { motion } from "framer-motion";
import whatsapp from '../assets/wpp.png'
const WhatsAppButton = () => {
  const whatsappNumber = "71988970381"; // Número sem formatação para URL
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá! Gostaria de mais informações.`;

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-colors duration-300">
        <img src={whatsapp} alt="" />
      </div>
    </motion.a>
  );
};

export default WhatsAppButton;