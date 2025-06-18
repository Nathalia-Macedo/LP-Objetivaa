// "use client"

// import { motion } from "framer-motion"
// import buildingsIcon from "../assets/predio.png"
// import houseIcon from "../assets/casa.png"
// import industryIcon from "../assets/industria.png"
// import heroBackground from '../assets/Bg.png'
// import Rodape from "../components/Footer"
// import Empreendimentos from "../components/Empreendimentos"
// import ClientesSatisfeitos from "../components/ClientesSatisfeitos"
// const Home = () => {
//   return (
//     <div>
//       {/* Hero Section - Exatamente como na foto */}
//       <section
//         id="home"
//         className="relative h-screen w-full bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: `url(${heroBackground})`,
//         }}
//       >
//         {/* Indicador 2/5 no canto superior esquerdo - sem caixa preta */}
//         <div className="absolute top-24 left-8 text-white text-sm font-medium">2/5</div>

//         {/* Botão de play no canto superior direito */}
//         <div className="absolute top-24 right-8 text-white">
//           <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
//             <span className="ml-0.5">▶</span>
//           </div>
//         </div>

//         {/* Texto principal sobreposto - exatamente como na foto */}
//         <div className="absolute bottom-8 left-8">
//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight uppercase"
//             style={{
//               fontFamily: "Arial, sans-serif",
//               fontWeight: 900,
//               letterSpacing: "0.02em",
//             }}
//           >
//             EMPRESARIAL
//             <br />
//             ELVIRA VIDAL ORGE
//           </motion.h1>
//         </div>
//       </section>

//       {/* Seção de conteúdo - Layout de duas colunas exatamente como na foto */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-8">
//           <div className="grid lg:grid-cols-2 gap-12 items-start">
//             {/* Coluna esquerda - Imagem mais estreita e alta como na foto */}
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               viewport={{ once: true }}
//               className="relative"
//             >
//               <img
//                 src={heroBackground || "/placeholder.svg"}
//                 alt="Empreendimento Objetiva"
//                 className="w-full max-w-xs h-[600px] object-cover mx-auto"
//               />
//             </motion.div>

//             {/* Coluna direita - Conteúdo de texto */}
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               viewport={{ once: true }}
//               className="space-y-4"
//             >
//               {/* Label vermelho */}
//               <div>
//                 <span className="text-[#c84a20] text-sm font-bold uppercase tracking-wider">LANÇAMENTO</span>
//               </div>

//               {/* Título principal */}
//               <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
//                 MAIS DE 25 ANOS CONSTRUINDO COM EXCELÊNCIA E CONFIANÇA
//               </h2>

//               {/* Subtítulo */}
//               <div className="space-y-4">
//                 <p className="text-base text-gray-700 leading-relaxed">
//                   Com experiência, inovação e foco no cliente, entregamos soluções completas em incorporação,
//                   edificações e reformas.
//                 </p>

//                 <p className="text-sm text-gray-600 leading-relaxed">
//                   Nosso compromisso é transformar projetos em realidade com inteligência técnica, cumprimento de prazos
//                   e foco total na satisfação do cliente.
//                 </p>
//               </div>

//               {/* Lista de serviços */}
//               <div className="space-y-3 text-gray-700 text-sm">
//                 <p>• Incorporação Imobiliária</p>
//                 <p>• Construção de casas, prédios e empreendimentos corporativos</p>
//                 <p>• Reformas em geral</p>
//                 <p>• Reservatórios e rede de distribuição de água</p>
//                 <p>• Gerenciamento e fiscalização de obras</p>
//               </div>

//               {/* CTA */}
//               <div className="pt-6">
//                 <a
//                   href="#empreendimentos"
//                   className="text-[#c84a20] font-bold text-xs uppercase tracking-wider hover:underline transition-colors duration-300"
//                 >
//                   CONHEÇA NOSSOS EMPREENDIMENTOS!
//                 </a>
//               </div>
//             </motion.div>
//           </div>

//           {/* Seção de ícones - Exatamente como na foto */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             viewport={{ once: true }}
//             className="grid md:grid-cols-3 gap-12 mt-20 pt-16 border-t border-gray-200"
//           >
//             <div className="text-center">
//               <div className="flex justify-center mb-6">
//                 <img src={buildingsIcon || "/placeholder.svg"} alt="Incorporação" className="w-16 h-16" />
//               </div>
//               <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase">INCORPORAÇÃO</h3>
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 Desenvolvimento de empreendimentos imobiliários com excelência e qualidade superior
//               </p>
//             </div>

//             <div className="text-center">
//               <div className="flex justify-center mb-6">
//                 <img src={houseIcon || "/placeholder.svg"} alt="Construção" className="w-16 h-16" />
//               </div>
//               <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase">CONSTRUÇÃO</h3>
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 Obras residenciais, comerciais e corporativas com tecnologia e inovação
//               </p>
//             </div>

//             <div className="text-center">
//               <div className="flex justify-center mb-6">
//                 <img src={industryIcon || "/placeholder.svg"} alt="Reformas" className="w-16 h-16" />
//               </div>
//               <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase">REFORMAS</h3>
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 Reformas e modernizações com planejamento e execução de alta qualidade
//               </p>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//       <Empreendimentos/>
//       <ClientesSatisfeitos/>
//       <Rodape/>
//     </div>
//   )
// }

