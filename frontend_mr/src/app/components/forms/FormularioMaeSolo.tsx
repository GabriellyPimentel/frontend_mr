'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { schemaMaeSolo } from '../../lib/validations/schemas';
import { MaeSoloData } from '../../types';
import { CampoComErro } from '../ui/CampoComErro';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { cadastrarMaeSolo } from '../../services/api';

interface FormularioMaeSoloProps {
  onSuccess: () => void;
}

export const FormularioMaeSolo: React.FC<FormularioMaeSoloProps> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm<MaeSoloData>({
    resolver: zodResolver(schemaMaeSolo)
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

  const onSubmit = async (data: MaeSoloData) => {
    try {
      await cadastrarMaeSolo(data);
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
      boxShadow: "0 10px 25px rgba(75, 96, 67, 0.3)",
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
      {/* Cabeçalho do formulário com ícone e título */}
      <motion.div 
        className="mb-4 text-center"
        variants={headerVariants}
      >
        <motion.div 
          className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 shadow-lg"
          style={{backgroundColor: '#A3B18A'}}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xl">👩‍👧‍👦</span>
        </motion.div>
        
        <motion.h2 
          className="text-xl font-bold mb-1"
          style={{color: '#4B6043'}}
          variants={itemVariants}
        >
          Cadastro de Mãe Solo
        </motion.h2>
        
        <motion.p 
          className="text-gray-600 text-sm"
          variants={itemVariants}
        >
          Preencha os dados para criar sua conta
        </motion.p>
      </motion.div>

      <motion.form 
        onSubmit={handleSubmit(onSubmit)} 
        className="space-y-4"
        variants={containerVariants}
      >
        
        {/* CAMPO: Nome Completo */}
        <motion.div className="space-y-1" variants={itemVariants}>
          <label className="block text-xs font-medium" style={{color: '#4B6043'}}>
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
                  : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
              }`}
              whileFocus={{ scale: 1.02, borderColor: '#4B6043' }}
              whileHover={{ borderColor: '#A3B18A' }}
            />
          </CampoComErro>
        </motion.div>

        {/* CAMPO: CPF */}
        <motion.div className="space-y-1" variants={itemVariants}>
          <label className="block text-xs font-medium" style={{color: '#4B6043'}}>
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
                  : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
              }`}
              whileFocus={{ scale: 1.02, borderColor: '#4B6043' }}
              whileHover={{ borderColor: '#A3B18A' }}
            />
          </CampoComErro>
        </motion.div>

        {/* CAMPO: Email */}
        <motion.div className="space-y-1" variants={itemVariants}>
          <label className="block text-xs font-medium" style={{color: '#4B6043'}}>
            Email
          </label>
          <CampoComErro error={errors.email?.message}>
            <motion.input
              type="email"
              placeholder="Digite seu email"
              {...register('email')}
              className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all duration-200 ${
                errors.email 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
              }`}
              whileFocus={{ scale: 1.02, borderColor: '#4B6043' }}
              whileHover={{ borderColor: '#A3B18A' }}
            />
          </CampoComErro>
        </motion.div>

        {/* CAMPO: Senha */}
        <motion.div className="space-y-1" variants={itemVariants}>
          <label className="block text-xs font-medium" style={{color: '#4B6043'}}>
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
                  : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
              }`}
              whileFocus={{ scale: 1.02, borderColor: '#4B6043' }}
              whileHover={{ borderColor: '#A3B18A' }}
            />
          </CampoComErro>
        </motion.div>

        {/* GRID: Telefone e Data de Nascimento */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={itemVariants}
        >
          {/* CAMPO: Telefone */}
          <div className="space-y-1">
            <label className="block text-xs font-medium" style={{color: '#4B6043'}}>
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
                    : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
                }`}
                whileFocus={{ scale: 1.02, borderColor: '#4B6043' }}
                whileHover={{ borderColor: '#A3B18A' }}
              />
            </CampoComErro>
          </div>

          {/* CAMPO: Data de Nascimento */}
          <div className="space-y-1">
            <label className="block text-xs font-medium" style={{color: '#4B6043'}}>
              Data de Nascimento *
            </label>
            <CampoComErro error={errors.dataNascimento?.message}>
              <motion.input
                type="date"
                {...register('dataNascimento')}
                className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all duration-200 ${
                  errors.dataNascimento 
                    ? 'border-red-400 focus:border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
                }`}
                whileFocus={{ scale: 1.02, borderColor: '#4B6043' }}
                whileHover={{ borderColor: '#A3B18A' }}
              />
            </CampoComErro>
          </div>
        </motion.div>

        {/* CAMPO: Endereço */}
        <motion.div className="space-y-1" variants={itemVariants}>
          <label className="block text-xs font-medium" style={{color: '#4B6043'}}>
            Endereço *
          </label>
          <CampoComErro error={errors.endereco?.message}>
            <motion.input
              type="text"
              placeholder="Endereço completo"
              {...register('endereco')}
              className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all duration-200 ${
                errors.endereco 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
              }`}
              whileFocus={{ scale: 1.02, borderColor: '#4B6043' }}
              whileHover={{ borderColor: '#A3B18A' }}
            />
          </CampoComErro>
        </motion.div>

        {/* CAMPO: Renda Mensal */}
        <motion.div className="space-y-1" variants={itemVariants}>
          <label className="block text-xs font-medium" style={{color: '#4B6043'}}>
            Renda Mensal *
          </label>
          <CampoComErro error={errors.rendaMensal?.message}>
            <motion.input
              type="number"
              placeholder="R$ 0,00"
              step="0.01"
              min="0"
              {...register('rendaMensal')}
              className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all duration-200 ${
                errors.rendaMensal 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
              }`}
              whileFocus={{ scale: 1.02, borderColor: '#4B6043' }}
              whileHover={{ borderColor: '#A3B18A' }}
            />
          </CampoComErro>
        </motion.div>

        {/* GRID: Situação de Trabalho e Escolaridade */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={itemVariants}
        >
          {/* CAMPO: Situação de Trabalho - SELECT */}
          <div className="space-y-1">
            <label className="block text-xs font-medium" style={{color: '#4B6043'}}>
              Situação de Trabalho *
            </label>
            <CampoComErro error={errors.situacaoTrabalho?.message}>
              <motion.select
                {...register('situacaoTrabalho')}
                className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all duration-200 ${
                  errors.situacaoTrabalho 
                    ? 'border-red-400 focus:border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
                }`}
                whileFocus={{ scale: 1.02, borderColor: '#4B6043' }}
                whileHover={{ borderColor: '#A3B18A' }}
              >
                <option value="">Selecione sua situação</option>
                <option value="empregada_clt">Empregada (CLT)</option>
                <option value="autonoma">Autônoma</option>
                <option value="empresaria">Empresária</option>
                <option value="desempregada">Desempregada</option>
                <option value="aposentada">Aposentada</option>
                <option value="estudante">Estudante</option>
                <option value="do_lar">Do lar</option>
                <option value="outros">Outros</option>
              </motion.select>
            </CampoComErro>
          </div>

          {/* CAMPO: Escolaridade - SELECT */}
          <div className="space-y-1">
            <label className="block text-xs font-medium" style={{color: '#4B6043'}}>
              Escolaridade *
            </label>
            <CampoComErro error={errors.escolaridade?.message}>
              <motion.select
                {...register('escolaridade')}
                className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all duration-200 ${
                  errors.escolaridade 
                    ? 'border-red-400 focus:border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
                }`}
                whileFocus={{ scale: 1.02, borderColor: '#4B6043' }}
                whileHover={{ borderColor: '#A3B18A' }}
              >
                <option value="">Selecione sua escolaridade</option>
                <option value="medioIncompleto">Médio Incompleto</option>
                <option value="medioCompleto">Médio Completo</option>
                <option value="superiorIncompleto">Superior Incompleto</option>
                <option value="superiorCompleto">Superior Completo</option>
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
              backgroundColor: isSubmitting ? '#9ca3af' : '#4B6043',
              boxShadow: isSubmitting ? 'none' : '0 4px 6px rgba(75, 96, 67, 0.2)'
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
                  👩‍👧‍👦
                </motion.span>
                Cadastrar
              </>
            )}
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};