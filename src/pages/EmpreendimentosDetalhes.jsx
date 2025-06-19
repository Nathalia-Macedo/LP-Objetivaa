// EmpreendimentoDetalhes.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useEmpreendimentos } from "../context/EmpreendimentosContext";
import { useLanguage } from "../context/LanguageContext";
import useDynamicTranslation from "../hooks/useDynamicTranslaction";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const atual = empreendimentos.find((e) => e.id === parseInt(id));
  const index = empreendimentos.findIndex((e) => e.id === parseInt(id));
  const anterior = empreendimentos[index - 1];
  const proximo = empreendimentos[index + 1];

  useEffect(() => {
    if (!atual) return;

    const traduzir = async () => {
      if (language === "eng") {
        const textos = [
          atual.name,
          ...(atual.description ? [atual.description] : []),
          ...(atual.observations || [])
        ];
        const traduzido = await translateBatch(textos, "en");

        setTraduzido({
          name: traduzido[0],
          description: atual.description ? traduzido[1] : "",
          observations: atual.observations ? traduzido.slice(atual.description ? 2 : 1) : []
        });
      } else {
        setTraduzido({
          name: atual.name,
          description: atual.description,
          observations: atual.observations || []
        });
      }
    };

    traduzir();
    setIndexAtual(0);
  }, [id, language, atual]);

  if (!atual || !traduzido) return null;

  const fotos = atual.images || [];
  const temVarias = fotos.length > 1;

  return (
    <section className="bg-white pt-0 text-neutral-800">
      {/* Banner com título - imagem em tela cheia, sem corte */}
      <div className="relative w-full max-h-[75vh] overflow-hidden">
        <img
          src={imgSrc(fotos[0])}
          alt={traduzido.name}
          className="w-full h-auto object-contain"
          style={{ maxHeight: '75vh' }}
        />
        <div className="absolute bottom-0 left-0 bg-black/50 w-full">
          <h1 className="text-white text-2xl md:text-4xl font-semibold uppercase pl-8 pb-6">
            {traduzido.name}
          </h1>
        </div>
      </div>

      {/* Informações resumidas */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 underline mb-6 inline-block"
        >
          Voltar
        </button>

        {atual.observacoes?.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {atual.observacoes.map((obs, i) => (
              <div key={i} className="text-sm text-neutral-700 leading-relaxed">
                {obs}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Descrição (caption) */}
      {atual.caption && (
        <div className="max-w-6xl mx-auto px-4 mt-12 text-base text-neutral-700 leading-relaxed">
          {atual.caption}
        </div>
      )}

      {/* Galeria de imagens com bordas arredondadas */}
      {fotos.length > 0 && (
        <div className="relative mt-10 flex justify-center px-4">
          <img
            src={imgSrc(fotos[indexAtual])}
            alt="Foto do empreendimento"
            className="w-full max-w-5xl max-h-[500px] object-contain rounded-xl shadow"
            loading="lazy"
          />
          {temVarias && indexAtual > 0 && (
            <button
              onClick={() => setIndexAtual((i) => i - 1)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
              <ChevronLeft />
            </button>
          )}
          {temVarias && indexAtual < fotos.length - 1 && (
            <button
              onClick={() => setIndexAtual((i) => i + 1)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
              <ChevronRight />
            </button>
          )}
        </div>
      )}

      {/* Fale conosco */}
      <div className="pt-8 px-4 max-w-6xl mx-auto">
        <a
          href="https://wa.me/SEUNUMEROAQUI"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm md:text-base text-orange-600 underline"
        >
          Fale conosco
        </a>
      </div>

      {/* Navegação entre empreendimentos */}
      <div className="flex justify-between items-center px-4 py-6 bg-gray-100">
        <button
          disabled={!anterior}
          onClick={() => navigate(`/empreendimentos/${anterior?.id}`)}
          className={`text-sm font-semibold uppercase px-6 py-3 ${
            anterior ? "bg-gray-300 hover:bg-gray-400" : "opacity-50 cursor-not-allowed"
          }`}
        >
          Anterior
        </button>
        <button
          disabled={!proximo}
          onClick={() => navigate(`/empreendimentos/${proximo?.id}`)}
          className={`text-sm font-semibold uppercase px-6 py-3 ${
            proximo ? "bg-orange-600 text-white hover:bg-orange-700" : "opacity-50 cursor-not-allowed"
          }`}
        >
          Próxima
        </button>
      </div>
    </section>
  );
};

export default EmpreendimentoDetalhes;
