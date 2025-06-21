import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);


export function AuthProvider({ children }) {
  /** ------------------------------------------------------------------
   *  Estado: token inicial vem do localStorage (ou string vazia)
   * -----------------------------------------------------------------*/
   const [token, setToken] = useState(() => {
       const token = localStorage.getItem("token");
       console.log("Token lido do localStorage:", token); // Adicione este log
       return token || "";
     });

  /** ------------------------------------------------------------------
   *  Login – devolve true/false
   * -----------------------------------------------------------------*/
  const login = async (username, password) => {
    try {
      const { data } = await axios.post(
        "https://back-end-objetiva.onrender.com/auth/login",
        { username, password }
      );
      console.log(data)
      // salva token
      localStorage.setItem("token", data.token);
      setToken(data.token);

      // log para debug
      console.log("TOKEN NO CONTEXTO:", data.token);

      return true;
    } catch (err) {
      console.error("Falha no login:", err);
      return false;
    }
  };

  /** ------------------------------------------------------------------
   *  Logout
   * -----------------------------------------------------------------*/
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    delete axios.defaults.headers.common.Authorization;
  };

  /** ------------------------------------------------------------------
   *  Sempre que o token mudar, atualiza o header padrão do axios
   * -----------------------------------------------------------------*/
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
    
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
