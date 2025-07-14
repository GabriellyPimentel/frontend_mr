'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaProfissional } from '../../lib/validations/schemas';
import { ProfissionalData } from '../../types';
import { CampoComErro } from '../ui/CampoComErro';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { cadastrarProfissional } from '../../services/api';

// Interface que define as propriedades que o componente recebe
interface FormularioProfissionalProps {
  onSuccess: () => void; // Função callback executada após cadastro bem-sucedido
}

/**
 * Componente de formulário para cadastro de profissionais da saúde/assistência
 * 
 * Funcionalidades principais:
 * - Validação com Zod + React Hook Form
 * - Campos específicos para profissionais (registro profissional, profissão)
 * - Estados de loading e feedback visual
 * - Design com tema âmbar (#B17853) para diferenciação
 * - Integração com API de cadastro de profissionais
 */
export const FormularioProfissional: React.FC<FormularioProfissionalProps> = ({ onSuccess }) => {
  // Configuração do React Hook Form com validação específica para profissionais
  const {
    register, // Função para registrar inputs no formulário
    handleSubmit, // Função para lidar com submissão do formulário
    formState: { errors, isSubmitting }, // Estado do formulário (erros e loading)
    reset // Função para resetar o formulário após sucesso
  } = useForm<ProfissionalData>({
    resolver: zodResolver(schemaProfissional) // Schema de validação específico para profissionais
  });

  /**
   * Função executada ao submeter o formulário
   * - Chama a API específica para cadastro de profissionais
   * - Em caso de sucesso: executa callback e reseta formulário
   * - Em caso de erro: loga no console (implementar toast/modal no futuro)
   */
  const onSubmit = async (data: ProfissionalData) => {
    try {
      await cadastrarProfissional(data); // Chama API específica para profissionais
      onSuccess(); // Executa callback de sucesso
      reset(); // Limpa todos os campos do formulário
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      // TODO: Implementar feedback de erro específico para profissionais
    }
  };

  return (
    <div>
      {/* Cabeçalho do formulário com tema profissional */}
      <div className="mb-8 text-center">
        {/* Ícone circular com fundo âmbar (tema profissional) */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 mb-4" style={{backgroundColor: '#B1785320'}}>
          <span className="text-3xl">🩺</span> {/* Ícone médico/profissional */}
        </div>
        
        {/* Título específico para profissionais */}
        <h2 className="text-2xl font-bold mb-2" style={{color: '#B17853'}}>
          Cadastro de Profissional
        </h2>
        
        {/* Subtítulo explicativo */}
        <p className="text-gray-600">Preencha os dados para criar sua conta profissional</p>
      </div>
      
      {/* Formulário principal */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* CAMPO: Nome Completo */}
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{color: '#B17853'}}>
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
                  : 'border-gray-200 focus:border-amber-400 bg-white hover:border-gray-300' // Estilo normal com tema âmbar
              }`}
              style={{
                borderColor: errors.nome ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.nome ? '#fef2f2' : '#ffffff' // INVERTIDO: Estado inicial branco
              }}
              // Handlers para mudança de cor no focus/blur (cores invertidas)
              onFocus={(e) => {
                if (!errors.nome) {
                  e.target.style.borderColor = '#B17853';
                  e.target.style.backgroundColor = '#F9F4ED'; // INVERTIDO: Focus com fundo bege
                }
              }}
              onBlur={(e) => {
                if (!errors.nome) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#ffffff'; // INVERTIDO: Blur com fundo branco
                }
              }}
            />
          </CampoComErro>
        </div>
        
        {/* CAMPO: Email Profissional */}
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{color: '#B17853'}}>
            Email
          </label>
          <CampoComErro error={errors.email?.message}>
            <input
              type="email" // Tipo email para validação HTML5
              placeholder="Digite seu email profissional" // Placeholder específico para profissionais
              {...register('email')}
              className={`w-full p-4 border-2 rounded-xl text-base outline-none transition-all duration-200 ${
                errors.email 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-amber-400 bg-white hover:border-gray-300'
              }`}
              style={{
                borderColor: errors.email ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.email ? '#fef2f2' : '#ffffff' // INVERTIDO: Estado inicial branco
              }}
              onFocus={(e) => {
                if (!errors.email) {
                  e.target.style.borderColor = '#B17853';
                  e.target.style.backgroundColor = '#F9F4ED'; // INVERTIDO: Focus com fundo bege
                }
              }}
              onBlur={(e) => {
                if (!errors.email) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#ffffff'; // INVERTIDO: Blur com fundo branco
                }
              }}
            />
          </CampoComErro>
        </div>
        
        {/* CAMPO: Senha */}
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{color: '#B17853'}}>
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
                  : 'border-gray-200 focus:border-amber-400 bg-white hover:border-gray-300'
              }`}
              style={{
                borderColor: errors.senha ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.senha ? '#fef2f2' : '#ffffff' // INVERTIDO: Estado inicial branco
              }}
              onFocus={(e) => {
                if (!errors.senha) {
                  e.target.style.borderColor = '#B17853';
                  e.target.style.backgroundColor = '#F9F4ED'; // INVERTIDO: Focus com fundo bege
                }
              }}
              onBlur={(e) => {
                if (!errors.senha) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#ffffff'; // INVERTIDO: Blur com fundo branco
                }
              }}
            />
          </CampoComErro>
        </div>
        
        {/* CAMPO: Telefone */}
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{color: '#B17853'}}>
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
                  : 'border-gray-200 focus:border-amber-400 bg-white hover:border-gray-300'
              }`}
              style={{
                borderColor: errors.telefone ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.telefone ? '#fef2f2' : '#ffffff' // INVERTIDO: Estado inicial branco
              }}
              onFocus={(e) => {
                if (!errors.telefone) {
                  e.target.style.borderColor = '#B17853';
                  e.target.style.backgroundColor = '#F9F4ED'; // INVERTIDO: Focus com fundo bege
                }
              }}
              onBlur={(e) => {
                if (!errors.telefone) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#ffffff'; // INVERTIDO: Blur com fundo branco
                }
              }}
            />
          </CampoComErro>
        </div>
        
        {/* CAMPO: Profissão - SELECT (Específico para profissionais) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{color: '#B17853'}}>
            Profissão
          </label>
          <CampoComErro error={errors.profissao?.message}>
            <select
              {...register('profissao')}
              className={`w-full p-4 border-2 rounded-xl text-base outline-none transition-all duration-200 ${
                errors.profissao 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-amber-400 bg-white hover:border-gray-300'
              }`}
              style={{
                borderColor: errors.profissao ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.profissao ? '#fef2f2' : '#ffffff' // INVERTIDO: Estado inicial branco
              }}
              onFocus={(e) => {
                if (!errors.profissao) {
                  e.target.style.borderColor = '#B17853';
                  e.target.style.backgroundColor = '#F9F4ED'; // INVERTIDO: Focus com fundo bege
                }
              }}
              onBlur={(e) => {
                if (!errors.profissao) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#ffffff'; // INVERTIDO: Blur com fundo branco
                }
              }}
            >
              <option value="">Selecione sua profissão</option>
              <option value="psicologia">Psicólogo(a)</option>
              <option value="assistente_social">Assistente Social</option>
              <option value="pediatra">Pediatra</option>
              <option value="advogado">Advogado(a)</option>
              <option value="nutricionista">Nutricionista</option>
              <option value="outro">Outro</option>
            </select>
          </CampoComErro>
        </div>
        
        {/* CAMPO: Registro Profissional (Campo único para profissionais) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{color: '#B17853'}}>
            Registro Profissional
          </label>
          <CampoComErro error={errors.registro?.message}>
            <input
              type="text"
              placeholder="CRP, CRESS, CRM, OAB, etc." // Exemplos de registros profissionais
              {...register('registro')}
              className={`w-full p-4 border-2 rounded-xl text-base outline-none transition-all duration-200 ${
                errors.registro 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-amber-400 bg-white hover:border-gray-300'
              }`}
              style={{
                borderColor: errors.registro ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.registro ? '#fef2f2' : '#ffffff' // INVERTIDO: Estado inicial branco
              }}
              onFocus={(e) => {
                if (!errors.registro) {
                  e.target.style.borderColor = '#B17853';
                  e.target.style.backgroundColor = '#F9F4ED'; // INVERTIDO: Focus com fundo bege
                }
              }}
              onBlur={(e) => {
                if (!errors.registro) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#ffffff'; // INVERTIDO: Blur com fundo branco
                }
              }}
            />
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
              backgroundColor: isSubmitting ? '#9ca3af' : '#B17853', // Cor âmbar para profissionais
              boxShadow: isSubmitting ? 'none' : '0 4px 6px rgba(177, 120, 83, 0.2)' // Sombra âmbar
            }}
            // Efeitos hover para mudança de cor (tom mais escuro do âmbar)
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = '#9d6545';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = '#B17853';
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
                <span>🩺</span>
                Cadastrar como Profissional
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};