'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
    reset
  } = useForm<ProfissionalData>({
    resolver: zodResolver(schemaProfissional)
  });

  const onSubmit = async (data: ProfissionalData) => {
    try {
      await cadastrarProfissional(data);
      onSuccess();
      reset();
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 mb-4" style={{backgroundColor: '#B1785320'}}>
          <span className="text-3xl">🩺</span>
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{color: '#B17853'}}>
          Cadastro de Profissional
        </h2>
        <p className="text-gray-600">Preencha os dados para criar sua conta profissional</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nome */}
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{color: '#B17853'}}>
            Nome completo
          </label>
          <CampoComErro error={errors.nome?.message}>
            <input
              type="text"
              placeholder="Digite seu nome completo"
              {...register('nome')}
              className={`w-full p-4 border-2 rounded-xl text-base outline-none transition-all duration-200 ${
                errors.nome 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-amber-400 bg-white hover:border-gray-300'
              }`}
              style={{
                borderColor: errors.nome ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.nome ? '#fef2f2' : '#F9F4ED'
              }}
              onFocus={(e) => {
                if (!errors.nome) {
                  e.target.style.borderColor = '#B17853';
                  e.target.style.backgroundColor = '#ffffff';
                }
              }}
              onBlur={(e) => {
                if (!errors.nome) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#F9F4ED';
                }
              }}
            />
          </CampoComErro>
        </div>
        
        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{color: '#B17853'}}>
            Email
          </label>
          <CampoComErro error={errors.email?.message}>
            <input
              type="email"
              placeholder="Digite seu email profissional"
              {...register('email')}
              className={`w-full p-4 border-2 rounded-xl text-base outline-none transition-all duration-200 ${
                errors.email 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-amber-400 bg-white hover:border-gray-300'
              }`}
              style={{
                borderColor: errors.email ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.email ? '#fef2f2' : '#F9F4ED'
              }}
              onFocus={(e) => {
                if (!errors.email) {
                  e.target.style.borderColor = '#B17853';
                  e.target.style.backgroundColor = '#ffffff';
                }
              }}
              onBlur={(e) => {
                if (!errors.email) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#F9F4ED';
                }
              }}
            />
          </CampoComErro>
        </div>
        
        {/* Senha */}
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{color: '#B17853'}}>
            Senha
          </label>
          <CampoComErro error={errors.senha?.message}>
            <input
              type="password"
              placeholder="Mínimo 6 caracteres"
              {...register('senha')}
              className={`w-full p-4 border-2 rounded-xl text-base outline-none transition-all duration-200 ${
                errors.senha 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-amber-400 bg-white hover:border-gray-300'
              }`}
              style={{
                borderColor: errors.senha ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.senha ? '#fef2f2' : '#F9F4ED'
              }}
              onFocus={(e) => {
                if (!errors.senha) {
                  e.target.style.borderColor = '#B17853';
                  e.target.style.backgroundColor = '#ffffff';
                }
              }}
              onBlur={(e) => {
                if (!errors.senha) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#F9F4ED';
                }
              }}
            />
          </CampoComErro>
        </div>
        
        {/* Telefone */}
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{color: '#B17853'}}>
            Telefone
          </label>
          <CampoComErro error={errors.telefone?.message}>
            <input
              type="tel"
              placeholder="(11) 99999-9999"
              {...register('telefone')}
              className={`w-full p-4 border-2 rounded-xl text-base outline-none transition-all duration-200 ${
                errors.telefone 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-amber-400 bg-white hover:border-gray-300'
              }`}
              style={{
                borderColor: errors.telefone ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.telefone ? '#fef2f2' : '#F9F4ED'
              }}
              onFocus={(e) => {
                if (!errors.telefone) {
                  e.target.style.borderColor = '#B17853';
                  e.target.style.backgroundColor = '#ffffff';
                }
              }}
              onBlur={(e) => {
                if (!errors.telefone) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#F9F4ED';
                }
              }}
            />
          </CampoComErro>
        </div>
        
        {/* Profissão */}
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
                backgroundColor: errors.profissao ? '#fef2f2' : '#F9F4ED'
              }}
              onFocus={(e) => {
                if (!errors.profissao) {
                  e.target.style.borderColor = '#B17853';
                  e.target.style.backgroundColor = '#ffffff';
                }
              }}
              onBlur={(e) => {
                if (!errors.profissao) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#F9F4ED';
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
        
        {/* Registro Profissional */}
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{color: '#B17853'}}>
            Registro Profissional
          </label>
          <CampoComErro error={errors.registro?.message}>
            <input
              type="text"
              placeholder="CRP, CRESS, CRM, OAB, etc."
              {...register('registro')}
              className={`w-full p-4 border-2 rounded-xl text-base outline-none transition-all duration-200 ${
                errors.registro 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-amber-400 bg-white hover:border-gray-300'
              }`}
              style={{
                borderColor: errors.registro ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.registro ? '#fef2f2' : '#F9F4ED'
              }}
              onFocus={(e) => {
                if (!errors.registro) {
                  e.target.style.borderColor = '#B17853';
                  e.target.style.backgroundColor = '#ffffff';
                }
              }}
              onBlur={(e) => {
                if (!errors.registro) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#F9F4ED';
                }
              }}
            />
          </CampoComErro>
        </div>
        
        {/* Botão de envio */}
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
              backgroundColor: isSubmitting ? '#9ca3af' : '#B17853',
              boxShadow: isSubmitting ? 'none' : '0 4px 6px rgba(177, 120, 83, 0.2)'
            }}
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