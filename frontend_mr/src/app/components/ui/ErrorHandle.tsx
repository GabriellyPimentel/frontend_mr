
'use client';

import React from 'react';

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

      // 💥 UI padrão quando há erro
      return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F9F4ED' }}>
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">❌</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Ops! Algo deu errado</h2>
            <p className="text-gray-600 mb-6">
              Ocorreu um erro inesperado. Tente novamente ou entre em contato com o suporte.
            </p>
            <button
              onClick={this.resetError}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// 🍞 Hook para mostrar notificações toast
export const useErrorToast = () => {
  // ❌ Toast de erro
  const showError = (message: string) => {
    const toast = document.createElement('div');
    toast.innerHTML = `
      <div class="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
        <div class="flex items-center gap-2">
          <span>❌</span>
          <span>${message}</span>
        </div>
      </div>
    `;
    document.body.appendChild(toast);
    
    // Remove automaticamente após 5 segundos
    setTimeout(() => {
      toast.remove();
    }, 5000);
  };

  // ✅ Toast de sucesso
  const showSuccess = (message: string) => {
    const toast = document.createElement('div');
    toast.innerHTML = `
      <div class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
        <div class="flex items-center gap-2">
          <span>✅</span>
          <span>${message}</span>
        </div>
      </div>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 5000);
  };

  return { showError, showSuccess };
};

export default ErrorBoundary;