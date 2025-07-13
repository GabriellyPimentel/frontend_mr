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
    reset
  } = useForm<MaeSoloData>({
    resolver: zodResolver(schemaMaeSolo)
  });

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
      <h2 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2">
        <span>👩‍👧‍👦</span>
        Cadastro de Mãe Solo
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nome */}
        <CampoComErro error={errors.nome?.message}>
          <input
            type="text"
            placeholder="Nome completo"
            {...register('nome')}
            className={`w-full p-3 border rounded-md text-base outline-none transition-colors ${
              errors.nome ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
          />
        </CampoComErro>

        {/* Email */}
        <CampoComErro error={errors.email?.message}>
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className={`w-full p-3 border rounded-md text-base outline-none transition-colors ${
              errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
          />
        </CampoComErro>

        {/* Senha */}
        <CampoComErro error={errors.senha?.message}>
          <input
            type="password"
            placeholder="Senha (mínimo 6 caracteres)"
            {...register('senha')}
            className={`w-full p-3 border rounded-md text-base outline-none transition-colors ${
              errors.senha ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
          />
        </CampoComErro>

        {/* Telefone */}
        <CampoComErro error={errors.telefone?.message}>
          <input
            type="tel"
            placeholder="Telefone (11999999999)"
            {...register('telefone')}
            className={`w-full p-3 border rounded-md text-base outline-none transition-colors ${
              errors.telefone ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
          />
        </CampoComErro>

        {/* Endereço */}
        <CampoComErro error={errors.endereco?.message}>
          <input
            type="text"
            placeholder="Endereço completo"
            {...register('endereco')}
            className={`w-full p-3 border rounded-md text-base outline-none transition-colors ${
              errors.endereco ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
          />
        </CampoComErro>

        {/* Renda Mensal */}
        <CampoComErro error={errors.rendaMensal?.message}>
          <input
            type="number"
            placeholder="Renda mensal (R$)"
            step="0.01"
            min="0"
            {...register('rendaMensal')}
            className={`w-full p-3 border rounded-md text-base outline-none transition-colors ${
              errors.rendaMensal ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
          />
        </CampoComErro>

        {/* Situação de Trabalho */}
        <CampoComErro error={errors.situacaoTrabalho?.message}>
          <select
            {...register('situacaoTrabalho')}
            className={`w-full p-3 border rounded-md text-base outline-none transition-colors ${
              errors.situacaoTrabalho ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
          >
            <option value="">Selecione a situação de trabalho</option>
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

        {/* Escolaridade */}
        <CampoComErro error={errors.escolaridade?.message}>
          <select
            {...register('escolaridade')}
            className={`w-full p-3 border rounded-md text-base outline-none transition-colors ${
              errors.escolaridade ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
          >
            <option value="">Selecione a escolaridade</option>
            <option value="fundamental_incompleto">Fundamental Incompleto</option>
            <option value="fundamental_completo">Fundamental Completo</option>
            <option value="medio_incompleto">Médio Incompleto</option>
            <option value="medio_completo">Médio Completo</option>
            <option value="superior_incompleto">Superior Incompleto</option>
            <option value="superior_completo">Superior Completo</option>
            <option value="pos_graduacao">Pós-graduação</option>
          </select>
        </CampoComErro>

        {/* Botão de envio */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 rounded-md text-white font-medium text-base transition-all flex items-center justify-center gap-3 ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
          }`}
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner />
              Cadastrando...
            </>
          ) : (
            'Cadastrar como Mãe Solo'
          )}
        </button>
      </form>
    </div>
  );
};
