// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import { Suspense, lazy } from "react";
// import { Toaster } from "react-hot-toast";

// // providers
// import { LanguageProvider }        from "../context/LanguageContext";
// import { AuthProvider }            from "../context/AuthContext";   // 👈 TEM que vir antes dos outros
// import { EmpreendimentosProvider } from "../context/EmpreendimentosContext";

// // componentes fixos
// import Header from "../components/Header";

// // páginas …
// const Home                 = lazy(() => import("../pages/Home"));
// const Empreendimentos      = lazy(() => import("../pages/Empreendimentos"));
// const Construcoes          = lazy(() => import("../pages/Construcoes"));
// const QuemSomos            = lazy(() => import("../pages/QuemSomos"));
// const Contato              = lazy(() => import("../pages/Contatos"));
// const AdminEmpreendimentos = lazy(() => import("../pages/EmpreendimentosAdmin"));
// const Login                = lazy(() => import("../pages/Login"));

// function LayoutWithConditionalHeader({ children }) {
//   const { pathname } = useLocation();
//   const hide = ["/login", "/admin/empreendimentos"].includes(pathname);
//   return (
//     <div className="min-h-screen bg-black text-white">
//       {!hide && <Header />}
//       {children}
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <LanguageProvider>
//       <AuthProvider>                    {/* 🔐 AGORA cobre tudo */}
//         <EmpreendimentosProvider>
//           <Router>
//             <LayoutWithConditionalHeader>
//               <Toaster />
//               <Suspense fallback={<div className="flex items-center justify-center h-screen">Carregando…</div>}>
//                 <Routes>
//                   <Route path="/"                      element={<Home />} />
//                   <Route path="/empreendimentos"       element={<Empreendimentos />} />
//                   <Route path="/construcoes"           element={<Construcoes />} />
//                   <Route path="/quem-somos"            element={<QuemSomos />} />
//                   <Route path="/contato"               element={<Contato />} />
//                   <Route path="/admin/empreendimentos" element={<AdminEmpreendimentos />} />
//                   <Route path="/login"                 element={<Login />} />
//                 </Routes>
//               </Suspense>
//             </LayoutWithConditionalHeader>
//           </Router>
//         </EmpreendimentosProvider>
//       </AuthProvider>
//     </LanguageProvider>
//   );
// }



import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";

// providers
import { LanguageProvider }        from "../context/LanguageContext";
import { AuthProvider }            from "../context/AuthContext";
import { EmpreendimentosProvider } from "../context/EmpreendimentosContext";

// componentes fixos
import Header from "../components/Header";

// páginas lazy
const Home                 = lazy(() => import("../pages/Home"));
const Empreendimentos      = lazy(() => import("../pages/Empreendimentos"));
const Construcoes          = lazy(() => import("../pages/Construcoes"));
const QuemSomos            = lazy(() => import("../pages/QuemSomos"));
const Contato              = lazy(() => import("../pages/Contatos"));
const AdminEmpreendimentos = lazy(() => import("../pages/EmpreendimentosAdmin"));
const Login                = lazy(() => import("../pages/Login"));
const EmpreendimentoDetalhes = lazy(() => import("../pages/EmpreendimentosDetalhes")); // ✅ novo

function LayoutWithConditionalHeader({ children }) {
  const { pathname } = useLocation();
  const hide = ["/login", "/admin/empreendimentos"].includes(pathname);
  return (
    <div className="min-h-screen bg-black text-white">
      {!hide && <Header />}
      {children}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <EmpreendimentosProvider>
          <Router>
            <LayoutWithConditionalHeader>
              <Toaster />
              <Suspense fallback={<div className="flex items-center justify-center h-screen">Carregando…</div>}>
                <Routes>
                  <Route path="/"                      element={<Home />} />
                  <Route path="/empreendimentos"       element={<Empreendimentos />} />
                  <Route path="/empreendimentos/:id"   element={<EmpreendimentoDetalhes />} /> {/* ✅ NOVA ROTA */}
                  <Route path="/construcoes"           element={<Construcoes />} />
                  <Route path="/quem-somos"            element={<QuemSomos />} />
                  <Route path="/contato"               element={<Contato />} />
                  <Route path="/admin/empreendimentos" element={<AdminEmpreendimentos />} />
                  <Route path="/login"                 element={<Login />} />
                </Routes>
              </Suspense>
            </LayoutWithConditionalHeader>
          </Router>
        </EmpreendimentosProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
