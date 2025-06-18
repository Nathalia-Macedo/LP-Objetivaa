import React, { useRef, useEffect } from "react";
import { useEmpreendimentos } from "../context/EmpreendimentosContext";

const EmpreendimentosSlider = () => {
  const { empreendimentos, loading } = useEmpreendimentos();
  const scroller = useRef(null);

  // auto-scroll suave a cada 4 s
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const id = setInterval(() => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 250, behavior: "smooth" });
      }
    }, 4000);
    return () => clearInterval(id);
  }, []);

  if (loading) return <p className="text-center text-gray-500 py-10">Carregando empreendimentos…</p>;

  return (
    <section className="py-10 bg-white" id="empreendimentos">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">EMPREENDIMENTOS</h2>

        <div
          ref={scroller}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <style>{`div::-webkit-scrollbar{display:none}`}</style>

          {empreendimentos.map((card) => (
            <div
              key={card.id}
              className="relative flex-shrink-0 w-[250px] h-[350px] rounded-xl overflow-hidden group snap-start"
            >
              <img
                src={card.images[0] || "/placeholder.jpg"}
                alt={card.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-60 transition-opacity" />
              <div className="absolute bottom-0 p-4 z-10">
                <p className="text-white text-sm">
                  {card.tipo} • {card.status}
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

export default EmpreendimentosSlider;
