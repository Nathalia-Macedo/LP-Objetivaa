import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import useDynamicTranslation from "../hooks/useDynamicTranslaction";
import rsa from '../assets/rsa.png'
import holos from '../assets/holos.png'
import almeida from '../assets/almeida.png'
import solare from '../assets/solare.png'
import jcsampaio from '../assets/jcsampaio.png'
/* --- Dados originais (PT) --- */
const testimonialsPT = [
  {
    name: "Marcus Peixinho",
    subtitle: "CLIENTE INVESTIDOR DO URBAN CAMINHO DAS ÁRVORES",
    text: "Fui olhar o URBAN para um familiar e gostei tanto do projeto que acabei comprando. Confesso que não estava nos meus planos! Na ocasião, fui atendido pelo sócio João Carlos Sampaio, que explicou com maestria o conceito e a proposta do URBAN. Durante a obra, acompanhei com tranquilidade a evolução e acabei antecipando os valores, em função da segurança transmitida. Na entrega do meu apartamento, fiquei impressionado com a qualidade do empreendimento. Logo iniciei as obras e consegui alugá-lo rapidamente, pois a procura é muito grande. O URBAN lançou outro empreendimento na Pituba e fiz de tudo para participar, mas, infelizmente, não consegui. Nos próximos, estarei dentro, pois estou 100% convencido da ideia e concepção da marca URBAN!",
  },
  {
    name: "Carol Melo",
    subtitle: "CLIENTE DE REFORMA DE APARTAMENTO",
    text: "Estive na obra finalizada e queria te dizer que ficou tudo maravilhoso! Muito bem executado. Parabéns pelo excelente trabalho. Quero agradecer também por toda a assistência e suporte ao longo do processo. Seu atendimento e acompanhamento fizeram toda a diferença. O cliente está muito satisfeito, e isso é reflexo do cuidado em cada detalhe. Que venham os próximos, se Deus quiser! Com certeza faremos mais trabalhos juntos.",
  },
  {
    name: "NICOLA",
    subtitle: "COORDENADOR GERAL DA AIR FRANCE EM SALVADOR",
    text: "Na vinda da Air France para Salvador, tivemos o prazer de ser atendidos pela Objetiva. Foram sempre muito prestativos e atenciosos durante todo o processo. A obra foi muito bem executada, com grande atenção aos detalhes. Agradeço a todos que participaram deste lindo projeto",
  },
];

const headingPT = "+20,500 CLIENTES SATISFEITOS";

/* Hook utilitário para detectar mobile */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return isMobile;
};

export default function ClientesSatisfeitos() {
  const isMobile = useIsMobile();
  const cardsPerPage = isMobile ? 1 : 2;
  const [current, setCurrent] = useState(0);

  const { language } = useLanguage();
  const { translateBatch } = useDynamicTranslation();

  /* Estado para textos traduzidos */
  const [testimonials, setTestimonials] = useState(testimonialsPT);
  const [heading, setHeading] = useState(headingPT);

  /* Traduz quando language muda */
  useEffect(() => {
    const translateContent = async () => {
      if (language === "eng") {
        /* Coletamos todos os pedaços que mudam */
        const stringsToTranslate = [
          headingPT,
          ...testimonialsPT.flatMap((t) => [t.subtitle, t.text]),
        ];
        const translated = await translateBatch(stringsToTranslate, "en");

        /* Primeiro item é o heading */
        const newHeading = translated[0];

        /* Reconstrói depoimentos (cada depoimento consome 2 strings) */
        let idx = 1;
        const newTestimonials = testimonialsPT.map((t) => {
          const subtitleEn = translated[idx++];
          const textEn = translated[idx++];
          return { ...t, subtitle: subtitleEn, text: textEn };
        });

        setHeading(newHeading);
        setTestimonials(newTestimonials);
      } else {
        /* Volta para o português */
        setHeading(headingPT);
        setTestimonials(testimonialsPT);
      }
    };

    translateContent();
  }, [language, translateBatch]);

  /* Paginação */
  const totalPages = Math.ceil(testimonials.length / cardsPerPage);
  const next = () => setCurrent((p) => (p + 1 >= totalPages ? 0 : p + 1));
  const prev = () => setCurrent((p) => (p - 1 < 0 ? totalPages - 1 : p - 1));

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
      {/* Título */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl font-bold text-gray-900">{heading}</h2>
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Navegação */}
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

        {/* Carrossel */}
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
          {/* Logos de parceiros */}
<div className="mt-12 px-4">
  <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 grayscale opacity-80">
    <img src={rsa} alt="RSA" className="h-8 md:h-10 object-contain" />
    <img src={almeida} alt="Almeida Carneiro" className="h-8 md:h-10 object-contain" />
    <img src={holos} alt="Holos" className="h-8 md:h-10 object-contain" />
    <img src={solare} alt="Solare" className="h-8 md:h-10 object-contain" />
      <img src={jcsampaio} alt="MAC Net Studio" className="h-8 md:h-10 object-contain" />
  </div>
</div>

        </div>
      </div>
    </section>
  );
}

