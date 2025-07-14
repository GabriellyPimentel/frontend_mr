'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

// Simulação de dados de usuários cadastrados
const mockUsers = [
  {
    id: 1,
    email: 'maria@exemplo.com',
    senha: '123456',
    tipo: 'mae_solo',
    nome: 'Maria Silva',
    situacaoTrabalho: 'autonoma',
  },
  {
    id: 2,
    email: 'dr.joao@clinica.com',
    senha: '123456',
    tipo: 'profissional',
    nome: 'Dr. João Santos',
    profissao: 'pediatra',
    registro: 'CRM-SP 123456',
  },
];

export const LoginForm = () => {
  const router = useRouter(); // CORREÇÃO: Mover para dentro do componente
  const [loginStep, setLoginStep] = useState<'login' | 'dashboard'>('login');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [formData, setFormData] = useState({ email: '', senha: '' });
  const [formErrors, setFormErrors] = useState<{ email?: string; senha?: string }>({});
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Validação dos campos
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const errors: typeof formErrors = {};

    if (!formData.email) errors.email = 'Email é obrigatório';
    else if (!validateEmail(formData.email)) errors.email = 'Email inválido';

    if (!formData.senha) errors.senha = 'Senha é obrigatória';
    else if (formData.senha.length < 6) errors.senha = 'Senha muito curta';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Simulação de autenticação
  const authenticateUser = async (email: string, senha: string) => {
    setIsLoading(true);
    setLoginError('');
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(u => u.email === email && u.senha === senha);

    if (user) {
      setCurrentUser(user);
      setLoginStep('dashboard');
    } else {
      setLoginError('Email ou senha incorretos');
    }

    setIsLoading(false);
  };

  const handleInputChange = (field: 'email' | 'senha', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await authenticateUser(formData.email, formData.senha);
    }
  };

  const handleLogout = () => {
    setLoginStep('login');
    setCurrentUser(null);
    setFormData({ email: '', senha: '' });
    setFormErrors({});
    setLoginError('');
  };

  // Dashboard pós login
  const Dashboard = ({ user }: { user: any }) => {
    const isMaeSolo = user.tipo === 'mae_solo';
    const themeColor = '#4B6043';
    const icon = isMaeSolo ? '👩‍👧‍👦' : '🩺';

    return (
      <div className="min-h-screen" style={{ backgroundColor: '#F9F4ED' }}>
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: '#A3B18A20' }}>
                  {icon}
                </div>
                <div>
                  <h1 className="text-xl font-bold" style={{ color: themeColor }}>
                    Bem-vinda, {user.nome}!
                  </h1>
                  <p className="text-gray-600">
                    {isMaeSolo ? 'Mãe Solo' : 'Profissional'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Sair
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4" style={{ color: themeColor }}>
              Informações da Conta
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: themeColor }}>
                  Email
                </label>
                <p className="text-gray-900 p-3 rounded-lg" style={{ backgroundColor: '#F9F4ED' }}>
                  {user.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: themeColor }}>
                  Tipo de Conta
                </label>
                <p className="text-gray-900 p-3 rounded-lg" style={{ backgroundColor: '#F9F4ED' }}>
                  {isMaeSolo ? 'Mãe Solo' : 'Profissional'}
                </p>
              </div>
              {isMaeSolo ? (
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: themeColor }}>
                    Situação de Trabalho
                  </label>
                  <p className="text-gray-900 p-3 rounded-lg" style={{ backgroundColor: '#F9F4ED' }}>
                    {user.situacaoTrabalho}
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: themeColor }}>
                      Profissão
                    </label>
                    <p className="text-gray-900 p-3 rounded-lg" style={{ backgroundColor: '#F9F4ED' }}>
                      {user.profissao}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: themeColor }}>
                      Registro Profissional
                    </label>
                    <p className="text-gray-900 p-3 rounded-lg" style={{ backgroundColor: '#F9F4ED' }}>
                      {user.registro}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Tela de login
  if (loginStep === 'login') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F9F4ED' }}>
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#A3B18A20' }}>
                <span className="text-3xl">🔐</span>
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#4B6043' }}>
                Entrar na sua conta
              </h2>
              <p className="text-gray-600">Bem-vindo de volta! Faça login para acessar sua conta</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium" style={{ color: '#4B6043' }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Digite seu email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full p-4 border-2 rounded-xl text-base outline-none transition-all duration-200 ${
                    formErrors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
                  }`}
                  style={{
                    borderColor: formErrors.email ? '#ef4444' : '#e5e7eb',
                    backgroundColor: formErrors.email ? '#fef2f2' : '#ffffff' // INVERTIDO: Estado inicial branco
                  }}
                  // Handlers para mudança de cor no focus/blur (cores invertidas)
                  onFocus={(e) => {
                    if (!formErrors.email) {
                      e.target.style.borderColor = '#4B6043';
                      e.target.style.backgroundColor = '#F9F4ED'; // INVERTIDO: Focus com fundo bege
                    }
                  }}
                  onBlur={(e) => {
                    if (!formErrors.email) {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.backgroundColor = '#ffffff'; // INVERTIDO: Blur com fundo branco
                    }
                  }}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium" style={{ color: '#4B6043' }}>
                  Senha
                </label>
                <input
                  type="password"
                  required
                  placeholder="Digite sua senha"
                  value={formData.senha}
                  onChange={(e) => handleInputChange('senha', e.target.value)}
                  className={`w-full p-4 border-2 rounded-xl text-base outline-none transition-all duration-200 ${
                    formErrors.senha ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
                  }`}
                  style={{
                    borderColor: formErrors.senha ? '#ef4444' : '#e5e7eb',
                    backgroundColor: formErrors.senha ? '#fef2f2' : '#ffffff' // INVERTIDO: Estado inicial branco
                  }}
                  // Handlers para mudança de cor no focus/blur (cores invertidas)
                  onFocus={(e) => {
                    if (!formErrors.senha) {
                      e.target.style.borderColor = '#4B6043';
                      e.target.style.backgroundColor = '#F9F4ED'; // INVERTIDO: Focus com fundo bege
                    }
                  }}
                  onBlur={(e) => {
                    if (!formErrors.senha) {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.backgroundColor = '#ffffff'; // INVERTIDO: Blur com fundo branco
                    }
                  }}
                />
                {formErrors.senha && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.senha}</p>
                )}
              </div>

              {loginError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm">{loginError}</p>
                </div>
              )}

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-base transition-all duration-200 flex items-center justify-center gap-3 shadow-lg ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed transform scale-95'
                      : 'transform hover:scale-105 hover:shadow-xl active:scale-95'
                  }`}
                  style={{
                    backgroundColor: isLoading ? '#9ca3af' : '#4B6043',
                    boxShadow: isLoading ? 'none' : '0 4px 6px rgba(75, 96, 67, 0.2)',
                  }}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Entrando...
                    </>
                  ) : (
                    <>
                      <span>🔐</span>
                      Entrar
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Não tem uma conta?{' '}
                <button
  type="button"
  onClick={() => router.push('/')} // Volta para a página inicial (cadastro)
  className="font-semibold ml-1 hover:underline transition-colors"
  style={{ color: '#4B6043' }}
>
  Cadastre-se
</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <Dashboard user={currentUser} />;
};

export default LoginForm;