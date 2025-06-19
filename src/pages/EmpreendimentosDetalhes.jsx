// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useEmpreendimentos } from "../context/EmpreendimentosContext";
// import { useLanguage } from "../context/LanguageContext";
// import useDynamicTranslation from "../hooks/useDynamicTranslaction";
// import Rodape from "../components/Footer";

// const BACKEND = "https://back-end-objetiva.onrender.com";
// const imgSrc = (raw) => {
//   if (!raw) return "/placeholder.jpg";
//   if (Array.isArray(raw)) raw = raw[0];
//   if (raw.length > 200 && !raw.startsWith("http")) {
//     return `data:image/*;base64,${raw.replace(/^\/+/, "")}`;
//   }
//   if (!raw.startsWith("http")) raw = BACKEND + (raw.startsWith("/") ? raw : "/" + raw);
//   return raw;
// };

// const EmpreendimentoDetalhes = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { empreendimentos } = useEmpreendimentos();
//   const { language } = useLanguage();
//   const { translateBatch } = useDynamicTranslation();

//   const [traduzido, setTraduzido] = useState(null);

//   const atual = empreendimentos.find((e) => e.id === parseInt(id));

//   useEffect(() => {
//     if (!atual) return;

//     const traduzir = async () => {
//       if (language === "eng") {
//         const textos = [
//           atual.name,
//           ...(atual.caption ? [atual.caption] : []),
//           ...(atual.observacoes || [])
//         ];
//         const traduzido = await translateBatch(textos, "en");

//         setTraduzido({
//           name: traduzido[0],
//           caption: atual.caption ? traduzido[1] : "",
//           observacoes: atual.observacoes ? traduzido.slice(atual.caption ? 2 : 1) : []
//         });
//       } else {
//         setTraduzido({
//           name: atual.name,
//           caption: atual.caption,
//           observacoes: atual.observacoes || []
//         });
//       }
//     };

//     traduzir();
//   }, [id, language, atual]);

//   if (!atual || !traduzido) return null;

//   const fotos = atual.images || [];
//   const backgroundImage = `url(${imgSrc(fotos[0])})`;

//   return (
//     <>
//       <section className="min-h-screen pt-28 bg-white grid grid-cols-1 lg:grid-cols-2">
//         {/* Lado esquerdo - Informações */}
//         <div className="px-6 md:px-10 py-10 flex flex-col justify-center">
//           <div className="space-y-6">
//             <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900">
//               {traduzido.name}
//             </h1>
//             <p className="text-base text-neutral-700 leading-relaxed">
//               {traduzido.caption}
//             </p>

//             <div className="text-sm text-neutral-500">
//               <p className="mb-1">{atual.localizacao}</p>
//               <p className="italic text-orange-600 font-medium">
//                 {atual.tipo} – {atual.status}
//               </p>
//             </div>

//             <ul className="space-y-3 pt-4">
//               {traduzido.observacoes.map((obs, i) => (
//                 <li key={i} className="flex items-start gap-2 text-neutral-700">
//                   <span className="w-2 h-2 mt-2 rounded-full bg-objetiva-orange shrink-0" />
//                   <span className="text-sm leading-snug">{obs}</span>
//                 </li>
//               ))}
//             </ul>

//             <div className="flex flex-col sm:flex-row gap-4 pt-8">
//               <button
//                 onClick={() => navigate(-1)}
//                 className="px-6 py-2 rounded-full bg-gray-100 text-sm font-semibold text-neutral-800 hover:bg-gray-200 transition"
//               >
//                 Voltar para a lista
//               </button>
//               <a
//                 href="https://wa.me/71988970381"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="px-6 py-2 rounded-full bg-objetiva-orange text-white text-sm font-semibold hover:bg-orange-700 transition"
//               >
//                 Fale conosco via WhatsApp
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Lado direito - Background com imagem */}
//         <div
//           className="hidden lg:block h-full w-full rounded-l-[3rem] bg-cover bg-center"
//           style={{ backgroundImage }}
//         ></div>
//       </section>
//       <Rodape />
//     </>
//   );
// };

