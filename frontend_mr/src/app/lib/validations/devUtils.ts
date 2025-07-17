// src/app/lib/devUtils.ts - Utilitários para desenvolvimento
import {
  getStats,
  clearAllDataLocal,
  getAllUsersLocal,
  getCurrentUserLocal,
  cadastrarMaeSoloLocal,
  cadastrarProfissionalLocal,
  loginLocal,
  logoutLocal,
  isLoggedInLocal
} from '../../services/localAuth';

// 📊 Mostra estatísticas no console
export const showStats = () => {
  const stats = getStats();
  console.log('📊 ESTATÍSTICAS DO SISTEMA LOCAL:');
  console.log(`👥 Total de usuários: ${stats.totalUsuarios}`);
  console.log(`👩‍👧‍👦 Mães solo: ${stats.maesSolo}`);
  console.log(`🩺 Profissionais: ${stats.profissionais}`);
  console.log(`📅 Último cadastro: ${stats.ultimoCadastro ? new Date(stats.ultimoCadastro).toLocaleString() : 'Nenhum'}`);
  
  const currentUser = getCurrentUserLocal();
  console.log(`👤 Usuário logado: ${currentUser ? `${currentUser.nome} (${currentUser.tipo})` : 'Nenhum'}`);
};

// 🗑️ Limpa todos os dados
export const clearAllData = () => {
  clearAllDataLocal();
  console.log('🗑️ Todos os dados foram removidos!');
};

// 📋 Lista todos os usuários
export const listAllUsers = () => {
  const users = getAllUsersLocal();
  console.log('📋 TODOS OS USUÁRIOS:');
  if (users.length === 0) {
    console.log('Nenhum usuário encontrado.');
    return;
  }
  
  users.forEach((user, index) => {
    console.log(`${index + 1}. ${user.nome} (${user.tipo}) - CPF: ${user.cpf}`);
  });
};

// 🎯 Cria usuários de teste
export const createTestUsers = async () => {
  try {
    console.log('🎯 Criando usuários de teste...');
    
    // Verifica se já existem usuários de teste
    const users = getAllUsersLocal();
    const testMae = users.find(u => u.cpf === '12345678900');
    const testProf = users.find(u => u.cpf === '98765432100');
    
    if (testMae && testProf) {
      console.log('⚠️ Usuários de teste já existem!');
      console.log('📝 Mãe Solo: CPF 123.456.789-00, senha 123456');
      console.log('📝 Profissional: CPF 987.654.321-00, senha 123456');
      return;
    }
    
    // Criar mãe solo de teste (se não existir)
    if (!testMae) {
      await cadastrarMaeSoloLocal({
        nome: 'Maria Silva',
        cpf: '123.456.789-00',
        email: 'maria@teste.com',
        senha: '123456',
        telefone: '(11) 99999-9999',
        dataNascimento: '1990-05-15',
        endereco: 'Rua das Flores, 123',
        rendaMensal: 2500,
        situacaoTrabalho: 'empregada_clt',
        escolaridade: 'medioCompleto'
      });
      console.log('✅ Mãe solo de teste criada!');
    }

    // Criar profissional de teste (se não existir)
    if (!testProf) {
      await cadastrarProfissionalLocal({
        nome: 'Dr. João Santos',
        cpf: '987.654.321-00',
        email: 'joao@teste.com',
        senha: '123456',
        telefone: '(11) 88888-8888',
        areaAtuacao: 'Psicologia'
      });
      console.log('✅ Profissional de teste criado!');
    }

    console.log('🎉 Usuários de teste prontos!');
    console.log('📝 Mãe Solo: CPF 123.456.789-00, senha 123456');
    console.log('📝 Profissional: CPF 987.654.321-00, senha 123456');
    
  } catch (error) {
    console.error('❌ Erro ao criar usuários de teste:', error);
  }
};

