'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  User, FileText, Clock, Heart, BriefcaseMedical, Phone, MapPin, Calendar, LogOut
} from 'lucide-react';
import { getCurrentUserLocal, logoutLocal } from '../../services/localAuth';
import { User as UserType } from '../../types';

interface Profissional {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  profissao: string;
  especialidade: string;
}

interface Atendimento {
  id: string;
  data: string;
  tipo: 'presencial' | 'telefone' | 'online';
  pessoa: string;
  assunto: string;
  resumo: string;
  status: 'realizado' | 'faltou' | 'reagendado' | 'agendado';
  proximoAtendimento?: string;
}

interface Encaminhamento {
  id: string;
  pessoa: string;
  tipo: 'psicologico' | 'juridico' | 'saude' | 'educacao';
  descricao: string;
  status: 'pendente' | 'em andamento' | 'concluido';
  dataEncaminhamento: string;
  observacoes?: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pendente': return 'bg-yellow-100 text-yellow-800';
    case 'em andamento': return 'bg-blue-100 text-blue-800';
    case 'concluido': return 'bg-green-100 text-green-800';
    case 'realizado': return 'bg-green-100 text-green-800';
    case 'faltou': return 'bg-red-100 text-red-800';
    case 'reagendado': return 'bg-yellow-100 text-yellow-800';
    case 'agendado': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getIcon = (tipo: string) => {
  switch (tipo) {
    case 'presencial': return '🏢';
    case 'telefone': return '📞';
    case 'online': return '💻';
    case 'psicologico': return '🧠';
    case 'juridico': return '⚖️';
    case 'saude': return '🏥';
    case 'educacao': return '📚';
    default: return '📋';
  }
};

// Componente StatCard
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon }) => (
  <motion.div 
    className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#6C3B2A]"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      <motion.div 
        className="bg-[#6C3B2A] p-3 rounded-full text-white"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        {icon}
      </motion.div>
    </div>
  </motion.div>
);

