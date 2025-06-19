// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { MapPin, Phone, Mail } from "lucide-react";
// import { useLanguage } from "../context/LanguageContext";
// import useDynamicTranslation from "../hooks/useDynamicTranslaction";
// import Rodape from "../components/Footer";
// import local from '../assets/contato.png'
// const Contato = () => {
//   const { language } = useLanguage();
//   const { translateBatch } = useDynamicTranslation();

//   const [labels, setLabels] = useState({
//     title: "Fale com a OBJETIVA",
//     subtitle: "Tem um projeto? Quer saber mais sobre nossos empreendimentos?",
//     call: "Fale conosco:",
//     formTitle: "Conte pra gente como podemos lhe ajudar",
//     name: "Nome completo",
//     subject: "Assunto",
//     message: "Digite aqui sua dúvida, crítica ou comentário.",
//     send: "ENVIAR MENSAGEM",
//   });

//   useEffect(() => {
//     const traduzir = async () => {
//       if (language === "eng") {
//         const [
//           t1, t2, t3, t4, t5, t6, t7, t8
//         ] = await translateBatch([
//           "Fale com a OBJETIVA",
//           "Tem um projeto? Quer saber mais sobre nossos empreendimentos?",
//           "Fale conosco:",
//           "Conte pra gente como podemos lhe ajudar",
//           "Nome completo",
//           "Assunto",
//           "Digite aqui sua dúvida, crítica ou comentário.",
//           "ENVIAR MENSAGEM",
//         ], "en");

//         setLabels({
//           title: t1,
//           subtitle: t2,
//           call: t3,
//           formTitle: t4,
//           name: t5,
//           subject: t6,
//           message: t7,
//           send: t8,
//         });
//       } else {
//         setLabels({
//           title: "Fale com a OBJETIVA",
//           subtitle: "Tem um projeto? Quer saber mais sobre nossos empreendimentos?",
//           call: "Fale conosco:",
//           formTitle: "Conte pra gente como podemos lhe ajudar",
//           name: "Nome completo",
//           subject: "Assunto",
//           message: "Digite aqui sua dúvida, crítica ou comentário.",
//           send: "ENVIAR MENSAGEM",
//         });
//       }
//     };
//     traduzir();
//   }, [language, translateBatch]);

//   return (
//     <div className="pt-20">
//       {/* MAPA / ILUSTRAÇÃO DE FUNDO */}
//       <div className="bg-white">
//         <img
//           src={local}
//           alt="Mapa"
//           className="w-full max-h-[400px] object-contain"
//         />
//       </div>

//       {/* FORMULÁRIO E INFOS */}
//       <section className="bg-white py-16 px-6 md:px-20">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
//           {/* Informações de contato */}
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-gray-800"
//           >
//             <h2 className="text-2xl font-bold mb-4">{labels.title}</h2>
//             <p className="text-gray-600 mb-4">{labels.subtitle}</p>
//             <p className="font-semibold text-orange-600 mb-6">{labels.call}</p>

//             <div className="space-y-3 text-sm">
//               <p className="flex items-center gap-2 text-gray-700">
//                 <MapPin className="w-4 h-4" />
//                 Av. Antônio Carlos Magalhães, 1034
//               </p>
//               <p className="flex items-center gap-2 text-gray-700">
//                 <Phone className="w-4 h-4" />
//                (71) 98897-0381
//               </p>
//               <p className="flex items-center gap-2 text-gray-700">
//                 <Mail className="w-4 h-4" />
//               contato@objetiva.com.br
//               </p>
//               <div className="flex gap-4 pt-2">
//                 <a href="#" aria-label="Facebook" className="hover:text-orange-500">
//                   <i className="fab fa-facebook-f"></i>
//                 </a>
//                 <a href="#" aria-label="Instagram" className="hover:text-orange-500">
//                   <i className="fab fa-instagram"></i>
//                 </a>
//               </div>
//             </div>
//           </motion.div>

//           {/* Formulário */}
//           <motion.form
//             initial={{ opacity: 0, x: 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="space-y-6"
//             onSubmit={(e) => e.preventDefault()} // Adapte se quiser usar API real
//           >
//             <h3 className="text-xl font-semibold text-gray-800">{labels.formTitle}</h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 placeholder={labels.name}
//                 className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
//               />
//               <input
//                 type="text"
//                 placeholder={labels.subject}
//                 className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
//               />
//             </div>

