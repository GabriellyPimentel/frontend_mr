// src/app/page.tsx
'use client';

import { useEffect } from 'react';
import CadastroPage from './components/pages/CadastroPage';

export default function Home() {
  useEffect(() => {
    // Carrega utilitários de desenvolvimento apenas no lado do cliente
    if (process.env.NODE_ENV === 'development') {
      import('../app/lib/validations/devUtils').then(({ DevCommands }) => {
        // Os comandos já são expostos automaticamente no window.dev
        console.log('🚀 MaeRaiz - Modo Desenvolvimento');
        console.log('💾 Sistema funcionando com armazenamento local');
        console.log('🛠️ Digite "dev.stats()" no console para ver estatísticas');
        console.log('🎯 Digite "dev.createTest()" para criar usuários de teste');
      });
    }
  }, []);

  return <CadastroPage />;
} 

// Para testar páginas específicas diretamente, descomente as linhas abaixo:


// 👩‍👧‍👦 Página da Mãe Solo
/*import MaePage from "./components/pages/MaePage";
export default function Home() {
  return <MaePage />;
}
*/

// 🩺 Página do Profissiona
/*import ProfissionalPage from "./components/pages/ProfissionalPage";
export default function Home() {
  return <ProfissionalPage />;
}

*/