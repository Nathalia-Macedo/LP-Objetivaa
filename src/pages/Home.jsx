// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// import buildingsIcon from "../assets/predio.png";
// import houseIcon from "../assets/casa.png";
// import industryIcon from "../assets/industria.png";
// import heroBackground from "../assets/Bg.png";
// import heroVideo from "../assets/URBAN HOME PITUBA - VIDEO LANÇAMENTO.mp4";

// import Rodape from "../components/Footer";
// import Empreendimentos from "../components/Empreendimentos";
// import ClientesSatisfeitos from "../components/ClientesSatisfeitos";

// import { useLanguage } from "../context/LanguageContext";
// import useDynamicTranslation from '../hooks/useDynamicTranslaction'
// const Home = () => {
//   const { language } = useLanguage();
//   const { translateText } = useDynamicTranslation();

//   // 🔸 Textos originais em PT — todos centralizados aqui
//   const TEXTS = {
//     indicador: "",
//     heroLine1: "",
//     heroLine2: "",
//     lancamento: "LANÇAMENTO",
//     titulo: "MAIS DE 25 ANOS CONSTRUINDO COM EXCELÊNCIA E CONFIANÇA",
//     paragrafo1:
//       "Com experiência, inovação e foco no cliente, entregamos soluções completas em incorporação, edificações e reformas.",
//     paragrafo2:
//       "Nosso compromisso é transformar projetos em realidade com inteligência técnica, cumprimento de prazos e foco total na satisfação do cliente.",
//     lista: [
//       "Incorporação Imobiliária",
//       "Construção de casas, prédios e empreendimentos corporativos",
//       "Reformas em geral",
//       "Reservatórios e rede de distribuição de água",
//       "Gerenciamento e fiscalização de obras",
//     ],
//     cta: "CONHEÇA NOSSOS EMPREENDIMENTOS!",
//     icone1: { titulo: "INCORPORAÇÃO", texto: "Desenvolvimento de empreendimentos imobiliários com excelência e qualidade superior" },
//     icone2: { titulo: "CONSTRUÇÃO", texto: "Obras residenciais, comerciais e corporativas com tecnologia e inovação" },
//     icone3: { titulo: "REFORMAS", texto: "Reformas e modernizações com planejamento e execução de alta qualidade" },
//   };

//   const [TR, setTR] = useState(TEXTS); // TR = textos traduzidos

//   // ⚙️ Traduz tudo quando mudar para ENG
//   useEffect(() => {
//     const translateAll = async () => {
//       if (language === "eng") {
//         const entries = Object.entries(TEXTS);
//         const translated = {};

//         for (const [key, value] of entries) {
//           if (typeof value === "string") {
//             translated[key] = await translateText(value, "en");
//           } else if (Array.isArray(value)) {
//             translated[key] = await Promise.all(value.map((v) => translateText(v, "en")));
//           } else if (typeof value === "object") {
//             const objEntries = Object.entries(value);
//             const inner = {};
//             for (const [k, v] of objEntries) {
//               inner[k] = await translateText(v, "en");
//             }
//             translated[key] = inner;
//           }
//         }
//         setTR(translated);
//       } else {
//         setTR(TEXTS); // volta ao original
//       }
//     };

//     translateAll();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [language]);

//   return (
//     <div>
//       {/* Hero Section */}
//       <section
//         id="home"
//         className="relative h-screen w-full bg-cover bg-center bg-no-repeat"
//       >
      
//   {/* Vídeo em background */}
//   <video
//     autoPlay
//     loop
//     playsInline
//     className="absolute top-0 left-0 w-full h-full object-cover z-0"
//   >
//  <source src={heroVideo} type="video/mp4" />
//     Seu navegador não suporta vídeos em HTML5.
//   </video>
//         {/* Indicador */}
//         <div className="absolute top-24 left-8 text-white text-sm font-medium">
//           {TR.indicador}
//         </div>

//         Botão play
//         <div className="absolute top-24 right-8 text-white">
//           <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
//             <span className="ml-0.5">▶</span>
//           </div>
//         </div>

//         {/* Headline */}
//         <div className="absolute bottom-8 left-8">
//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight uppercase"
//             style={{ fontFamily: "Arial, sans-serif", fontWeight: 900, letterSpacing: "0.02em" }}
//           >
//             {TR.heroLine1}
//             <br />
//             {TR.heroLine2}
//           </motion.h1>
//         </div>
//       </section>

//       {/* Conteúdo */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-8">
//           <div className="grid lg:grid-cols-2 gap-12 items-start">
//             {/* Imagem */}
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               viewport={{ once: true }}
//               className="relative"
//             >
//               <img
//                 src={heroBackground}
//                 alt="Empreendimento Objetiva"
//                 className="w-full max-w-xs h-[600px] object-cover mx-auto"
//               />
//             </motion.div>

