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
  const [loginError, setLoginError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
      
      console.log('✅ Login realizado:', user);
      
      // 🎯 Redirecionamento baseado no tipo de usuário
      if (user.tipo === 'mae_solo') {
        console.log('🔄 Redirecionando para página da Mãe Solo...');
        router.push('/mae-dashboard');
      } else if (user.tipo === 'profissional') {
        console.log('🔄 Redirecionando para página do Profissional...');
        router.push('/profissional-dashboard');
      } else {
        console.error('❌ Tipo de usuário não reconhecido:', user.tipo);
        setLoginError('Tipo de usuário não reconhecido');
      }
      
    } catch (error: any) {
      console.error('❌ Erro no login:', error);
      setLoginError(error.message || 'Erro ao fazer login');
    }
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
};

export default LoginForm;