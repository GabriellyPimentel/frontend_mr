// src/app/services/localAuth.ts
import { MaeSoloData, ProfissionalData, User } from '../types';

// 🔍 Chave para o localStorage
const USERS_KEY = 'maeraiz_users';
const CURRENT_USER_KEY = 'maeraiz_current_user';

// 📦 Interface para usuário armazenado
interface StoredUser {
  id: string;
  cpf: string;
  senha: string;
  nome: string;
  email?: string;
  telefone?: string;
  tipo: 'mae_solo' | 'profissional';
  // Dados específicos de mãe solo
  endereco?: string;
  situacaoTrabalho?: string;
  dataNascimento?: string;
  rendaMensal?: number;
  escolaridade?: string;
  // Dados específicos de profissional
  areaAtuacao?: string;
  criadoEm: string;
}

// 🔧 Funções auxiliares
const getStoredUsers = (): StoredUser[] => {
  if (typeof window === 'undefined') return [];
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
};

const saveUsers = (users: StoredUser[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Erro ao salvar usuários:', error);
  }
};

const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

const formatCPF = (cpf: string): string => {
  return cpf.replace(/[^\d]/g, '');
};

// 👩‍👧‍👦 Cadastro de mãe solo
export const cadastrarMaeSoloLocal = async (data: MaeSoloData): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      console.log('📝 Cadastrando mãe solo localmente...');
      
      const users = getStoredUsers();
      const cpfLimpo = formatCPF(data.cpf);
      
      // Verifica se CPF já existe
      const usuarioExistente = users.find(user => user.cpf === cpfLimpo);
      if (usuarioExistente) {
        reject(new Error('CPF já cadastrado no sistema'));
        return;
      }
      
      // Cria novo usuário
      const novoUsuario: StoredUser = {
        id: generateId(),
        cpf: cpfLimpo,
        senha: data.senha,
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        tipo: 'mae_solo',
        endereco: data.endereco,
        situacaoTrabalho: data.situacaoTrabalho,
        dataNascimento: data.dataNascimento,
        rendaMensal: data.rendaMensal,
        escolaridade: data.escolaridade,
        criadoEm: new Date().toISOString()
      };
      
      users.push(novoUsuario);
      saveUsers(users);
      
      console.log('✅ Mãe solo cadastrada com sucesso!');
      
      // Simula delay da API
      setTimeout(() => resolve(), 800);
      
    } catch (error) {
      console.error('❌ Erro ao cadastrar mãe solo:', error);
      setTimeout(() => reject(new Error('Erro interno. Tente novamente.')), 300);
    }
  });
};

// 🩺 Cadastro de profissional
export const cadastrarProfissionalLocal = async (data: ProfissionalData): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      console.log('📝 Cadastrando profissional localmente...');
      
      const users = getStoredUsers();
      const cpfLimpo = formatCPF(data.cpf);
      
      // Verifica se CPF já existe
      const usuarioExistente = users.find(user => user.cpf === cpfLimpo);
      if (usuarioExistente) {
        reject(new Error('CPF já cadastrado no sistema'));
        return;
      }
      
      // Cria novo usuário
      const novoUsuario: StoredUser = {
        id: generateId(),
        cpf: cpfLimpo,
        senha: data.senha,
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        tipo: 'profissional',
        areaAtuacao: data.areaAtuacao,
        criadoEm: new Date().toISOString()
      };
      
      users.push(novoUsuario);
      saveUsers(users);
      
      console.log('✅ Profissional cadastrado com sucesso!');
      
      // Simula delay da API
      setTimeout(() => resolve(), 800);
      
    } catch (error) {
      console.error('❌ Erro ao cadastrar profissional:', error);
      setTimeout(() => reject(new Error('Erro interno. Tente novamente.')), 300);
    }
  });
};

// 🔐 Login
export const loginLocal = async (cpf: string, senha: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    try {
      console.log('🔐 Fazendo login localmente...');
      
      const users = getStoredUsers();
      const cpfLimpo = formatCPF(cpf);
      
      // Busca usuário
      const usuario = users.find(user => user.cpf === cpfLimpo && user.senha === senha);
      
      if (!usuario) {
        setTimeout(() => reject(new Error('CPF ou senha incorretos')), 500);
        return;
      }
      
      // Converte para formato da interface User
      const userLogado: User = {
        id: usuario.id,
        cpf: usuario.cpf,
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
        tipo: usuario.tipo,
        endereco: usuario.endereco,
        situacaoTrabalho: usuario.situacaoTrabalho,
        areaAtuacao: usuario.areaAtuacao,
        dataNascimento: usuario.dataNascimento,
        rendaMensal: usuario.rendaMensal,
        escolaridade: usuario.escolaridade
      };
      
      // Salva usuário atual
      if (typeof window !== 'undefined') {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userLogado));
      }
      
      console.log('✅ Login realizado com sucesso!');
      
      // Simula delay da API
      setTimeout(() => resolve(userLogado), 800);
      
    } catch (error) {
      console.error('❌ Erro no login:', error);
      setTimeout(() => reject(new Error('Erro interno. Tente novamente.')), 300);
    }
  });
};

// 🚪 Logout
export const logoutLocal = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
  console.log('🚪 Logout realizado');
};

// 👤 Obter usuário atual
export const getCurrentUserLocal = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const currentUser = localStorage.getItem(CURRENT_USER_KEY);
    return currentUser ? JSON.parse(currentUser) : null;
  } catch {
    return null;
  }
};

// 🔍 Verificar se usuário está logado
export const isLoggedInLocal = (): boolean => {
  return getCurrentUserLocal() !== null;
};

// 📊 Utilitários para desenvolvimento/debug
export const getStats = () => {
  const users = getStoredUsers();
  const maesSolo = users.filter(u => u.tipo === 'mae_solo');
  const profissionais = users.filter(u => u.tipo === 'profissional');
  
  return {
    totalUsuarios: users.length,
    maesSolo: maesSolo.length,
    profissionais: profissionais.length,
    ultimoCadastro: users.length > 0 ? users[users.length - 1].criadoEm : null
  };
};

// 🗑️ Limpar todos os dados (para desenvolvimento)
export const clearAllDataLocal = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USERS_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    console.log('🗑️ Todos os dados locais foram removidos');
  }
};

// 📋 Listar todos os usuários (para debug)
export const getAllUsersLocal = (): StoredUser[] => {
  return getStoredUsers();
};

