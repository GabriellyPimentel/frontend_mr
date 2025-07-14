'use client';

import React, { useState } from 'react';
import { TipoFormulario } from '../../types';
import { FormularioMaeSolo } from '../forms/FormularioMaeSolo';
import { FormularioProfissional } from '../forms/FormularioProfissional';

export const CadastroPage: React.FC = () => {
  const [tipoFormulario, setTipoFormulario] = useState<TipoFormulario>('mae');

  const handleSuccess = () => {
    // Criar um modal ou notificação mais elegante
    const modal = document.createElement('div');
    modal.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-8 rounded-2xl shadow-2xl max-w-md mx-4 text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-3xl">✅</span>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Cadastro realizado com sucesso!</h3>
          <p class="text-gray-600 mb-6">Seja bem-vindo(a) à nossa plataforma!</p>
          <button onclick="this.parentElement.parentElement.remove()" class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Continuar
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  };

  return (
    <div className="min-h-screen p-5" style={{backgroundColor: '#F9F4ED'}}>
      {/* Header com gradiente */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 shadow-lg" style={{backgroundColor: '#A3B18A'}}>
          <span className="text-4xl">🤝</span>
        </div>
        <h1 className="text-4xl font-bold mb-2" style={{color: '#4B6043'}}>
          Criar Conta
        </h1>
        <p className="text-lg text-gray-600">Junte-se à nossa comunidade de apoio</p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Container principal com sombra elegante */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Abas redesenhadas */}
          <div className="flex border-b border-gray-100">
            <button 
              className={`flex-1 py-6 px-8 font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 relative ${
                tipoFormulario === 'mae' 
                  ? 'text-white transform scale-105' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
              style={{
                backgroundColor: tipoFormulario === 'mae' ? '#4B6043' : 'transparent',
                boxShadow: tipoFormulario === 'mae' ? '0 4px 8px rgba(75, 96, 67, 0.3)' : 'none'
              }}
              onClick={() => setTipoFormulario('mae')}
              onMouseEnter={(e) => {
                if (tipoFormulario !== 'mae') {
                  e.target.style.backgroundColor = '#f9fafb';
                }
              }}
              onMouseLeave={(e) => {
                if (tipoFormulario !== 'mae') {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span className="text-2xl">👩‍👧‍👦</span>
              <span>Sou Mãe Solo</span>
              {tipoFormulario === 'mae' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full"></div>
              )}
            </button>
            
            <button 
              className={`flex-1 py-6 px-8 font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 relative ${
                tipoFormulario === 'profissional' 
                  ? 'text-white transform scale-105' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
              style={{
                backgroundColor: tipoFormulario === 'profissional' ? '#B17853' : 'transparent',
                boxShadow: tipoFormulario === 'profissional' ? '0 4px 8px rgba(177, 120, 83, 0.3)' : 'none'
              }}
              onClick={() => setTipoFormulario('profissional')}
              onMouseEnter={(e) => {
                if (tipoFormulario !== 'profissional') {
                  e.target.style.backgroundColor = '#f9fafb';
                }
              }}
              onMouseLeave={(e) => {
                if (tipoFormulario !== 'profissional') {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span className="text-2xl">🩺</span>
              <span>Sou Profissional</span>
              {tipoFormulario === 'profissional' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full"></div>
              )}
            </button>
          </div>

          {/* Conteúdo dos formulários */}
          <div className="p-8">
            {/* Animação de transição */}
            <div className="transition-all duration-300 ease-in-out">
              {tipoFormulario === 'mae' ? (
                <div className="animate-fadeIn">
                  <FormularioMaeSolo onSuccess={handleSuccess} />
                </div>
              ) : (
                <div className="animate-fadeIn">
                  <FormularioProfissional onSuccess={handleSuccess} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer com informações adicionais */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Já tem uma conta? 
            <a href="/login" className="font-semibold ml-1 hover:underline transition-colors" style={{color: '#4B6043'}}>
              Faça login
            </a>
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <a href="/termos" className="hover:underline">Termos de Uso</a>
            <span>•</span>
            <a href="/privacidade" className="hover:underline">Política de Privacidade</a>
            <span>•</span>
            <a href="/ajuda" className="hover:underline">Ajuda</a>
          </div>
        </div>
      </div>

      {/* Adicionar CSS personalizado para animações */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default CadastroPage;