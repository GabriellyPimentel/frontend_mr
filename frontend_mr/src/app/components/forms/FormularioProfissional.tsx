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
      <h2 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
        <span>🩺</span>
        Cadastro de Profissional
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CampoComErro error={errors.nome?.message}>
          <input
            type="text"
            placeholder="Nome completo"
            {...register('nome')}
            className={`w-full p-3 border rounded-md text-base outline-none transition-colors ${
              errors.nome 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:border-green-500'
            }`}
          />
        </CampoComErro>
        
        <CampoComErro error={errors.email?.message}>
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className={`w-full p-3 border rounded-md text-base outline-none transition-colors ${
              errors.email 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:border-green-500'
            }`}
          />
        </CampoComErro>
        
        <CampoComErro error={errors.senha?.message}>
          <input
            type="password"
            placeholder="Senha (mínimo 6 caracteres)"
            {...register('senha')}
            className={`w-full p-3 border rounded-md text-base outline-none transition-colors ${
              errors.senha 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:border-green-500'
            }`}
          />
        </CampoComErro>
        
        <CampoComErro error={errors.telefone?.message}>
          <input
            type="tel"
            placeholder="Telefone (11999999999)"
            {...register('telefone')}
            className={`w-full p-3 border rounded-md text-base outline-none transition-colors ${
              errors.telefone 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:border-green-500'
            }`}
          />
        </CampoComErro>
        
        <CampoComErro error={errors.profissao?.message}>
          <select
            {...register('profissao')}
            className={`w-full p-3 border rounded-md text-base outline-none transition-colors ${
              errors.profissao 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:border-green-500'
            }`}
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
        
        <CampoComErro error={errors.registro?.message}>
          <input
            type="text"
            placeholder="Número do registro profissional (CRP, CRESS, CRM, etc.)"
            {...register('registro')}
            className={`w-full p-3 border rounded-md text-base outline-none transition-colors ${
              errors.registro 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:border-green-500'
            }`}
          />
        </CampoComErro>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 rounded-md text-white font-medium text-base transition-all flex items-center justify-center gap-3 ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
          }`}
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner />
              Cadastrando...
            </>
          ) : (
            'Cadastrar como Profissional'
          )}
        </button>
      </form>
    </div>
  );
};