// export default EmpreendimentoDetalhes;


import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useEmpreendimentos } from "../context/EmpreendimentosContext";
import { useLanguage } from "../context/LanguageContext";
import useDynamicTranslation from "../hooks/useDynamicTranslaction";
import Rodape from "../components/Footer";

const BACKEND = "https://back-end-objetiva.onrender.com";
const imgSrc = (raw) => {
  if (!raw) return "/placeholder.jpg";
  if (Array.isArray(raw)) raw = raw[0];
  if (raw.length > 200 && !raw.startsWith("http")) {
    return `data:image/*;base64,${raw.replace(/^\/+/, "")}`;
  }
  if (!raw.startsWith("http")) raw = BACKEND + (raw.startsWith("/") ? raw : "/" + raw);
  return raw;
};

const EmpreendimentoDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { empreendimentos } = useEmpreendimentos();
  const { language } = useLanguage();
  const { translateBatch } = useDynamicTranslation();

  const [traduzido, setTraduzido] = useState(null);
  const [indexAtual, setIndexAtual] = useState(0);
  const intervalRef = useRef(null);

  const atual = empreendimentos.find((e) => e.id === parseInt(id));

  useEffect(() => {
    if (!atual) return;

    const traduzir = async () => {
      if (language === "eng") {
        const textos = [
          atual.name,
          ...(atual.caption ? [atual.caption] : []),
          ...(atual.observacoes || [])
        ];
        const traduzido = await translateBatch(textos, "en");

        setTraduzido({
          name: traduzido[0],
          caption: atual.caption ? traduzido[1] : "",
          observacoes: atual.observacoes ? traduzido.slice(atual.caption ? 2 : 1) : []
        });
      } else {
        setTraduzido({
          name: atual.name,
          caption: atual.caption,
          observacoes: atual.observacoes || []
        });
      }
    };

    traduzir();
  }, [id, language, atual]);

  useEffect(() => {
    if (!atual?.images || atual.images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setIndexAtual((prev) => (prev + 1) % atual.images.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [atual]);

  if (!atual || !traduzido) return null;

  const fotos = atual.images || [];
  const backgroundImage = `url(${imgSrc(fotos[indexAtual])})`;

  return (
    <>
      <section className="min-h-screen pt-28 bg-white grid grid-cols-1 lg:grid-cols-2">
        {/* Lado esquerdo - Informações */}
        <div className="px-6 md:px-10 py-10 flex flex-col justify-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900">
              {traduzido.name}
            </h1>
            <p className="text-base text-neutral-700 leading-relaxed">
              {traduzido.caption}
            </p>

            <div className="text-sm text-neutral-500">
              <p className="mb-1">{atual.localizacao}</p>
              <p className="italic text-orange-600 font-medium">
                {atual.tipo} – {atual.status}
              </p>
            </div>

            <ul className="space-y-3 pt-4">
              {traduzido.observacoes.map((obs, i) => (
                <li key={i} className="flex items-start gap-2 text-neutral-700">
                  <span className="w-2 h-2 mt-2 rounded-full bg-objetiva-orange shrink-0" />
                  <span className="text-sm leading-snug">{obs}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 rounded-full bg-gray-100 text-sm font-semibold text-neutral-800 hover:bg-gray-200 transition"
              >
                Voltar para a lista
              </button>
              <a
                href="https://wa.me/71988970381"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full bg-objetiva-orange text-white text-sm font-semibold hover:bg-orange-700 transition"
              >
                Fale conosco via WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Lado direito - Background com imagem como carrossel */}
        <div
          className="hidden lg:block h-full w-full rounded-l-[3rem] bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage }}
        ></div>
      </section>
      <Rodape />
    </>
  );
};

export default EmpreendimentoDetalhes;
