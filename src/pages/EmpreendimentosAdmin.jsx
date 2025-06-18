// import React, { useState, useEffect, useRef } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import {
//   Plus,
//   Trash2,
//   Upload,
//   Save,
//   Edit3,
//   Image as ImageIcon,
// } from "lucide-react";

// // 🔐 contexto de autenticação
// import { useAuth } from "../context/AuthContext";

// /**
//  * Painel administrativo de Projetos (Empreendimentos)
//  * --------------------------------------------------
//  * – Requer token JWT (Bearer) para POST / PUT / DELETE em /projects
//  * – Imagens são armazenadas em base64 (apenas o payload, sem o prefixo)
//  */

// const API_URL = "https://back-end-objetiva.onrender.com/projects";

// const fileToBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const [, b64] = e.target.result.split(","); // remove "data:image/...;base64,"
//       resolve(b64);
//     };
//     reader.onerror = reject;
//     reader.readAsDataURL(file);
//   });

// export default function AdminEmpreendimentos() {
//   /* ------------------------------------------------------------------
//    * Contexto de autenticação
//    * ----------------------------------------------------------------*/
//   const { token } = useAuth();

//   /* ------------------------------------------------------------------
//    * State
//    * ----------------------------------------------------------------*/
//   const [form, setForm] = useState({
//     name: "",
//     caption: "",
//     images: [],
//     localizacao: "",
//     observacoes: [""],
//     tipo: "",
//     status: "",
//   });
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [projects, setProjects] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const inputFileRef = useRef();

//   /* ------------------------------------------------------------------
//    * Helpers
//    * ----------------------------------------------------------------*/
//   const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

