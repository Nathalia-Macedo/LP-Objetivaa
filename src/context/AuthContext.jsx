// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// export function AuthProvider({ children }) {
//   const [token, setToken] = useState(() => localStorage.getItem("token") || "");

//   /** login devolve `true` se ok */
//   const login = async (username, password) => {
//     const { data } = await axios.post("https://back-end-objetiva.onrender.com/auth/login", { username, password });
//     localStorage.setItem("token", data.token);
//     setToken(data.token);
//     console.log("TOKEN NO CONTEXTO:", token);

//     return true;
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken("");
//   };

//   /** sempre que token muda, coloca-o no axios padrão */
//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//     } else {
//       delete axios.defaults.headers.common.Authorization;
//     }
//   }, [token]);

//   return (
//     <AuthContext.Provider value={{ token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
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
