// 👩‍👧‍👦 Interface para dados de cadastro de mãe solo
export interface MaeSoloData {
  nome: string;
  cpf: string;                    // ✅ CPF obrigatório para login
  email?: string;                 // ✅ Email opcional
  senha: string;
  telefone: string;
  dataNascimento: string;         // ✅ Data de nascimento obrigatória
  endereco: string;
  rendaMensal: number;            // ✅ Renda obrigatória
  situacaoTrabalho: string;       // ✅ Situação de trabalho obrigatória
  escolaridade: string;           // ✅ Escolaridade obrigatória
}

// 🩺 Interface para dados de cadastro de profissional
export interface ProfissionalData {
  nome: string;
  cpf: string;                    // ✅ CPF obrigatório para login
  email?: string;                 // ✅ Email opcional
  senha: string;
  telefone: string;
  areaAtuacao: string;            // ✅ Área de atuação (era profissao + registro)
}

// 🔐 Interface para dados de login
export interface LoginData {
  cpf: string;                    // ✅ Login com CPF
  senha: string;
}

// 👤 Interface para usuário logado (retorno da API)
export interface User {
  id: string;
  cpf: string;                    // ✅ CPF para login
  email?: string;                 // ✅ Email opcional
  nome: string;
  tipo: 'mae_solo' | 'profissional';
  telefone?: string;
  endereco?: string;
  situacaoTrabalho?: string;
  areaAtuacao?: string;           // ✅ Para profissionais
  dataNascimento?: string;        // ✅ Para mães solo
  rendaMensal?: number;           // ✅ Para mães solo
  escolaridade?: string;          // ✅ Para mães solo
}

// 🔄 Tipo para controlar qual formulário mostrar
export type TipoFormulario = 'mae' | 'profissional';