//   const fetchProjects = async () => {
//     try {
//       const res = await fetch(API_URL);
//       const data = await res.json();
//       setProjects(data);
//     } catch {
//       toast.error("Erro ao carregar projetos");
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleObsChange = (idx, value) => {
//     setForm((prev) => {
//       const obs = [...prev.observacoes];
//       obs[idx] = value;
//       return { ...prev, observacoes: obs };
//     });
//   };

//   const addObs = () =>
//     setForm((p) => ({ ...p, observacoes: [...p.observacoes, ""] }));

//   const removeObs = (idx) =>
//     setForm((p) => ({
//       ...p,
//       observacoes: p.observacoes.filter((_, i) => i !== idx),
//     }));

//   /* -------------------- imagem -------------------- */
//   const handleFiles = async (files) => {
//     if (!files?.length) return;
//     const b64 = await fileToBase64(files[0]);
//     setForm((p) => ({ ...p, images: [b64] }));
//     setPreview(`data:image/*;base64,${b64}`);
//   };

//   const onDrop = (e) => {
//     e.preventDefault();
//     handleFiles(e.dataTransfer.files);
//   };

//   /* -------------------- enviar -------------------- */
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (!token) {
//   //     toast.error("Sessão expirada. Faça login novamente.");
//   //     return;
//   //   }
//   //   if (!form.images.length) {
//   //     toast.error("Envie ao menos 1 imagem");
//   //     return;
//   //   }

//   //   setLoading(true);
//   //   try {
//   //     const method = editingId ? "PUT" : "POST";
//   //     const url = editingId ? `${API_URL}/${editingId}` : API_URL;

//   //     const res = await fetch(url, {
//   //       method,
//   //       headers: { "Content-Type": "application/json", ...authHeaders },
//   //       body: JSON.stringify(form),
//   //     });
//   //     if (res.status === 401) throw new Error("unauthorized");
//   //     if (!res.ok) throw new Error();

//   //     toast.success(editingId ? "Projeto atualizado" : "Projeto criado");
//   //     resetForm();
//   //     fetchProjects();
//   //   } catch (err) {
//   //     if (err.message === "unauthorized") {
//   //       toast.error("Token inválido ou expirado. Faça login novamente.");
//   //     } else {
//   //       toast.error("Erro ao salvar projeto");
//   //     }
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   console.log("TOKEN NO CONTEXTO:", token);
//   console.log("HEADER ENVIADO:", { Authorization: `Bearer ${token}` });

//   if (!token) {
//     toast.error("Sessão expirada. Faça login novamente.");
//     return;
//   }
//   if (!form.images.length) {
//     toast.error("Envie ao menos 1 imagem");
//     return;
//   }

//   setLoading(true);
//   try {
//     const method = editingId ? "PUT" : "POST";
//     const url = editingId ? `${API_URL}/${editingId}` : API_URL;

//     console.log("Fazendo requisição para:", url);
//     console.log("Método:", method);
//     console.log("Corpo da requisição:", form);

//     const res = await fetch(url, {
//       method,
//       headers: { "Content-Type": "application/json", ...authHeaders },
//       body: JSON.stringify(form),
//     });

//     console.log("RESPOSTA:", res.status, await res.clone().text());

//     if (res.status === 401) throw new Error("unauthorized");
//     if (!res.ok) throw new Error();

//     toast.success(editingId ? "Projeto atualizado" : "Projeto criado");
//     resetForm();
//     fetchProjects();
//   } catch (err) {
//     if (err.message === "unauthorized") {
//       toast.error("Token inválido ou expirado. Faça login novamente.");
//     } else {
//       toast.error("Erro ao salvar projeto");
//     }
//   } finally {
//     setLoading(false);
//   }
// };


//   const resetForm = () => {
//     setForm({
//       name: "",
//       caption: "",
//       images: [],
//       localizacao: "",
//       observacoes: [""],
//       tipo: "",
//       status: "",
//     });
//     setPreview(null);
//     setEditingId(null);
//     if (inputFileRef.current) inputFileRef.current.value = "";
//   };

//   /* -------------------- editar / excluir -------------------- */
//   const handleEdit = (p) => {
//     setEditingId(p.id);
//     setForm({
//       name: p.name,
//       caption: p.caption,
//       images: p.images,
//       localizacao: p.localizacao,
//       observacoes: p.observacoes.length ? p.observacoes : [""],
//       tipo: p.tipo,
//       status: p.status,
//     });
//     setPreview(
//       p.images?.length ? `data:image/*;base64,${p.images[0]}` : null
//     );
//   };

//   const handleDelete = async (id) => {
//     if (!token) {
//       toast.error("Sessão expirada. Faça login novamente.");
//       return;
//     }
//     try {
//       const res = await fetch(`${API_URL}/${id}`, {
//         method: "DELETE",
//         headers: authHeaders,
//       });
//       if (res.status === 401) throw new Error("unauthorized");
//       if (!res.ok) throw new Error();

//       toast.success("Projeto excluído");
//       fetchProjects();
//     } catch (err) {
//       if (err.message === "unauthorized") {
//         toast.error("Token inválido ou expirado. Faça login novamente.");
//       } else {
//         toast.error("Erro ao excluir projeto");
//       }
//     }
//   };

//   /* -------------------- UI -------------------- */
//   return (
//     <section className="py-10 px-4 bg-white min-h-screen">
//       <Toaster position="top-right" />
//       <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
//         {/* FORMULÁRIO */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-gray-50 p-8 rounded-xl shadow-md space-y-6"
//         >
//           <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//             {editingId ? <Edit3 size={22} /> : <Plus size={22} />}
//             {editingId ? "Editar Projeto" : "Novo Projeto"}
//           </h2>

//           {/* básicos */}
//           <div className="grid md:grid-cols-2 gap-4">
//             <input
//               name="name"
//               placeholder="Nome *"
//               value={form.name}
//               onChange={handleChange}
//               className="border p-3 rounded text-gray-800 focus:ring-orange-500 focus:outline-none"
//               required
//             />
//             <input
//               name="caption"
//               placeholder="Legenda"
//               value={form.caption}
//               onChange={handleChange}
//               className="border p-3 rounded text-gray-800 focus:ring-orange-500 focus:outline-none"
//             />
//             <input
//               name="localizacao"
//               placeholder="Localização"
//               value={form.localizacao}
//               onChange={handleChange}
//               className="border p-3 rounded text-gray-800 focus:ring-orange-500 focus:outline-none"
//             />
//             <input
//               name="tipo"
//               placeholder="Tipo (residencial...)"
//               value={form.tipo}
//               onChange={handleChange}
//               className="border p-3 rounded text-gray-800 focus:ring-orange-500 focus:outline-none"
//             />
//             <select
//               name="status"
//               value={form.status}
//               onChange={handleChange}
//               className="border p-3 rounded text-gray-800 focus:ring-orange-500 focus:outline-none"
//             >
//               <option value="">Status</option>
//               <option value="lançamento">Lançamento</option>
//               <option value="entregue">Entregue</option>
//             </select>
//           </div>

//           {/* Observações */}
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-700">Observações</label>
//             {form.observacoes.map((o, i) => (
//               <div key={i} className="flex gap-2 items-center">
//                 <input
//                   value={o}
//                   onChange={(e) => handleObsChange(i, e.target.value)}
//                   className="flex-1 border p-2 rounded text-gray-800"
//                 />
//                 {form.observacoes.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removeObs(i)}
//                     className="text-red-600 hover:text-red-800"
//                     title="Remover observação"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 )}
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addObs}
//               className="text-sm text-orange-600 flex gap-1 items-center"
//             >
//               <Plus size={14} /> Nova observação
//             </button>
//           </div>

//           {/* Upload */}
//           <div
//             onDrop={onDrop}
//             onDragOver={(e) => e.preventDefault()}
//             onClick={() => inputFileRef.current.click()}
//             className="h-40 border-2 border-dashed border-orange-500 rounded-lg flex flex-col justify-center items-center text-orange-600 cursor-pointer bg-orange-50 hover:bg-orange-100"
//           >
//             <Upload size={24} />
//             <p className="text-sm">Arraste a imagem ou clique</p>
//             <input
//               ref={inputFileRef}
//               type="file"
//               accept="image/*"
//               onChange={(e) => handleFiles(e.target.files)}
//               className="hidden"
//             />
//           </div>

//           {preview && (
//             <img
//               src={preview}
//               alt="Preview"
//               className="h-40 w-full object-cover rounded"
//             />
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-md flex items-center gap-2 disabled:opacity-60"
//           >
//             <Save size={18} /> {loading ? "Salvando..." : "Salvar"}
//           </button>
//         </form>

//         {/* LISTA */}
//         <div>
//           <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//             <ImageIcon size={20} /> Projetos cadastrados
//           </h3>
//           {projects.length === 0 ? (
//             <p className="text-gray-500">Nenhum projeto encontrado.</p>
//           ) : (
//             <div className="grid sm:grid-cols-2 gap-6">
//               {projects.map((p) => (
//                 <div
//                   key={p.id}
//                   className="relative h-80 rounded-xl overflow-hidden bg-orange-400 group shadow-md"
//                 >
//                   {p.images?.length ? (
//                     <img
//                       src={`data:image/*;base64,${p.images[0]}`}
//                       alt={p.name}
//                       className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                     />
//                   ) : (
//                     <div className="absolute inset-0 flex flex-col items-center justify-center text-white/70 gap-2">
//                       <ImageIcon size={48} />
//                       <span>Sem imagem</span>
//                     </div>
//                   )}
//                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />

//                   {/* actions */}
//                   <div className="absolute top-3 right-3 flex gap-2 z-20">
//                     <button
//                       onClick={() => handleEdit(p)}
//                       className="bg-white/80 hover:bg-white text-gray-800 p-1 rounded-full"
//                       title="Editar"
//                     >
//                       <Edit3 size={16} />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(p.id)}
//                       className="bg-white/80 hover:bg-white text-red-600 p-1 rounded-full"
//                       title="Excluir"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>

//                   {/* info */}
//                   <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
//                     <p className="text-white text-xs lowercase">
//                       {p.tipo || "-"} – {p.status || ""}
//                     </p>
//                     <h4 className="text-white text-lg font-bold leading-tight break-words">
//                       {p.name}
//                     </h4>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
import React, { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Plus, Trash2, Upload, Save, Edit3, Image as ImageIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const API_URL = "https://back-end-objetiva.onrender.com/projects";

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result.split(",")[1]); // tira cabeçalho data:
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function AdminEmpreendimentos() {
  const { token } = useAuth();

  const [form, setForm] = useState({
    name: "",
    caption: "",
    images: [],
    localizacao: "",
    observacoes: [""],
    tipo: "",
    status: "",
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const inputFileRef = useRef();

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  /* -------------------- fetch lista -------------------- */
  const fetchProjects = async () => {
    try {
      const res = await fetch(API_URL);
      setProjects(await res.json());
    } catch {
      toast.error("Erro ao carregar projetos");
    }
  };
  useEffect(() => { fetchProjects(); }, []);

  /* -------------------- handlers -------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleObsChange = (idx, v) =>
    setForm((p) => ({ ...p, observacoes: p.observacoes.map((o, i) => (i === idx ? v : o)) }));

  const addObs = () => setForm((p) => ({ ...p, observacoes: [...p.observacoes, ""] }));
  const removeObs = (idx) => setForm((p) => ({ ...p, observacoes: p.observacoes.filter((_, i) => i !== idx) }));

  /* -------------------- imagem -------------------- */
  const handleFiles = async (files) => {
    if (!files?.length) return;
    const b64 = await fileToBase64(files[0]);
    setForm((p) => ({ ...p, images: [b64] }));
    setPreview(`data:image/*;base64,${b64}`);
  };
  const onDrop = (e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); };

  /* -------------------- submit -------------------- */
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
            console.log(res);
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
    setForm({ name:"", caption:"", images:[], localizacao:"", observacoes:[""], tipo:"", status:"" });
    setPreview(null); setEditingId(null);
    if (inputFileRef.current) inputFileRef.current.value = "";
  };

  /* -------------------- editar / excluir -------------------- */
  const handleEdit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      caption: p.caption,
      images: p.images,
      localizacao: p.localizacao,
      observacoes: p.observacoes.length ? p.observacoes : [""],
      tipo: p.tipo,
      status: p.status,
    });
    const first = p.images[0];
    setPreview(first?.startsWith("http") ? first : `data:image/*;base64,${first}`);
  };

  const handleDelete = async (id) => {
    if (!token) return toast.error("Sessão expirada.");
    try {
      const res = await fetch(`${API_URL}/${id}`, { method:"DELETE", headers: authHeaders });
      
      if (res.status === 401) throw new Error();
      if (!res.ok) throw new Error();
      toast.success("Projeto excluído"); fetchProjects();
    } catch { toast.error("Erro ao excluir projeto"); }
  };

  /* -------------------- helpers render -------------------- */
  const imgSrc = (val) => (val?.startsWith("http") ? val : `data:image/*;base64,${val}`);

  /* -------------------- UI -------------------- */
  return (
    <section className="py-10 px-4 bg-white min-h-screen">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">

        {/* ---------- FORM ---------- */}
        <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-xl shadow-md space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            {editingId ? <Edit3 size={22}/> : <Plus size={22}/>}{editingId ? "Editar Projeto" : "Novo Projeto"}
          </h2>

          {/* básicos */}
          <div className="grid md:grid-cols-2 gap-4">
            <input name="name" placeholder="Nome *" value={form.name} onChange={handleChange}
                   className="border p-3 rounded text-gray-700" required/>
            <input name="caption" placeholder="Legenda" value={form.caption} onChange={handleChange}
                   className="border p-3 rounded  text-gray-700"/>
            <input name="localizacao" placeholder="Localização" value={form.localizacao} onChange={handleChange}
                   className="border p-3 rounded text-gray-700"/>
            <input name="tipo" placeholder="Tipo (residencial…)" value={form.tipo} onChange={handleChange}
                   className="border p-3 rounded text-gray-700"/>
            <select name="status" value={form.status} onChange={handleChange}
                    className="border p-3 rounded  text-gray-700">
              <option value="">Status</option><option value="lançamento">Lançamento</option>
              <option value="entregue">Entregue</option>
            </select>
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <label className="text-sm font-medium  text-gray-700">Observações</label>
            {form.observacoes.map((o,i)=>(
              <div key={i} className="flex gap-2 items-center">
                <input value={o} onChange={e=>handleObsChange(i,e.target.value)}
                       className="flex-1 border p-2 rounded  text-gray-700"/>
                {form.observacoes.length>1 &&
                  <button type="button" onClick={()=>removeObs(i)} className="text-red-600"><Trash2 size={16}/></button>}
              </div>
            ))}
            <button type="button" onClick={addObs} className="text-sm text-orange-600 flex gap-1 items-center">
              <Plus size={14}/> Nova observação
            </button>
          </div>

          {/* Upload */}
          <div onDrop={onDrop} onDragOver={(e)=>e.preventDefault()} onClick={()=>inputFileRef.current.click()}
               className="h-40 border-2 border-dashed border-orange-500 rounded-lg flex flex-col justify-center items-center text-orange-600 cursor-pointer bg-orange-50 hover:bg-orange-100">
            <Upload size={24}/><p className="text-sm">Arraste a imagem ou clique</p>
            <input ref={inputFileRef} type="file" accept="image/*"
                   onChange={e=>handleFiles(e.target.files)} className="hidden"/>
          </div>
          {preview && <img src={preview} alt="Preview" className="h-40 w-full object-cover rounded"/>}

          <button type="submit" disabled={loading}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded flex items-center gap-2 disabled:opacity-60">
            <Save size={18}/> {loading ? "Salvando…" : "Salvar"}
          </button>
        </form>

        {/* ---------- LISTA ---------- */}
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><ImageIcon size={20}/> Projetos cadastrados</h3>
          {projects.length===0 ? <p className="text-gray-500">Nenhum projeto encontrado.</p> :
          <div className="grid sm:grid-cols-2 gap-6">
            {projects.map(p=>(
              <div key={p.id} className="relative h-80 rounded-xl overflow-hidden bg-orange-400 group shadow-md">
                {p.images?.length ?
                  <img src={imgSrc(p.images[0])} alt={p.name}
                       className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"/> :
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/70 gap-2">
                    <ImageIcon size={48}/><span>Sem imagem</span>
                  </div>}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"/>
                {/* actions */}
                <div className="absolute top-3 right-3 flex gap-2 z-20">
                  <button onClick={()=>handleEdit(p)} className="bg-white/80 p-1 rounded-full"><Edit3 size={16}/></button>
                  <button onClick={()=>handleDelete(p.id)} className="bg-white/80 p-1 rounded-full text-red-600">
                    <Trash2 size={16}/></button>
                </div>
                {/* info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <p className="text-white text-xs lowercase">{p.tipo||"-"} – {p.status||""}</p>
                  <h4 className="text-white text-lg font-bold break-words">{p.name}</h4>
                </div>
              </div>
            ))}
          </div>}
        </div>
      </div>
    </section>
  );
}
