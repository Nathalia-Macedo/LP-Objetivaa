// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import { Suspense, lazy } from "react";
// import { Toaster } from "react-hot-toast";

// /* ---------- Componentes fixos ---------- */
// import Header from "../components/Header";

// /* ---------- Contextos ---------- */
// import { LanguageProvider } from "../context/LanguageContext";
// import { EmpreendimentosProvider } from "../context/EmpreendimentosContext";
// import { AuthProvider } from "../context/AuthContext";          // ⬅️ NOVO

// /* ---------- Lazy loading das páginas ---------- */
// const Home                 = lazy(() => import("../pages/Home"));
// const Empreendimentos      = lazy(() => import("../pages/Empreendimentos"));
// const Construcoes          = lazy(() => import("../pages/Construcoes"));
// const QuemSomos            = lazy(() => import("../pages/QuemSomos"));
// const Contato              = lazy(() => import("../pages/Contatos"));
// const AdminEmpreendimentos = lazy(() => import("../pages/EmpreendimentosAdmin"));
// const Login                = lazy(() => import("../pages/Login"));

// /* ---------- Layout que esconde o Header em certas rotas ---------- */
// function LayoutWithConditionalHeader({ children }) {
//   const location = useLocation();
//   const hideHeaderRoutes = ["/login", "/admin/empreendimentos"];
//   const hideHeader = hideHeaderRoutes.includes(location.pathname);

//   return (
//     <div className="min-h-screen bg-black text-white">
//       {!hideHeader && <Header />}
//       {children}
//     </div>
//   );
// }

// /* ---------- App ---------- */
// export default function App() {
//   return (
//     <LanguageProvider>
//       <AuthProvider>                       {/* ⬅️  Envolve tudo para disponibilizar useAuth() */}
//         <EmpreendimentosProvider>
//           <Router>
//             <LayoutWithConditionalHeader>
//               <Toaster />
//               <Suspense fallback={<div className="flex justify-center items-center h-screen">Carregando...</div>}>
//                 <Routes>
//                   <Route path="/"                     element={<Home />} />
//                   <Route path="/empreendimentos"     element={<Empreendimentos />} />
//                   <Route path="/construcoes"         element={<Construcoes />} />
//                   <Route path="/quem-somos"          element={<QuemSomos />} />
//                   <Route path="/contato"             element={<Contato />} />
//                   <Route path="/admin/empreendimentos" element={<AdminEmpreendimentos />} />
//                   <Route path="/login"               element={<Login />} />
//                 </Routes>
//               </Suspense>
//             </LayoutWithConditionalHeader>
//           </Router>
//         </EmpreendimentosProvider>
//       </AuthProvider>
//     </LanguageProvider>
//   );
// }


// src/App.jsx  – aplicativo completo
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";

// providers
import { LanguageProvider }        from "../context/LanguageContext";
import { AuthProvider }            from "../context/AuthContext";   // 👈 TEM que vir antes dos outros
import { EmpreendimentosProvider } from "../context/EmpreendimentosContext";

// componentes fixos
import Header from "../components/Header";

// páginas …
const Home                 = lazy(() => import("../pages/Home"));
const Empreendimentos      = lazy(() => import("../pages/Empreendimentos"));
const Construcoes          = lazy(() => import("../pages/Construcoes"));
const QuemSomos            = lazy(() => import("../pages/QuemSomos"));
const Contato              = lazy(() => import("../pages/Contatos"));
const AdminEmpreendimentos = lazy(() => import("../pages/EmpreendimentosAdmin"));
const Login                = lazy(() => import("../pages/Login"));

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
      <AuthProvider>                    {/* 🔐 AGORA cobre tudo */}
        <EmpreendimentosProvider>
          <Router>
            <LayoutWithConditionalHeader>
              <Toaster />
              <Suspense fallback={<div className="flex items-center justify-center h-screen">Carregando…</div>}>
                <Routes>
                  <Route path="/"                      element={<Home />} />
                  <Route path="/empreendimentos"       element={<Empreendimentos />} />
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
