'use client';

import React, { useState } from 'react';
import { TipoFormulario } from '../../types';
import { FormularioMaeSolo } from '../forms/FormularioMaeSolo';
import { FormularioProfissional } from '../forms/FormularioProfissional';

export const CadastroPage: React.FC = () => {
  const [tipoFormulario, setTipoFormulario] = useState<TipoFormulario>('mae');

  const handleSuccess = () => {
    alert('Cadastro realizado com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Criar Conta
        </h1>
        
        {/* Abas */}
        <div className="flex mb-8 border-b-2 border-gray-200">
          <button 
            className={`flex-1 py-4 px-6 font-medium text-base transition-all flex items-center justify-center gap-3 ${
              tipoFormulario === 'mae' 
                ? 'text-blue-600 border-b-3 border-blue-600' 
                : 'text-gray-600 border-b-3 border-transparent hover:text-blue-600'
            }`}
            onClick={() => setTipoFormulario('mae')}
          >
            <span className="text-xl">👩‍👧‍👦</span>
            Sou Mãe Solo
          </button>
          
          <button 
            className={`flex-1 py-4 px-6 font-medium text-base transition-all flex items-center justify-center gap-3 ${
              tipoFormulario === 'profissional' 
                ? 'text-blue-600 border-b-3 border-blue-600' 
                : 'text-gray-600 border-b-3 border-transparent hover:text-blue-600'
            }`}
            onClick={() => setTipoFormulario('profissional')}
          >
            <span className="text-xl">🩺</span>
            Sou Profissional
          </button>
        </div>

        {/* Formulários */}
        <div>
          {tipoFormulario === 'mae' ? (
            <FormularioMaeSolo onSuccess={handleSuccess} />
          ) : (
            <FormularioProfissional onSuccess={handleSuccess} />
          )}
        </div>
      </div>
    </div>
  );
};
