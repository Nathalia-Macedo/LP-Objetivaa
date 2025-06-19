import React, { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Plus, Trash2, Upload, Save, Edit3, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import AdminHeader from "../components/HeaderAdmin";
import AdminFooter from "../components/AdminFooter";

const API_URL = "https://back-end-objetiva.onrender.com/projects";

const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = (e) => resolve(e.target.result.split(",")[1]);
  reader.onerror = reject;
  reader.readAsDataURL(file);
});

export default function AdminEmpreendimentos() {
  const { token } = useAuth();
  const [form, setForm] = useState({ name: "", caption: "", images: [], localizacao: "", observacoes: [""], tipo: "", status: "" });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const inputFileRef = useRef();
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const fetchProjects = async () => {
    try {
      const res = await fetch(API_URL);
      setProjects(await res.json());
    } catch {
      toast.error("Erro ao carregar projetos");
    }
  };
  useEffect(() => { fetchProjects(); }, []);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleObsChange = (i, v) => setForm((p) => ({ ...p, observacoes: p.observacoes.map((o, idx) => idx === i ? v : o) }));
  const addObs = () => setForm((p) => ({ ...p, observacoes: [...p.observacoes, ""] }));
  const removeObs = (i) => setForm((p) => ({ ...p, observacoes: p.observacoes.filter((_, idx) => idx !== i) }));

  const handleFiles = async (files) => {
    if (!files?.length) return;
    const b64 = await fileToBase64(files[0]);
    setForm((p) => ({ ...p, images: [b64] }));
    setPreview(`data:image/*;base64,${b64}`);
  };
  const onDrop = (e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Sessão expirada. Faça login novamente.");
    if (!form.images.length) return toast.error("Envie ao menos 1 imagem");
    setLoading(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify(form)
      });
      if (res.status === 401) throw new Error("unauth");
      if (!res.ok) throw new Error("fail");
      toast.success(editingId ? "Projeto atualizado" : "Projeto criado");
      resetForm();
      fetchProjects();
    } catch (err) {
      toast.error(err.message === "unauth" ? "Token inválido" : "Erro ao salvar");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ name: "", caption: "", images: [], localizacao: "", observacoes: [""], tipo: "", status: "" });
    setPreview(null); setEditingId(null);
    if (inputFileRef.current) inputFileRef.current.value = "";
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setForm({ ...p, observacoes: p.observacoes.length ? p.observacoes : [""] });
    const first = p.images[0];
    setPreview(first?.startsWith("http") ? first : `data:image/*;base64,${first}`);
  };

  const handleDelete = async (id) => {
    if (!token) return toast.error("Sessão expirada.");
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE", headers: authHeaders });
      if (res.status === 401 || !res.ok) throw new Error();
      toast.success("Projeto excluído"); fetchProjects();
    } catch { toast.error("Erro ao excluir projeto"); }
  };

  const imgSrc = (val) => (val?.startsWith("http") ? val : `data:image/*;base64,${val}`);
  const nextCard = () => setCurrentIndex((i) => (i + 1) % projects.length);
  const prevCard = () => setCurrentIndex((i) => (i - 1 + projects.length) % projects.length);

  return (
    <>
          <AdminHeader/>

    
   
    <section className="py-10 px-4 bg-gradient-to-br from-white to-orange-50 min-h-screen">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">

        {/* FORM COM GLASSMORPHISM */}
        <form onSubmit={handleSubmit} className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-2xl shadow-xl p-8 space-y-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            {editingId ? <Edit3 size={22}/> : <Plus size={22}/>}{editingId ? "Editar Projeto" : "Novo Projeto"}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input name="name" placeholder="Nome *" value={form.name} onChange={handleChange} className="bg-white/70 border border-white/30 p-3 rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400" required/>
            <input name="caption" placeholder="Legenda" value={form.caption} onChange={handleChange} className="bg-white/70 border border-white/30 p-3 rounded-xl text-gray-700 placeholder:text-gray-400"/>
            <input name="localizacao" placeholder="Localização" value={form.localizacao} onChange={handleChange} className="bg-white/70 border border-white/30 p-3 rounded-xl text-gray-700 placeholder:text-gray-400"/>
            <input name="tipo" placeholder="Tipo (residencial…)" value={form.tipo} onChange={handleChange} className="bg-white/70 border border-white/30 p-3 rounded-xl text-gray-700 placeholder:text-gray-400"/>
            <select name="status" value={form.status} onChange={handleChange} className="bg-white/70 border border-white/30 p-3 rounded-xl text-gray-700">
              <option value="">Status</option>
              <option value="lançamento">Lançamento</option>
              <option value="entregue">Entregue</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-800">Observações</label>
            {form.observacoes.map((o,i)=>(
              <div key={i} className="flex gap-2 items-center">
                <input value={o} onChange={e=>handleObsChange(i,e.target.value)} className="flex-1 bg-white/70 border border-white/30 p-2 rounded-xl text-gray-700 placeholder:text-gray-400"/>
                {form.observacoes.length>1 && <button type="button" onClick={()=>removeObs(i)} className="text-red-600"><Trash2 size={16}/></button>}
              </div>
            ))}
            <button type="button" onClick={addObs} className="text-sm text-orange-600 flex gap-1 items-center">
              <Plus size={14}/> Nova observação
            </button>
          </div>
          <div onDrop={onDrop} onDragOver={(e)=>e.preventDefault()} onClick={()=>inputFileRef.current.click()}
               className="h-40 border-2 border-dashed border-orange-400 rounded-xl flex flex-col justify-center items-center text-orange-600 cursor-pointer bg-white/30 hover:bg-white/50 transition-all duration-300">
            <Upload size={24}/><p className="text-sm">Arraste a imagem ou clique</p>
            <input ref={inputFileRef} type="file" accept="image/*" onChange={e=>handleFiles(e.target.files)} className="hidden"/>
          </div>
          {preview && <img src={preview} alt="Preview" className="h-40 w-full object-cover rounded-xl shadow-md"/>}
          <button type="submit" disabled={loading} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-60">
            <Save size={18}/> {loading ? "Salvando…" : "Salvar"}
          </button>
        </form>

        {/* CARROSSEL DE PROJETOS */}
        <div className="relative">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><ImageIcon size={20}/> Projetos Cadastrados</h3>
          {projects.length === 0 ? <p className="text-gray-500">Nenhum projeto encontrado.</p> : (
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {projects.map((p, i) => (
                  <div key={p.id} className="min-w-full relative h-80 bg-orange-400 group">
                    <img src={imgSrc(p.images?.[0])} alt={p.name} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"/>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"/>
                    <div className="absolute top-3 right-3 flex gap-2 z-20">
                      <button onClick={()=>handleEdit(p)} className="bg-white/80 p-1 rounded-full"><Edit3 size={16}/></button>
                      <button onClick={()=>handleDelete(p.id)} className="bg-white/80 p-1 rounded-full text-red-600"><Trash2 size={16}/></button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                      <p className="text-white text-xs lowercase">{p.tipo || "-"} – {p.status || ""}</p>
                      <h4 className="text-white text-lg font-bold break-words">{p.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={prevCard} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full z-30 hover:bg-white"><ChevronLeft/></button>
              <button onClick={nextCard} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full z-30 hover:bg-white"><ChevronRight/></button>
            </div>
          )}
        </div>
      </div>
    </section>
    <AdminFooter/>
     </>
  );
}
