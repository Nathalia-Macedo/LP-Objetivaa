// import React from "react";
// import pestana_capa from '../assets/Pestana/pestana_capa.JPG'
// import residencial from '../assets/Residencial.JPG'
// import empresarial from '../assets/empresarialElvira.JPG'
// const empreendimentos = [
//   {
//     id: 1,
//     nome: "Pestana Lodge Bahia",
//     imagem: pestana_capa,
//   },
//   {
//     id: 2,
//     nome: "Residencial em Interlagos",
//     imagem: residencial,
//   },
//   {
//     id: 3,
//     nome: "Empresarial Elvira Vidal Orge",
//     imagem: empresarial,
//   },
//   {
//     id: 4,
//     nome: "Alto dos Jardins",
//     imagem: "https://via.placeholder.com/300x400",
//   },,
//   {
//     id: 4,
//     nome: "Alto dos Jardins",
//     imagem: "https://via.placeholder.com/300x400",
//   }
// ];

// const Empreendimentos = () => {
//   return (
//     <section className="py-10 px-4 bg-white">
//   <div className="max-w-7xl mx-auto">
//     <h2 className="text-2xl font-bold text-black mb-4">EMPREENDIMENTOS</h2>

//     <div className="flex justify-end gap-4 text-black text-sm mb-6">
//       <span className="cursor-pointer">TIPO </span>
//       <span className="cursor-pointer">STATUS </span>
//       <span className="cursor-pointer">FAIXA DE INVESTIMENTO </span>
//       <span className="cursor-pointer">BAIRRO </span>
//     </div>

//     <div className="flex overflow-x-auto gap-4 hide-scrollbar">
//       {empreendimentos.map((card) => (
//         <div
//           key={card.id}
//           className="relative w-[250px] h-[350px] rounded-xl overflow-hidden group flex-shrink-0"
//         >
//           <img
//             src={card.imagem}
//             alt={card.nome}
//             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//           />

//           {/* Overlay laranja ao passar o mouse */}
//           <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

//           {/* Texto branco dentro do card */}
//           <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
//             <p className="text-white text-sm">LOREM IPSUM</p>
//             <h3 className="text-white text-lg font-bold">{card.nome}</h3>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// </section>
//   );
// };

// export default Empreendimentos;


import React, { useEffect, useRef } from "react";
import pestana_capa from '../assets/Pestana/pestana_capa.JPG';
import residencial from '../assets/Residencial.JPG';
import empresarial from '../assets/empresarialElvira.JPG';
import Atenas from '../assets/Atenas.JPG'
import Urban from '../assets/Urban Pituba.jpg'
const empreendimentos = [
  {
    id: 1,
    nome: "Pestana Lodge Bahia",
    imagem: pestana_capa,
  },
  {
    id: 2,
    nome: "Residencial em Interlagos",
    imagem: residencial,
  },
  {
    id: 3,
    nome: "Empresarial Elvira Vidal Orge",
    imagem: empresarial,
  },
  {
    id: 4,
    nome: "Edifício Cidade Atenas",
    imagem: Atenas,
  },
  {
    id: 5,
    nome: "Urban Pituba",
    imagem: Urban,
  }
];

const Empreendimentos = () => {
  const containerRef = useRef(null);

  // Autoplay (opcional)
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

  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-black mb-4">EMPREENDIMENTOS</h2>

        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE e Edge
          }}
        >
          {/* Esconde a scrollbar no Chrome/Safari */}
          <style>
            {`
              div::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>

          {empreendimentos.map((card) => (
            <div
              key={card.id}
              className="relative flex-shrink-0 w-[250px] h-[350px] rounded-xl overflow-hidden group snap-start"
            >
              <img
                src={card.imagem}
                alt={card.nome}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <p className="text-white text-sm">Empreendimentos</p>
                <h3 className="text-white text-lg font-bold">{card.nome}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Empreendimentos;
