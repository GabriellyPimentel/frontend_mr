
import { z } from 'zod';

// 📝 Função para validar CPF
const validarCPF = (cpf: string) => {
  const cpfLimpo = cpf.replace(/[^\d]/g, '');
  
  if (cpfLimpo.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpfLimpo)) return false; // CPFs com todos dígitos iguais
  
  // Validação do CPF (algoritmo básico)
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfLimpo.charAt(9))) return false;
  
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  
  return resto === parseInt(cpfLimpo.charAt(10));
};

// 👩‍👧‍👦 Schema de validação para mãe solo
export const schemaMaeSolo = z.object({
  nome: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome muito longo'),
  cpf: z.string()
    .min(11, 'CPF deve ter 11 dígitos')
    .max(14, 'CPF inválido')
    .refine(validarCPF, 'CPF inválido'),
  email: z.string()
    .email('Email inválido')
    .optional(),
  senha: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(50, 'Senha muito longa'),
  telefone: z.string()
    .min(10, 'Telefone deve ter pelo menos 10 dígitos')
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$|^\d{10,11}$/, 'Formato de telefone inválido'),
  endereco: z.string()
    .min(5, 'Endereço é obrigatório')
    .max(200, 'Endereço muito longo'),
  rendaMensal: z.coerce.number()
    .min(0, 'Renda não pode ser negativa')
    .optional(),
  situacaoTrabalho: z.string()
    .min(1, 'Selecione uma situação de trabalho')
    .optional(),
  escolaridade: z.string()
    .min(1, 'Selecione uma escolaridade')
    .optional(),
});

// 🩺 Schema de validação para profissional
export const schemaProfissional = z.object({
  nome: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome muito longo'),
  cpf: z.string()
    .min(11, 'CPF deve ter 11 dígitos')
    .max(14, 'CPF inválido')
    .refine(validarCPF, 'CPF inválido'),
  email: z.string()
    .email('Email inválido')
    .optional(),
  senha: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(50, 'Senha muito longa'),
  telefone: z.string()
    .min(10, 'Telefone deve ter pelo menos 10 dígitos')
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$|^\d{10,11}$/, 'Formato de telefone inválido'),
  profissao: z.string()
    .min(1, 'Selecione uma profissão'),
  registro: z.string()
    .min(3, 'Número de registro é obrigatório')
    .max(20, 'Registro muito longo'),
});

// 🔐 Schema de validação para login com CPF
export const schemaLogin = z.object({
  cpf: z.string()
    .min(11, 'CPF deve ter 11 dígitos')
    .refine(validarCPF, 'CPF inválido'),
  senha: z.string()
    .min(1, 'Senha é obrigatória'),
});