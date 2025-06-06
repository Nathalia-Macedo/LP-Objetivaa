// import React, { useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const testimonials = [
//   {
//     name: "Lorem Ipsum",
//     subtitle: "Dolor sit amet",
//     text: "Sed elit quam, iaculis sed semper sit amet udin vitae nibh. Rubino staveuo at magna skal semperFusce commodo molestie luctus.Lorem ipsum ulicon Dolor tusima oliatup.",
//   },
//   {
//     name: "Lorem Ipsum",
//     subtitle: "Dolor sit amet",
//     text: "Paras sitator ed elit quam, iaculis sed semper sit amet udin vitae nibh. at magna skal semperFusce commodo molestie luctus.Lorem ipsum vitalun Dolor tusima oliatup aculis sed semper sit ame.",
//   },
//   {
//     name: "Lorem Ipsum",
//     subtitle: "Dolor sit amet",
//     text: "Mais um exemplo de depoimento para completar o carrossel com vários elementos e simular uma rotação.",
//   },
//   {
//     name: "Lorem Ipsum",
//     subtitle: "Dolor sit amet",
//     text: "Outro depoimento com informações importantes sobre o serviço prestado. Muito bom mesmo.",
//   },
// ];

// export default function ClientesSatisfeitos() {
//   const [current, setCurrent] = useState(0);

//   const next = () => {
//     setCurrent((prev) => (prev + 2 >= testimonials.length ? 0 : prev + 2));
//   };

//   const prev = () => {
//     setCurrent((prev) => (prev - 2 < 0 ? testimonials.length - 2 : prev - 2));
//   };

//   return (
//     <section
//       className="py-12"
//       style={{
//         backgroundColor: "#fff",
//         backgroundImage:
//           "radial-gradient(rgba(128,128,128,0.15) 1px, transparent 1px), radial-gradient(rgba(128,128,128,0.15) 1px, transparent 1px)",
//         backgroundPosition: "0 0, 10px 10px",
//         backgroundSize: "10px 10px",
//       }}
//     >
//       <div className="text-center mb-10 px-4">
//         <h2 className="text-3xl font-bold text-gray-900">
//           +20,500 CLIENTES SATISFEITOS
//         </h2>
//       </div>

//       <div className="relative max-w-6xl mx-auto px-4">
//         {/* Navegação acima */}
//         <div className="flex justify-end mb-6 space-x-4">
//           <button
//             onClick={prev}
//             className="text-gray-500 hover:text-black p-2 rounded-full bg-white shadow"
//             aria-label="Anterior"
//           >
//             <ChevronLeft />
//           </button>
//           <button
//             onClick={next}
//             className="text-gray-500 hover:text-black p-2 rounded-full bg-white shadow"
//             aria-label="Próximo"
//           >
//             <ChevronRight />
//           </button>
//         </div>

//         {/* Carrossel com animação de deslize */}
//         <div className="overflow-hidden">
//           <div
//             className="flex transition-transform duration-500"
//             style={{
//               transform: `translateX(-${(current / 2) * 100}%)`,
//               width: `${(testimonials.length / 2) * 100}%`, // total width: cada par ocupa 100%
//             }}
//           >
//             {testimonials.map((t, i) => (
//               <div
//                 key={i}
//                 className="w-full md:w-1/2 px-4 box-border"
//               >
//                 <div className="bg-white border-t-4 border-orange-500 rounded-lg shadow p-6 relative h-full">
//                   {/* Aspas no canto superior direito como texto */}
//                   <div
//                     className="absolute top-4 right-4 text-orange-500 opacity-30 text-6xl leading-none pointer-events-none select-none"
//                     style={{ fontFamily: "'Georgia', serif" }}
//                   >
//                     “
//                   </div>

//                   <h4 className="font-bold text-gray-800">{t.name}</h4>
//                   <p className="text-sm text-gray-500 mb-2">/ {t.subtitle}</p>
//                   <p className="text-sm text-gray-700">{t.text}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Lorem Ipsum",
    subtitle: "Dolor sit amet",
    text: "Sed elit quam, iaculis sed semper sit amet udin vitae nibh. Rubino staveuo at magna skal semperFusce commodo molestie luctus.Lorem ipsum ulicon Dolor tusima oliatup.",
  },
  {
    name: "Lorem Ipsum",
    subtitle: "Dolor sit amet",
    text: "Paras sitator ed elit quam, iaculis sed semper sit amet udin vitae nibh. at magna skal semperFusce commodo molestie luctus.Lorem ipsum vitalun Dolor tusima oliatup aculis sed semper sit ame.",
  },
  {
    name: "Lorem Ipsum",
    subtitle: "Dolor sit amet",
    text: "Mais um exemplo de depoimento para completar o carrossel com vários elementos e simular uma rotação.",
  },
  {
    name: "Lorem Ipsum",
    subtitle: "Dolor sit amet",
    text: "Outro depoimento com informações importantes sobre o serviço prestado. Muito bom mesmo.",
  },
];

// Hook para detectar se é mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 768);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return isMobile;
};

export default function ClientesSatisfeitos() {
  const isMobile = useIsMobile();
  const cardsPerPage = isMobile ? 1 : 2;
  const [current, setCurrent] = useState(0);

  const totalPages = Math.ceil(testimonials.length / cardsPerPage);

  const next = () => {
    setCurrent((prev) => (prev + 1 >= totalPages ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 < 0 ? totalPages - 1 : prev - 1));
  };

  return (
    <section
      className="py-12"
      style={{
        backgroundColor: "#fff",
        backgroundImage:
          "radial-gradient(rgba(128,128,128,0.15) 1px, transparent 1px), radial-gradient(rgba(128,128,128,0.15) 1px, transparent 1px)",
        backgroundPosition: "0 0, 10px 10px",
        backgroundSize: "10px 10px",
      }}
    >
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl font-bold text-gray-900">
          +20,500 CLIENTES SATISFEITOS
        </h2>
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Navegação acima */}
        <div className="flex justify-end mb-6 space-x-4">
          <button
            onClick={prev}
            className="text-gray-500 hover:text-black p-2 rounded-full bg-white shadow"
            aria-label="Anterior"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={next}
            className="text-gray-500 hover:text-black p-2 rounded-full bg-white shadow"
            aria-label="Próximo"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Carrossel com animação de deslize */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${(current / totalPages) * 100}%)`,
              width: `${(testimonials.length / cardsPerPage) * 100}%`,
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`px-4 box-border ${
                  isMobile ? "w-full" : "w-1/2"
                }`}
              >
                <div className="bg-white border-t-4 border-orange-500 rounded-lg shadow p-6 relative h-full">
                  {/* Aspas no canto superior direito como texto */}
                  <div
                    className="absolute top-4 right-4 text-orange-500 opacity-30 text-6xl leading-none pointer-events-none select-none"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    “
                  </div>

                  <h4 className="font-bold text-gray-800">{t.name}</h4>
                  <p className="text-sm text-gray-500 mb-2">/ {t.subtitle}</p>
                  <p className="text-sm text-gray-700">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



