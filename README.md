# Gerenciador de Tarefas

Este é um projeto de Gerenciador de Tarefas desenvolvido com **Next.js** no frontend e **Express.js** no backend. Ele permite que os usuários gerenciem tarefas, incluindo criação, edição, exclusão e filtragem por status e prioridade. O projeto utiliza autenticação baseada em tokens JWT e um banco de dados PostgreSQL gerenciado pelo Prisma ORM.

## Características do Projeto

- **Frontend**:
  - Desenvolvido com **Next.js**.
  - Interface moderna e responsiva utilizando **TailwindCSS**.
  - Componentes reutilizáveis criados com **Shadcn UI**.
  - Gerenciamento de estado com hooks do React.
  - Validação de formulários com **Yup**.
  - Notificações com **Sonner**.

- **Backend**:
  - Desenvolvido com **Express.js**.
  - Banco de dados PostgreSQL gerenciado pelo **Prisma ORM**.
  - Autenticação com **JWT**.
  - Rotas RESTful para autenticação e gerenciamento de tarefas.

- **Banco de Dados**:
  - Estrutura de dados gerenciada pelo Prisma.
  - Modelos para usuários e tarefas com relacionamentos.

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
2. Registre-se ou faça login.
3. Após o login, você será redirecionado para o painel de tarefas.

## Estrutura do Projeto

### Backend
- **`src/server.ts`**: Configuração do servidor Express.
- **`src/routes`**: Rotas para autenticação e tarefas.
- **`src/controllers`**: Controladores que lidam com a lógica das rotas.
- **`src/services`**: Serviços que encapsulam a lógica de negócios.
- **`src/repositories`**: Repositórios que interagem com o banco de dados via Prisma.

### Frontend
- **`src/app`**: Estrutura de páginas do Next.js.
- **`src/components`**: Componentes reutilizáveis da interface.
- **`src/utils`**: Funções auxiliares, como configuração do Axios.
- **`src/types`**: Tipos TypeScript para o projeto.
