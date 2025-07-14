export interface MaeSoloData {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  endereco: string;
}

export interface ProfissionalData {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  profissao: string;
  registro: string;
}

export type TipoFormulario = 'mae' | 'profissional';