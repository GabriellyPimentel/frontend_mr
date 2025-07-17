# 🌱👩‍👧 Frontend Mãe Raiz 👩🏿‍👧🏿💞

Uma plataforma web moderna e responsiva desenvolvida em **Next.js 15** para conectar mães solo e profissionais de apoio, oferecendo um ambiente seguro e acolhedor para acompanhamento, encaminhamentos e suporte integral.

---

## 📖 Sobre o Projeto

O **Frontend Mãe Raiz** é a interface visual do sistema de apoio para mães solo, desenvolvido como projeto final do módulo 5 do programa **Programadores do Amanhã**. Em apenas uma semana, criamos uma aplicação completa que integra com nossa API backend para oferecer uma experiência de usuário moderna e intuitiva.

### 🌟 Principais Características

- **Interface Responsiva**: Design adaptável para desktop, tablet e mobile
- **Animações Fluidas**: Experiência visual rica com Framer Motion
- **Autenticação Segura**: Sistema de login com proteção de rotas
- **Dashboards Personalizados**: Interfaces específicas para mães solo e profissionais
- **Formulários Validados**: Validação robusta com Zod e React Hook Form
- **Sistema de Fallback**: Funciona offline com localStorage quando API não está disponível

---

## 🚀 Demo

- **🌐 Frontend Deploy**: [frontend-mr-nr1h.vercel.app](https://frontend-mr-nr1h.vercel.app)
- **⚙️ Backend API**: [backend-mr.onrender.com](https://backend-mr.onrender.com)

---

## 🛠️ Tecnologias Utilizadas

### Core Framework
- **Next.js 15.3.5** - Framework React com SSR e otimizações
- **React 19.1.0** - Biblioteca para interfaces de usuário
- **TypeScript 5.8.3** - Tipagem estática para JavaScript

### Estilização & UI
- **Tailwind CSS 4.1.11** - Framework CSS utility-first
- **Framer Motion 12.23.6** - Biblioteca de animações
- **Lucide React 0.525.0** - Ícones modernos e acessíveis

### Formulários & Validação
- **React Hook Form 7.60.0** - Gerenciamento de formulários performático
- **Zod 3.25.76** - Validação de schemas TypeScript-first
- **@hookform/resolvers 3.10.0** - Integração Zod + React Hook Form

### Desenvolvimento
- **PostCSS 8.5.6** - Processamento CSS
- **ESLint & Prettier** - Linting e formatação de código

---

## 📁 Estrutura do Projeto

```
frontend_mr/
├── src/app/
│   ├── components/           # Componentes reutilizáveis
│   │   ├── auth/            # Autenticação e proteção
│   │   │   ├── LoginForm.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── forms/           # Formulários especializados
│   │   │   ├── FormularioMaeSolo.tsx
│   │   │   └── FormularioProfissional.tsx
│   │   ├── pages/           # Componentes de página
│   │   │   ├── CadastroPage.tsx
│   │   │   ├── MaePage.tsx
│   │   │   └── ProfissionalPage.tsx
│   │   └── ui/              # Componentes de interface
│   │       ├── animations/   # Animações customizadas
│   │       ├── CampoComErro.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── ErrorHandle.tsx
│   ├── lib/                 # Utilities e configurações
│   │   └── validations/     # Schemas de validação
│   ├── services/            # Serviços de API e autenticação
│   │   ├── api.ts          # Integração com backend
│   │   └── localAuth.ts    # Sistema de fallback local
│   ├── types/              # Definições TypeScript
│   └── globals.css         # Estilos globais
├── public/                 # Assets estáticos
└── package.json           # Dependências e scripts
```

---

## ⚙️ Instalação e Execução

### 1. **Clone o repositório**
```bash
git clone https://github.com/GabriellyPimentel/frontend_mr.git
cd frontend_mr
```

### 2. **Instale as dependências**
```bash
npm install
```

### 3. **Execute em ambiente de desenvolvimento**
```bash
npm run dev
```

### 4. **Acesse a aplicação**
```
http://localhost:3000
```

---

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento com Turbopack (mais rápido)
npm run dev

# Build para produção
npm run build

# Executar versão de produção
npm start

# Linting do código
npm run lint
```

---

## 👥 Funcionalidades por Tipo de Usuário

### 👩‍👧‍👦 **Mães Solo**
- ✅ Cadastro completo com dados socioeconômicos
- ✅ Dashboard personalizado com estatísticas
- ✅ Gestão de informações dos filhos
- ✅ Acompanhamento de encaminhamentos
- ✅ Histórico de atendimentos
- ✅ Agendamento de consultas

### 🩺 **Profissionais**
- ✅ Cadastro por área de atuação
- ✅ Dashboard de atendimentos
- ✅ Gerenciamento de encaminhamentos
- ✅ Histórico de casos atendidos
- ✅ Relatórios de acompanhamento

---

## 🎨 Design System

### Paleta de Cores
- **Primary**: `#4B6043` (Verde Musgo)
- **Secondary**: `#B17853` (Caramelo)
- **Light**: `#A3B18A` (Verde Claro)
- **Background**: `#F9F4ED` (Creme)

### Princípios de Design
- **Acessibilidade**: Contraste adequado e navegação por teclado
- **Responsividade**: Mobile-first design
- **Consistência**: Componentes reutilizáveis
- **Feedback Visual**: Animações significativas

---

## 🔐 Sistema de Autenticação

### Funcionalidades
- **Login com CPF**: Autenticação usando documento brasileiro
- **Proteção de Rotas**: Middleware para páginas privadas
- **Sessão Persistente**: Mantém usuário logado entre sessões
- **Fallback Local**: Funciona offline para desenvolvimento/testes

### Usuários de Teste (Desenvolvimento)
```javascript
// No console do navegador, execute:
dev.createTest() // Cria usuários de teste
dev.loginMae()   // Login como mãe solo
dev.loginProf()  // Login como profissional
```

---

## 🔄 Integração com Backend

### Sistema Híbrido
A aplicação funciona tanto com a **API real** quanto com **armazenamento local**:

```typescript
// Configuração em src/services/api.ts
const USE_LOCAL_STORAGE = true; // Alterne conforme necessário
```

### Endpoints da API
- `POST /mae-solo/mae/cadastrar` - Cadastro de mãe solo
- `POST /profissional/cadastrar` - Cadastro de profissional  
- `POST /auth/login` - Autenticação

---

## 🧪 Desenvolvimento e Debug

### Comandos de Debug (Console)
```javascript
// Estatísticas do sistema
dev.stats()

// Criar usuários de teste
dev.createTest()

// Login rápido
dev.loginMae()  // Mãe solo
dev.loginProf() // Profissional

// Limpar dados
dev.clear()

// Teste completo
dev.test()
```

### Validações
- **CPF**: Validação matemática em produção, flexível em desenvolvimento
- **Formulários**: Validação em tempo real com feedback visual
- **Tipos**: TypeScript garante consistência de dados

---

## 📱 Responsividade

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

### Funcionalidades Mobile
- ✅ Touch gestures
- ✅ Teclado virtual otimizado
- ✅ Menu hamburger
- ✅ Cards deslizáveis

---

## 🚀 Deploy

### Vercel (Recomendado)
```bash
# Deploy automático conectado ao GitHub
vercel --prod
```

### Build Manual
```bash
npm run build
npm start
```

---

## 🛡️ Tratamento de Erros

### ErrorBoundary
- Captura erros React não tratados
- Interface amigável para usuário
- Logs detalhados em desenvolvimento

### Toast Notifications
```typescript
const { showError, showSuccess, showWarning } = useErrorToast();
```

---

## 🎯 Próximas Funcionalidades

- [ ] Chat em tempo real entre mães e profissionais
- [ ] Sistema de notificações push
- [ ] Calendário integrado para agendamentos
- [ ] Upload de documentos
- [ ] Relatórios em PDF
- [ ] Modo offline completo
- [ ] Aplicativo mobile (React Native)

---

## 🤝 Contribuindo

1. **Fork** o projeto
2. **Clone** seu fork
3. **Crie** uma branch para sua feature
4. **Commit** suas mudanças
5. **Push** para a branch
6. **Abra** um Pull Request

---

## 👨‍💻 Equipe de Desenvolvimento

- **Gabrielly Pimentel Vicente** - Desenvolvimento Full-Stack
- **Bia Vilela de Almeida** - UI/UX Design  
- **Dèsirée Vitória da Silva Moura** - Frontend
- **Riane Ferreira Menezes** - Backend
- **Kauan Schuldiner Pimentel Gomes** - Backend
- **Luiz Miguel Santos de Jesus** - Banco de Dados

---

## 📄 Licença

Este projeto está sob a licença **MIT** - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🙏 Agradecimentos

- **Programadores do Amanhã** - Pela oportunidade de aprendizado
- **Mentores e Instrutores** - Pelo suporte técnico
- **Colegas de Turma** - Pela colaboração e feedback
- **Comunidade Open Source** - Pelas ferramentas incríveis

---

## 📞 Contato

- **LinkedIn**: [Projeto - API Mãe Raiz](link_da_postagem_do_linkedin)
- **Portfolio**: [GabriellyPimentel.dev](https://portfolio-link)
- **Email**: gabrielly@maeraiz.org

---

> 💡 **Desenvolvido com ❤️ para fortalecer mães solo e promover justiça social através da tecnologia.**
