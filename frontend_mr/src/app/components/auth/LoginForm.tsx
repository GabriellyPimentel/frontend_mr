'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaLogin } from '../../lib/validations/schemas';
import { LoginData, User } from '../../types';
import { login } from '../../services/api';
import { CampoComErro } from '../ui/CampoComErro';
import { LoadingSpinner } from '../ui/LoadingSpinner';

// 🧪 Usuários fake para teste (usando CPF)
const mockUsers = [
  {
    id: '1',
    cpf: '12345678901',
    senha: '123456',
    tipo: 'mae_solo' as const,
    nome: 'Maria Silva',
    email: 'maria@exemplo.com',
    situacaoTrabalho: 'autonoma',
  },
  {
    id: '2',
    cpf: '98765432100',
    senha: '123456',
    tipo: 'profissional' as const,
    nome: 'Dr. João Santos',
    email: 'dr.joao@clinica.com',
    profissao: 'pediatra',
    registro: 'CRM-SP 123456',
  },
];

export const LoginForm = () => {
  const router = useRouter();
  const [loginStep, setLoginStep] = useState<'login' | 'dashboard'>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<LoginData>({
    resolver: zodResolver(schemaLogin)
  });

  // 🔄 Função para formatar CPF enquanto digita
  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const onSubmit = async (data: LoginData) => {
    try {
      setLoginError('');
      
      // 🧪 Simular login fake primeiro (remover depois)
      const cpfLimpo = data.cpf.replace(/[^\d]/g, '');
      const user = mockUsers.find(u => u.cpf === cpfLimpo && u.senha === data.senha);
      
      if (user) {
        setCurrentUser(user);
        setLoginStep('dashboard');
      } else {
        // 🔄 Tentar login real com a API (descomente quando API estiver funcionando)
        // const user = await login(data.cpf, data.senha);
        // setCurrentUser(user);
        // setLoginStep('dashboard');
        setLoginError('CPF ou senha incorretos');
      }
    } catch (error: any) {
      setLoginError(error.message || 'Erro ao fazer login');
    }
  };

  const handleLogout = () => {
    setLoginStep('login');
    setCurrentUser(null);
    reset();
    setLoginError('');
  };

  // Dashboard pós login
  const Dashboard = ({ user }: { user: User }) => {
    const isMaeSolo = user.tipo === 'mae_solo';
    const themeColor = isMaeSolo ? '#4B6043' : '#B17853';
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
                    Bem-vindo(a), {user.nome.split(' ')[0]}!
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
                  CPF
                </label>
                <p className="text-gray-900 p-3 rounded-lg" style={{ backgroundColor: '#F9F4ED' }}>
                  {user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
                </p>
              </div>
              {user.email && (
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: themeColor }}>
                    Email
                  </label>
                  <p className="text-gray-900 p-3 rounded-lg" style={{ backgroundColor: '#F9F4ED' }}>
                    {user.email}
                  </p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: themeColor }}>
                  Tipo de Conta
                </label>
                <p className="text-gray-900 p-3 rounded-lg" style={{ backgroundColor: '#F9F4ED' }}>
                  {isMaeSolo ? 'Mãe Solo' : 'Profissional'}
                </p>
              </div>
              {isMaeSolo ? (
                user.situacaoTrabalho && (
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: themeColor }}>
                      Situação de Trabalho
                    </label>
                    <p className="text-gray-900 p-3 rounded-lg" style={{ backgroundColor: '#F9F4ED' }}>
                      {user.situacaoTrabalho}
                    </p>
                  </div>
                )
              ) : (
                <>
                  {user.profissao && (
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: themeColor }}>
                        Profissão
                      </label>
                      <p className="text-gray-900 p-3 rounded-lg" style={{ backgroundColor: '#F9F4ED' }}>
                        {user.profissao}
                      </p>
                    </div>
                  )}
                  {user.registro && (
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: themeColor }}>
                        Registro Profissional
                      </label>
                      <p className="text-gray-900 p-3 rounded-lg" style={{ backgroundColor: '#F9F4ED' }}>
                        {user.registro}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* 💡 Dica para teste */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-bold text-blue-800 mb-2">💡 Para testar:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <strong>Mãe Solo:</strong> CPF: 123.456.789-01 | Senha: 123456</li>
                <li>• <strong>Profissional:</strong> CPF: 987.654.321-00 | Senha: 123456</li>
              </ul>
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
              <p className="text-gray-600">Digite seu CPF e senha para acessar</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium" style={{ color: '#4B6043' }}>
                  CPF
                </label>
                <CampoComErro error={errors.cpf?.message}>
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    maxLength={14}
                    {...register('cpf')}
                    onChange={(e) => {
                      const formatted = formatCPF(e.target.value);
                      e.target.value = formatted;
                    }}
                    className={`w-full p-4 border-2 rounded-xl text-base outline-none transition-all duration-200 ${
                      errors.cpf ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
                    }`}
                    style={{
                      borderColor: errors.cpf ? '#ef4444' : '#e5e7eb',
                      backgroundColor: errors.cpf ? '#fef2f2' : '#ffffff'
                    }}
                    onFocus={(e) => {
                      if (!errors.cpf) {
                        e.target.style.borderColor = '#4B6043';
                        e.target.style.backgroundColor = '#F9F4ED';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.cpf) {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.backgroundColor = '#ffffff';
                      }
                    }}
                  />
                </CampoComErro>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium" style={{ color: '#4B6043' }}>
                  Senha
                </label>
                <CampoComErro error={errors.senha?.message}>
                  <input
                    type="password"
                    placeholder="Digite sua senha"
                    {...register('senha')}
                    className={`w-full p-4 border-2 rounded-xl text-base outline-none transition-all duration-200 ${
                      errors.senha ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
                    }`}
                    style={{
                      borderColor: errors.senha ? '#ef4444' : '#e5e7eb',
                      backgroundColor: errors.senha ? '#fef2f2' : '#ffffff'
                    }}
                    onFocus={(e) => {
                      if (!errors.senha) {
                        e.target.style.borderColor = '#4B6043';
                        e.target.style.backgroundColor = '#F9F4ED';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.senha) {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.backgroundColor = '#ffffff';
                      }
                    }}
                  />
                </CampoComErro>
              </div>

              {loginError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm">{loginError}</p>
                </div>
              )}

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-base transition-all duration-200 flex items-center justify-center gap-3 shadow-lg ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed transform scale-95'
                      : 'transform hover:scale-105 hover:shadow-xl active:scale-95'
                  }`}
                  style={{
                    backgroundColor: isSubmitting ? '#9ca3af' : '#4B6043',
                    boxShadow: isSubmitting ? 'none' : '0 4px 6px rgba(75, 96, 67, 0.2)',
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner />
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
                  onClick={() => router.push('/')}
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

  if (!currentUser) return null;
  return <Dashboard user={currentUser} />;
};

export default LoginForm;