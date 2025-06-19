import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import mockup from "../assets/Mockup.png";
import ClientesSatisfeitos from "../components/ClientesSatisfeitos";
import Rodape from "../components/Footer";
import useDynamicTranslation from "../hooks/useDynamicTranslaction";
import icone2 from '../assets/icone2.png';
import icone1 from '../assets/icone1.png';
import icone3 from '../assets/icone3.png';


const QuemSomos = () => {
  const { language } = useLanguage();
  const { translateBatch } = useDynamicTranslation();

  const textosOriginais = [
    "Conheça a trajetória da Objetiva:",
    "Excelência em construção civil, inovação, qualidade técnica e compromisso com o cliente.",
    "A Objetiva Incorporações e Construções atua há mais de 25 anos no mercado da construção civil. Iniciamos nossa trajetória como uma empresa de assessoria técnica e, com visão estratégica e inovação, evoluímos para nos tornar uma incorporadora e construtora completa.",
    "Nosso portfólio inclui desde grandes empreendimentos até reformas e obras personalizadas.",
    "Missão",
    "Executar obras e empreendimentos com excelência técnica, responsabilidade e inovação, oferecendo soluções completas e personalizadas que garantam qualidade, prazo, custo otimizado e total satisfação de nossos clientes e parceiros.",
    "Visão",
    "Ser referência em incorporação e construção civil, reconhecida pela versatilidade, comprometimento e capacidade de transformar projetos em realidade com solidez, confiança e valor duradouro.",
    "Valores",
    "Qualidade em cada etapa",
    "Foco no cliente",
    "Inovação técnica",
    "Cumprimento de prazos e custos",
    "Ética e transparência",
    "Desenvolvimento sustentável",
    "Fale com a Objetiva!",
  ];

  const [traduzido, setTraduzido] = useState(textosOriginais);

  useEffect(() => {
    const traduzir = async () => {
      if (language === "eng") {
        try {
          const resultado = await translateBatch(textosOriginais, "en");

          // Se a API retornar menos itens, aborta
          if (!resultado || resultado.length !== textosOriginais.length) {
            console.warn("Tradução incompleta ou falhou:", resultado);
            return;
          }

          setTraduzido(resultado);
        } catch (err) {
          console.error("Erro ao traduzir:", err);
        }
      } else {
        setTraduzido(textosOriginais);
      }
    };

    traduzir();
  }, [language, translateBatch]); // Adicione translateBatch como dependência

  return (
    <div className="bg-white text-neutral-800">
      <div className="w-full">
        <img
          src={mockup}
          alt="Objetiva Incorporações"
          className="w-full object-cover max-h-[500px]"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-12 text-left">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">{traduzido[0]}</h2>
        <p className="text-base md:text-lg leading-relaxed text-neutral-700 text-justify mb-4">{traduzido[1]}</p>
        <p className="text-base md:text-lg leading-relaxed text-neutral-700 text-justify mb-4">{traduzido[2]}</p>
        <p className="text-base md:text-lg leading-relaxed text-neutral-700 text-justify">{traduzido[3]}</p>
      </div>

      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold text-neutral-800 mb-12 text-left md:text-center">
            Os princípios que nos guiam:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <img src={icone1} alt="Ícone missão" className="h-14 mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-neutral-900 mb-2">{traduzido[4]?.toUpperCase()}</h3>
              <p className="text-sm text-neutral-700 leading-relaxed">{traduzido[5]}</p>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <img src={icone2} alt="Ícone visão" className="h-14 mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-neutral-900 mb-2">{traduzido[6]?.toUpperCase()}</h3>
              <p className="text-sm text-neutral-700 leading-relaxed">{traduzido[7]}</p>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <img src={icone3} alt="Ícone valores" className="h-14 mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-neutral-900 mb-2">{traduzido[8]?.toUpperCase()}</h3>
              <ul className="text-sm text-neutral-700 leading-relaxed list-disc list-inside text-left">
                <li>{traduzido[9]}</li>
                <li>{traduzido[10]}</li>
                <li>{traduzido[11]}</li>
                <li>{traduzido[12]}</li>
                <li>{traduzido[13]}</li>
                <li>{traduzido[14]}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center py-12">
        <a
          href="https://wa.me/SEUNUMEROAQUI" // Substitua SEUNUMEROAQUI por um número válido
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-orange-600 text-white text-lg px-8 py-4 rounded hover:bg-orange-700 transition"
        >
          {traduzido[15]}
        </a>
      </div>

      <ClientesSatisfeitos />
      <Rodape />
    </div>
  );
};

export default QuemSomos;
