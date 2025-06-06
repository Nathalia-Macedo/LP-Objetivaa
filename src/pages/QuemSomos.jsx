"use client"

import { motion } from "framer-motion"

const QuemSomos = () => {
  return (
    <div className="pt-20">
      <section id="quem-somos" className="min-h-screen flex items-center justify-center bg-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Quem Somos</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Conheça a história e valores da Objetiva</p>
        </motion.div>
      </section>
    </div>
  )
}

export default QuemSomos