//             {/* Texto */}
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               viewport={{ once: true }}
//               className="space-y-4"
//             >
//               {/* label */}
//               <div>
//                 <span className="text-[#c84a20] text-sm font-bold uppercase tracking-wider">
//                   {TR.lancamento}
//                 </span>
//               </div>

//               {/* título */}
//               <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
//                 {TR.titulo}
//               </h2>

//               {/* parágrafos */}
//               <div className="space-y-4">
//                 <p className="text-base text-gray-700 leading-relaxed">
//                   {TR.paragrafo1}
//                 </p>
//                 <p className="text-sm text-gray-600 leading-relaxed">
//                   {TR.paragrafo2}
//                 </p>
//               </div>

//               {/* lista */}
//               <div className="space-y-3 text-gray-700 text-sm">
//                 {TR.lista.map((item, idx) => (
//                   <p key={idx}>• {item}</p>
//                 ))}
//               </div>

//               {/* CTA */}
//               <div className="pt-6">
//                 <a
//                   href="#empreendimentos"
//                   className="text-[#c84a20] font-bold text-xs uppercase tracking-wider hover:underline transition-colors duration-300"
//                 >
//                   {TR.cta}
//                 </a>
//               </div>
//             </motion.div>
//           </div>

//           {/* Ícones */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             viewport={{ once: true }}
//             className="grid md:grid-cols-3 gap-12 mt-20 pt-16 border-t border-gray-200"
//           >
//             {[TR.icone1, TR.icone2, TR.icone3].map((icn, i) => (
//               <div className="text-center" key={icn.titulo}>
//                 <div className="flex justify-center mb-6">
//                   <img
//                     src={[buildingsIcon, houseIcon, industryIcon][i]}
//                     alt={icn.titulo}
//                     className="w-16 h-16"
//                   />
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase">
//                   {icn.titulo}
//                 </h3>
//                 <p className="text-gray-600 text-sm leading-relaxed">
//                   {icn.texto}
//                 </p>
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       <Empreendimentos />
//       <ClientesSatisfeitos />
//       <Rodape />
//     </div>
//   );
// };

// export default Home;











// import { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";

// import buildingsIcon from "../assets/predio.png";
// import houseIcon from "../assets/casa.png";
// import industryIcon from "../assets/industria.png";
// import heroBackground from "../assets/Bg.png";
// import heroVideo from "../assets/URBAN HOME PITUBA - VIDEO LANÇAMENTO.mp4";

// import Rodape from "../components/Footer";
// import Empreendimentos from "../components/Empreendimentos";
// import ClientesSatisfeitos from "../components/ClientesSatisfeitos";

// import { useLanguage } from "../context/LanguageContext";
// import useDynamicTranslation from "../hooks/useDynamicTranslaction";

// const Home = () => {
//   const { language } = useLanguage();
//   const { translateText } = useDynamicTranslation();

//   const TEXTS = {
//     indicador: "",
//     heroLine1: "",
//     heroLine2: "",
//     lancamento: "LANÇAMENTO",
//     titulo: "MAIS DE 25 ANOS CONSTRUINDO COM EXCELÊNCIA E CONFIANÇA",
//     paragrafo1:
//       "Com experiência, inovação e foco no cliente, entregamos soluções completas em incorporação, edificações e reformas.",
//     paragrafo2:
//       "Nosso compromisso é transformar projetos em realidade com inteligência técnica, cumprimento de prazos e foco total na satisfação do cliente.",
//     lista: [
//       "Incorporação Imobiliária",
//       "Construção de casas, prédios e empreendimentos corporativos",
//       "Reformas em geral",
//       "Reservatórios e rede de distribuição de água",
//       "Gerenciamento e fiscalização de obras",
//     ],
//     cta: "CONHEÇA NOSSOS EMPREENDIMENTOS!",
//     icone1: { titulo: "INCORPORAÇÃO", texto: "Desenvolvimento de empreendimentos imobiliários com excelência e qualidade superior" },
//     icone2: { titulo: "CONSTRUÇÃO", texto: "Obras residenciais, comerciais e corporativas com tecnologia e inovação" },
//     icone3: { titulo: "REFORMAS", texto: "Reformas e modernizações com planejamento e execução de alta qualidade" },
//   };

//   const [TR, setTR] = useState(TEXTS);

//   useEffect(() => {
//     const translateAll = async () => {
//       if (language === "eng") {
//         const entries = Object.entries(TEXTS);
//         const translated = {};

