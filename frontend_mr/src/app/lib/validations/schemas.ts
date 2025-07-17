import { z } from 'zod';

// 🛠️ Modo de desenvolvimento - mais permissivo
const isDevelopment = process.env.NODE_ENV === 'development';

// 📝 Função para validar CPF (modo desenvolvimento)
const validarCPF = (cpf: string): boolean => {
  console.log('🔍 Validando CPF:', cpf);
  
  // Remove tudo que não é número
  const cpfLimpo = cpf.replace(/[^\d]/g, '');
  console.log('🧹 CPF limpo:', cpfLimpo);
  
  // Em desenvolvimento, aceita qualquer CPF com 11 dígitos
  if (isDevelopment) {
    if (cpfLimpo.length === 11) {
      console.log('🛠️ Modo desenvolvimento: CPF aceito');
      return true;
    } else {
      console.log('❌ CPF deve ter 11 dígitos');
      return false;
    }
  }
  
  // Verifica se tem 11 dígitos
  if (cpfLimpo.length !== 11) {
    console.log('❌ CPF não tem 11 dígitos:', cpfLimpo.length);
    return false;
  }
  
  // Verifica se não são todos os dígitos iguais (111.111.111-11, etc.)
  if (/^(\d)\1{10}$/.test(cpfLimpo)) {
    console.log('❌ CPF com todos dígitos iguais');
    return false;
  }
  
  // Validação matemática do CPF (apenas em produção)
  try {
    // Calcula primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfLimpo.charAt(9))) {
      console.log('❌ Primeiro dígito verificador inválido');
      return false;
    }
    
    // Calcula segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfLimpo.charAt(10))) {
      console.log('❌ Segundo dígito verificador inválido');
      return false;
    }
    
    console.log('✅ CPF válido matematicamente');
    return true;
  } catch (error) {
    console.log('❌ Erro na validação matemática do CPF:', error);
    return false;
  }
};

// 👩‍👧‍👦 Schema de validação para mãe solo
export const schemaMaeSolo = z.object({
  nome: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome muito longo'),
  cpf: z.string()
    .min(11, 'CPF deve ter 11 dígitos')
    .max(14, 'CPF inválido')
    .refine(validarCPF, {
      message: isDevelopment 
        ? 'CPF deve ter 11 dígitos (qualquer número serve em desenvolvimento)' 
        : 'CPF inválido'
    }),
  email: z.string()
    .email('Email inválido')
    .optional()
    .or(z.literal('')),
  senha: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(50, 'Senha muito longa'),
  telefone: z.string()
    .min(10, 'Telefone deve ter pelo menos 10 dígitos')
    .max(15, 'Telefone muito longo'),
  dataNascimento: z.string()
    .min(1, 'Data de nascimento é obrigatória'),
  endereco: z.string()
    .min(5, 'Endereço é obrigatório')
    .max(200, 'Endereço muito longo'),
  rendaMensal: z.coerce.number()
    .min(0, 'Renda não pode ser negativa'),
  situacaoTrabalho: z.string()
    .min(1, 'Selecione uma situação de trabalho'),
  escolaridade: z.string()
    .min(1, 'Selecione uma escolaridade'),
});

// 🩺 Schema de validação para profissional
export const schemaProfissional = z.object({
  nome: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome muito longo'),
  cpf: z.string()
    .min(11, 'CPF deve ter 11 dígitos')
    .max(14, 'CPF inválido')
    .refine(validarCPF, {
      message: isDevelopment 
        ? 'CPF deve ter 11 dígitos (qualquer número serve em desenvolvimento)' 
        : 'CPF inválido'
    }),
  email: z.string()
    .email('Email inválido')
    .optional()
    .or(z.literal('')),
  senha: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(50, 'Senha muito longa'),
  telefone: z.string()
    .min(10, 'Telefone deve ter pelo menos 10 dígitos')
    .max(15, 'Telefone muito longo'),
  areaAtuacao: z.string()
    .min(1, 'Selecione uma área de atuação'),
});

// 🔐 Schema de validação para login com CPF
export const schemaLogin = z.object({
  cpf: z.string()
    .min(11, 'CPF deve ter 11 dígitos')
    .refine(validarCPF, {
      message: isDevelopment 
        ? 'CPF deve ter 11 dígitos (qualquer número serve em desenvolvimento)' 
        : 'CPF inválido'
    }),
  senha: z.string()
    .min(1, 'Senha é obrigatória'),
});