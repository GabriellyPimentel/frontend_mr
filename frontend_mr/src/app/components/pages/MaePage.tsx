'use client';
import React, { useState } from 'react';
import { User, Baby, FileText, Clock, Plus, Edit2, Calendar, Phone, MapPin, Heart } from 'lucide-react';

interface Filho {
  id: string;
  nome: string;
  idade: number;
  dataNascimento: string;
  escola?: string;
  necessidadesEspeciais?: string;
  situacaoSaude: 'boa' | 'atencao' | 'critica';
}

interface Encaminhamento {
  id: string;
  tipo: 'psicologico' | 'juridico' | 'saude' | 'educacao' | 'assistencia-social';
  descricao: string;
  status: 'pendente' | 'em-andamento' | 'concluido' | 'cancelado';
  dataEncaminhamento: string;
  profissionalResponsavel?: string;
  observacoes?: string;
}

interface Atendimento {
  id: string;
  data: string;
  tipo: 'presencial' | 'telefone' | 'online';
  assunto: string;
  profissional: string;
  resumo: string;
  proximoAtendimento?: string;
  status: 'realizado' | 'faltou' | 'reagendado';
}

interface PerfilMae {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  numeroFilhos: number;
  situacaoTrabalhista: string;
  rendaFamiliar: string;
  necessidadesPrincipais: string[];
}