//         for (const [key, value] of entries) {
//           if (typeof value === "string") {
//             translated[key] = await translateText(value, "en");
//           } else if (Array.isArray(value)) {
//             translated[key] = await Promise.all(value.map((v) => translateText(v, "en")));
//           } else if (typeof value === "object") {
//             const objEntries = Object.entries(value);
//             const inner = {};
//             for (const [k, v] of objEntries) {
//               inner[k] = await translateText(v, "en");
//             }
//             translated[key] = inner;
//           }
//         }
//         setTR(translated);
//       } else {
//         setTR(TEXTS);
//       }
//     };

//     translateAll();
//   }, [language]);

//   const videoRef = useRef(null);
//   const [isMuted, setIsMuted] = useState(true);
//   const [isPlaying, setIsPlaying] = useState(true);

//   const toggleMute = () => {
//     setIsMuted((prev) => {
//       if (videoRef.current) videoRef.current.muted = !prev;
//       return !prev;
//     });
//   };

//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (videoRef.current.paused) {
//         videoRef.current.play();
//         setIsPlaying(true);
//       } else {
//         videoRef.current.pause();
//         setIsPlaying(false);
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Hero Section - Ajustado para melhor responsividade */}
//       <section id="home" className="relative w-full aspect-video overflow-hidden">
//         <div className="absolute inset-0 w-full h-full">
//           <video
//             ref={videoRef}
//             autoPlay
//             loop
//             playsInline
//             muted={isMuted}
//             className="w-full h-full object-cover"
//           >
//             <source src={heroVideo} type="video/mp4" />
//             Seu navegador não suporta vídeos em HTML5.
//           </video>
//         </div>

//         {/* Controles do vídeo */}
//         <div className="absolute top-4 right-4 flex flex-col gap-3 z-10">
//           <button
//             onClick={togglePlay}
//             className="bg-white/70 backdrop-blur p-2 rounded-full text-black hover:bg-white transition"
//           >
//             {isPlaying ? "❚❚" : "▶"}
//           </button>
//           <button
//             onClick={toggleMute}
//             className="bg-white/70 backdrop-blur p-2 rounded-full text-black hover:bg-white transition"
//           >
//             {isMuted ? "🔇" : "🔊"}
//           </button>
//         </div>

//         {/* Título */}
//         <div className="absolute bottom-8 left-4 md:left-8 z-10 max-w-[90%]">
//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight uppercase drop-shadow-xl"
//           >
//             {TR.heroLine1}
//             <br />
//             {TR.heroLine2}
//           </motion.h1>
//         </div>
//       </section>

//       {/* Conteúdo Principal */}
//       <main className="flex-grow">
//         <section className="bg-white pb-16 pt-8 px-4 md:px-8">
//           <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               className="relative mx-auto max-w-md"
//             >
//               <img
//                 src={heroBackground}
//                 alt="Empreendimento Objetiva"
//                 className="w-full h-auto rounded-lg shadow-lg"
//               />
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               className="space-y-4"
//             >
//               <span className="text-orange-600 text-sm font-bold uppercase">
//                 {TR.lancamento}
//               </span>
              
//               <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
//                 {TR.titulo}
//               </h2>

//               <div className="space-y-4 text-gray-700">
//                 <p>{TR.paragrafo1}</p>
//                 <p className="text-sm">{TR.paragrafo2}</p>
//               </div>

//               <div className="space-y-2">
//                 {TR.lista.map((item, idx) => (
//                   <p key={idx} className="flex items-start">
//                     <span className="mr-2">•</span>{item}
//                   </p>
//                 ))}
//               </div>

//               <a
//                 href="#empreendimentos"
//                 className="inline-block mt-4 text-orange-600 font-bold text-xs uppercase hover:underline"
//               >
//                 {TR.cta}
//               </a>
//             </motion.div>
//           </div>

//           {/* Seção de ícones */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="max-w-7xl mx-auto mt-12 pt-8 grid md:grid-cols-3 gap-8"
//           >
//             {[TR.icone1, TR.icone2, TR.icone3].map((icn, i) => (
//               <div key={icn.titulo} className="text-center px-4">
//                 <div className="flex justify-center mb-4">
//                   <img src={[buildingsIcon, houseIcon, industryIcon][i]} 
//                        alt={icn.titulo} 
//                        className="w-14 h-14" />
//                 </div>
//                 <h3 className="text-lg font-bold mb-3">{icn.titulo}</h3>
//                 <p className="text-gray-600 text-sm">{icn.texto}</p>
//               </div>
//             ))}
//           </motion.div>
//         </section>

//         {/* Seções subsequentes */}
//         <Empreendimentos />
//         <ClientesSatisfeitos />
//       </main>

//       <Rodape />
//     </div>
//   );
// };

// export default Home;



