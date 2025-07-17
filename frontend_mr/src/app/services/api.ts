// src/app/services/api.ts - API com fallback local
import { MaeSoloData, ProfissionalData } from '../types';
import { 
  cadastrarMaeSoloLocal, 
  cadastrarProfissionalLocal, 
  loginLocal 
} from './localAuth';

// 🔗 URL da sua API no Render
const API_BASE_URL = 'https://backend-mr.onrender.com';

// ⚙️ Configuração - mude para false quando quiser usar a API real
const USE_LOCAL_STORAGE = true;

interface ApiResponse {
  success?: boolean;
  message?: string;
  mensagem?: string;
  data?: any;
  usuario?: any;
}

// 🛠️ Função auxiliar para requisições
const makeRequest = async (endpoint: string, options: RequestInit): Promise<ApiResponse> => {
  try {
    const fullUrl = `${API_BASE_URL}${endpoint}`;
    console.log('🔍 Fazendo requisição para:', fullUrl);
    console.log('📤 Dados enviados:', options.body);
    
    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
    });

    console.log(`📊 Status da resposta: ${response.status}`);

    if (response.ok) {
      const data = await response.json();
      console.log('📨 Resposta recebida:', data);
      return data;
    } else {
      const errorText = await response.text();
      console.error('❌ Erro da API:', errorText);
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { mensagem: errorText || 'Erro desconhecido' };
      }
      throw new Error(errorData.mensagem || errorData.message || `HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(`❌ Erro na requisição para ${endpoint}:`, error);
    throw error;
  }
};

// 👩‍👧‍👦 Cadastro de mãe solo
export const cadastrarMaeSolo = async (data: MaeSoloData): Promise<void> => {
  if (USE_LOCAL_STORAGE) {
    console.log('📱 Usando armazenamento local para mãe solo');
    return cadastrarMaeSoloLocal(data);
  }

  try {
    console.log('📝 Cadastrando mãe solo na API...');
    
    // Extrair ano, mês e dia da data de nascimento
    const dataNasc = new Date(data.dataNascimento);
    const ano = dataNasc.getFullYear();
    const mes = dataNasc.getMonth() + 1;
    const dia = dataNasc.getDate();
    
    // Dados no formato que sua API espera
    const backendData = {
      nome: data.nome,
      documentoIdentificacao: data.cpf.replace(/[^\d]/g, ''),
      telefone: data.telefone.replace(/[^\d]/g, ''),
      email: data.email || '',
      senha: data.senha,
      ano: ano,
      mes: mes,
      dia: dia,
      escolaridade: data.escolaridade,
      endereco: data.endereco,
      rendaMensal: Number(data.rendaMensal),
      situacaoTrabalho: data.situacaoTrabalho === 'empregada_clt' || 
                       data.situacaoTrabalho === 'empresaria' || 
                       data.situacaoTrabalho === 'autonoma'
    };

    await makeRequest('/mae-solo/mae/cadastrar', {
      method: 'POST',
      body: JSON.stringify(backendData),
    });
    
    console.log('✅ Mãe solo cadastrada com sucesso na API!');
  } catch (error) {
    console.error('❌ Erro ao cadastrar mãe solo na API:', error);
    console.log('🔄 Tentando usar armazenamento local como fallback...');
    return cadastrarMaeSoloLocal(data);
  }
};

// 🩺 Cadastro de profissional
export const cadastrarProfissional = async (data: ProfissionalData): Promise<void> => {
  if (USE_LOCAL_STORAGE) {
    console.log('📱 Usando armazenamento local para profissional');
    return cadastrarProfissionalLocal(data);
  }

  try {
    console.log('📝 Cadastrando profissional na API...');
    
    const backendData = {
      nome: data.nome,
      documentoIdentificacao: data.cpf.replace(/[^\d]/g, ''),
      telefone: data.telefone.replace(/[^\d]/g, ''),
      email: data.email || '',
      senha: data.senha,
      areaAtuacao: data.areaAtuacao
    };

    await makeRequest('/profissional/cadastrar', {
      method: 'POST',
      body: JSON.stringify(backendData),
    });
    
    console.log('✅ Profissional cadastrado com sucesso na API!');
  } catch (error) {
    console.error('❌ Erro ao cadastrar profissional na API:', error);
    console.log('🔄 Tentando usar armazenamento local como fallback...');
    return cadastrarProfissionalLocal(data);
  }
};

// 🔐 Login
export const login = async (cpf: string, senha: string): Promise<any> => {
  if (USE_LOCAL_STORAGE) {
    console.log('📱 Usando armazenamento local para login');
    return loginLocal(cpf, senha);
  }

  try {
    console.log('🔐 Fazendo login na API...');
    
    const response = await makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ 
        email: cpf.replace(/[^\d]/g, ''), // Seu backend usa email mas vamos mandar o CPF
        senha 
      }),
    });
    
    console.log('✅ Login realizado com sucesso na API!');
    return response.usuario || response.data;
  } catch (error) {
    console.error('❌ Erro no login da API:', error);
    console.log('🔄 Tentando usar armazenamento local como fallback...');
    return loginLocal(cpf, senha);
  }
};