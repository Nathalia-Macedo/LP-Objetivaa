// import React, { useRef, useEffect } from "react";
// import { useEmpreendimentos } from "../context/EmpreendimentosContext";

// const Empreendimentos = () => {
//   const containerRef = useRef(null);
//   const { empreendimentos, loading } = useEmpreendimentos();
//   console.log(empreendimentos)
//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const interval = setInterval(() => {
//       if (container.scrollLeft + container.offsetWidth >= container.scrollWidth) {
//         container.scrollTo({ left: 0, behavior: "smooth" });
//       } else {
//         container.scrollBy({ left: 250, behavior: "smooth" });
//       }
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   if (loading) return <p className="text-center text-gray-500">Carregando empreendimentos...</p>;

//   return (
//     <section className="py-10 px-4 bg-white" id="empreendimentos">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-2xl font-bold text-black mb-4">EMPREENDIMENTOS</h2>

//         <div
//           ref={containerRef}
//           className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2"
//           style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}
//         >
//           <style>{`div::-webkit-scrollbar { display: none; }`}</style>

//           {empreendimentos.map((card) => (
//             <div
//               key={card.id}
//               className="relative flex-shrink-0 w-[250px] h-[350px] rounded-xl overflow-hidden group snap-start"
//             >
//               <img
//                 src={`${card.images[0]}`} // usa a primeira imagem da lista
//                 alt={card.name}
//                 className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//               />
//               <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
//               <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
//                 <p className="text-white text-sm">
//                   {card.tipo} - {card.status}
//                 </p>
//                 <h3 className="text-white text-lg font-bold">{card.name}</h3>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Empreendimentos;


import React, { useRef, useEffect, useState } from "react";
import { useEmpreendimentos } from "../context/EmpreendimentosContext";
import { useLanguage } from "../context/LanguageContext";
import useDynamicTranslation from "../hooks/useDynamicTranslaction";

const Empreendimentos = () => {
  const containerRef = useRef(null);
  const { empreendimentos, loading } = useEmpreendimentos();
  const { language } = useLanguage();
  const { translateText } = useDynamicTranslation();

  const [translatedCards, setTranslatedCards] = useState([]);

  useEffect(() => {
    if (!empreendimentos || empreendimentos.length === 0) return;

    const traduzirTextos = async () => {
      if (language === "pt") {
        setTranslatedCards(empreendimentos);
        return;
      }

      // Traduz card a card de forma confiável
      const traducoesPromises = empreendimentos.map(async (card) => {
        const tipo = await translateText(card?.tipo ?? "", language);
        const status = await translateText(card?.status ?? "", language);
        const name = await translateText(card?.name ?? "", language);

        return {
          ...card,
          tipo,
          status,
          name,
        };
      });

      const resultado = await Promise.all(traducoesPromises);
      setTranslatedCards(resultado);
    };

    traduzirTextos();
  }, [empreendimentos, language, translateText]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (container.scrollLeft + container.offsetWidth >= container.scrollWidth) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 250, behavior: "smooth" });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="text-center text-gray-500">Carregando empreendimentos...</p>;

  return (
    <section className="py-10 px-4 bg-white" id="empreendimentos">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-black mb-4">
          {language === "pt" ? "EMPREENDIMENTOS" : "PROJECTS"}
        </h2>

        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2"
          style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>

          {translatedCards.map((card) => (
            <div
              key={card.id}
              className="relative flex-shrink-0 w-[250px] h-[350px] rounded-xl overflow-hidden group snap-start"
            >
              <img
                src={`${card.images[0]}`}
                alt={card.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <p className="text-white text-sm">
                  {card.tipo} - {card.status}
                </p>
                <h3 className="text-white text-lg font-bold">{card.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Empreendimentos;

