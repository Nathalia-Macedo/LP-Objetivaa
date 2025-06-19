import React, { useRef, useEffect, useState } from "react";
import { useEmpreendimentos } from "../context/EmpreendimentosContext";
import { useLanguage } from "../context/LanguageContext";
import useDynamicTranslation from "../hooks/useDynamicTranslaction";

const Empreendimentos = () => {
  const containerRef = useRef(null);
  const { empreendimentos, loading } = useEmpreendimentos();
  const { language } = useLanguage();
  const { translateBatch } = useDynamicTranslation();

  const [translatedCards, setTranslatedCards] = useState([]);

  useEffect(() => {
    const traduzirCards = async () => {
      if (!empreendimentos || empreendimentos.length === 0) return;

      if (language === "port") {
        setTranslatedCards(empreendimentos);
        return;
      }

      const textosParaTraduzir = empreendimentos.flatMap((card) => [
        card.name,
        card.tipo,
        card.status,
      ]);

      const traducoes = await translateBatch(textosParaTraduzir, "en");

      const novosCards = empreendimentos.map((card, index) => ({
        ...card,
        name: traducoes[index * 3],
        tipo: traducoes[index * 3 + 1],
        status: traducoes[index * 3 + 2],
      }));

      setTranslatedCards(novosCards);
    };

    traduzirCards();
  }, [language, empreendimentos]);

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
          {language === "eng" ? "DEVELOPMENTS" : "EMPREENDIMENTOS"}
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
                src={card.images?.[0] || "/placeholder.jpg"}
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
