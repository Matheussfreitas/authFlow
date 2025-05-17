# Sistema de Autenticação de Usuários

Este é um sistema completo de autenticação de usuários, desenvolvido com **Next.js** no frontend e **Express.js** no backend. O projeto oferece autenticação própria (com e-mail e senha) e autenticação via OAuth utilizando o Google. Os usuários podem se registrar, fazer login, e acessar funcionalidades protegidas. O backend utiliza tokens JWT para autenticação e o banco de dados PostgreSQL gerenciado pelo Prisma ORM.

## Características do Projeto

- **Autenticação**:
  - Autenticação própria com e-mail e senha.
  - Autenticação OAuth integrada com o Google.
  - Tokens JWT para sessões seguras.
  - Hashing de senhas com Bcrypt.

- **Frontend**:
  - Desenvolvido com **Next.js**.
  - Interface moderna e responsiva utilizando **TailwindCSS**.
  - Componentes reutilizáveis criados com **Shadcn UI**.
  - Gerenciamento de estado com hooks do React.
  - Formulários com **React-Hook-Form** e validação com **Yup**.
  - Notificações com **Sonner**.

- **Backend**:
  - Desenvolvido com **Express.js**.
  - Banco de dados PostgreSQL gerenciado pelo **Prisma ORM**.
  - Rotas RESTful para autenticação própria e OAuth.

- **Banco de Dados**:
  - Estrutura de dados gerenciada pelo Prisma.
  - Modelos para usuários e sessões.

## Ferramentas e Tecnologias Utilizadas

### Frontend
- **Next.js**: Framework React para renderização no lado do servidor e geração de páginas estáticas.
- **TailwindCSS**: Framework CSS para estilização.
- **Shadcn UI**: Biblioteca de componentes acessíveis.
- **Yup**: Validação de formulários.
- **Sonner**: Biblioteca para notificações.
- **Axios**: Cliente HTTP para comunicação com o backend.

### Backend
- **Express.js**: Framework minimalista para Node.js.
- **Prisma ORM**: Gerenciamento do banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **JWT**: Autenticação baseada em tokens.
- **Bcrypt**: Hashing de senhas.
- **OAuth2**: Integração com Google para autenticação social.

### Infraestrutura
- **Docker**: Contêiner para o banco de dados PostgreSQL.

## Como Rodar o Projeto

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **Docker** (para o banco de dados)
- **npm**, **yarn**, ou **pnpm** para gerenciar pacotes

### Configuração do Backend

1. Clone o repositório e navegue até a pasta `backend`:
   ```bash
   cd backend
   ```

2. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`:
     ```bash
     cp .env.example .env
     ```
   - Certifique-se de que a variável `DATABASE_URL` está configurada corretamente.
   - Configure também as variáveis de OAuth do Google (`GOOGLE_CLIENT_ID` e `GOOGLE_CLIENT_SECRET`).

3. Suba o banco de dados com Docker:
   ```bash
   docker-compose up -d
   ```

4. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor backend:
   ```bash
   npm run dev
   ```

O backend estará disponível em `http://localhost:3000`.

### Configuração do Frontend

1. Navegue até a pasta `frontend`:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

O frontend estará disponível em `http://localhost:3001`.

### Fluxo de Autenticação

1. Acesse a página de autenticação em `http://localhost:3001/auth`.
2. Registre-se ou faça login utilizando e-mail/senha ou autentique-se com sua conta Google.
3. Após o login, você será redirecionado para o painel protegido do sistema.

## Estrutura do Projeto

### Backend
- **`src/server.ts`**: Configuração do servidor Express.
- **`src/routes`**: Rotas para autenticação própria e OAuth.
- **`src/controllers`**: Controladores que lidam com a lógica das rotas.
- **`src/services`**: Serviços que encapsulam a lógica de negócios.
- **`src/repositories`**: Repositórios que interagem com o banco de dados via Prisma.

### Frontend
- **`src/app`**: Estrutura de páginas do Next.js.
- **`src/components`**: Componentes reutilizáveis da interface.
- **`src/utils`**: Funções auxiliares, como configuração do Axios.
- **`src/types`**: Tipos TypeScript para o projeto.
