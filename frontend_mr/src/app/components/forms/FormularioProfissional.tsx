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

  return (
    <div>
      {/* Cabeçalho do formulário com tema profissional */}
      <div className="mb-4 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 shadow-lg" style={{backgroundColor: '#B17853'}}>
          <span className="text-xl">🩺</span>
        </div>
        
        <h2 className="text-xl font-bold mb-1" style={{color: '#B17853'}}>
          Cadastro de Profissional
        </h2>
        
        <p className="text-gray-600 text-sm">Preencha os dados para criar sua conta profissional</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* CAMPO: Nome Completo */}
        <div className="space-y-1">
          <label className="block text-xs font-medium" style={{color: '#B17853'}}>
            Nome completo *
          </label>
          <CampoComErro error={errors.nome?.message}>
            <input
              type="text"
              placeholder="Digite seu nome completo"
              {...register('nome')}
              className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all duration-200 ${
                errors.nome 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-amber-400 bg-white hover:border-gray-300'
              }`}
              style={{
                borderColor: errors.nome ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.nome ? '#fef2f2' : '#ffffff'
              }}
              onFocus={(e) => {
                if (!errors.nome) {
                  (e.target as HTMLInputElement).style.borderColor = '#B17853';
                  (e.target as HTMLInputElement).style.backgroundColor = '#F9F4ED';
                }
              }}
              onBlur={(e) => {
                if (!errors.nome) {
                  (e.target as HTMLInputElement).style.borderColor = '#e5e7eb';
                  (e.target as HTMLInputElement).style.backgroundColor = '#ffffff';
                }
              }}
            />
          </CampoComErro>
        </div>

        {/* CAMPO: CPF - ADICIONADO */}
        <div className="space-y-1">
          <label className="block text-xs font-medium" style={{color: '#B17853'}}>
            CPF *
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
                setValue('cpf', formatted);
              }}
              className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all duration-200 ${
                errors.cpf 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-amber-400 bg-white hover:border-gray-300'
              }`}
              style={{
                borderColor: errors.cpf ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.cpf ? '#fef2f2' : '#ffffff'
              }}
              onFocus={(e) => {
                if (!errors.cpf) {
                  (e.target as HTMLInputElement).style.borderColor = '#B17853';
                  (e.target as HTMLInputElement).style.backgroundColor = '#F9F4ED';
                }
              }}
              onBlur={(e) => {
                if (!errors.cpf) {
                  (e.target as HTMLInputElement).style.borderColor = '#e5e7eb';
                  (e.target as HTMLInputElement).style.backgroundColor = '#ffffff';
                }
              }}
            />
          </CampoComErro>
        </div>
        
        {/* CAMPO: Email */}
        <div className="space-y-1">
          <label className="block text-xs font-medium" style={{color: '#B17853'}}>
            Email
          </label>
          <CampoComErro error={errors.email?.message}>
            <input
              type="email"
              placeholder="Digite seu email profissional"
              {...register('email')}
              className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all duration-200 ${
                errors.email 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-amber-400 bg-white hover:border-gray-300'
              }`}
              style={{
                borderColor: errors.email ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.email ? '#fef2f2' : '#ffffff'
              }}
              onFocus={(e) => {
                if (!errors.email) {
                  (e.target as HTMLInputElement).style.borderColor = '#B17853';
                  (e.target as HTMLInputElement).style.backgroundColor = '#F9F4ED';
                }
              }}
              onBlur={(e) => {
                if (!errors.email) {
                  (e.target as HTMLInputElement).style.borderColor = '#e5e7eb';
                  (e.target as HTMLInputElement).style.backgroundColor = '#ffffff';
                }
              }}
            />
          </CampoComErro>
        </div>
        
        {/* CAMPO: Senha */}
        <div className="space-y-1">
          <label className="block text-xs font-medium" style={{color: '#B17853'}}>
            Senha *
          </label>
          <CampoComErro error={errors.senha?.message}>
            <input
              type="password"
              placeholder="Mínimo 6 caracteres"
              {...register('senha')}
              className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all duration-200 ${
                errors.senha 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-amber-400 bg-white hover:border-gray-300'
              }`}
              style={{
                borderColor: errors.senha ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.senha ? '#fef2f2' : '#ffffff'
              }}
              onFocus={(e) => {
                if (!errors.senha) {
                  (e.target as HTMLInputElement).style.borderColor = '#B17853';
                  (e.target as HTMLInputElement).style.backgroundColor = '#F9F4ED';
                }
              }}
              onBlur={(e) => {
                if (!errors.senha) {
                  (e.target as HTMLInputElement).style.borderColor = '#e5e7eb';
                  (e.target as HTMLInputElement).style.backgroundColor = '#ffffff';
                }
              }}
            />
          </CampoComErro>
        </div>
        
        {/* GRID: Telefone e Profissão */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CAMPO: Telefone */}
          <div className="space-y-1">
            <label className="block text-xs font-medium" style={{color: '#B17853'}}>
              Telefone *
            </label>
            <CampoComErro error={errors.telefone?.message}>
              <input
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
                style={{
                  borderColor: errors.telefone ? '#ef4444' : '#e5e7eb',
                  backgroundColor: errors.telefone ? '#fef2f2' : '#ffffff'
                }}
                onFocus={(e) => {
                  if (!errors.telefone) {
                    (e.target as HTMLInputElement).style.borderColor = '#B17853';
                    (e.target as HTMLInputElement).style.backgroundColor = '#F9F4ED';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.telefone) {
                    (e.target as HTMLInputElement).style.borderColor = '#e5e7eb';
                    (e.target as HTMLInputElement).style.backgroundColor = '#ffffff';
                  }
                }}
              />
            </CampoComErro>
          </div>
          
          {/* CAMPO: Profissão - SELECT */}
          <div className="space-y-1">
            <label className="block text-xs font-medium" style={{color: '#B17853'}}>
              Área de Atuação *
            </label>
            <CampoComErro error={errors.areaAtuacao?.message}>
              <select
                {...register('areaAtuacao')}
                className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all duration-200 ${
                  errors.areaAtuacao 
                    ? 'border-red-400 focus:border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-amber-400 bg-white hover:border-gray-300'
                }`}
                style={{
                  borderColor: errors.areaAtuacao ? '#ef4444' : '#e5e7eb',
                  backgroundColor: errors.areaAtuacao ? '#fef2f2' : '#ffffff'
                }}
                onFocus={(e) => {
                  if (!errors.areaAtuacao) {
                    (e.target as HTMLSelectElement).style.borderColor = '#B17853';
                    (e.target as HTMLSelectElement).style.backgroundColor = '#F9F4ED';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.areaAtuacao) {
                    (e.target as HTMLSelectElement).style.borderColor = '#e5e7eb';
                    (e.target as HTMLSelectElement).style.backgroundColor = '#ffffff';
                  }
                }}
              >
                <option value="">Selecione sua área</option>
                <option value="Psicologia">Psicologia</option>
                <option value="Assistência Social">Assistência Social</option>
                <option value="Medicina">Medicina</option>
                <option value="Direito">Direito</option>
                <option value="Nutrição">Nutrição</option>
                <option value="Pedagogia">Pedagogia</option>
                <option value="Outros">Outros</option>
              </select>
            </CampoComErro>
          </div>
        </div>
        
        {/* BOTÃO DE ENVIO */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-xl text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-3 shadow-lg ${
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
                (e.target as HTMLButtonElement).style.backgroundColor = '#9d6545';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                (e.target as HTMLButtonElement).style.backgroundColor = '#B17853';
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