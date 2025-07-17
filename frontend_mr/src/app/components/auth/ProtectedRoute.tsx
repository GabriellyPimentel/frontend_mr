'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getCurrentUserLocal, isLoggedInLocal } from '../../services/localAuth';
import { User } from '../../types';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedTypes?: ('mae_solo' | 'profissional')[];
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedTypes,
  redirectTo = '/login'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = isLoggedInLocal();
      const currentUser = getCurrentUserLocal();

      if (!isLoggedIn || !currentUser) {
        console.log('❌ Usuário não logado, redirecionando para login...');
        router.push(redirectTo);
        return;
      }

      // Verifica se o tipo de usuário é permitido nesta rota
      if (allowedTypes && !allowedTypes.includes(currentUser.tipo)) {
        console.log(`❌ Tipo de usuário (${currentUser.tipo}) não permitido nesta rota`);
        // Redireciona para a página correta baseada no tipo
        if (currentUser.tipo === 'mae_solo') {
          router.push('/mae-dashboard');
        } else if (currentUser.tipo === 'profissional') {
          router.push('/profissional-dashboard');
        } else {
          router.push('/login');
        }
        return;
      }

      setUser(currentUser);
      setIsLoading(false);
    };

    checkAuth();
  }, [router, allowedTypes, redirectTo]);

  if (isLoading) {
    return (
      <motion.div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#F9F4ED' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <LoadingSpinner size="lg" color="#4B6043" />
          </motion.div>
          <p className="text-gray-600 font-medium">Verificando autenticação...</p>
        </motion.div>
      </motion.div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;