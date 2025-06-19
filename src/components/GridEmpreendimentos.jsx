// import { useEmpreendimentos } from "../context/EmpreendimentosContext";
// import { ArrowRight } from "lucide-react"; //  npm i lucide-react se ainda não tiver

// /* URL base fixa do back-end (sem /projects) */
// const BACKEND = "https://back-end-objetiva.onrender.com";

// /* Garante que devolve uma URL exibível */
// const imgSrc = (raw) => {
//   if (!raw || raw === "string") return "/placeholder.jpg";    // fallback local
//   if (/^https?:\/\//i.test(raw)) return raw;                  // já é URL absoluta
//   if (!raw.startsWith("/")) raw = "/" + raw;                  // "uploads/..." → "/uploads/..."
//   return BACKEND + raw;                                       // concatena domínio
// };

// const EmpreendimentosGrid = ({ category }) => {
//   const { empreendimentos, loading } = useEmpreendimentos();
//   console.log(empreendimentos)

//   if (loading) return <p className="text-center text-gray-500 py-10">Carregando empreendimentos…</p>;

//   const itens =
//     category === "Todos"
//       ? empreendimentos
//       : empreendimentos.filter((e) => e.tipo?.toLowerCase() === category.toLowerCase());

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//       {itens.map((card, idx) => (
//         <div key={card.id} className="relative group aspect-square overflow-hidden rounded">
//           {/* imagem */}
//           <img
//             src={imgSrc(card.images?.[0])}
//             alt={card.name}
//             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//           />

//           {/* overlay laranja em hover */}
//           <div className="absolute inset-0 bg-orange-600/70 opacity-0 group-hover:opacity-100 transition-opacity" />

//           {/* seta só no primeiro card, igual ao layout */}
//           {idx === 0 && (
//             <ArrowRight
//               size={28}
//               className="absolute top-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity"
//             />
//           )}

//           {/* texto inferior */}
//           <div className="absolute bottom-0 left-0 right-0 p-3 text-white z-10">
//             <p className="text-xs capitalize">
//               {card.tipo || "Tipo"} — {card.status || "Status"}
//             </p>
//             <h3 className="text-base font-semibold leading-tight">{card.name}</h3>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default EmpreendimentosGrid;

import { useEmpreendimentos } from "../context/EmpreendimentosContext";
import { ArrowRight } from "lucide-react";

/* dominio do back-end quando vier “/uploads/…” */
const BACKEND = "https://back-end-objetiva.onrender.com";

/* Transforma qualquer valor em <img src="…"> válido  */
const imgSrc = (raw) => {
  if (!raw || raw === "string") return "/placeholder.jpg";
  
  if (Array.isArray(raw)) raw = raw[0]; // Se raw for um array, pegue o primeiro elemento
  if (raw.startsWith("data:image")) return raw;
  if (raw.length > 200 && !raw.startsWith("http")) {
    return `data:image/*;base64,${raw.replace(/^\/+/, "")}`;
  }
  if (/^https?:\/\//i.test(raw)) return raw;
  if (!raw.startsWith("/")) raw = "/" + raw; 
  return BACKEND + raw;
};


const EmpreendimentosGrid = ({ category }) => {
  const { empreendimentos, loading } = useEmpreendimentos();

  if (loading) return <p className="text-center text-gray-500 py-10">Carregando empreendimentos…</p>;

  const itens =
    category === "Todos"
      ? empreendimentos
      : empreendimentos.filter((e) => e.tipo?.toLowerCase() === category.toLowerCase());

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {itens.map((card, idx) => (
        <div key={card.id} className="relative group aspect-square overflow-hidden rounded">
          {/* imagem */}
          <img
            src={imgSrc(card.images?.[0])}
            alt={card.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* overlay laranja em hover */}
          <div className="absolute inset-0 bg-orange-600/70 opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* seta apenas no primeiro card */}
          {idx === 0 && (
            <ArrowRight
              size={28}
              className="absolute top-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            />
          )}

          {/* info inferior */}
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white z-10">
            <p className="text-xs capitalize">
              {card.tipo || "Tipo"} — {card.status || "Status"}
            </p>
            <h3 className="text-base font-semibold leading-tight break-words">{card.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmpreendimentosGrid;
