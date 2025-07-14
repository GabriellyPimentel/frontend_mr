import { MaeSoloData, ProfissionalData } from '../types';

export const cadastrarMaeSolo = async (data: MaeSoloData): Promise<void> => {
  // Simula chamada para API
  await new Promise(resolve => setTimeout(resolve, 1000));
  
    // fazer aqui chamada real para sua API
  const response = await fetch('/api/cadastro/mae-solo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error('Erro ao cadastrar mãe solo');
  }
};

export const cadastrarProfissional = async (data: ProfissionalData): Promise<void> => {
  // Simula chamada para API
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // fazer aqui chamada real para sua API
  const response = await fetch('/api/cadastro/profissional', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error('Erro ao cadastrar profissional');
  }
};