'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaMaeSolo } from '../../lib/validations/schemas';
import { MaeSoloData } from '../../types';
import { CampoComErro } from '../ui/CampoComErro';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { cadastrarMaeSolo } from '../../services/api';

// Interface que define as propriedades que o componente recebe
interface FormularioMaeSoloProps {
  onSuccess: () => void; // Função callback executada após cadastro bem-sucedido
}

/**
 * Componente de formulário para cadastro de mães solo
 * 
 * Funcionalidades principais:
 * - Validação de dados com Zod + React Hook Form
 * - Estados de loading durante submissão
 * - Tratamento de erros com feedback visual
 * - Design responsivo com cores personalizadas
 * - Integração com API para cadastro
 */
export const FormularioMaeSolo: React.FC<FormularioMaeSoloProps> = ({ onSuccess }) => {
  // Configuração do React Hook Form com validação Zod
  const {
    register, // Função para registrar inputs no formulário
    handleSubmit, // Função para lidar com submissão do formulário
    formState: { errors, isSubmitting }, // Estado do formulário (erros e loading)
    reset // Função para resetar o formulário após sucesso
  } = useForm<MaeSoloData>({
    resolver: zodResolver(schemaMaeSolo) // Integração com validação Zod
  });

  /**
   * Função executada ao submeter o formulário
   * - Chama a API para cadastrar a mãe solo
   * - Em caso de sucesso: executa callback e reseta formulário
   * - Em caso de erro: loga no console (pode ser melhorado com toast/modal)
   */
  const onSubmit = async (data: MaeSoloData) => {
    try {
      await cadastrarMaeSolo(data); // Chama API de cadastro
      onSuccess(); // Executa callback de sucesso (ex: fechar modal, navegar)
      reset(); // Limpa todos os campos do formulário
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      // TODO: Implementar feedback de erro para o usuário (toast, modal, etc.)
    }
  };

  return (
    <div>
      {/* Cabeçalho do formulário com ícone e título */}
      <div className="mb-8 text-center">
        {/* Ícone circular com fundo em gradiente verde */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-green-50 mb-4" style={{backgroundColor: '#A3B18A20'}}>
          <span className="text-3xl">👩‍👧‍👦</span>
        </div>
        
        {/* Título principal */}
        <h2 className="text-2xl font-bold mb-2" style={{color: '#4B6043'}}>
          Cadastro de Mãe Solo
        </h2>
        
        {/* Subtítulo explicativo */}
        <p className="text-gray-600">Preencha os dados para criar sua conta</p>
      </div>

      {/* Formulário principal */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* CAMPO: Nome Completo */}
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{color: '#4B6043'}}>
            Nome completo
          </label>
          <CampoComErro error={errors.nome?.message}>
            <input
              type="text"
              placeholder="Digite seu nome completo"
              {...register('nome')} // Registra o campo no React Hook Form
              className={`w-full p-4 border-2 rounded-xl text-base outline-none transition-all duration-200 ${
                errors.nome 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' // Estilo de erro
                  : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300' // Estilo normal
              }`}
              style={{
                borderColor: errors.nome ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.nome ? '#fef2f2' : '#ffffff' // Inicia com branco
              }}
              // Handlers para mudança de cor no focus/blur - CORES INVERTIDAS
              onFocus={(e) => {
                if (!errors.nome) {
                  e.target.style.borderColor = '#4B6043';
                  e.target.style.backgroundColor = '#F9F4ED'; // Focus = bege
                }
              }}
              onBlur={(e) => {
                if (!errors.nome) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#ffffff'; // Blur = branco
                }
              }}
            />
          </CampoComErro>
        </div>

        {/* CAMPO: Email */}
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{color: '#4B6043'}}>
            Email
          </label>
          <CampoComErro error={errors.email?.message}>
            <input
              type="email" // Tipo email para validação HTML5
              placeholder="Digite seu email"
              {...register('email')}
              className={`w-full p-4 border-2 rounded-xl text-base outline-none transition-all duration-200 ${
                errors.email 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
              }`}
              style={{
                borderColor: errors.email ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.email ? '#fef2f2' : '#ffffff' // Inicia com branco
              }}
              onFocus={(e) => {
                if (!errors.email) {
                  e.target.style.borderColor = '#4B6043';
                  e.target.style.backgroundColor = '#F9F4ED'; // Focus = bege
                }
              }}
              onBlur={(e) => {
                if (!errors.email) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#ffffff'; // Blur = branco
                }
              }}
            />
          </CampoComErro>
        </div>

        {/* CAMPO: Senha */}
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{color: '#4B6043'}}>
            Senha
          </label>
          <CampoComErro error={errors.senha?.message}>
            <input
              type="password" // Tipo password para ocultar caracteres
              placeholder="Mínimo 6 caracteres"
              {...register('senha')}
              className={`w-full p-4 border-2 rounded-xl text-base outline-none transition-all duration-200 ${
                errors.senha 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
              }`}
              style={{
                borderColor: errors.senha ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.senha ? '#fef2f2' : '#ffffff' // Inicia com branco
              }}
              onFocus={(e) => {
                if (!errors.senha) {
                  e.target.style.borderColor = '#4B6043';
                  e.target.style.backgroundColor = '#F9F4ED'; // Focus = bege
                }
              }}
              onBlur={(e) => {
                if (!errors.senha) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#ffffff'; // Blur = branco
                }
              }}
            />
          </CampoComErro>
        </div>

        {/* CAMPO: Telefone */}
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{color: '#4B6043'}}>
            Telefone
          </label>
          <CampoComErro error={errors.telefone?.message}>
            <input
              type="tel" // Tipo tel para teclado numérico em mobile
              placeholder="(11) 99999-9999"
              {...register('telefone')}
              className={`w-full p-4 border-2 rounded-xl text-base outline-none transition-all duration-200 ${
                errors.telefone 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
              }`}
              style={{
                borderColor: errors.telefone ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.telefone ? '#fef2f2' : '#ffffff' // Inicia com branco
              }}
              onFocus={(e) => {
                if (!errors.telefone) {
                  e.target.style.borderColor = '#4B6043';
                  e.target.style.backgroundColor = '#F9F4ED'; // Focus = bege
                }
              }}
              onBlur={(e) => {
                if (!errors.telefone) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#ffffff'; // Blur = branco
                }
              }}
            />
          </CampoComErro>
        </div>

        {/* CAMPO: Endereço */}
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{color: '#4B6043'}}>
            Endereço
          </label>
          <CampoComErro error={errors.endereco?.message}>
            <input
              type="text"
              placeholder="Endereço completo"
              {...register('endereco')}
              className={`w-full p-4 border-2 rounded-xl text-base outline-none transition-all duration-200 ${
                errors.endereco 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
              }`}
              style={{
                borderColor: errors.endereco ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.endereco ? '#fef2f2' : '#ffffff' // Inicia com branco
              }}
              onFocus={(e) => {
                if (!errors.endereco) {
                  e.target.style.borderColor = '#4B6043';
                  e.target.style.backgroundColor = '#F9F4ED'; // Focus = bege
                }
              }}
              onBlur={(e) => {
                if (!errors.endereco) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#ffffff'; // Blur = branco
                }
              }}
            />
          </CampoComErro>
        </div>

        {/* CAMPO: Renda Mensal */}
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{color: '#4B6043'}}>
            Renda Mensal
          </label>
          <CampoComErro error={errors.rendaMensal?.message}>
            <input
              type="number" // Tipo number para valores numéricos
              placeholder="R$ 0,00"
              step="0.01" // Permite decimais (centavos)
              min="0" // Valor mínimo
              {...register('rendaMensal')}
              className={`w-full p-4 border-2 rounded-xl text-base outline-none transition-all duration-200 ${
                errors.rendaMensal 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
              }`}
              style={{
                borderColor: errors.rendaMensal ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.rendaMensal ? '#fef2f2' : '#ffffff' // Inicia com branco
              }}
              onFocus={(e) => {
                if (!errors.rendaMensal) {
                  e.target.style.borderColor = '#4B6043';
                  e.target.style.backgroundColor = '#F9F4ED'; // Focus = bege
                }
              }}
              onBlur={(e) => {
                if (!errors.rendaMensal) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#ffffff'; // Blur = branco
                }
              }}
            />
          </CampoComErro>
        </div>

        {/* CAMPO: Situação de Trabalho - SELECT */}
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{color: '#4B6043'}}>
            Situação de Trabalho
          </label>
          <CampoComErro error={errors.situacaoTrabalho?.message}>
            <select
              {...register('situacaoTrabalho')}
              className={`w-full p-4 border-2 rounded-xl text-base outline-none transition-all duration-200 ${
                errors.situacaoTrabalho 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
              }`}
              style={{
                borderColor: errors.situacaoTrabalho ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.situacaoTrabalho ? '#fef2f2' : '#ffffff' // Inicia com branco
              }}
              onFocus={(e) => {
                if (!errors.situacaoTrabalho) {
                  e.target.style.borderColor = '#4B6043';
                  e.target.style.backgroundColor = '#F9F4ED'; // Focus = bege
                }
              }}
              onBlur={(e) => {
                if (!errors.situacaoTrabalho) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#ffffff'; // Blur = branco
                }
              }}
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
            </select>
          </CampoComErro>
        </div>

        {/* CAMPO: Escolaridade - SELECT */}
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{color: '#4B6043'}}>
            Escolaridade
          </label>
          <CampoComErro error={errors.escolaridade?.message}>
            <select
              {...register('escolaridade')}
              className={`w-full p-4 border-2 rounded-xl text-base outline-none transition-all duration-200 ${
                errors.escolaridade 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
              }`}
              style={{
                borderColor: errors.escolaridade ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.escolaridade ? '#fef2f2' : '#ffffff' // Inicia com branco
              }}
              onFocus={(e) => {
                if (!errors.escolaridade) {
                  e.target.style.borderColor = '#4B6043';
                  e.target.style.backgroundColor = '#F9F4ED'; // Focus = bege
                }
              }}
              onBlur={(e) => {
                if (!errors.escolaridade) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#ffffff'; // Blur = branco
                }
              }}
            >
              <option value="">Selecione sua escolaridade</option>
              <option value="fundamental_incompleto">Fundamental Incompleto</option>
              <option value="fundamental_completo">Fundamental Completo</option>
              <option value="medio_incompleto">Médio Incompleto</option>
              <option value="medio_completo">Médio Completo</option>
              <option value="superior_incompleto">Superior Incompleto</option>
              <option value="superior_completo">Superior Completo</option>
              <option value="pos_graduacao">Pós-graduação</option>
            </select>
          </CampoComErro>
        </div>

        {/* BOTÃO DE ENVIO */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting} // Desabilita durante loading
            className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-base transition-all duration-200 flex items-center justify-center gap-3 shadow-lg ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed transform scale-95' // Estado de loading
                : 'transform hover:scale-105 hover:shadow-xl active:scale-95' // Estado normal
            }`}
            style={{
              backgroundColor: isSubmitting ? '#9ca3af' : '#4B6043',
              boxShadow: isSubmitting ? 'none' : '0 4px 6px rgba(75, 96, 67, 0.2)'
            }}
            // Efeitos hover para mudança de cor
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = '#3d4e37';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = '#4B6043';
              }
            }}
          >
            {/* Conteúdo do botão muda baseado no estado de loading */}
            {isSubmitting ? (
              <>
                <LoadingSpinner />
                Cadastrando...
              </>
            ) : (
              <>
                <span>👩‍👧‍👦</span>
                Cadastrar
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};