// 🔐 Login rápido com usuário de teste
export const quickLogin = async (tipo: 'mae' | 'prof' = 'mae') => {
  try {
    const cpf = tipo === 'mae' ? '123.456.789-00' : '987.654.321-00';
    const senha = '123456';
    
    console.log(`🔐 Fazendo login rápido como ${tipo === 'mae' ? 'mãe solo' : 'profissional'}...`);
    
    const user = await loginLocal(cpf, senha);
    console.log(`✅ Login realizado como: ${user.nome} (${user.tipo})`);
    return user;
    
  } catch (error) {
    console.error('❌ Erro no login rápido:', error);
    console.log('💡 Dica: Execute dev.createTest() primeiro para criar os usuários de teste');
  }
};

// 🚪 Logout rápido
export const quickLogout = () => {
  const currentUser = getCurrentUserLocal();
  if (currentUser) {
    logoutLocal();
    console.log(`🚪 Logout realizado (era: ${currentUser.nome})`);
  } else {
    console.log('⚠️ Nenhum usuário logado');
  }
};

// 🔍 Verifica status do login
export const checkLoginStatus = () => {
  const isLoggedIn = isLoggedInLocal();
  const currentUser = getCurrentUserLocal();
  
  console.log('🔍 STATUS DO LOGIN:');
  console.log(`📱 Logado: ${isLoggedIn ? 'SIM' : 'NÃO'}`);
  if (currentUser) {
    console.log(`👤 Usuário: ${currentUser.nome}`);
    console.log(`📋 Tipo: ${currentUser.tipo}`);
    console.log(`📧 Email: ${currentUser.email || 'Não informado'}`);
  }
};

// 🧪 Testa o sistema completo
export const testSystem = async () => {
  console.log('🧪 TESTE COMPLETO DO SISTEMA:');
  console.log('1. Limpando dados...');
  clearAllData();
  
  console.log('2. Criando usuários de teste...');
  await createTestUsers();
  
  console.log('3. Verificando estatísticas...');
  showStats();
  
  console.log('4. Testando login...');
  await quickLogin('mae');
  
  console.log('5. Verificando status...');
  checkLoginStatus();
  
  console.log('6. Fazendo logout...');
  quickLogout();
  
  console.log('✅ Teste completo finalizado!');
};

// 🎮 Comandos para usar no console do navegador
export const DevCommands = {
  // Comandos básicos
  stats: showStats,
  clear: clearAllData,
  list: listAllUsers,
  createTest: createTestUsers,
  
  // Comandos de login
  loginMae: () => quickLogin('mae'),
  loginProf: () => quickLogin('prof'),
  logout: quickLogout,
  status: checkLoginStatus,
  
  // Comando completo
  test: testSystem,
  
  // Atalhos
  s: showStats,
  c: clearAllData,
  l: listAllUsers,
  t: createTestUsers,
  lm: () => quickLogin('mae'),
  lp: () => quickLogin('prof'),
  lo: quickLogout,
  st: checkLoginStatus,
  ts: testSystem
};

// 🌐 Disponibiliza comandos globalmente no navegador (apenas em desenvolvimento)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).dev = DevCommands;
  
  console.log('🛠️ COMANDOS DE DESENVOLVIMENTO DISPONÍVEIS:');
  console.log('');
  console.log('📊 ESTATÍSTICAS:');
  console.log('  dev.stats() ou dev.s() - Mostra estatísticas');
  console.log('  dev.status() ou dev.st() - Status do login');
  console.log('');
  console.log('👥 USUÁRIOS:');
  console.log('  dev.list() ou dev.l() - Lista todos os usuários');
  console.log('  dev.createTest() ou dev.t() - Cria usuários de teste');
  console.log('');
  console.log('🔐 LOGIN:');
  console.log('  dev.loginMae() ou dev.lm() - Login como mãe solo');
  console.log('  dev.loginProf() ou dev.lp() - Login como profissional');
  console.log('  dev.logout() ou dev.lo() - Logout');
  console.log('');
  console.log('🧪 TESTES:');
  console.log('  dev.test() ou dev.ts() - Teste completo do sistema');
  console.log('  dev.clear() ou dev.c() - Limpa todos os dados');
  console.log('');
  console.log('💡 Dica: Execute dev.test() para testar tudo de uma vez!');
}