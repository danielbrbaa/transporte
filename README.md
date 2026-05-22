# 🚚 WLS Cargo – Sistema de Gerenciamento de Rotas, Motoristas e Entregas

![Status](https://img.shields.io/badge/status-MVP-blue)
![License](https://img.shields.io/badge/license-Acadêmico-green)
![React](https://img.shields.io/badge/React-18.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4-38BDF8)

O **WLS Cargo** é um sistema web completo desenvolvido para gerenciamento de **motoristas**, **rotas** e **entregas**, incluindo controle de status, dashboards e histórico operacional.  
Este projeto foi criado no contexto do **Projeto de Intervenção – UNINASSAU (2025)**, seguindo todos os requisitos funcionais descritos no relatório acadêmico oficial.

---

## 📑 Sumário
1. [Visão Geral](#-visão-geral)  
2. [Funcionalidades](#-funcionalidades)  
3. [Tecnologias Utilizadas](#-tecnologias-utilizadas)  
4. [Arquitetura do Projeto](#-arquitetura-do-projeto)  
5. [Como Executar o Projeto](#-como-executar-o-projeto)  
6. [Estrutura Técnica](#-estrutura-técnica)  
7. [Relação com o Projeto Acadêmico](#-relação-com-o-projeto-acadêmico)  
8. [Autores](#-autores)  

---

# 📌 Visão Geral

O sistema tem como objetivo substituir processos manuais baseados em planilhas por uma **solução digital prática**, acessível e eficiente.  
Além disso, promove a **inclusão digital** e o desenvolvimento técnico dos estudantes envolvidos no projeto.

O usuário pode:
- Registrar motoristas  
- Criar rotas e associá-las a motoristas  
- Registrar entregas  
- Atualizar status de entrega  
- Consultar dashboards de desempenho  
- Visualizar histórico completo das operações  

---

# 🚀 Funcionalidades

### 🧑‍✈️ Gerenciamento de Motoristas
- Criar, editar e excluir motoristas  
- Campos: `nome`, `cpf`, `telefone`, `status`  
- Interface em cards  

### 🛣️ Gerenciamento de Rotas
- Criar rotas completas  
- Associar motorista  
- Origem, destino, valor, cliente, data e observações  
- Edição e exclusão  

### 📦 Gerenciamento de Entregas
- Criação de entregas vinculadas a rotas  
- Atualização de status conforme relatório:
  - **Revertido**  
  - **Evidência Inválida**  
  - **Contestação Enviada**  
  - **NOK**  
  - **Entregue**  
- Histórico automático de atualizações  

### 📊 Dashboard Gerencial
- Total de motoristas, rotas e entregas  
- Gráfico de entregas por status  
- Lista das últimas entregas atualizadas  

### 📘 Documentação Interna Integrada
- Objetivos  
- Metodologia  
- Resultados esperados  
- Tecnologias usadas  

---

# 🧱 Tecnologias Utilizadas

### **Frontend**
- React 18  
- TypeScript  
- Vite  
- TailwindCSS  
- shadcn/ui  
- React Router  
- Recharts  

### **Backend (simulado)**
- API mockada utilizando `localStorage`
- Serviços separados por domínio (`driversApi`, `routesApi`, `deliveriesApi`)

---

# 🏗 Arquitetura do Projeto

```

src/
├── assets/           # imagens, logos, ícones
├── components/       # componentes reutilizáveis (UI)
├── features/         # lógica separada por domínio
├── layouts/          # estrutura visual (sidebar/header)
├── pages/            # rotas da aplicação
├── router/           # configuração do React Router
├── services/         # mock API e persistência localStorage
├── store/            # (opcional) estado centralizado
└── utils/            # funções auxiliares

````

---

# ▶ Como Executar o Projeto

### 🔧 **Pré-requisitos**
- Node.js 18+  
- npm  

---

## 📥 1. Instalar dependências
```bash
npm install
````

---

## 🚀 2. Rodar em modo desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em:
👉 **[http://localhost:8080](http://localhost:8080)**

---

## 🏗 3. Gerar build de produção

```bash
npm run build
npm run preview
```

---

# 🔍 Estrutura Técnica

### Serviço de API Mockada

O arquivo `services/mockApi.ts` simula um backend real:

* CRUD completo para:

  * motoristas
  * rotas
  * entregas
* Controle de histórico de status
* Persistência via `localStorage`

### Interface Moderna

* Componentes do **shadcn/ui**
* Dashboard interativo com **Recharts**
* Layout responsivo baseado em TailwindCSS

---

# 🎓 Relação com o Projeto Acadêmico

Este software foi desenvolvido para atender aos objetivos descritos no relatório **Aplicação Web para Gerenciamento de Rotas e Entregas – 2025**, incluindo:

* Desenvolvimento de sistema web responsivo
* Gerenciamento completo de rotas, motoristas e entregas
* Controle de status em tempo real
* Centralização de informações
* Construção de dashboards para tomada de decisão
* Documentação integrada
* Trabalho prático que simula ciclo de vida real de software

O projeto está alinhado com a proposta de **inclusão digital**, modernizando processos internos da transportadora parceira.


---

# 📄 Licença

Projeto de caráter **acadêmico**, não destinado a uso comercial.

