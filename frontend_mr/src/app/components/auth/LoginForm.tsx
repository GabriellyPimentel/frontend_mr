'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { schemaLogin } from '../../lib/validations/schemas';
import { LoginData, User } from '../../types';
import { login } from '../../services/api';
import { CampoComErro } from '../ui/CampoComErro';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const LoginForm = () => {
  const router = useRouter();
  const [loginStep, setLoginStep] = useState<'login' | 'dashboard'>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
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
      
      // 🔄 Login real com a API
      const user = await login(data.cpf, data.senha);
      
      // Criar objeto user padronizado
      const userData: User = {
        id: user.id,
        cpf: data.cpf,
        nome: user.nome || 'Usuário',
        email: user.email,
        telefone: user.telefone,
        tipo: user.MaeSolo ? 'mae_solo' : 'profissional',
        endereco: user.MaeSolo?.endereco,
        situacaoTrabalho: user.MaeSolo?.situacaoTrabalho ? 'Empregada' : 'Desempregada',
        areaAtuacao: user.ProfissionalApoio?.areaAtuacao,
        dataNascimento: user.MaeSolo?.data_nascimento,
        rendaMensal: user.MaeSolo?.rendaMensal,
        escolaridade: user.MaeSolo?.escolaridade
      };
      
      setCurrentUser(userData);
      setLoginStep('dashboard');
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

  // Variantes de animação
  const pageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.05 }
  } as const;

  const pageTransition = {
    type: "tween" as const,
    ease: "anticipate" as const,
    duration: 0.6
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  } as const;

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(75, 96, 67, 0.3)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  } as const;

    const errorVariants = {
      hidden: { opacity: 0, y: -10, scale: 0.95 },
      visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
          type: "spring" as const, 
          stiffness: 500, 
          damping: 30 
        }
      }
    };

  // Dashboard pós login
  const Dashboard = ({ user }: { user: User }) => {
    const isMaeSolo = user.tipo === 'mae_solo';
    const themeColor = isMaeSolo ? '#4B6043' : '#B17853';
    const icon = isMaeSolo ? '👩‍👧‍👦' : '🩺';

    const dashboardVariants = {
      initial: { opacity: 0, y: 50 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.6,
          staggerChildren: 0.1,
          delayChildren: 0.2
        }
      }
    } as const;

    const cardVariants = {
      initial: { opacity: 0, y: 30, scale: 0.95 },
      animate: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { duration: 0.5 }
      }
    } as const;

    return (
      <motion.div 
        className="min-h-screen" 
        style={{ backgroundColor: '#F9F4ED' }}
        variants={dashboardVariants}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-2xl mx-auto p-6">
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6 mb-6"
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" 
                  style={{ backgroundColor: '#A3B18A20' }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {icon}
                </motion.div>
                <div>
                  <motion.h1 
                    className="text-xl font-bold" 
                    style={{ color: themeColor }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Bem-vindo(a), {user.nome.split(' ')[0]}!
                  </motion.h1>
                  <motion.p 
                    className="text-gray-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {isMaeSolo ? 'Mãe Solo' : 'Profissional'}
                  </motion.p>
                </div>
              </div>
              <motion.button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sair
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6"
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
          >
            <motion.h2 
              className="text-lg font-semibold mb-4" 
              style={{ color: themeColor }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Informações da Conta
            </motion.h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={containerVariants}
            >
              {/* Informações básicas */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium mb-1" style={{ color: themeColor }}>
                  CPF
                </label>
                <p className="text-gray-900 p-3 rounded-lg" style={{ backgroundColor: '#F9F4ED' }}>
                  {user.cpf}
                </p>
              </motion.div>
              
              {user.email && (
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium mb-1" style={{ color: themeColor }}>
                    Email
                  </label>
                  <p className="text-gray-900 p-3 rounded-lg" style={{ backgroundColor: '#F9F4ED' }}>
                    {user.email}
                  </p>
                </motion.div>
              )}
              
              {user.telefone && (
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium mb-1" style={{ color: themeColor }}>
                    Telefone
                  </label>
                  <p className="text-gray-900 p-3 rounded-lg" style={{ backgroundColor: '#F9F4ED' }}>
                    {user.telefone}
                  </p>
                </motion.div>
              )}
              
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium mb-1" style={{ color: themeColor }}>
                  Tipo de Conta
                </label>
                <p className="text-gray-900 p-3 rounded-lg" style={{ backgroundColor: '#F9F4ED' }}>
                  {isMaeSolo ? 'Mãe Solo' : 'Profissional'}
                </p>
              </motion.div>

              {/* Informações específicas */}
              {isMaeSolo ? (
                <>
                  {user.endereco && (
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium mb-1" style={{ color: themeColor }}>
                        Endereço
                      </label>
                      <p className="text-gray-900 p-3 rounded-lg" style={{ backgroundColor: '#F9F4ED' }}>
                        {user.endereco}
                      </p>
                    </motion.div>
                  )}
                  {user.situacaoTrabalho && (
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium mb-1" style={{ color: themeColor }}>
                        Situação de Trabalho
                      </label>
                      <p className="text-gray-900 p-3 rounded-lg" style={{ backgroundColor: '#F9F4ED' }}>
                        {user.situacaoTrabalho}
                      </p>
                    </motion.div>
                  )}
                  {user.rendaMensal && (
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium mb-1" style={{ color: themeColor }}>
                        Renda Mensal
                      </label>
                      <p className="text-gray-900 p-3 rounded-lg" style={{ backgroundColor: '#F9F4ED' }}>
                        R$ {user.rendaMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </motion.div>
                  )}
                  {user.escolaridade && (
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium mb-1" style={{ color: themeColor }}>
                        Escolaridade
                      </label>
                      <p className="text-gray-900 p-3 rounded-lg" style={{ backgroundColor: '#F9F4ED' }}>
                        {user.escolaridade}
                      </p>
                    </motion.div>
                  )}
                </>
              ) : (
                <>
                  {user.areaAtuacao && (
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium mb-1" style={{ color: themeColor }}>
                        Área de Atuação
                      </label>
                      <p className="text-gray-900 p-3 rounded-lg" style={{ backgroundColor: '#F9F4ED' }}>
                        {user.areaAtuacao}
                      </p>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  // Tela de login
  if (loginStep === 'login') {
    return (
      <motion.div 
        className="min-h-screen flex items-center justify-center p-4" 
        style={{ backgroundColor: '#F9F4ED' }}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <motion.div 
          className="max-w-md w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-8"
            whileHover={{ y: -5, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
            transition={{ duration: 0.3 }}
          >
            <motion.div className="mb-8 text-center" variants={itemVariants}>
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" 
                style={{ backgroundColor: '#A3B18A20' }}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-3xl">🔐</span>
              </motion.div>
              <motion.h2 
                className="text-2xl font-bold mb-2" 
                style={{ color: '#4B6043' }}
                variants={itemVariants}
              >
                Entrar na sua conta
              </motion.h2>
              <motion.p 
                className="text-gray-600"
                variants={itemVariants}
              >
                Digite seu CPF e senha para acessar
              </motion.p>
            </motion.div>

            <motion.form 
              onSubmit={handleSubmit(onSubmit)} 
              className="space-y-6"
              variants={containerVariants}
            >
              <motion.div className="space-y-2" variants={itemVariants}>
                <label className="block text-sm font-medium" style={{ color: '#4B6043' }}>
                  CPF
                </label>
                <CampoComErro error={errors.cpf?.message}>
                  <motion.input
                    type="text"
                    placeholder="000.000.000-00"
                    maxLength={14}
                    {...register('cpf')}
                    onChange={(e) => {
                      const formatted = formatCPF(e.target.value);
                      e.target.value = formatted;
                      setValue('cpf', formatted);
                    }}
                    className={`w-full p-4 border-2 rounded-xl text-base outline-none transition-all duration-200 ${
                      errors.cpf ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
                    }`}
                    whileFocus={{ scale: 1.02, borderColor: '#4B6043' }}
                    whileHover={{ borderColor: '#A3B18A' }}
                  />
                </CampoComErro>
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <label className="block text-sm font-medium" style={{ color: '#4B6043' }}>
                  Senha
                </label>
                <CampoComErro error={errors.senha?.message}>
                  <motion.input
                    type="password"
                    placeholder="Digite sua senha"
                    {...register('senha')}
                    className={`w-full p-4 border-2 rounded-xl text-base outline-none transition-all duration-200 ${
                      errors.senha ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
                    }`}
                    whileFocus={{ scale: 1.02, borderColor: '#4B6043' }}
                    whileHover={{ borderColor: '#A3B18A' }}
                  />
                </CampoComErro>
              </motion.div>

              <AnimatePresence>
                {loginError && (
                  <motion.div 
                    className="bg-red-50 border border-red-200 rounded-lg p-4"
                    variants={errorVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <p className="text-red-600 text-sm">{loginError}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div className="pt-6" variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-base transition-all duration-200 flex items-center justify-center gap-3 shadow-lg ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : ''
                  }`}
                  style={{
                    backgroundColor: isSubmitting ? '#9ca3af' : '#4B6043',
                    boxShadow: isSubmitting ? 'none' : '0 4px 6px rgba(75, 96, 67, 0.2)',
                  }}
                  variants={buttonVariants}
                  initial="idle"
                  whileHover={!isSubmitting ? "hover" : "idle"}
                  whileTap={!isSubmitting ? "tap" : "idle"}
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner />
                      Entrando...
                    </>
                  ) : (
                    <>
                      <motion.span
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                      >
                        🔐
                      </motion.span>
                      Entrar
                    </>
                  )}
                </motion.button>
              </motion.div>
            </motion.form>

            <motion.div 
              className="mt-8 text-center"
              variants={itemVariants}
            >
              <p className="text-gray-600 mb-4">
                Não tem uma conta?{' '}
                <motion.button
                  type="button"
                  onClick={() => router.push('/')}
                  className="font-semibold ml-1 hover:underline transition-colors"
                  style={{ color: '#4B6043' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cadastre-se
                </motion.button>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  if (!currentUser) return null;
  return <Dashboard user={currentUser} />;
};

export default LoginForm;