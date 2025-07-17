'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Baby, Calendar, Clock, Edit2, FileText, Heart, MapPin, Phone, Plus, User, LogOut } from 'lucide-react';
import { getCurrentUserLocal, logoutLocal } from '../../services/localAuth';
import { User as UserType } from '../../types';
import { useRouter } from 'next/navigation';

// Tipos de dados
type PerfilMae = {
    nome: string;
    telefone: string;
    endereco: string;
    situacaoTrabalhista: string;
    rendaFamiliar: string;
    necessidadesPrincipais: string[];
};

type Filho = {
    id: string;
    nome: string;
    idade: number;
    dataNascimento: string;
    escola?: string;
    situacaoSaude: 'boa' | 'atencao' | 'critica';
    necessidadesEspeciais?: string;
};

type EncaminhamentoStatus = 'pendente' | 'em-andamento' | 'concluido';
type EncaminhamentoTipo = 'saude' | 'educacao' | 'social';

type Encaminhamento = {
    id: string;
    descricao: string;
    dataEncaminhamento: string;
    status: EncaminhamentoStatus;
    tipo: EncaminhamentoTipo;
    profissionalResponsavel?: string;
    observacoes?: string;
};

type AtendimentoTipo = 'consulta' | 'exame' | 'terapia' | 'outro';
type AtendimentoStatus = 'agendado' | 'realizado' | 'cancelado';

type Atendimento = {
    id: string;
    assunto: string;
    data: string;
    profissional: string;
    tipo: AtendimentoTipo;
    status: AtendimentoStatus;
    resumo: string;
    proximoAtendimento?: string;
};

type TabType = 'overview' | 'filhos' | 'encaminhamentos' | 'historico';

// Componente StatCard com tipagem adequada
type StatCardProps = {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ReactNode;
    color?: string;
    className?: string;
};

