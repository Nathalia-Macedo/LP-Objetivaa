import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
import "./App.css"
import Header from "../components/Header"
// Lazy loading das páginas para melhor performance
const Home = lazy(() => import("../pages/Home"))
const Empreendimentos = lazy(() => import("../pages/Empreendimentos"))
const Construcoes = lazy(() => import("../pages/Construcoes"))
const QuemSomos = lazy(() => import("../pages/QuemSomos"))
const Contato = lazy(() => import("../pages/Contatos"))

function App() {
   return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Header />
        <Suspense fallback={<div className="flex justify-center items-center h-screen">Carregando...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/empreendimentos" element={<Empreendimentos />} />
            <Route path="/construcoes" element={<Construcoes />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/contato" element={<Contato />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  )

}

export default App
