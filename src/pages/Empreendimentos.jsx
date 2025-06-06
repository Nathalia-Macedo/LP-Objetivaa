"use client"

import { motion } from "framer-motion"

const Empreendimentos = () => {
  return (
    <div className="pt-20">
      <section id="empreendimentos" className="min-h-screen flex items-center justify-center bg-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Empreendimentos</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Conheça nossos principais empreendimentos</p>
        </motion.div>
      </section>
    </div>
  )
}

export default Empreendimentos
