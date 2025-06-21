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

//   return (
//     <>
//       <section className="min-h-screen pt-28 pb-10 px-4 bg-white">
//         <div className="max-w-6xl mx-auto space-y-6">
//           {/* CATEGORIA */}
//           <p className="text-sm uppercase text-orange-500 font-medium tracking-wider">
//             COMPLEXO HOTELEIRO — ALTO PADRÃO
//           </p>

//           {/* NOME DO EMPREENDIMENTO */}
//           <h1 className="text-4xl font-extrabold leading-snug text-neutral-900">
//             <span className="text-orange-600 block">{traduzido.name?.split(" ")[0]}</span>
//             {traduzido.name?.split(" ").slice(1).join(" ")}
//           </h1>

//           {/* DESCRIÇÃO */}
//           <p className="text-base text-neutral-700 leading-relaxed max-w-3xl">
//             {traduzido.caption}
//           </p>

//           {/* IMAGENS LADO A LADO */}
//           {fotos.length > 0 && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
//               {fotos.slice(0, 2).map((foto, i) => (
//                 <img
//                   key={i}
//                   src={imgSrc(foto)}
//                   alt={`Imagem ${i + 1}`}
//                   className="rounded-lg w-full h-[400px] object-cover"
//                 />
//               ))}
//             </div>
//           )}

//           {/* OBSERVAÇÕES EM BULLET POINTS */}
//           {traduzido.observacoes?.length > 0 && (
//             <ul className="space-y-3 pt-6">
//               {traduzido.observacoes.map((obs, i) => (
//                 <li key={i} className="flex items-start gap-2 text-neutral-700">
//                   <span className="w-2 h-2 mt-2 rounded-full bg-objetiva-orange shrink-0" />
//                   <span className="text-sm leading-snug">{obs}</span>
//                 </li>
//               ))}
//             </ul>
//           )}

//           {/* INFORMAÇÕES COMPLEMENTARES */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-sm text-neutral-700">
//             <div>
//               <p className="font-medium">Localização:</p>
//               <p>{atual.localizacao}</p>
//             </div>
//             <div>
//               <p className="font-medium">Entrega:</p>
//               <p>{atual.status}, {atual.tipo}</p>
//             </div>
//             <div>
//               <p className="font-medium">Área construída:</p>
//               <p>1.100m²</p> {/* Trocar se for dinâmico */}
//             </div>
//           </div>

//           {/* BOTÕES DE AÇÃO */}
//           <div className="flex flex-col sm:flex-row gap-4 pt-10">
//             <button
//               onClick={() => navigate(-1)}
//               className="text-sm text-orange-600 hover:underline"
//             >
//               Voltar para a listagem
//             </button>
//             <a
//               href="https://wa.me/71988970381"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="px-6 py-2 rounded-full bg-objetiva-orange text-white text-sm font-semibold hover:bg-orange-700 transition"
//             >
//               Fale conosco
//             </a>
//           </div>
//         </div>
//       </section>
//       <Rodape />
//     </>
//   );
// };

// export default EmpreendimentoDetalhes;
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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

  const atual = empreendimentos.find((e) => e.id === parseInt(id));
  const indexAtual = empreendimentos.findIndex((e) => e.id === parseInt(id));

  const irParaAnterior = () => {
    if (indexAtual > 0) {
      const idAnterior = empreendimentos[indexAtual - 1].id;
      navigate(`/empreendimentos/${idAnterior}`);
    }
  };

  const irParaProximo = () => {
    if (indexAtual < empreendimentos.length - 1) {
      const idProximo = empreendimentos[indexAtual + 1].id;
      navigate(`/empreendimentos/${idProximo}`);
    }
  };

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

  if (!atual || !traduzido) return null;

  const fotos = atual.images || [];

  return (
    <>
      <section className="min-h-screen pt-28 pb-10 px-4 bg-white">
        <div className="max-w-6xl mx-auto space-y-6">

          {/* NOME DO EMPREENDIMENTO */}
          <h1 className="text-4xl font-extrabold leading-snug text-neutral-900">
            <span className="text-orange-600 block">{traduzido.name?.split(" ")[0]}</span>
            {traduzido.name?.split(" ").slice(1).join(" ")}
          </h1>

          {/* DESCRIÇÃO */}
          <p className="text-base text-neutral-700 leading-relaxed max-w-3xl">
            {traduzido.caption}
          </p>

          {/* IMAGENS LADO A LADO */}
          {fotos.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {fotos.slice(0, 2).map((foto, i) => (
                <img
                  key={i}
                  src={imgSrc(foto)}
                  alt={`Imagem ${i + 1}`}
                  className="rounded-lg w-full h-[400px] object-cover"
                />
              ))}
            </div>
          )}

          {/* OBSERVAÇÕES EM BULLET POINTS */}
          {traduzido.observacoes?.length > 0 && (
            <ul className="space-y-3 pt-6">
              {traduzido.observacoes.map((obs, i) => (
                <li key={i} className="flex items-start gap-2 text-neutral-700">
                  <span className="w-2 h-2 mt-2 rounded-full bg-objetiva-orange shrink-0" />
                  <span className="text-sm leading-snug">{obs}</span>
                </li>
              ))}
            </ul>
          )}

          {/* INFORMAÇÕES COMPLEMENTARES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-sm text-neutral-700">
            <div>
              <p className="font-medium">Localização:</p>
              <p>{atual.localizacao}</p>
            </div>
            <div>
              <p className="font-medium">Entrega:</p>
              <p>{atual.status}, {atual.tipo}</p>
            </div>
          </div>

          {/* BOTÕES DE AÇÃO */}
          <div className="flex flex-col sm:flex-row gap-4 pt-10">
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-orange-600 hover:underline"
            >
              Voltar para a listagem
            </button>
            <a
              href="https://wa.me/71988970381"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-full bg-objetiva-orange text-white text-sm font-semibold hover:bg-orange-700 transition"
            >
              Fale conosco
            </a>
          </div>
        </div>
      </section>

      <Rodape />
    </>
  );
};

export default EmpreendimentoDetalhes;