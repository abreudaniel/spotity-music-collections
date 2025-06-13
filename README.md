# Requisitos
## Requisitos obrigatórios
- [X] Seguimentação de commits
- [X] Lint
- [X] Autenticação via Spotify
- [X] Listar artistas
- [X] Listar albuns de um artista
- [X] Utilizar paginação (scroll infinito ou não)
- [X] Funcionamento offline
- [X] Testes unitários
- [X] Deploy da aplicação

## Bônus
- [ ] Testes E2E
- [ ] Integração com Sentry
- [ ] CI/CD
- [ ] Responsividade (celular e tablet)
- [X] Qualidade de código (Sonarqube)
- [ ] PWA


# Spotify Music Collections

Uma aplicação web para explorar coleções de músicas do Spotify, permitindo visualizar artistas e seus álbuns.

## 🚀 Tecnologias Utilizadas

- **React** (v19.1.0) - Framework frontend
- **TypeScript** (v4.9.5) - Linguagem de programação
- **TailwindCSS** (v4.1.10) - Framework CSS para estilização
- **React Router DOM** (v6.30.1) - Roteamento
- **Axios** (v1.9.0) - Cliente HTTP
- **Jest** & **Testing Library** - Framework de testes

## 📋 Pré-requisitos

- Node.js (versão LTS recomendada)
- NPM
- Conta no Spotify Developer Portal

## 🔧 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/abreudaniel/spotify-music-collections.git
   cd spotify-music-collections
   ```
2. Instale as dependências:
   ```bash
    bash npm install
   ```
3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```bash
    REACT_APP_SPOTIFY_CLIENT_ID=seu_client_id_aqui 
    REACT_APP_SPOTIFY_REDIRECT_URI=[http://localhost:3000/callback](http://localhost:3000/callback)
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
    bash npm start
   ```
## 🏗️ Arquitetura

O projeto segue uma arquitetura moderna e escalável:

- **Padrão de Arquitetura**: Clean Architecture
- **Gerenciamento de Estado**: Context API do React
- **Componentes**: Abordagem modular e reutilizável
- **Estilização**: Utility-first com TailwindCSS
- **Testes**: Testes unitários com Jest e Testing Library

## 🧪 Testes

Para executar os testes:
   ```bash
    bash npm test
   ```   
Para verificar a cobertura de testes:
   ```bash
    bash npm test -- --coverage
   ```   
## 📦 Build

Para gerar uma build de produção:
   ```bash
    bash npm run build
   ```  

## 🛠️ Ferramentas de Qualidade

- **ESLint** - Análise estática de código
- **Sonarqube** - Análise de qualidade de código
