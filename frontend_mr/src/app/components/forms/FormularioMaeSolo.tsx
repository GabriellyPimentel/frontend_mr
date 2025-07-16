'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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

  return (
    <div>
      {/* Cabeçalho do formulário com ícone e título */}
      <div className="mb-4 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 shadow-lg" style={{backgroundColor: '#A3B18A'}}>
          <span className="text-xl">👩‍👧‍👦</span>
        </div>
        
        <h2 className="text-xl font-bold mb-1" style={{color: '#4B6043'}}>
          Cadastro de Mãe Solo
        </h2>
        
        <p className="text-gray-600 text-sm">Preencha os dados para criar sua conta</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* CAMPO: Nome Completo */}
        <div className="space-y-1">
          <label className="block text-xs font-medium" style={{color: '#4B6043'}}>
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
                  : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
              }`}
              style={{
                borderColor: errors.nome ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.nome ? '#fef2f2' : '#ffffff'
              }}
              onFocus={(e) => {
                if (!errors.nome) {
                  e.target.style.borderColor = '#4B6043';
                  e.target.style.backgroundColor = '#F9F4ED';
                }
              }}
              onBlur={(e) => {
                if (!errors.nome) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#ffffff';
                }
              }}
            />
          </CampoComErro>
        </div>

        {/* CAMPO: CPF - ADICIONADO */}
        <div className="space-y-1">
          <label className="block text-xs font-medium" style={{color: '#4B6043'}}>
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
                  : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
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

        {/* CAMPO: Email */}
        <div className="space-y-1">
          <label className="block text-xs font-medium" style={{color: '#4B6043'}}>
            Email
          </label>
          <CampoComErro error={errors.email?.message}>
            <input
              type="email"
              placeholder="Digite seu email"
              {...register('email')}
              className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all duration-200 ${
                errors.email 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
              }`}
              style={{
                borderColor: errors.email ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.email ? '#fef2f2' : '#ffffff'
              }}
              onFocus={(e) => {
                if (!errors.email) {
                  e.target.style.borderColor = '#4B6043';
                  e.target.style.backgroundColor = '#F9F4ED';
                }
              }}
              onBlur={(e) => {
                if (!errors.email) {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.backgroundColor = '#ffffff';
                }
              }}
            />
          </CampoComErro>
        </div>

        {/* CAMPO: Senha */}
        <div className="space-y-1">
          <label className="block text-xs font-medium" style={{color: '#4B6043'}}>
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
                  : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
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

        {/* GRID: Telefone e Data de Nascimento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CAMPO: Telefone */}
          <div className="space-y-1">
            <label className="block text-xs font-medium" style={{color: '#4B6043'}}>
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
                    : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
                }`}
                style={{
                  borderColor: errors.telefone ? '#ef4444' : '#e5e7eb',
                  backgroundColor: errors.telefone ? '#fef2f2' : '#ffffff'
                }}
                onFocus={(e) => {
                  if (!errors.telefone) {
                    e.target.style.borderColor = '#4B6043';
                    e.target.style.backgroundColor = '#F9F4ED';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.telefone) {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.backgroundColor = '#ffffff';
                  }
                }}
              />
            </CampoComErro>
          </div>

          {/* CAMPO: Data de Nascimento - ADICIONADO */}
          <div className="space-y-1">
            <label className="block text-xs font-medium" style={{color: '#4B6043'}}>
              Data de Nascimento *
            </label>
            <CampoComErro error={errors.dataNascimento?.message}>
              <input
                type="date"
                {...register('dataNascimento')}
                className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all duration-200 ${
                  errors.dataNascimento 
                    ? 'border-red-400 focus:border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
                }`}
                style={{
                  borderColor: errors.dataNascimento ? '#ef4444' : '#e5e7eb',
                  backgroundColor: errors.dataNascimento ? '#fef2f2' : '#ffffff'
                }}
                onFocus={(e) => {
                  if (!errors.dataNascimento) {
                    e.target.style.borderColor = '#4B6043';
                    e.target.style.backgroundColor = '#F9F4ED';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.dataNascimento) {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.backgroundColor = '#ffffff';
                  }
                }}
              />
            </CampoComErro>
          </div>
        </div>

        {/* CAMPO: Endereço */}
        <div className="space-y-1">
          <label className="block text-xs font-medium" style={{color: '#4B6043'}}>
            Endereço *
          </label>
          <CampoComErro error={errors.endereco?.message}>
            <input
              type="text"
              placeholder="Endereço completo"
              {...register('endereco')}
              className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all duration-200 ${
                errors.endereco 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
              }`}
              style={{
                borderColor: errors.endereco ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.endereco ? '#fef2f2' : '#ffffff'
              }}
              onFocus={(e) => {
  if (!errors.endereco) {
    (e.target as HTMLInputElement).style.borderColor = '#4B6043';
    (e.target as HTMLInputElement).style.backgroundColor = '#F9F4ED';
  }
}}
              onBlur={(e) => {
  if (!errors.endereco) {
    (e.target as HTMLInputElement).style.borderColor = '#e5e7eb';
    (e.target as HTMLInputElement).style.backgroundColor = '#ffffff';
  }
}}
            />
          </CampoComErro>
        </div>

        {/* GRID: Renda Mensal */}
        <div className="space-y-1">
          <label className="block text-xs font-medium" style={{color: '#4B6043'}}>
            Renda Mensal *
          </label>
          <CampoComErro error={errors.rendaMensal?.message}>
            <input
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
              style={{
                borderColor: errors.rendaMensal ? '#ef4444' : '#e5e7eb',
                backgroundColor: errors.rendaMensal ? '#fef2f2' : '#ffffff'
              }}
             onFocus={(e) => {
  if (!errors.rendaMensal) {
    (e.target as HTMLInputElement).style.borderColor = '#4B6043';
    (e.target as HTMLInputElement).style.backgroundColor = '#F9F4ED';
  }
}}
onBlur={(e) => {
  if (!errors.rendaMensal) {
    (e.target as HTMLInputElement).style.borderColor = '#e5e7eb';
    (e.target as HTMLInputElement).style.backgroundColor = '#ffffff';
  }
}}
            />
          </CampoComErro>
        </div>

        {/* GRID: Situação de Trabalho e Escolaridade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CAMPO: Situação de Trabalho - SELECT */}
          <div className="space-y-1">
            <label className="block text-xs font-medium" style={{color: '#4B6043'}}>
              Situação de Trabalho *
            </label>
            <CampoComErro error={errors.situacaoTrabalho?.message}>
              <select
                {...register('situacaoTrabalho')}
                className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all duration-200 ${
                  errors.situacaoTrabalho 
                    ? 'border-red-400 focus:border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
                }`}
                style={{
                  borderColor: errors.situacaoTrabalho ? '#ef4444' : '#e5e7eb',
                  backgroundColor: errors.situacaoTrabalho ? '#fef2f2' : '#ffffff'
                }}
                onFocus={(e) => {
                  if (!errors.situacaoTrabalho) {
                    e.target.style.borderColor = '#4B6043';
                    e.target.style.backgroundColor = '#F9F4ED';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.situacaoTrabalho) {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.backgroundColor = '#ffffff';
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
          <div className="space-y-1">
            <label className="block text-xs font-medium" style={{color: '#4B6043'}}>
              Escolaridade *
            </label>
            <CampoComErro error={errors.escolaridade?.message}>
              <select
                {...register('escolaridade')}
                className={`w-full p-3 border-2 rounded-xl text-sm outline-none transition-all duration-200 ${
                  errors.escolaridade 
                    ? 'border-red-400 focus:border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-green-400 bg-white hover:border-gray-300'
                }`}
                style={{
                  borderColor: errors.escolaridade ? '#ef4444' : '#e5e7eb',
                  backgroundColor: errors.escolaridade ? '#fef2f2' : '#ffffff'
                }}
                onFocus={(e) => {
                  if (!errors.escolaridade) {
                    e.target.style.borderColor = '#4B6043';
                    e.target.style.backgroundColor = '#F9F4ED';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.escolaridade) {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.backgroundColor = '#ffffff';
                  }
                }}
              >
                <option value="">Selecione sua escolaridade</option>
                <option value="medioIncompleto">Médio Incompleto</option>
                <option value="medioCompleto">Médio Completo</option>
                <option value="superiorIncompleto">Superior Incompleto</option>
                <option value="superiorCompleto">Superior Completo</option>
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
              backgroundColor: isSubmitting ? '#9ca3af' : '#4B6043',
              boxShadow: isSubmitting ? 'none' : '0 4px 6px rgba(75, 96, 67, 0.2)'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
(e.target as HTMLButtonElement).style.backgroundColor = '#3d4e37'; 
  }
}}
            onMouseLeave={(e) => {
  if (!isSubmitting) {
    (e.target as HTMLButtonElement).style.backgroundColor = '#4B6043';
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