export default function ProfissionalPage() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();

  // Carrega dados do usuário logado
  useEffect(() => {
    console.log('🔍 ProfissionalPage: Iniciando verificação de usuário...');
    
    try {
      const user = getCurrentUserLocal();
      console.log('👤 Usuário encontrado:', user);
      
      if (!user) {
        console.log('❌ Nenhum usuário logado, redirecionando...');
        router.push('/login');
        return;
      }
      
      if (user.tipo !== 'profissional') {
        console.log('❌ Usuário não é profissional:', user.tipo);
        router.push('/login');
        return;
      }
      
      console.log('✅ Usuário válido carregado:', user.nome);
      setCurrentUser(user);
      
    } catch (err) {
      console.error('❌ Erro ao carregar usuário:', err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Dados simulados 
  const [profissional, setProfissional] = useState<Profissional>({
    nome: 'Ana Ribeiro',
    email: 'ana.ribeiro@exemplo.com',
    telefone: '(11) 98888-7777',
    endereco: 'Av. Brasil, 456 - São Paulo/SP',
    profissao: 'Assistente Social',
    especialidade: 'Atendimento familiar'
  });

  // Atualiza o perfil quando o usuário é carregado
  useEffect(() => {
    if (currentUser) {
      setProfissional(prev => ({
        ...prev,
        nome: currentUser.nome,
        email: currentUser.email || prev.email,
        telefone: currentUser.telefone || prev.telefone,
        profissao: currentUser.areaAtuacao || prev.profissao,
        especialidade: currentUser.areaAtuacao || prev.especialidade
      }));
    }
  }, [currentUser]);

  const [atendimentos] = useState<Atendimento[]>([
    {
      id: '1',
      data: '2024-07-10',
      tipo: 'presencial',
      pessoa: 'Maria Silva',
      assunto: 'Avaliação socioeconômica',
      resumo: 'Entrevista com levantamento de necessidades.',
      proximoAtendimento: '2024-07-18',
      status: 'agendado'
    },
    {
      id: '2',
      data: '2024-06-20',
      tipo: 'telefone',
      pessoa: 'João Oliveira',
      assunto: 'Encaminhamento médico',
      resumo: 'Orientações sobre posto de saúde próximo.',
      status: 'realizado'
    }
  ]);

  const [encaminhamentos] = useState<Encaminhamento[]>([
    {
      id: '1',
      pessoa: 'Maria Silva',
      tipo: 'saude',
      descricao: 'Consulta médica com clínico geral',
      status: 'em andamento',
      dataEncaminhamento: '2024-07-10',
      observacoes: 'Aguardando agendamento'
    },
    {
      id: '2',
      pessoa: 'João Oliveira',
      tipo: 'educacao',
      descricao: 'Inscrição em EJA',
      status: 'concluido',
      dataEncaminhamento: '2024-06-18'
    }
  ]);

  // Função de logout
  const handleLogout = () => {
    console.log('🚪 Fazendo logout...');
    logoutLocal();
    router.push('/login');
  };

  // Tela de loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF7F1] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B17853] mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dados...</p>
        </div>
      </div>
    );
  }

  // Se não tem usuário, não renderiza nada (está redirecionando)
  if (!currentUser) {
    return null;
  }

  return (
    <motion.div 
      className="min-h-screen bg-[#FBF7F1]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
   {/* Debug info
<div className="bg-blue-100 p-4 text-sm">
  <p><strong>Debug:</strong> Usuário profissional carregado com sucesso</p>
  <p><strong>Nome:</strong> {currentUser.nome}</p>
  <p><strong>Tipo:</strong> {currentUser.tipo}</p>
  <p><strong>Área:</strong> {currentUser.areaAtuacao}</p>
</div>
*/}

      <header className="bg-[#B17853] text-white shadow-lg"> 
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <motion.div 
              className="bg-[#6C3B2A] rounded-full p-2"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-2xl">🧑‍⚕️</span>
            </motion.div>
            <div>
              <motion.h1 
                className="text-xl font-bold"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Olá, {currentUser.nome.split(' ')[0]}!
              </motion.h1>
              <motion.p 
                className="text-sm text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                Bem-vindo ao seu espaço
              </motion.p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button 
              className="p-2 rounded-full hover:bg-[#B17853] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              🔔
            </motion.button>
            <motion.button
              onClick={handleLogout}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-[#6C3B2A] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut size={20} />
              <span className="text-sm">Sair</span>
            </motion.button>
          </div>
        </div>
      </header>

      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 flex space-x-8">
          {[
            { id: 'overview', label: 'Visão Geral', icon: <Heart size={16} /> },
            { id: 'encaminhamentos', label: 'Encaminhamentos', icon: <FileText size={16} /> },
            { id: 'historico', label: 'Histórico', icon: <Clock size={16} /> },
            { id: 'atendimentos', label: 'Atendimentos', icon: <BriefcaseMedical size={16} /> },
          ].map(tab => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-[#B17853] text-[#B17853]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-white'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard title="Atendimentos" value={atendimentos.length} subtitle="realizados" icon={<BriefcaseMedical size={24} />} />
              <StatCard title="Encaminhamentos" value={encaminhamentos.length} subtitle="feitos" icon={<FileText size={24} />} />
              <StatCard title="Próximo Atendimento" value="18/07" subtitle="com Maria Silva" icon={<Calendar size={24} />} />
            </div>

            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            >
              <h2 className="text-xl font-bold text-[#6C3B2A] mb-4">Perfil Profissional</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="flex items-center text-gray-600"><User className="mr-2" size={16} />{profissional.nome}</p>
                  <p className="flex items-center text-gray-600"><Phone className="mr-2" size={16} />{profissional.telefone}</p>
                  <p className="flex items-center text-gray-600"><MapPin className="mr-2" size={16} />{profissional.endereco}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600"><strong>Profissão:</strong> {profissional.profissao}</p>
                  <p className="text-gray-600"><strong>Especialidade:</strong> {profissional.especialidade}</p>
                  <p className="text-gray-600"><strong>Email:</strong> {profissional.email}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'encaminhamentos' && (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-[#6C3B2A]">Encaminhamentos Realizados</h2>
            {encaminhamentos.map((enc, index) => (
              <motion.div 
                key={enc.id} 
                className="bg-white rounded-lg shadow-md p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getIcon(enc.tipo)}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{enc.descricao}</h3>
                      <p className="text-sm text-gray-600">Para: {enc.pessoa} - {new Date(enc.dataEncaminhamento).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(enc.status)}`}>
                    {enc.status.replace('-', ' ')}
                  </span>
                </div>
                {enc.observacoes && (
                  <div className="mt-2 p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-700"><strong>Observações:</strong> {enc.observacoes}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'historico' && (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-[#6C3B2A]">Histórico de Atendimentos</h2>
            {atendimentos.map((at, index) => (
              <motion.div 
                key={at.id} 
                className="bg-white rounded-lg shadow-md p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getIcon(at.tipo)}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{at.assunto}</h3>
                      <p className="text-sm text-gray-600">{new Date(at.data).toLocaleDateString()} - {at.pessoa}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(at.status)}`}>
                    {at.status}
                  </span>
                </div>
                <p className="text-gray-700">{at.resumo}</p>
                {at.proximoAtendimento && (
                  <div className="mt-3 p-3 bg-[#E4F0D4] rounded">
                    <p className="text-sm text-[#6C3B2A]"><strong>Próximo atendimento:</strong> {new Date(at.proximoAtendimento).toLocaleDateString()}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'atendimentos' && (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-[#6C3B2A]">Atendimentos Agendados</h2>
            {atendimentos
            .filter(at => at.status === 'agendado' || at.status === 'reagendado')
            .map((at, index) => (
              <motion.div 
                key={at.id} 
                className="bg-white rounded-lg shadow-md p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{getIcon(at.tipo)}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{at.assunto}</p>
                    <p className="text-sm text-gray-600">{new Date(at.data).toLocaleDateString()} - {at.pessoa}</p>
                  </div>
                </div>
                <p className="text-gray-700">{at.resumo}</p>
                {at.proximoAtendimento && (
                  <div className="mt-3 p-3 bg-[#E4F0D4] rounded">
                    <p className="text-sm text-[#6C3B2A]">
                      <strong>Próximo atendimento:</strong> {new Date(at.proximoAtendimento).toLocaleDateString()}
                    </p>
                  </div>
                )}
                <span className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(at.status)}`}>
                  {at.status}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </motion.div>
  );
}