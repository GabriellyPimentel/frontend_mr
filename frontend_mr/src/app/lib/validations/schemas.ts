import { z } from 'zod';

export const schemaMaeSolo = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  telefone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  endereco: z.string().min(5, 'Endereço é obrigatório')
});

export const schemaProfissional = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  telefone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  profissao: z.string().min(1, 'Selecione uma profissão'),
  registro: z.string().min(3, 'Número de registro é obrigatório')
});