import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import buildingsIcon from "../assets/predio.png";
import houseIcon from "../assets/casa.png";
import industryIcon from "../assets/industria.png";
import heroBackground from "../assets/Bg.png";
import heroVideo from "../assets/URBAN HOME PITUBA - VIDEO LANÇAMENTO.mp4";

import Rodape from "../components/Footer";
import Empreendimentos from "../components/Empreendimentos";
import ClientesSatisfeitos from "../components/ClientesSatisfeitos";

import { useLanguage } from "../context/LanguageContext";
import useDynamicTranslation from "../hooks/useDynamicTranslaction";

const Home = () => {
  const { language } = useLanguage();
  const { translateText } = useDynamicTranslation();

  const TEXTS = {
    indicador: "",
    heroLine1: "",
    heroLine2: "",
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
    cta: "Sobre Nós",
    icone1: { titulo: "INCORPORAÇÃO", texto: "Desenvolvimento de empreendimentos imobiliários com excelência e qualidade superior" },
    icone2: { titulo: "CONSTRUÇÃO", texto: "Obras residenciais, comerciais e corporativas com tecnologia e inovação" },
    icone3: { titulo: "REFORMAS", texto: "Reformas e modernizações com planejamento e execução de alta qualidade" },
  };

  const [TR, setTR] = useState(TEXTS);

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
        setTR(TEXTS);
      }
    };

    translateAll();
  }, [language]);

  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMute = () => {
    setIsMuted((prev) => {
      if (videoRef.current) videoRef.current.muted = !prev;
      return !prev;
    });
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div>
      {/* Hero Section */}
     {/* Hero Section - VERSÃO CORRIGIDA */}
<section id="home" className="relative w-full aspect-video min-h-[70vh] overflow-hidden bg-black">
  <div className="absolute inset-0 w-full h-full">
    <video
      ref={videoRef}
      autoPlay
      loop
      playsInline
      muted={isMuted}
      poster={heroBackground}
      preload="auto"
      className="w-full h-full object-cover object-center"
      style={{
        minHeight: '100%',
        minWidth: '100%'
      }}
    >
      <source src={heroVideo} type="video/mp4" />
      Seu navegador não suporta vídeos em HTML5.
    </video>
  </div>

  {/* Botões de controle */}
  <div className="absolute top-[5rem] right-4 flex flex-col gap-3 z-10">
    <button
      onClick={togglePlay}
      className="bg-white/70 backdrop-blur p-2 rounded-full text-black hover:bg-white transition"
      aria-label="Play/Pause"
    >
      {isPlaying ? "❚❚" : "▶"}
    </button>
    <button
      onClick={toggleMute}
      className="bg-white/70 backdrop-blur p-2 rounded-full text-black hover:bg-white transition"
      aria-label="Mute/Unmute"
    >
      {isMuted ? "🔇" : "🔊"}
    </button>
  </div>

  {/* Headline */}
  <div className="absolute bottom-8 left-4 md:left-8 z-10 max-w-[90%]">
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight uppercase drop-shadow-xl"
      style={{ fontFamily: "Arial, sans-serif", fontWeight: 900, letterSpacing: "0.02em" }}
    >
      {TR.heroLine1}
      <br />
      {TR.heroLine2}
    </motion.h1>
  </div>
</section>


      {/* Conteúdo - SEÇÃO MODIFICADA PARA RESPONSIVIDADE */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
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
                className="w-full max-w-xs md:max-w-md h-[400px] md:h-[600px] object-cover mx-auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <span className="text-[#c84a20] text-sm font-bold uppercase tracking-wider">
                  {TR.lancamento}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {TR.titulo}
              </h2>

              <div className="space-y-4">
                <p className="text-base text-gray-700 leading-relaxed">
                  {TR.paragrafo1}
                </p>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {TR.paragrafo2}
                </p>
              </div>

              <div className="space-y-3 text-gray-700 text-sm md:text-base">
                {TR.lista.map((item, idx) => (
                  <p key={idx}>• {item}</p>
                ))}
              </div>

              <div className="pt-6">
                <a
                  href="/quem-somos"
                  className="text-[#c84a20] font-bold text-xs md:text-sm uppercase tracking-wider hover:underline transition-colors duration-300"
                >
                  {TR.cta}
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 md:gap-12 mt-12 md:mt-20 pt-8 md:pt-16 border-t border-gray-200"
          >
            {[TR.icone1, TR.icone2, TR.icone3].map((icn, i) => (
              <div className="text-center" key={icn.titulo}>
                <div className="flex justify-center mb-4 md:mb-6">
                  <img
                    src={[buildingsIcon, houseIcon, industryIcon][i]}
                    alt={icn.titulo}
                    className="w-12 md:w-16 h-12 md:h-16"
                  />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4 uppercase">
                  {icn.titulo}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
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