// export default Home

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import buildingsIcon from "../assets/predio.png";
import houseIcon from "../assets/casa.png";
import industryIcon from "../assets/industria.png";
import heroBackground from "../assets/Bg.png";

import Rodape from "../components/Footer";
import Empreendimentos from "../components/Empreendimentos";
import ClientesSatisfeitos from "../components/ClientesSatisfeitos";

import { useLanguage } from "../context/LanguageContext";
import useDynamicTranslation from '../hooks/useDynamicTranslaction'
const Home = () => {
  const { language } = useLanguage();
  const { translateText } = useDynamicTranslation();

  // 🔸 Textos originais em PT — todos centralizados aqui
  const TEXTS = {
    indicador: "2/5",
    heroLine1: "EMPRESARIAL",
    heroLine2: "ELVIRA VIDAL ORGE",
    lancamento: "LANÇAMENTO",
    titulo: "MAIS DE 25 ANOS CONSTRUINDO COM EXCELÊNCIA E CONFIANÇA",
    paragrafo1:
      "Com experiência, inovação e foco no cliente, entregamos soluções completas em incorporação, edificações e reformas.",
    paragrafo2:
      "Nosso compromisso é transformar projetos em realidade com inteligência técnica, cumprimento de prazos e foco total na satisfação do cliente.",
    lista: [
      "Incorporação Imobiliária",
      "Construção de casas, prédios e empreendimentos corporativos",
      "Reformas em geral",
      "Reservatórios e rede de distribuição de água",
      "Gerenciamento e fiscalização de obras",
    ],
    cta: "CONHEÇA NOSSOS EMPREENDIMENTOS!",
    icone1: { titulo: "INCORPORAÇÃO", texto: "Desenvolvimento de empreendimentos imobiliários com excelência e qualidade superior" },
    icone2: { titulo: "CONSTRUÇÃO", texto: "Obras residenciais, comerciais e corporativas com tecnologia e inovação" },
    icone3: { titulo: "REFORMAS", texto: "Reformas e modernizações com planejamento e execução de alta qualidade" },
  };

  const [TR, setTR] = useState(TEXTS); // TR = textos traduzidos

  // ⚙️ Traduz tudo quando mudar para ENG
  useEffect(() => {
    const translateAll = async () => {
      if (language === "eng") {
        const entries = Object.entries(TEXTS);
        const translated = {};

        for (const [key, value] of entries) {
          if (typeof value === "string") {
            translated[key] = await translateText(value, "en");
          } else if (Array.isArray(value)) {
            translated[key] = await Promise.all(value.map((v) => translateText(v, "en")));
          } else if (typeof value === "object") {
            const objEntries = Object.entries(value);
            const inner = {};
            for (const [k, v] of objEntries) {
              inner[k] = await translateText(v, "en");
            }
            translated[key] = inner;
          }
        }
        setTR(translated);
      } else {
        setTR(TEXTS); // volta ao original
      }
    };

    translateAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <div>
      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        {/* Indicador */}
        <div className="absolute top-24 left-8 text-white text-sm font-medium">
          {TR.indicador}
        </div>

        {/* Botão play */}
        <div className="absolute top-24 right-8 text-white">
          <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
            <span className="ml-0.5">▶</span>
          </div>
        </div>

        {/* Headline */}
        <div className="absolute bottom-8 left-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight uppercase"
            style={{ fontFamily: "Arial, sans-serif", fontWeight: 900, letterSpacing: "0.02em" }}
          >
            {TR.heroLine1}
            <br />
            {TR.heroLine2}
          </motion.h1>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Imagem */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={heroBackground}
                alt="Empreendimento Objetiva"
                className="w-full max-w-xs h-[600px] object-cover mx-auto"
              />
            </motion.div>

            {/* Texto */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {/* label */}
              <div>
                <span className="text-[#c84a20] text-sm font-bold uppercase tracking-wider">
                  {TR.lancamento}
                </span>
              </div>

              {/* título */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {TR.titulo}
              </h2>

              {/* parágrafos */}
              <div className="space-y-4">
                <p className="text-base text-gray-700 leading-relaxed">
                  {TR.paragrafo1}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {TR.paragrafo2}
                </p>
              </div>

              {/* lista */}
              <div className="space-y-3 text-gray-700 text-sm">
                {TR.lista.map((item, idx) => (
                  <p key={idx}>• {item}</p>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-6">
                <a
                  href="#empreendimentos"
                  className="text-[#c84a20] font-bold text-xs uppercase tracking-wider hover:underline transition-colors duration-300"
                >
                  {TR.cta}
                </a>
              </div>
            </motion.div>
          </div>

          {/* Ícones */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-12 mt-20 pt-16 border-t border-gray-200"
          >
            {[TR.icone1, TR.icone2, TR.icone3].map((icn, i) => (
              <div className="text-center" key={icn.titulo}>
                <div className="flex justify-center mb-6">
                  <img
                    src={[buildingsIcon, houseIcon, industryIcon][i]}
                    alt={icn.titulo}
                    className="w-16 h-16"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase">
                  {icn.titulo}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {icn.texto}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <Empreendimentos />
      <ClientesSatisfeitos />
      <Rodape />
    </div>
  );
};

export default Home;
