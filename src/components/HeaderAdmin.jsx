import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logoBranca from "../assets/logo.png"; // pode usar logo preta se necessário

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  return (
    <header className="w-full bg-transparent">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={logoBranca}
            alt="Logo Objetiva"
            className="h-12 w-auto object-contain"
          />
          <h1 className="text-xl font-bold text-white">Painel Administrativo</h1>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-orange-500 font-semibold hover:underline"
        >
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </header>
  );
}
