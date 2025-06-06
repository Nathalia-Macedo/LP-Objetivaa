// import React from 'react';
// import logo from '../assets/logo_preta.png'
// const Rodape = () => {
//   return (
//     <footer className="bg-white text-gray-700 py-10 px-6 md:px-20">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-center md:text-left">
        
//         {/* Logo e título */}
//         <div className="flex flex-col items-center md:items-start">
//           {/* Substitua o src abaixo pela sua logo */}
//           <img src={logo} alt="Logo Objetiva" className="h-12 mb-2" />
//         </div>

//         {/* Localização */}
//         <div className="text-sm">
//           <h3 className="font-semibold uppercase mb-2">Localização</h3>
//           <p>Lorem ipsum dolor sit amet, 000</p>
//           <p>Consectetuir - BA</p>
//         </div>

//         {/* Contato */}
//         <div className="text-sm">
//           <h3 className="font-semibold uppercase mb-2">Fale Conosco</h3>
//           <p>seu.email@email.com.br</p>
//           <p>(71) 9 9999 9999</p>
//         </div>
//       </div>

//       {/* Footer inferior */}
//       <div className="mt-10 border-t pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-2">
//         <p>© 2025 <span className="font-semibold text-gray-700">Objetiva</span>. Todos os direitos reservados.</p>
//         <div className="flex gap-4">
//           <button className="hover:text-black transition">Port</button>
//           <button className="hover:text-black transition">Eng</button>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Rodape;
import React from 'react';
import logo from '../assets/logo_preta.png'

const Rodape = () => {
  return (
    <footer className="bg-white text-gray-700 py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-center md:text-left">
        
        {/* Logo e título */}
        <div className="flex flex-col items-center md:items-start">
          <img src={logo} alt="Logo Objetiva" className="h-12 mb-2" />
        </div>

        {/* Localização */}
        <div className="text-sm">
          <h3 className="font-semibold uppercase mb-2">Localização</h3>
          <p>Av. Antônio Carlos Magalhães, 1034</p>
          <p>Itaigara, Salvador - BA</p>
          <p>CEP: 41825-000</p>
          <p>Sala 438 - Tricenter / Max Center</p>
        </div>

        {/* Contato */}
        <div className="text-sm">
          <h3 className="font-semibold uppercase mb-2">Fale Conosco</h3>
          <p>contato@objetiva.com.br</p>
          <p>(71) 98897-0381</p>
        </div>
      </div>

      {/* Footer inferior */}
      <div className="mt-10 border-t pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-2">
        <p>© 2025 <span className="font-semibold text-gray-700">Objetiva</span>. Todos os direitos reservados.</p>
        <div className="flex gap-4">
          <button className="hover:text-black transition">Port</button>
          <button className="hover:text-black transition">Eng</button>
        </div>
      </div>
    </footer>
  );
};

export default Rodape;
