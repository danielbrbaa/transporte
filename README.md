
---

```md
# 🚚 WLS Cargo – Sistema de Gerenciamento de Rotas e Entregas

![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-MVP-blue)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)

Aplicação web funcional desenvolvida para gerenciamento de **rotas**, **motoristas** e **entregas**, incluindo controle de status, dashboards, histórico e documentação integrada.

Este sistema foi criado como parte do **Projeto de Intervenção – UNINASSAU – 2025**, baseado no relatório acadêmico *“Aplicação Web para Gerenciamento de Rotas e Entregas”*.

---

## 📌 Funcionalidades Principais

### ✔ Dashboard Gerencial
- Total de motoristas, rotas e entregas  
- Gráfico de entregas por status  
- Últimas atualizações registradas  

### ✔ Gerenciamento de Motoristas
- Cadastro, edição e exclusão  
- CPF, telefone, status  
- Listagem em cards  

### ✔ Gerenciamento de Rotas
- Origem, destino, cliente, valor e motorista  
- Edição e exclusão  
- Associação de motorista à rota  

### ✔ Gerenciamento de Entregas
- Criação de entrega  
- Atualização de status  
- Registro automático de histórico  
- Status implementados conforme relatório:
  - **Revertido**
  - **Evidência Inválida**
  - **Contestação Enviada**
  - **NOK**
  - **Entregue**

### ✔ Documentação Interna
Página `/documentacao` contendo:
- Objetivo geral  
- Objetivos específicos  
- Tecnologias  
- Metodologia  
- Resultados esperados  

---

## 🧱 Tecnologias Utilizadas

### Frontend
- React 18  
- TypeScript  
- Vite  
- TailwindCSS  
- shadcn/ui  
- React Router  
- Recharts  

### Backend (simulado)
- LocalStorage  
- Mock API (`services/mockApi.ts`)  

---

## 📁 Arquitetura do Projeto

```

src/
├── assets/              # imagens
├── components/          # componentes reutilizáveis
├── features/            # módulos organizados por domínio
├── layouts/             # estrutura visual (sidebar/header)
├── pages/               # rotas principais
├── router/              # configuração do React Router
├── services/            # mock API e CRUD localStorage
├── store/               # (opcional) estado global
└── utils/               # funções auxiliares

````

---

## 🛠️ Instalação e Execução

### 🔧 Pré-requisitos
- Node.js 18+  
- npm  

---

### ▶️ Instalar dependências
```bash
npm install
````

---

### ▶️ Rodar o ambiente de desenvolvimento

```bash
npm run dev
```

O sistema abrirá em:
👉 **[http://localhost:8080](http://localhost:8080)**

---

### ▶️ Build para produção

```bash
npm run build
npm run preview
```

---

## 📸 Screenshots (adicione depois)

Coloque prints aqui quando quiser:

```
/screenshots/
  dashboard.png
  motoristas.png
  rotas.png
  entregas.png
```

Exemplo no README:

```md
![Dashboard](screenshots/dashboard.png)
```

---

## 🎓 Relação com o Projeto Acadêmico

Este sistema atende aos objetivos do Projeto de Intervenção da UNINASSAU, incluindo:

* Desenvolvimento de uma aplicação web responsiva
* Gerenciamento de rotas, motoristas e entregas
* Controle de status em tempo real
* Dashboards para acompanhamento logístico
* Documentação técnica integrada
* Inclusão digital e prática profissional dos discentes

Conteúdo baseado no relatório original **“Aplicação Web para Gerenciamento de Rotas e Entregas – 2025”**.

---

## 👨‍💻 Autores

* Daniel Aragão – 01555320
* Gabriel Bandeira – 01531782
* Gabryel Santana – 01529087
* Lucca Lima – 01534204
* Osvaldo Queiroz – 01523854
* Luiz Cristiano Apolinário da Silva Filho – 01536154

---

## 📄 Licença

Este projeto é de caráter acadêmico, utilizado para fins de estudo e demonstração.

---

## ⭐ Contribuições

Contribuições são bem-vindas!
Para melhorias, abra uma issue ou envie um pull request.

```

---
