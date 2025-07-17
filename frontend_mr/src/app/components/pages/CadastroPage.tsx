'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { TipoFormulario } from '../../types';
import { FormularioMaeSolo } from '../forms/FormularioMaeSolo';
import { FormularioProfissional } from '../forms/FormularioProfissional';
import { MaeRaizAnimation } from '../ui/animations/MaeRaizAnimation';

export const CadastroPage: React.FC = () => {
  const [tipoFormulario, setTipoFormulario] = useState<TipoFormulario>('mae');
  const [showAnimation, setShowAnimation] = useState(true);
  const router = useRouter();

  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  const handleSuccess = () => {
    const modal = document.createElement('div');
    modal.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-2xl shadow-2xl max-w-sm mx-4 text-center">
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span class="text-2xl">✅</span>
          </div>
          <h3 class="text-lg font-bold text-gray-800 mb-2">Cadastro realizado com sucesso!</h3>
          <p class="text-gray-600 mb-4 text-sm">Seja bem-vindo(a) à nossa plataforma!</p>
          <button onclick="this.parentElement.parentElement.remove()" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
            Continuar
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  };

  // Variantes de animação
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween" as const,
    ease: "anticipate" as const,
    duration: 0.5
  };

  const headerVariants = {
    initial: { opacity: 0, y: -30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.2, duration: 0.6 }
    }
  };

  const containerVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { delay: 0.4, duration: 0.6 }
    }
  };

  const tabVariants = {
    inactive: { scale: 1, opacity: 0.7 },
    active: { 
      scale: 1.05, 
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 300, damping: 20 }
    }
  };

  const formVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4 }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: { duration: 0.3 }
    }
  };

  const footerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.8, duration: 0.5 }
    }
  };

  if (showAnimation) {
    return <MaeRaizAnimation onComplete={handleAnimationComplete} />;
  }

  return (
    <motion.div 
      className="min-h-screen p-4"
      style={{backgroundColor: '#F9F4ED'}}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* Header animado */}
      <motion.div 
        className="text-center mb-4"
        variants={headerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-2 shadow-lg"
          style={{backgroundColor: '#A3B18A'}}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-2xl">🤝</span>
        </motion.div>
        <motion.h1 
          className="text-2xl font-bold mb-1"
          style={{color: '#4B6043'}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Criar Conta
        </motion.h1>
        <motion.p 
          className="text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Junte-se à nossa comunidade de apoio
        </motion.p>
      </motion.div>

      <div className="max-w-xl mx-auto">
        {/* Container principal animado */}
        <motion.div 
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Abas animadas */}
          <div className="flex border-b border-gray-100">
            <motion.button 
              className={`flex-1 py-4 px-4 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 relative ${
                tipoFormulario === 'mae' 
                  ? 'text-white' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
              style={{
                backgroundColor: tipoFormulario === 'mae' ? '#4B6043' : 'transparent',
                boxShadow: tipoFormulario === 'mae' ? '0 4px 8px rgba(75, 96, 67, 0.3)' : 'none'
              }}
              onClick={() => setTipoFormulario('mae')}
              variants={tabVariants}
              animate={tipoFormulario === 'mae' ? 'active' : 'inactive'}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span 
                className="text-lg"
                animate={{ rotate: tipoFormulario === 'mae' ? [0, 10, 0] : 0 }}
                transition={{ duration: 0.5 }}
              >
                👩‍👧‍👦
              </motion.span>
              <span>Sou Mãe Solo</span>
              {tipoFormulario === 'mae' && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
            
            <motion.button 
              className={`flex-1 py-4 px-4 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 relative ${
                tipoFormulario === 'profissional' 
                  ? 'text-white' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
              style={{
                backgroundColor: tipoFormulario === 'profissional' ? '#B17853' : 'transparent',
                boxShadow: tipoFormulario === 'profissional' ? '0 4px 8px rgba(177, 120, 83, 0.3)' : 'none'
              }}
              onClick={() => setTipoFormulario('profissional')}
              variants={tabVariants}
              animate={tipoFormulario === 'profissional' ? 'active' : 'inactive'}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span 
                className="text-lg"
                animate={{ rotate: tipoFormulario === 'profissional' ? [0, 10, 0] : 0 }}
                transition={{ duration: 0.5 }}
              >
                🩺
              </motion.span>
              <span>Sou Profissional</span>
              {tipoFormulario === 'profissional' && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          </div>

          {/* Conteúdo dos formulários com AnimatePresence */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {tipoFormulario === 'mae' ? (
                <motion.div
                  key="mae-form"
                  variants={formVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <FormularioMaeSolo onSuccess={handleSuccess} />
                </motion.div>
              ) : (
                <motion.div
                  key="profissional-form"
                  variants={formVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <FormularioProfissional onSuccess={handleSuccess} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer animado */}
        <motion.div 
          className="mt-4 text-center"
          variants={footerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.p 
            className="text-gray-600 mb-2 text-sm"
            whileHover={{ scale: 1.02 }}
          >
            Já tem uma conta? 
            <motion.button 
              onClick={() => router.push('/login')}
              className="font-semibold ml-1 hover:underline transition-colors text-sm" 
              style={{ color: '#4B6043' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Faça login
            </motion.button>
          </motion.p>
          <motion.div 
            className="flex items-center justify-center gap-4 text-xs text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {['Termos de Uso', 'Política de Privacidade', 'Ajuda'].map((link, index) => (
              <React.Fragment key={link}>
                <motion.a 
                  href={`/${link.toLowerCase().replace(' ', '-')}`} 
                  className="hover:underline"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  {link}
                </motion.a>
                {index < 2 && <span>•</span>}
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CadastroPage;