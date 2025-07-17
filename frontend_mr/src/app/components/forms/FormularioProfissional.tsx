'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { schemaProfissional } from '../../lib/validations/schemas';
import { ProfissionalData } from '../../types';
import { CampoComErro } from '../ui/CampoComErro';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { cadastrarProfissional } from '../../services/api';

interface FormularioProfissionalProps {
  onSuccess: () => void;
}

export const FormularioProfissional: React.FC<FormularioProfissionalProps> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm<ProfissionalData>({
    resolver: zodResolver(schemaProfissional)
  });

  // 🔄 Função para formatar CPF enquanto digita
  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  // 🔄 Função para formatar telefone enquanto digita
  const formatTelefone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const onSubmit = async (data: ProfissionalData) => {
    try {
      await cadastrarProfissional(data);
      onSuccess();
      reset();
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  };

  // Variantes de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  const headerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "backOut" as const }
    }
  } as const;

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(177, 120, 83, 0.3)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  } as const;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Cabeçalho do formulário com tema profissional */}
      <motion.div 
        className="mb-4 text-center"
        variants={headerVariants}
      >
        <motion.div 
          className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 shadow-lg"
          style={{backgroundColor: '#B17853'}}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xl">🩺</span>
        </motion.div>
        
        <motion.h2 
          className="text-xl font-bold mb-1"
          style={{color: '#B17853'}}
          variants={itemVariants}
        >
          Cadastro de Profissional
        </motion.h2>
        
        <motion.p 
          className="text-gray-600 text-sm"
          variants={itemVariants}
        >
          Preencha os dados para criar sua conta profissional
        </motion.p>
      </motion.div>
      
      <motion.form 
        onSubmit={handleSubmit(onSubmit)} 
        className="space-y-4"
        variants={containerVariants}
      >
        
        {/* CAMPO: Nome Completo */}
        <motion.div className="space-y-1" variants={itemVariants}>
          <label className="block text-xs font-medium" style={{color: '#B17853'}}>
            Nome completo *
          </label>
          <CampoComErro error={errors.nome?.message}>
            <motion.input
              type="text"
              placeholder="Digite seu nome completo"
              {...register('nome')}
              className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all duration-200 ${
                errors.nome 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-amber-400 bg-white hover:border-gray-300'
              }`}
              whileFocus={{ scale: 1.02, borderColor: '#B17853' }}
              whileHover={{ borderColor: '#D4A574' }}
            />
          </CampoComErro>
        </motion.div>

        {/* CAMPO: CPF */}
        <motion.div className="space-y-1" variants={itemVariants}>
          <label className="block text-xs font-medium" style={{color: '#B17853'}}>
            CPF *
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
              className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all duration-200 ${
                errors.cpf 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-amber-400 bg-white hover:border-gray-300'
              }`}
              whileFocus={{ scale: 1.02, borderColor: '#B17853' }}
              whileHover={{ borderColor: '#D4A574' }}
            />
          </CampoComErro>
        </motion.div>
        
        {/* CAMPO: Email */}
        <motion.div className="space-y-1" variants={itemVariants}>
          <label className="block text-xs font-medium" style={{color: '#B17853'}}>
            Email
          </label>
          <CampoComErro error={errors.email?.message}>
            <motion.input
              type="email"
              placeholder="Digite seu email profissional"
              {...register('email')}
              className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all duration-200 ${
                errors.email 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-amber-400 bg-white hover:border-gray-300'
              }`}
              whileFocus={{ scale: 1.02, borderColor: '#B17853' }}
              whileHover={{ borderColor: '#D4A574' }}
            />
          </CampoComErro>
        </motion.div>
        
        {/* CAMPO: Senha */}
        <motion.div className="space-y-1" variants={itemVariants}>
          <label className="block text-xs font-medium" style={{color: '#B17853'}}>
            Senha *
          </label>
          <CampoComErro error={errors.senha?.message}>
            <motion.input
              type="password"
              placeholder="Mínimo 6 caracteres"
              {...register('senha')}
              className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all duration-200 ${
                errors.senha 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-amber-400 bg-white hover:border-gray-300'
              }`}
              whileFocus={{ scale: 1.02, borderColor: '#B17853' }}
              whileHover={{ borderColor: '#D4A574' }}
            />
          </CampoComErro>
        </motion.div>
        
        {/* GRID: Telefone e Profissão */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={itemVariants}
        >
          {/* CAMPO: Telefone */}
          <div className="space-y-1">
            <label className="block text-xs font-medium" style={{color: '#B17853'}}>
              Telefone *
            </label>
            <CampoComErro error={errors.telefone?.message}>
              <motion.input
                type="tel"
                placeholder="(11) 99999-9999"
                maxLength={15}
                {...register('telefone')}
                onChange={(e) => {
                  const formatted = formatTelefone(e.target.value);
                  e.target.value = formatted;
                  setValue('telefone', formatted);
                }}
                className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all duration-200 ${
                  errors.telefone 
                    ? 'border-red-400 focus:border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-amber-400 bg-white hover:border-gray-300'
                }`}
                whileFocus={{ scale: 1.02, borderColor: '#B17853' }}
                whileHover={{ borderColor: '#D4A574' }}
              />
            </CampoComErro>
          </div>
          
          {/* CAMPO: Profissão - SELECT */}
          <div className="space-y-1">
            <label className="block text-xs font-medium" style={{color: '#B17853'}}>
              Área de Atuação *
            </label>
            <CampoComErro error={errors.areaAtuacao?.message}>
              <motion.select
                {...register('areaAtuacao')}
                className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all duration-200 ${
                  errors.areaAtuacao 
                    ? 'border-red-400 focus:border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-amber-400 bg-white hover:border-gray-300'
                }`}
                whileFocus={{ scale: 1.02, borderColor: '#B17853' }}
                whileHover={{ borderColor: '#D4A574' }}
              >
                <option value="">Selecione sua área</option>
                <option value="Psicologia">Psicologia</option>
                <option value="Assistência Social">Assistência Social</option>
                <option value="Medicina">Medicina</option>
                <option value="Direito">Direito</option>
                <option value="Nutrição">Nutrição</option>
                <option value="Pedagogia">Pedagogia</option>
                <option value="Outros">Outros</option>
              </motion.select>
            </CampoComErro>
          </div>
        </motion.div>
        
        {/* BOTÃO DE ENVIO */}
        <motion.div className="pt-4" variants={itemVariants}>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-xl text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-3 shadow-lg ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : ''
            }`}
            style={{
              backgroundColor: isSubmitting ? '#9ca3af' : '#B17853',
              boxShadow: isSubmitting ? 'none' : '0 4px 6px rgba(177, 120, 83, 0.2)'
            }}
            variants={buttonVariants}
            initial="idle"
            whileHover={!isSubmitting ? "hover" : "idle"}
            whileTap={!isSubmitting ? "tap" : "idle"}
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner />
                Cadastrando...
              </>
            ) : (
              <>
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  🩺
                </motion.span>
                Cadastrar como Profissional
              </>
            )}
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};