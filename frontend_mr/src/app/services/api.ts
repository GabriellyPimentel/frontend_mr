// src/app/services/api.ts - VERSÃO CORRIGIDA COM ROTAS REAIS
import { MaeSoloData, ProfissionalData } from '../types';

// 🔗 URL da sua API no Render
const API_BASE_URL = 'https://backend-mr.onrender.com';

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}

// 🛠️ Função auxiliar para requisições
const makeRequest = async (endpoint: string, options: RequestInit): Promise<ApiResponse> => {
  try {
    const fullUrl = `${API_BASE_URL}${endpoint}`;
    console.log('🔍 Acessando:', fullUrl);
    
    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
    });

    console.log(`📊 Status: ${response.status} para ${endpoint}`);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json().catch(() => ({ mensagem: 'Erro desconhecido' }));
      throw new Error(errorData.mensagem || `HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(`❌ Erro em ${endpoint}:`, error);
    throw error;
  }
};

// 👩‍👧‍👦 Cadastro de mãe solo - ROTA CORRETA
export const cadastrarMaeSolo = async (data: MaeSoloData): Promise<void> => {
  try {
    console.log('📝 Cadastrando mãe solo:', data);
    
    // 🔄 Transformar dados para o formato do backend
    const backendData = {
      nome: data.nome,
      documentoIdentificacao: '00000000000', // CPF fake por enquanto
      telefone: data.telefone,
      email: data.email,
      senha: data.senha,
      // Data de nascimento fake (você pode pedir no form depois)
      ano: 1990,
      mes: 1,
      dia: 1,
      escolaridade: data.escolaridade || 'medioCompleto',
      endereco: data.endereco,
      rendaMensal: data.rendaMensal || 1000,
      situacaoTrabalho: data.situacaoTrabalho === 'empregada_clt' ? true : false
    };

    // 🎯 ROTA CORRETA DO SEU BACKEND
    await makeRequest('/mae-solo/mae/cadastrar', {
      method: 'POST',
      body: JSON.stringify(backendData),
    });
    
    console.log('✅ Mãe solo cadastrada com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao cadastrar mãe solo:', error);
    throw new Error('Erro ao cadastrar mãe solo. Verifique os dados e tente novamente.');
  }
};

// 🩺 Cadastro de profissional - ROTA CORRETA  
export const cadastrarProfissional = async (data: ProfissionalData): Promise<void> => {
  try {
    console.log('📝 Cadastrando profissional:', data);
    
    // 🔄 Transformar dados para o formato do backend
    const backendData = {
      nome: data.nome,
      documentoIdentificacao: '00000000001', // CPF fake por enquanto
      telefone: data.telefone,
      email: data.email,
      senha: data.senha,
      areaAtuacao: data.profissao
    };

    // 🎯 ROTA CORRETA DO SEU BACKEND
    await makeRequest('/profissional/cadastrar', {
      method: 'POST',
      body: JSON.stringify(backendData),
    });
    
    console.log('✅ Profissional cadastrado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao cadastrar profissional:', error);
    throw new Error('Erro ao cadastrar profissional. Verifique os dados e tente novamente.');
  }
};

// 🔐 Login - ROTA CORRETA
export const login = async (email: string, senha: string): Promise<any> => {
  try {
    console.log('🔐 Tentando login:', { email });
    
    // 🎯 ROTA CORRETA DO SEU BACKEND  
    const response = await makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ 
        documentoIdentificacao: email, // Seu backend usa CPF, não email
        senha 
      }),
    });
    
    console.log('✅ Login realizado com sucesso!');
    return response.data;
  } catch (error) {
    console.error('❌ Erro no login:', error);
    throw new Error('Email ou senha incorretos.');
  }
};