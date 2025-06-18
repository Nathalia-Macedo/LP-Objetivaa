"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const EmpreendimentosContext = createContext();
export const useEmpreendimentos = () => useContext(EmpreendimentosContext);

const API_URL = "https://back-end-objetiva.onrender.com/projects";

export const EmpreendimentosProvider = ({ children }) => {
  const [empreendimentos, setEmpreendimentos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmpreendimentos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setEmpreendimentos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar empreendimentos:", error);
    } finally {
      setLoading(false);
    }
  };

  const createEmpreendimento = async (data) => {
    try {
     
      await axios.post(API_URL, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
       console.log("HEADER:", { Authorization: `Bearer ${localStorage.getItem("token")}` });
      await fetchEmpreendimentos();
    } catch (error) {
      console.error("Erro ao criar empreendimento:", error.response?.data || error);
    }
  };

  const updateEmpreendimento = async (id, data) => {
    try {
      await axios.put(`${API_URL}/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      await fetchEmpreendimentos();
    } catch (error) {
      console.error("Erro ao atualizar empreendimento:", error.response?.data || error);
    }
  };

  const deleteEmpreendimento = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      await fetchEmpreendimentos();
    } catch (error) {
      console.error("Erro ao excluir empreendimento:", error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchEmpreendimentos();
  }, []);

  return (
    <EmpreendimentosContext.Provider
      value={{
        empreendimentos,
        loading,
        fetchEmpreendimentos,
        createEmpreendimento,
        updateEmpreendimento,
        deleteEmpreendimento,
      }}
    >
      {children}
    </EmpreendimentosContext.Provider>
  );
};