export default function DashboardMaeSolo() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddChild, setShowAddChild] = useState(false);
  const [selectedChild, setSelectedChild] = useState<Filho | null>(null);

  // Dados simulados
  const [perfilMae] = useState<PerfilMae>({
    nome: 'Maria Silva Santos',
    email: 'maria.silva@email.com',
    telefone: '(11) 99999-9999',
    endereco: 'Rua das Flores, 123 - Centro - São Paulo/SP',
    numeroFilhos: 2,
    situacaoTrabalhista: 'Empregada',
    rendaFamiliar: 'De 1 a 2 salários mínimos',
    necessidadesPrincipais: ['Cuidados com crianças', 'Apoio psicológico', 'Orientação jurídica']
  });

  const [filhos, setFilhos] = useState<Filho[]>([
    {
      id: '1',
      nome: 'Ana Silva',
      idade: 8,
      dataNascimento: '2016-03-15',
      escola: 'E.M. João de Barro',
      situacaoSaude: 'boa'
    },
    {
      id: '2',
      nome: 'Pedro Silva',
      idade: 5,
      dataNascimento: '2019-07-22',
      escola: 'EMEI Pequeno Príncipe',
      necessidadesEspeciais: 'Acompanhamento fonoaudiológico',
      situacaoSaude: 'atencao'
    }
  ]);

  const [encaminhamentos] = useState<Encaminhamento[]>([
    {
      id: '1',
      tipo: 'psicologico',
      descricao: 'Acompanhamento psicológico para ansiedade',
      status: 'em-andamento',
      dataEncaminhamento: '2024-06-15',
      profissionalResponsavel: 'Dra. Ana Carolina',
      observacoes: 'Sessões semanais às terças-feiras'
    },
    {
      id: '2',
      tipo: 'juridico',
      descricao: 'Orientação sobre pensão alimentícia',
      status: 'concluido',
      dataEncaminhamento: '2024-05-20',
      profissionalResponsavel: 'Dr. Roberto Lima'
    },
    {
      id: '3',
      tipo: 'saude',
      descricao: 'Consulta pediatra para Pedro',
      status: 'pendente',
      dataEncaminhamento: '2024-07-10',
      observacoes: 'Agendamento em andamento'
    }
  ]);

  const [atendimentos] = useState<Atendimento[]>([
    {
      id: '1',
      data: '2024-07-10',
      tipo: 'presencial',
      assunto: 'Acompanhamento psicológico',
      profissional: 'Dra. Ana Carolina',
      resumo: 'Discussão sobre técnicas de manejo da ansiedade e estratégias de enfrentamento.',
      proximoAtendimento: '2024-07-17',
      status: 'realizado'
    },
    {
      id: '2',
      data: '2024-07-05',
      tipo: 'telefone',
      assunto: 'Orientação jurídica',
      profissional: 'Dr. Roberto Lima',
      resumo: 'Esclarecimentos sobre documentação necessária para processo de pensão.',
      status: 'realizado'
    },
    {
      id: '3',
      data: '2024-06-28',
      tipo: 'online',
      assunto: 'Consulta assistente social',
      profissional: 'Carla Mendes',
      resumo: 'Avaliação da situação familiar e orientações sobre benefícios sociais.',
      proximoAtendimento: '2024-07-15',
      status: 'realizado'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'em-andamento': return 'bg-blue-100 text-blue-800';
      case 'concluido': return 'bg-green-100 text-green-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      case 'realizado': return 'bg-green-100 text-green-800';
      case 'faltou': return 'bg-red-100 text-red-800';
      case 'reagendado': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSaudeColor = (situacao: string) => {
    switch (situacao) {
      case 'boa': return 'text-green-600';
      case 'atencao': return 'text-yellow-600';
      case 'critica': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'psicologico': return '🧠';
      case 'juridico': return '⚖️';
      case 'saude': return '🏥';
      case 'educacao': return '📚';
      case 'assistencia-social': return '🤝';
      default: return '📋';
    }
  };

  const getAtendimentoIcon = (tipo: string) => {
    switch (tipo) {
      case 'presencial': return '🏢';
      case 'telefone': return '📞';
      case 'online': return '💻';
      default: return '📅';
    }
  };

  const StatCard = ({ title, value, subtitle, icon, color = 'bg-[#475F3C]' }: any) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#475F3C]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        <div className={`${color} p-3 rounded-full text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FBF7F1]">
      <header className="bg-[#475F3C] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-[#E4F0D4] rounded-full p-2">
                <span className="text-2xl">👩‍👧‍👦</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Olá, {perfilMae.nome.split(' ')[0]}!</h1>
                <p className="text-sm text-green-200">Bem-vinda ao seu espaço</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-[#3d5235] transition-colors">
                <span className="text-xl">🔔</span>
              </button>
              <button className="p-2 rounded-full hover:bg-[#3d5235] transition-colors">
                <User size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Visão Geral', icon: <Heart size={16} /> },
              { id: 'filhos', label: 'Meus Filhos', icon: <Baby size={16} /> },
              { id: 'encaminhamentos', label: 'Encaminhamentos', icon: <FileText size={16} /> },
              { id: 'historico', label: 'Histórico', icon: <Clock size={16} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#475F3C] text-[#475F3C]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Filhos Cadastrados"
                value={filhos.length}
                subtitle="crianças"
                icon={<Baby size={24} />}
              />
              <StatCard
                title="Encaminhamentos"
                value={encaminhamentos.filter(e => e.status !== 'concluido').length}
                subtitle="em andamento"
                icon={<FileText size={24} />}
              />
              <StatCard
                title="Atendimentos"
                value={atendimentos.length}
                subtitle="total realizados"
                icon={<Calendar size={24} />}
              />
              <StatCard
                title="Próxima Consulta"
                value="17/07"
                subtitle="Dra. Ana Carolina"
                icon={<Clock size={24} />}
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-[#475F3C] mb-4">Seu Perfil</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="flex items-center text-gray-600">
                    <User className="mr-2" size={16} />
                    {perfilMae.nome}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <Phone className="mr-2" size={16} />
                    {perfilMae.telefone}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <MapPin className="mr-2" size={16} />
                    {perfilMae.endereco}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <strong>Situação:</strong> {perfilMae.situacaoTrabalhista}
                  </p>
                  <p className="text-gray-600">
                    <strong>Renda:</strong> {perfilMae.rendaFamiliar}
                  </p>
                  <p className="text-gray-600">
                    <strong>Necessidades:</strong> {perfilMae.necessidadesPrincipais.slice(0, 2).join(', ')}
                    {perfilMae.necessidadesPrincipais.length > 2 && '...'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-[#475F3C] mb-4">Próximos Atendimentos</h2>
              <div className="space-y-3">
                {atendimentos
                  .filter(a => a.proximoAtendimento)
                  .slice(0, 3)
                  .map(atendimento => (
                    <div key={atendimento.id} className="flex items-center justify-between p-3 bg-[#E4F0D4] rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{getAtendimentoIcon(atendimento.tipo)}</span>
                        <div>
                          <p className="font-medium text-gray-900">{atendimento.assunto}</p>
                          <p className="text-sm text-gray-600">{atendimento.profissional}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-[#475F3C]">{atendimento.proximoAtendimento}</p>
                        <p className="text-sm text-gray-500 capitalize">{atendimento.tipo}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'filhos' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#475F3C]">Meus Filhos</h2>
              <button
                onClick={() => setShowAddChild(true)}
                className="bg-[#475F3C] text-white px-4 py-2 rounded-lg hover:bg-[#3d5235] transition-colors flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Adicionar Filho</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filhos.map(filho => (
                <div key={filho.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{filho.nome}</h3>
                    <button
                      onClick={() => setSelectedChild(filho)}
                      className="text-[#475F3C] hover:text-[#3d5235] transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <strong>Idade:</strong> {filho.idade} anos
                    </p>
                    <p className="text-gray-600">
                      <strong>Nascimento:</strong> {new Date(filho.dataNascimento).toLocaleDateString()}
                    </p>
                    {filho.escola && (
                      <p className="text-gray-600">
                        <strong>Escola:</strong> {filho.escola}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">
                        <strong>Saúde:</strong>
                      </span>
                      <span className={`font-medium ${getSaudeColor(filho.situacaoSaude)}`}>
                        {filho.situacaoSaude === 'boa' ? '✅ Boa' : filho.situacaoSaude === 'atencao' ? '⚠️ Atenção' : '🚨 Crítica'}
                      </span>
                    </div>
                    {filho.necessidadesEspeciais && (
                      <div className="mt-3 p-2 bg-yellow-50 rounded">
                        <p className="text-sm text-yellow-800">
                          <strong>Necessidades especiais:</strong> {filho.necessidadesEspeciais}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'encaminhamentos' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#475F3C]">Encaminhamentos</h2>
              <button className="bg-[#475F3C] text-white px-4 py-2 rounded-lg hover:bg-[#3d5235] transition-colors flex items-center space-x-2">
                <Plus size={16} />
                <span>Solicitar Encaminhamento</span>
              </button>
            </div>

            <div className="space-y-4">
              {encaminhamentos.map(encaminhamento => (
                <div key={encaminhamento.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getTipoIcon(encaminhamento.tipo)}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{encaminhamento.descricao}</h3>
                        <p className="text-sm text-gray-600">
                          Solicitado em {new Date(encaminhamento.dataEncaminhamento).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(encaminhamento.status)}`}>
                      {encaminhamento.status.replace('-', ' ')}
                    </span>
                  </div>
                  
                  {encaminhamento.profissionalResponsavel && (
                    <p className="text-gray-600 mb-2">
                      <strong>Profissional:</strong> {encaminhamento.profissionalResponsavel}
                    </p>
                  )}
                  
                  {encaminhamento.observacoes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded">
                      <p className="text-sm text-gray-700">
                        <strong>Observações:</strong> {encaminhamento.observacoes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'historico' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#475F3C]">Histórico de Atendimentos</h2>
            
            <div className="space-y-4">
              {atendimentos.map(atendimento => (
                <div key={atendimento.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getAtendimentoIcon(atendimento.tipo)}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{atendimento.assunto}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(atendimento.data).toLocaleDateString()} - {atendimento.profissional}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(atendimento.status)}`}>
                      {atendimento.status}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-700">{atendimento.resumo}</p>
                  </div>
                  
                  {atendimento.proximoAtendimento && (
                    <div className="mt-3 p-3 bg-[#E4F0D4] rounded">
                      <p className="text-sm text-[#475F3C]">
                        <strong>Próximo atendimento:</strong> {new Date(atendimento.proximoAtendimento).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {(showAddChild || selectedChild) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-[#475F3C] mb-4">
              {selectedChild ? 'Editar Filho' : 'Adicionar Filho'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#475F3C]"
                  defaultValue={selectedChild?.nome || ''}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#475F3C]"
                  defaultValue={selectedChild?.dataNascimento || ''}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Escola</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#475F3C]"
                  defaultValue={selectedChild?.escola || ''}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Situação de Saúde</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#475F3C]"
                  defaultValue={selectedChild?.situacaoSaude || 'boa'}
                >
                  <option value="boa">Boa</option>
                  <option value="atencao">Atenção</option>
                  <option value="critica">Crítica</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Necessidades Especiais</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#475F3C]"
                  rows={3}
                  defaultValue={selectedChild?.necessidadesEspeciais || ''}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowAddChild(false);
                  setSelectedChild(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  // Aqui você salvaria os dados
                  setShowAddChild(false);
                  setSelectedChild(null);
                }}
                className="bg-[#475F3C] text-white px-4 py-2 rounded-lg hover:bg-[#3d5235] transition-colors"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}