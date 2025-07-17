'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

// 🛡️ Error Boundary - captura erros do React que quebrariam a aplicação
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // 🔍 Método estático que captura erros
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  // 📝 Log de erros para debugging
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  // 🔄 Função para resetar o erro e tentar novamente
  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Se há um componente customizado de erro, usa ele
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} resetError={this.resetError} />;
      }

      // Variantes de animação
      const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { 
            duration: 0.5, 
            ease: 'easeOut' as const,
            staggerChildren: 0.1,
            delayChildren: 0.2
          }
        }
      } as const;

      const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4 }
        }
      } as const;

      const iconVariants = {
        hidden: { scale: 0, rotate: 0 },
        visible: {
          scale: 1,
          rotate: 0,
          transition: { 
            type: "spring" as const, 
            stiffness: 300, 
            damping: 20 
          }
        }
      } as const;

      const buttonVariants = {
        idle: { scale: 1 },
        hover: { 
          scale: 1.05,
          transition: { duration: 0.2 }
        },
        tap: { scale: 0.95 }
      } as const;

      // 💥 UI padrão quando há erro
      return (
        <motion.div
          className="min-h-screen flex items-center justify-center p-4"
          style={{ backgroundColor: '#F9F4ED', zIndex: 9999 }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
          >
            <motion.div
              className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
              variants={iconVariants}
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                },
                scale: {
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut"
                }
              }}
            >
              <span className="text-3xl">❌</span>
            </motion.div>

            <motion.h2 
              className="text-xl font-bold text-gray-800 mb-4"
              variants={itemVariants}
            >
              Ops! Algo deu errado
            </motion.h2>

            <motion.p 
              className="text-gray-600 mb-6"
              variants={itemVariants}
            >
              Ocorreu um erro inesperado. Tente novamente ou entre em contato com o suporte.
            </motion.p>

            <motion.button
              onClick={this.resetError}
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg"
              variants={buttonVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
              style={{
                backgroundColor: '#ef4444',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = '#dc2626';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = '#ef4444';
              }}
            >
              <motion.span
                animate={{ x: [0, 2, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                🔄
              </motion.span>
              {' '}Tentar Novamente
            </motion.button>

            {/* Informação adicional do erro em desenvolvimento */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <motion.details 
                className="mt-4 text-left"
                variants={itemVariants}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Detalhes do erro (desenvolvimento)
                </summary>
                <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-32">
                  {this.state.error.stack}
                </pre>
              </motion.details>
            )}
          </motion.div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

// 🍞 Hook para mostrar notificações toast
export const useErrorToast = () => {
  // Variantes para toast
  const toastVariants = {
    hidden: { 
      opacity: 0, 
      x: 100, 
      scale: 0.8 
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      x: 100,
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  // ❌ Toast de erro
  const showError = (message: string) => {
    const toastContainer = document.createElement('div');
    toastContainer.style.position = 'fixed';
    toastContainer.style.top = '1rem';
    toastContainer.style.right = '1rem';
    toastContainer.style.zIndex = '9999';
    
    toastContainer.innerHTML = `
      <div 
        class="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 min-w-80 animate-slide-in"
        style="animation: slideIn 0.3s ease-out; box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);"
      >
        <span style="animation: shake 0.5s ease-in-out;">❌</span>
        <span class="font-medium">${message}</span>
      </div>
      <style>
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
      </style>
    `;
    
    document.body.appendChild(toastContainer);
    
    // Remove automaticamente após 5 segundos
    setTimeout(() => {
      toastContainer.style.animation = 'slideOut 0.3s ease-in forwards';
      setTimeout(() => {
        if (toastContainer.parentNode) {
          toastContainer.remove();
        }
      }, 300);
    }, 5000);
  };

  // ✅ Toast de sucesso
  const showSuccess = (message: string) => {
    const toastContainer = document.createElement('div');
    toastContainer.style.position = 'fixed';
    toastContainer.style.top = '1rem';
    toastContainer.style.right = '1rem';
    toastContainer.style.zIndex = '9999';
    
    toastContainer.innerHTML = `
      <div 
        class="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 min-w-80 animate-slide-in"
        style="animation: slideIn 0.3s ease-out; box-shadow: 0 10px 25px rgba(34, 197, 94, 0.3);"
      >
        <span style="animation: bounce 0.6s ease-in-out;">✅</span>
        <span class="font-medium">${message}</span>
      </div>
      <style>
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      </style>
    `;
    
    document.body.appendChild(toastContainer);
    
    setTimeout(() => {
      toastContainer.style.animation = 'slideOut 0.3s ease-in forwards';
      setTimeout(() => {
        if (toastContainer.parentNode) {
          toastContainer.remove();
        }
      }, 300);
    }, 4000);
  };

  // ⚠️ Toast de aviso
  const showWarning = (message: string) => {
    const toastContainer = document.createElement('div');
    toastContainer.style.position = 'fixed';
    toastContainer.style.top = '1rem';
    toastContainer.style.right = '1rem';
    toastContainer.style.zIndex = '9999';
    
    toastContainer.innerHTML = `
      <div 
        class="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 min-w-80"
        style="animation: slideIn 0.3s ease-out; box-shadow: 0 10px 25px rgba(234, 179, 8, 0.3);"
      >
        <span style="animation: pulse 1s ease-in-out infinite;">⚠️</span>
        <span class="font-medium">${message}</span>
      </div>
      <style>
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      </style>
    `;
    
    document.body.appendChild(toastContainer);
    
    setTimeout(() => {
      toastContainer.style.animation = 'slideOut 0.3s ease-in forwards';
      setTimeout(() => {
        if (toastContainer.parentNode) {
          toastContainer.remove();
        }
      }, 300);
    }, 4500);
  };

  return { showError, showSuccess, showWarning };
};

export default ErrorBoundary;