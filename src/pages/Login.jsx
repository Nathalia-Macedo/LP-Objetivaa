// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { LogIn } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import logo from "../assets/logo_preta.png";
// import heroImage from "../assets/Bg.png";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const auth = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!auth || !auth.login) {
//       toast.error("Erro de autenticação. Tente novamente mais tarde.");
//       return;
//     }

//     const success = await auth.login(username, password);
//     if (success) {
//       toast.success("Login realizado com sucesso!");
//       navigate("/admin/empreendimentos");
//     } else {
//       toast.error("Usuário ou senha inválidos");
//     }
//   };

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center flex items-center justify-end p-6"
//       style={{
//         backgroundImage: `url(${heroImage})`,
//       }}
//     >
//       <div
//         className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-10 w-full max-w-md mr-12"
//       >
//         <div className="mb-8 text-center">
//           <img src={logo} alt="Objetiva Logo" className="mx-auto w-20" />
//           <h1 className="text-2xl font-bold mt-4 text-white">Acesso Administrativo</h1>
//           <p className="text-sm text-white/80">Insira suas credenciais para continuar</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block mb-2 text-sm text-white/80">Usuário</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full px-4 py-3 rounded-lg border border-white/30 text-white bg-white/10 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-2 text-sm text-white/80">Senha</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-3 rounded-lg border border-white/30 text-white bg-white/10 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-orange-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-700 transition"
//           >
//             <LogIn size={18} /> Entrar
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../assets/logo_preta.png";
import heroImage from "../assets/Bg.png";

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
    if (success) {
      toast.success("Login realizado com sucesso!");
      navigate("/admin/empreendimentos");
    } else {
      toast.error("Usuário ou senha inválidos");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-end p-6"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="absolute top-10 left-10 max-w-md px-6">
        <p className="text-white text-2xl md:text-3xl font-bold leading-snug drop-shadow">
          Construindo o <span className="text-orange-500">amanhã</span> com inovação e confiança.
        </p>
      </div>

      <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-10 w-full max-w-md mr-12">
        <div className="mb-8 text-center">
          <img src={logo} alt="Objetiva Logo" className="mx-auto w-20" />
          <h1 className="text-2xl font-bold mt-4 text-white">Acesso Administrativo</h1>
          <p className="text-sm text-white/80">Insira suas credenciais para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm text-white/80">Usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-white/30 text-white bg-white/10 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-white/80">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-white/30 text-white bg-white/10 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
  );
}
