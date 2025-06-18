// import { EmpreendimentosProvider } from "../context/EmpreendimentosContext";
// import Footer from "../components/Footer";
// import EmpreendimentosGrid from "../components/GridEmpreendimentos";
// /**
//  * A página já chega com o Header fixo do site.
//  * - bg branco
//  * - margem-top para não ficar colado no header
//  * - título menor
//  */
// const Empreendimentos = () => (
//   <div className="bg-white pt-28 md:pt-32">   {/* ← fundo branco + espaçamento */}
//     <header className="max-w-7xl mx-auto px-4 mb-10">
//       <nav className="text-xs text-gray-500 uppercase mb-3">
//         <span className="hover:underline cursor-pointer">Home</span> / <span>Empreendimentos</span>
//       </nav>
//       <h1 className="text-2xl md:text-4xl font-extrabold text-neutral-900">Empreendimentos</h1> {/* ← menor */}
//     </header>

//     <section className="max-w-7xl mx-auto px-4 pb-16">
//       <EmpreendimentosProvider>
//         <EmpreendimentosGrid />
//       </EmpreendimentosProvider>
//     </section>

//     <Footer />
//   </div>
// );

// export default Empreendimentos;
import { useState } from "react";
import Footer from "../components/Footer";
import { EmpreendimentosProvider } from "../context/EmpreendimentosContext";
import EmpreendimentosGrid from "../components/GridEmpreendimentos";

const CATS = ["Todos", "Empresarial", "Residencial", "Casas"];

const Empreendimentos = () => {
  const [active, setActive] = useState("Todos");

  return (
    <div className="bg-white pt-28 md:pt-32">
      {/* ---------- breadcrumb + título + filtros ---------- */}
      <header className="max-w-7xl mx-auto px-4 mb-10">
        <nav className="text-xs text-gray-500 uppercase mb-3">
          <span className="hover:underline cursor-pointer">Home</span> / <span>Empreendimentos</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h1 className="text-2xl md:text-4xl font-extrabold text-neutral-900">
            Empreendimentos
          </h1>

          <ul className="flex gap-6 text-sm font-medium">
            {CATS.map((c) => (
              <li
                key={c}
                className={`cursor-pointer ${
                  active === c ? "text-black" : "text-gray-400 hover:text-black"
                }`}
                onClick={() => setActive(c)}
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* ---------- grade ---------- */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <EmpreendimentosProvider>
          <EmpreendimentosGrid category={active} />
        </EmpreendimentosProvider>
      </section>

      <Footer />
    </div>
  );
};

export default Empreendimentos;
