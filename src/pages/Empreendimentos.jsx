import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import EmpreendimentosGrid from "../components/GridEmpreendimentos";
import { useLanguage } from "../context/LanguageContext";
import useDynamicTranslation from "../hooks/useDynamicTranslaction";

const ORIGINAL_CATS = ["Todos"];

const ORIGINAL_PARAGRAFOS = [
  "Incorporação Imobiliária",
  "Estudo Vocacional do Terreno",
  "Viabilidade de Empreendimento",
];

const Empreendimentos = () => {
  const [active, setActive] = useState("Todos");
  const [translatedCats, setTranslatedCats] = useState(ORIGINAL_CATS);
  const [translatedTitle, setTranslatedTitle] = useState("Empreendimentos");
  const [translatedBreadcrumb, setTranslatedBreadcrumb] = useState("Empreendimentos");
  const [translatedParagrafos, setTranslatedParagrafos] = useState(ORIGINAL_PARAGRAFOS);


  const { language } = useLanguage();
  const { translateBatch } = useDynamicTranslation();

  useEffect(() => {
    const traduzir = async () => {
      if (language === "port") {
        setTranslatedCats(ORIGINAL_CATS);
        setTranslatedTitle("Empreendimentos");
        setTranslatedBreadcrumb("Empreendimentos");
        setTranslatedParagrafos(ORIGINAL_PARAGRAFOS);

        return;
      }

      const textsToTranslate = ["Empreendimentos", "Empreendimentos", ...ORIGINAL_CATS];
      console.log("Textos para tradução:", textsToTranslate);

      const translateWithRetry = async (texts, retries = 3) => {
        for (let attempt = 0; attempt < retries; attempt++) {
          try {
            return await translateBatch(texts, "en");
          } catch (error) {
            console.error(`Erro na tentativa ${attempt + 1}:`, error);
            if (attempt === retries - 1) throw error; // Lança o erro se for a última tentativa
          }
        }
      };

      try {
        const traducaoFinal = await translateWithRetry(textsToTranslate);
        const paragrafosTraduzidos = await translateBatch(ORIGINAL_PARAGRAFOS, "en");

      const corrigirErros = (lista) =>
        lista.map((t) => {
          let texto = t;
          texto = texto.replace("|", "");
          return texto;
        });

        setTranslatedParagrafos(corrigirErros(paragrafosTraduzidos));

        console.log("Traduções recebidas:", traducaoFinal);

        setTranslatedTitle(traducaoFinal[0]);
        setTranslatedBreadcrumb(traducaoFinal[1]);
        setTranslatedCats(traducaoFinal.slice(2));
      } catch (error) {
        console.error("Erro ao traduzir:", error);
      }
    };

    traduzir();
  }, [language]);

  return (
    <div className="bg-white pt-28 md:pt-32">
      {/* ---------- breadcrumb + título + filtros ---------- */}
      <header className="max-w-7xl mx-auto px-4 mb-10">
  {/* breadcrumb */}
  <nav className="text-xs text-gray-500 uppercase mb-3">
    <a href="/" className="hover:underline cursor-pointer">Home</a> / <span>{translatedBreadcrumb}</span>
  </nav>

  {/* título + parágrafos + filtros */}
  <div className="flex flex-col gap-4">
    {/* título */}
    <h1 className="text-2xl md:text-4xl font-extrabold text-neutral-900">
      {translatedTitle}
    </h1>

    {/* parágrafos abaixo do título */}
    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-base md:text-lg">
      {translatedParagrafos.map((texto, i) => (
        <li key={i}>{texto}</li>
      ))}
    </ul>

    {/* filtros */}
    <ul className="flex gap-6 text-sm font-medium">
      {translatedCats.map((c, i) => (
        <li
          key={c}
          className={`cursor-pointer ${
            active === ORIGINAL_CATS[i]
              ? "text-black"
              : "text-gray-400 hover:text-black"
          }`}
          onClick={() => setActive(ORIGINAL_CATS[i])}
        >
          {c}
        </li>
      ))}
    </ul>
  </div>
</header>


      {/* ---------- grade ---------- */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <EmpreendimentosGrid category={active} />       
      </section>
      <Footer />
    </div>
  );
};

export default Empreendimentos;