//             <textarea
//               rows="5"
//               placeholder={labels.message}
//               className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-none"
//             ></textarea>

//             <button
//               type="submit"
//               className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition font-medium"
//             >
//               {labels.send}
//             </button>
//           </motion.form>
//         </div>
//       </section>

//       {/* Rodapé */}
//       <Rodape />
//     </div>
//   );
// };

// export default Contato;
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import useDynamicTranslation from "../hooks/useDynamicTranslaction";
import Rodape from "../components/Footer";
import local from "../assets/contato.png";

const Contato = () => {
  const { language } = useLanguage();
  const { translateBatch } = useDynamicTranslation();

  const [labels, setLabels] = useState({
    title: "Fale com a OBJETIVA",
    subtitle: "Tem um projeto? Quer saber mais sobre nossos empreendimentos?",
    call: "Fale conosco:",
    formTitle: "Conte pra gente como podemos lhe ajudar",
    name: "Nome completo",
    subject: "Assunto",
    message: "Digite aqui sua dúvida, crítica ou comentário.",
    send: "ENVIAR MENSAGEM",
  });

  const [form, setForm] = useState({
    nome: "",
    assunto: "",
    mensagem: "",
  });

  useEffect(() => {
    const traduzir = async () => {
      if (language === "eng") {
        const [t1, t2, t3, t4, t5, t6, t7, t8] = await translateBatch(
          [
            "Fale com a OBJETIVA",
            "Tem um projeto? Quer saber mais sobre nossos empreendimentos?",
            "Fale conosco:",
            "Conte pra gente como podemos lhe ajudar",
            "Nome completo",
            "Assunto",
            "Digite aqui sua dúvida, crítica ou comentário.",
            "ENVIAR MENSAGEM",
          ],
          "en"
        );

        setLabels({
          title: t1,
          subtitle: t2,
          call: t3,
          formTitle: t4,
          name: t5,
          subject: t6,
          message: t7,
          send: t8,
        });
      } else {
        setLabels({
          title: "Fale com a OBJETIVA",
          subtitle: "Tem um projeto? Quer saber mais sobre nossos empreendimentos?",
          call: "Fale conosco:",
          formTitle: "Conte pra gente como podemos lhe ajudar",
          name: "Nome completo",
          subject: "Assunto",
          message: "Digite aqui sua dúvida, crítica ou comentário.",
          send: "ENVIAR MENSAGEM",
        });
      }
    };
    traduzir();
  }, [language, translateBatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const numero = "5571988970381"; // Número sem formatação
    const texto = `Olá, meu nome é ${form.nome}.%0AAssunto: ${form.assunto}.%0A${form.mensagem}`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="pt-20">
      {/* MAPA / ILUSTRAÇÃO DE FUNDO */}
      <div className="bg-white">
        <img
          src={local}
          alt="Mapa"
          className="w-full max-h-[400px] object-contain"
        />
      </div>

      {/* FORMULÁRIO E INFOS */}
      <section className="bg-white py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Informações de contato */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gray-800"
          >
            <h2 className="text-2xl font-bold mb-4">{labels.title}</h2>
            <p className="text-gray-600 mb-4">{labels.subtitle}</p>
            <p className="font-semibold text-orange-600 mb-6">{labels.call}</p>

            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4" />
                Av. Antônio Carlos Magalhães, 1034
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4" />
                (71) 98897-0381
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4" />
                contato@objetiva.com.br
              </p>
              <div className="flex gap-4 pt-2">
                <a href="#" aria-label="Facebook" className="hover:text-orange-500">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-orange-500">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Formulário */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <h3 className="text-xl font-semibold text-gray-800">{labels.formTitle}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder={labels.name}
  className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 focus:ring-2 focus:ring-orange-500 outline-none"
                required
              />
              <input
                type="text"
                name="assunto"
                value={form.assunto}
                onChange={handleChange}
                placeholder={labels.subject}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 focus:ring-2 focus:ring-orange-500 outline-none resize-none"

                required
              />
            </div>

            <textarea
              name="mensagem"
              value={form.mensagem}
              onChange={handleChange}
              rows="5"
              placeholder={labels.message}
  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 focus:ring-2 focus:ring-orange-500 outline-none resize-none"
              required
            ></textarea>

            <button
              type="submit"
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition font-medium"
            >
              {labels.send}
            </button>
          </motion.form>
        </div>
      </section>

      {/* Rodapé */}
      <Rodape />
    </div>
  );
};

export default Contato;
