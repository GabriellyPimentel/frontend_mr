
// 👩‍👧‍👦 Interface para dados de cadastro de mãe solo
export interface MaeSoloData {
  nome: string;
  cpf: string;           // ✅ CPF para login
  email?: string;        // ✅ Email opcional
  senha: string;
  telefone: string;
  endereco: string;
  rendaMensal?: number;
  situacaoTrabalho?: string;
  escolaridade?: string;
}

// 🩺 Interface para dados de cadastro de profissional
export interface ProfissionalData {
  nome: string;
  cpf: string;           // ✅ CPF para login
  email?: string;        // ✅ Email opcional
  senha: string;
  telefone: string;
  profissao: string;
  registro: string;
}

// 🔐 Interface para dados de login
export interface LoginData {
  cpf: string;           // ✅ Login com CPF
  senha: string;
}

// 👤 Interface para usuário logado (retorno da API)
export interface User {
  id: string;
  cpf: string;           // ✅ Cpf para Login
  email?: string;        // ✅ Email opcional
  nome: string;
  tipo: 'mae_solo' | 'profissional';
  telefone?: string;
  endereco?: string;
  situacaoTrabalho?: string;
  profissao?: string;
  registro?: string;
}

// 🔄 Tipo para controlar qual formulário mostrar
export type TipoFormulario = 'mae' | 'profissional';