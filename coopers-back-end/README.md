# Backend - To-Do List Full Stack

Este é o servidor da aplicação, responsável pela API, autenticação, banco de dados e envio de e-mails.

## Tecnologias

- Node.js, Express
- MySQL com Knex (migrations e queries)
- JWT para autenticação via cookies
- Nodemailer para envio de e-mails

## Pré-requisitos

- Node.js (v16+ recomendado)
- npm ou yarn
- MySQL rodando e configurado

## Configuração

1. Clone o repositório e entre na pasta backend:

```bash
cd coopers-back-end
```

2. Instale as dependências:

```bash
npm i
```

3. Copie o `.env.example` na raiz da pasta backend e preencha as variaveis:

4. Crie o banco de dados no MySQL conforme a variável `DB_NAME`.

## Rodando o servidor

```bash
npm run dev
```

O servidor rodará, por padrão, na porta 3000.

## Endpoints principais

- `/auth/login` - login do usuário
- `/auth/register` - cadastro
- `/api/tasks` - CRUD de tarefas
- `/api/contact` - envio de e-mail via formulário

## Observações

- Mantenha o banco MySQL rodando.
- Configure corretamente as variáveis do `.env` para autenticação e envio de e-mails.
