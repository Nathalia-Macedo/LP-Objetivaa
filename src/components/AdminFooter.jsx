export default function AdminFooter() {
  return (
    <footer className="bg-black text-white py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-sm">
        <div>
          <p>Suporte: (71)987257532</p>
          <p>© {new Date().getFullYear()} Objetiva Incorporações e Construções</p>
        </div>

        <div className="flex flex-col sm:items-end">
          <p>Desenvolvido por <span className="font-semibold">Nathalia de Macedo</span></p>
          <div className="flex gap-4 mt-1 text-orange-400 underline">
            <a href="https://nathaliamacedo.vercel.app" target="_blank" rel="noopener noreferrer">Portfólio</a>
            <a href="https://www.linkedin.com/in/nathalia-de-macedo-martins-nathdev" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/Nathalia-Macedo" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://instagram.com/nath_dev_" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
