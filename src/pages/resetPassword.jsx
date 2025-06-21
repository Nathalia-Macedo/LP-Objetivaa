import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../assets/logo_preta.png";
import axios from "axios";

export default function ResetPassword() {
  const [step, setStep] = useState(1); // 1: username, 2: código/senha
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const navigate = useNavigate();

  // Regras de senha
  const validatePassword = (pwd) => {
    const errors = [];
    if (pwd.length < 8) {
      errors.push("Mínimo de 8 caracteres");
    }
    if (!/[A-Z]/.test(pwd)) {
      errors.push("Pelo menos 1 letra maiúscula");
    }
    if (!/[a-z]/.test(pwd)) {
      errors.push("Pelo menos 1 letra minúscula");
    }
    if (!/[0-9]/.test(pwd)) {
      errors.push("Pelo menos 1 número");
    }
    if (!/[!@#$%^&*]/.test(pwd)) {
      errors.push("Pelo menos 1 caractere especial (!@#$%^&*)");
    }
    return errors;
  };

  // Manipula envio do username
  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("https://back-end-objetiva.onrender.com/auth/request-password-reset", { username });
      toast.success("Código de recuperação enviado com sucesso!");
      setStep(2); // Avança para a próxima etapa
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Erro ao enviar código de recuperação. Tente novamente.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Manipula redefinição de senha
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validações
    const pwdErrors = validatePassword(password);
    if (pwdErrors.length > 0) {
      setPasswordErrors(pwdErrors);
      toast.error("Corrija os erros na senha.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      setIsLoading(false);
      return;
    }

    if (code.length !== 6) {
      toast.error("O código deve ter 6 caracteres.");
      setIsLoading(false);
      return;
    }

    try {
      await axios.post("https://back-end-objetiva.onrender.com/auth/reset-password", { code, password });
      toast.success("Senha alterada com sucesso!");
      navigate("/login"); // Redireciona para login após sucesso
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Erro ao redefinir senha. Tente novamente.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Atualiza erros de senha em tempo real
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordErrors(validatePassword(e.target.value));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-6 text-center">
          <img src={logo} alt="Objetiva Logo" className="mx-auto w-20" />
          <h1 className="text-2xl font-bold mt-4 text-gray-900">Redefinição de Senha</h1>
          <p className="text-sm text-gray-600">
            {step === 1
              ? "Insira seu nome de usuário para receber um código de recuperação."
              : "Insira o código recebido e sua nova senha."}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleUsernameSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm text-gray-900">Nome de Usuário</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu nome de usuário"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition disabled:bg-orange-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Enviando..." : "Enviar Código"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm text-gray-900">Código de Verificação</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Digite o código de 6 caracteres"
                maxLength={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-900">Nova Senha</label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Digite sua nova senha"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              {passwordErrors.length > 0 && (
                <ul className="mt-2 text-sm text-red-600">
                  {passwordErrors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-900">Confirmação de Senha</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme sua nova senha"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition disabled:bg-orange-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Redefinindo..." : "Redefinir Senha"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}