const StatCard = ({ title, value, subtitle, icon, color = 'bg-[#475F3C]', className = '' }: StatCardProps) => (
    <motion.div 
        className={`bg-white rounded-lg shadow-md p-6 border-l-4 border-[#475F3C] ${className}`}
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
                className={`${color} p-3 rounded-full text-white`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
            >
                {icon}
            </motion.div>
        </div>
    </motion.div>
);

// Componente principal
export default function MaternalDashboard() {
    const [currentUser, setCurrentUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [showAddChild, setShowAddChild] = useState(false);
    const [selectedChild, setSelectedChild] = useState<Filho | null>(null);
    const [formData, setFormData] = useState<Partial<Filho>>({});
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const router = useRouter();

    // Carrega dados do usuário logado
    useEffect(() => {
        console.log('🔍 MaePage: Iniciando verificação de usuário...');
        
        try {
            const user = getCurrentUserLocal();
            console.log('👤 Usuário encontrado:', user);
            
            if (!user) {
                console.log('❌ Nenhum usuário logado, redirecionando...');
                router.push('/login');
                return;
            }
            
            if (user.tipo !== 'mae_solo') {
                console.log('❌ Usuário não é mãe solo:', user.tipo);
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

    // Dados mockados (substituir por chamadas API em produção)
    const [perfilMae, setPerfilMae] = useState<PerfilMae>({
        nome: 'Maria da Silva',
        telefone: '(11) 98765-4321',
        endereco: 'Rua das Flores, 123 - São Paulo/SP',
        situacaoTrabalhista: 'Empregada',
        rendaFamiliar: '2 a 3 salários mínimos',
        necessidadesPrincipais: ['Acompanhamento pediátrico', 'Suplementação alimentar', 'Orientação psicológica']
    });

    // Atualiza o perfil quando o usuário é carregado
    useEffect(() => {
        if (currentUser) {
            setPerfilMae(prev => ({
                ...prev,
                nome: currentUser.nome,
                telefone: currentUser.telefone || prev.telefone,
                endereco: currentUser.endereco || prev.endereco,
                situacaoTrabalhista: currentUser.situacaoTrabalho || prev.situacaoTrabalhista,
                rendaFamiliar: currentUser.rendaMensal ? 
                    `R$ ${currentUser.rendaMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 
                    prev.rendaFamiliar
            }));
        }
    }, [currentUser]);

    const [filhos, setFilhos] = useState<Filho[]>([
        {
            id: '1',
            nome: 'João Silva',
            idade: 5,
            dataNascimento: '2018-05-15',
            escola: 'EMEF Jardim das Flores',
            situacaoSaude: 'boa'
        },
        {
            id: '2',
            nome: 'Ana Silva',
            idade: 2,
            dataNascimento: '2021-11-22',
            situacaoSaude: 'atencao',
            necessidadesEspeciais: 'Acompanhamento fonoaudiológico'
        }
    ]);

    const [encaminhamentos] = useState<Encaminhamento[]>([
        {
            id: '1',
            descricao: 'Consulta com pediatra',
            dataEncaminhamento: '2023-06-10',
            status: 'concluido',
            tipo: 'saude',
            profissionalResponsavel: 'Dra. Ana Carolina'
        },
        {
            id: '2',
            descricao: 'Avaliação psicológica',
            dataEncaminhamento: '2023-07-01',
            status: 'em-andamento',
            tipo: 'saude',
            profissionalResponsavel: 'Dr. Carlos Mendes'
        }
    ]);

    const [atendimentos] = useState<Atendimento[]>([
        {
            id: '1',
            assunto: 'Consulta de rotina',
            data: '2023-06-15',
            profissional: 'Dra. Ana Carolina',
            tipo: 'consulta',
            status: 'realizado',
            resumo: 'Consulta de acompanhamento do desenvolvimento infantil',
            proximoAtendimento: '2023-08-15'
        },
        {
            id: '2',
            assunto: 'Avaliação nutricional',
            data: '2023-06-20',
            profissional: 'Nutricionista Juliana',
            tipo: 'consulta',
            status: 'realizado',
            resumo: 'Ajuste no plano alimentar para ganho de peso'
        }
    ]);

    // Função de logout
    const handleLogout = () => {
        console.log('🚪 Fazendo logout...');
        logoutLocal();
        router.push('/login');
    };

    // Funções auxiliares memoizadas
    const getSaudeColor = useMemo(() => (situacao: Filho['situacaoSaude']) => {
        switch (situacao) {
            case 'boa': return 'text-green-600';
            case 'atencao': return 'text-yellow-600';
            case 'critica': return 'text-red-600';
            default: return 'text-gray-600';
        }
    }, []);

    const getStatusColor = useMemo(() => (status: EncaminhamentoStatus | AtendimentoStatus) => {
        switch (status) {
            case 'pendente': return 'bg-yellow-100 text-yellow-800';
            case 'em-andamento': return 'bg-blue-100 text-blue-800';
            case 'concluido': return 'bg-green-100 text-green-800';
            case 'agendado': return 'bg-purple-100 text-purple-800';
            case 'realizado': return 'bg-green-100 text-green-800';
            case 'cancelado': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }, []);

    const getAtendimentoIcon = useMemo(() => (tipo: AtendimentoTipo) => {
        switch (tipo) {
            case 'consulta': return '👩‍⚕️';
            case 'exame': return '🩺';
            case 'terapia': return '🧠';
            default: return '📅';
        }
    }, []);

    const getTipoIcon = useMemo(() => (tipo: EncaminhamentoTipo) => {
        switch (tipo) {
            case 'saude': return '🏥';
            case 'educacao': return '🏫';
            case 'social': return '🤝';
            default: return '📋';
        }
    }, []);

    // Calcula a idade a partir da data de nascimento
    const calculateAge = (birthDate: string): number => {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }

        return age;
    };

    // Manipuladores de eventos
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Limpa o erro quando o usuário começa a digitar
        if (formErrors[name]) {
            setFormErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!formData.nome?.trim()) {
            errors.nome = 'Nome é obrigatório';
        }

        if (!formData.dataNascimento) {
            errors.dataNascimento = 'Data de nascimento é obrigatória';
        } else if (new Date(formData.dataNascimento) > new Date()) {
            errors.dataNascimento = 'Data de nascimento não pode ser no futuro';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSaveChild = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (selectedChild) {
            // Edição
            setFilhos(prev => prev.map(filho =>
                filho.id === selectedChild.id ? {
                    ...filho,
                    ...formData,
                    idade: formData.dataNascimento ? calculateAge(formData.dataNascimento) : filho.idade
                } : filho
            ));
        } else {
            // Adição
            const newChild: Filho = {
                id: Date.now().toString(),
                nome: formData.nome || '',
                dataNascimento: formData.dataNascimento || '',
                idade: formData.dataNascimento ? calculateAge(formData.dataNascimento) : 0,
                escola: formData.escola,
                situacaoSaude: formData.situacaoSaude || 'boa',
                necessidadesEspeciais: formData.necessidadesEspeciais
            };
            setFilhos(prev => [...prev, newChild]);
        }

        // Limpa o formulário e fecha o modal
        setFormData({});
        setShowAddChild(false);
        setSelectedChild(null);
    };

    const handleEditChild = (filho: Filho) => {
        setSelectedChild(filho);
        setFormData({
            nome: filho.nome,
            dataNascimento: filho.dataNascimento,
            escola: filho.escola,
            situacaoSaude: filho.situacaoSaude,
            necessidadesEspeciais: filho.necessidadesEspeciais
        });
        setShowAddChild(true);
    };

    // Tabs de navegação
    const tabs = useMemo(() => [
        { id: 'overview', label: 'Visão Geral', icon: <Heart size={16} /> },
        { id: 'filhos', label: 'Meus Filhos', icon: <Baby size={16} /> },
        { id: 'encaminhamentos', label: 'Encaminhamentos', icon: <FileText size={16} /> },
        { id: 'historico', label: 'Histórico', icon: <Clock size={16} /> }
    ], []);

    // Dados calculados
    const encaminhamentosEmAndamento = useMemo(() =>
        encaminhamentos.filter(e => e.status !== 'concluido').length,
        [encaminhamentos]
    );

    const proximosAtendimentos = useMemo(() =>
        atendimentos.filter(a => a.proximoAtendimento).slice(0, 3),
        [atendimentos]
    );

    // Tela de loading
    if (loading) {
        return (
            <div className="min-h-screen bg-[#FBF7F1] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4B6043] mx-auto mb-4"></div>
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
            {/* Cabeçalho */}
            <header className="bg-[#475F3C] text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <motion.div 
                                className="bg-[#E4F0D4] rounded-full p-2"
                                whileHover={{ rotate: 360, scale: 1.1 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="text-2xl" role="img" aria-label="Família">👩‍👧‍👦</span>
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
                                    className="text-sm text-green-200"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    Bem-vinda ao seu espaço
                                </motion.p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <motion.button
                                aria-label="Notificações"
                                className="p-2 rounded-full hover:bg-[#3d5235] transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <span className="text-xl" role="img" aria-hidden="true">🔔</span>
                            </motion.button>
                            <motion.button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 p-2 rounded-full hover:bg-[#3d5235] transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Sair"
                            >
                                <LogOut size={20} aria-hidden="true" />
                                <span className="text-sm">Sair</span>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navegação */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8">
                        {tabs.map(tab => (
                            <motion.button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as TabType)}
                                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                        ? 'border-[#475F3C] text-[#475F3C]'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                aria-current={activeTab === tab.id ? 'page' : undefined}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Conteúdo Principal */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Visão Geral */}
                {activeTab === 'overview' && (
                    <motion.div 
                        className="space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard
                                title="Filhos Cadastrados"
                                value={filhos.length}
                                subtitle="crianças"
                                icon={<Baby size={24} aria-hidden="true" />}
                            />
                            <StatCard
                                title="Encaminhamentos"
                                value={encaminhamentosEmAndamento}
                                subtitle="em andamento"
                                icon={<FileText size={24} aria-hidden="true" />}
                            />
                            <StatCard
                                title="Atendimentos"
                                value={atendimentos.length}
                                subtitle="total realizados"
                                icon={<Calendar size={24} aria-hidden="true" />}
                            />
                            <StatCard
                                title="Próxima Consulta"
                                value="17/07"
                                subtitle="Dra. Ana Carolina"
                                icon={<Clock size={24} aria-hidden="true" />}
                            />
                        </div>

                        <motion.div 
                            className="bg-white rounded-lg shadow-md p-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                        >
                            <h2 className="text-xl font-bold text-[#475F3C] mb-4">Seu Perfil</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <p className="flex items-center text-gray-600">
                                        <User className="mr-2" size={16} aria-hidden="true" />
                                        {perfilMae.nome}
                                    </p>
                                    <p className="flex items-center text-gray-600">
                                        <Phone className="mr-2" size={16} aria-hidden="true" />
                                        {perfilMae.telefone}
                                    </p>
                                    <p className="flex items-center text-gray-600">
                                        <MapPin className="mr-2" size={16} aria-hidden="true" />
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
                        </motion.div>

                        <motion.div 
                            className="bg-white rounded-lg shadow-md p-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                        >
                            <h2 className="text-xl font-bold text-[#475F3C] mb-4">Próximos Atendimentos</h2>
                            <div className="space-y-3">
                                {proximosAtendimentos.map((atendimento, index) => (
                                    <motion.div 
                                        key={atendimento.id} 
                                        className="flex items-center justify-between p-3 bg-[#E4F0D4] rounded-lg"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <span className="text-xl" role="img" aria-label={atendimento.tipo}>
                                                {getAtendimentoIcon(atendimento.tipo)}
                                            </span>
                                            <div>
                                                <p className="font-medium text-gray-900">{atendimento.assunto}</p>
                                                <p className="text-sm text-gray-600">{atendimento.profissional}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-[#475F3C]">
                                                {atendimento.proximoAtendimento && new Date(atendimento.proximoAtendimento).toLocaleDateString()}
                                            </p>
                                            <p className="text-sm text-gray-500 capitalize">{atendimento.tipo}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Outras abas */}
                {activeTab === 'filhos' && (
                    <motion.div 
                        className="space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-[#475F3C]">Meus Filhos</h2>
                            <motion.button
                                onClick={() => {
                                    setSelectedChild(null);
                                    setFormData({});
                                    setShowAddChild(true);
                                }}
                                className="bg-[#475F3C] text-white px-4 py-2 rounded-lg hover:bg-[#3d5235] transition-colors flex items-center space-x-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Adicionar filho"
                            >
                                <Plus size={16} aria-hidden="true" />
                                <span>Adicionar Filho</span>
                            </motion.button>
                        </div>

                        {filhos.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-md p-6 text-center">
                                <p className="text-gray-600">Nenhum filho cadastrado ainda.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filhos.map((filho, index) => (
                                    <motion.div 
                                        key={filho.id} 
                                        className="bg-white rounded-lg shadow-md p-6"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold text-gray-900">{filho.nome}</h3>
                                            <motion.button
                                                onClick={() => handleEditChild(filho)}
                                                className="text-[#475F3C] hover:text-[#3d5235] transition-colors"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                aria-label={`Editar ${filho.nome}`}
                                            >
                                                <Edit2 size={16} aria-hidden="true" />
                                            </motion.button>
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
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Encaminhamentos */}
                {activeTab === 'encaminhamentos' && (
                    <motion.div 
                        className="space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-[#475F3C]">Encaminhamentos</h2>
                            <motion.button
                                className="bg-[#475F3C] text-white px-4 py-2 rounded-lg hover:bg-[#3d5235] transition-colors flex items-center space-x-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Solicitar encaminhamento"
                            >
                                <Plus size={16} aria-hidden="true" />
                                <span>Solicitar Encaminhamento</span>
                            </motion.button>
                        </div>

                        {encaminhamentos.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-md p-6 text-center">
                                <p className="text-gray-600">Nenhum encaminhamento registrado.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {encaminhamentos.map((encaminhamento, index) => (
                                    <motion.div 
                                        key={encaminhamento.id} 
                                        className="bg-white rounded-lg shadow-md p-6"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <span className="text-2xl" role="img" aria-label={encaminhamento.tipo}>
                                                    {getTipoIcon(encaminhamento.tipo)}
                                                </span>
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
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Histórico */}
                {activeTab === 'historico' && (
                    <motion.div 
                        className="space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold text-[#475F3C]">Histórico de Atendimentos</h2>

                        {atendimentos.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-md p-6 text-center">
                                <p className="text-gray-600">Nenhum atendimento registrado.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {atendimentos.map((atendimento, index) => (
                                    <motion.div 
                                        key={atendimento.id} 
                                        className="bg-white rounded-lg shadow-md p-6"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <span className="text-2xl" role="img" aria-label={atendimento.tipo}>
                                                    {getAtendimentoIcon(atendimento.tipo)}
                                                </span>
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
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </main>

            {/* Modal para adicionar/editar filho */}
            {showAddChild && (
                <motion.div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div 
                        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
                        initial={{ opacity: 0, scale: 0.9, y: -50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="text-lg font-semibold text-[#475F3C] mb-4">
                            {selectedChild ? 'Editar Filho' : 'Adicionar Filho'}
                        </h3>
                        <form onSubmit={handleSaveChild}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                                    <input
                                        id="nome"
                                        name="nome"
                                        type="text"
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#475F3C] ${formErrors.nome ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        value={formData.nome || ''}
                                        onChange={handleInputChange}
                                    />
                                    {formErrors.nome && <p className="mt-1 text-sm text-red-600">{formErrors.nome}</p>}
                                </div>
                                <div>
                                    <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento *</label>
                                    <input
                                        id="dataNascimento"
                                        name="dataNascimento"
                                        type="date"
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#475F3C] ${formErrors.dataNascimento ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        value={formData.dataNascimento || ''}
                                        onChange={handleInputChange}
                                        max={new Date().toISOString().split('T')[0]}
                                    />
                                    {formErrors.dataNascimento && <p className="mt-1 text-sm text-red-600">{formErrors.dataNascimento}</p>}
                                </div>
                                <div>
                                    <label htmlFor="escola" className="block text-sm font-medium text-gray-700 mb-1">Escola</label>
                                    <input
                                        id="escola"
                                        name="escola"
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#475F3C]"
                                        value={formData.escola || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="situacaoSaude" className="block text-sm font-medium text-gray-700 mb-1">Situação de Saúde</label>
                                    <select
                                        id="situacaoSaude"
                                        name="situacaoSaude"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#475F3C]"
                                        value={formData.situacaoSaude || 'boa'}
                                        onChange={handleInputChange}
                                    >
                                        <option value="boa">Boa</option>
                                        <option value="atencao">Atenção</option>
                                        <option value="critica">Crítica</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="necessidadesEspeciais" className="block text-sm font-medium text-gray-700 mb-1">Necessidades Especiais</label>
                                    <textarea
                                        id="necessidadesEspeciais"
                                        name="necessidadesEspeciais"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#475F3C]"
                                        rows={3}
                                        value={formData.necessidadesEspeciais || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <motion.button
                                    type="button"
                                    onClick={() => {
                                        setShowAddChild(false);
                                        setSelectedChild(null);
                                        setFormData({});
                                        setFormErrors({});
                                    }}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Cancelar
                                </motion.button>
                                <motion.button
                                    type="submit"
                                    className="bg-[#475F3C] text-white px-4 py-2 rounded-lg hover:bg-[#3d5235] transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Salvar
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    );
}