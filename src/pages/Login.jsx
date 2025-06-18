import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from '../assets/logo_preta.png'
import heroImage from '../assets/Bg.png'

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth || !auth.login) {
      toast.error("Erro de autenticação. Tente novamente mais tarde.");
      return;
    }

    const success = await auth.login(username, password);
    console.log(success)
    if (success) {
      toast.success("Login realizado com sucesso!");
      navigate("/admin/empreendimentos");
    } else {
      toast.error("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="bg-[#f4f4f4] max-w-4xl w-full rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/2 hidden md:block">
          <img
            src={heroImage}
            alt="Login"
            className="w-full h-full object-cover rounded-l-2xl"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <div className="mb-8 text-center">
            <img
              src={logo}
              alt="Objetiva Logo"
              className="mx-auto w-24"
            />
            <h1 className="text-2xl font-bold mt-4 text-gray-800">Acesso Administrativo</h1>
            <p className="text-sm text-gray-600">Insira suas credenciais para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm text-gray-600">Usuário</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-600">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-700 transition"
            >
              <LogIn size={18} /> Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
