# Demo Online

Você pode acessar o sistema online aqui:  
[https://coopers.lucashemi.xyz](https://coopers.lucashemi.xyz)

# 📌 Introdução

O objetivo deste projeto foi desenvolver uma aplicação full stack com foco em **fidelidade ao layout Figma** e **abordagem mobile-first**. A aplicação deveria permitir:

- Um sistema de autenticação para que cada usuário visualize suas próprias tarefas;
- Um CRUD completo de tarefas com drag-and-drop;
- Um carrossel de posts;
- Um formulário de contato com envio de e-mail.

O front-end foi desenvolvido com **React**, e o back-end com **Node.js**, com atenção especial à **responsividade, acessibilidade e organização do código**.

# 🧠 Planejamento

Iniciei o projeto com uma fase de estudo e planejamento detalhado:

- Análise do layout no Figma;
- Estimativas de esforço por funcionalidade;
- Organização das tarefas no **ClickUp** com cronograma de 6 dias;
- Definição do esquema do banco de dados;
- Escolha e validação das tecnologias a serem usadas no front-end e back-end.

Esse planejamento me ajudou a manter o foco durante o desenvolvimento e entregas diárias.

# 🛠 Tecnologias Utilizadas

### Front-end

- **React**
- **CSS Modules**
- **dnd-kit** (drag-and-drop)
- **TanStack Query** e **Axios** (comunicação com API)

### Back-end

- **Node.js**, **Express**
- **Knex** (ORM para MySQL)
- **JWT via cookies** (autenticação)
- **Nodemailer** (envio de e-mails)

### Outros

- **MySQL** (banco de dados relacional)
- **ClickUp** (gerenciamento de tarefas)
- **Git** (versionamento e controle de código)
- **Nginx** (servidor)

# ⚙️ Desenvolvimento

### Cronograma de execução:

1. Estudo, planejamento e estrutura inicial do front-end;
2. Interface e primeiros componentes;
3. CRUD funcional e início da API;
4. Conclusão do back-end e integração com banco de dados;
5. Carrossel, formulário e footer;
6. Deploy, testes manuais e documentação.

Durante o desenvolvimento, busquei equilibrar **entregas funcionais**, **qualidade visual** e **bom uso de bibliotecas modernas**, mesmo em aspectos que exigiram aprendizado durante a execução.

## 📐 HTML e Componentização

- Estrutura semântica e acessível;
- Reaproveitamento de componentes sempre que possível;
- Componentes distintos (como botões) mantidos separados por clareza;
- Escolhas feitas visando legibilidade e manutenibilidade do projeto.

🛠️ _Próximos passos_: planejo modularizar mais alguns componentes, como o AuthForm, e padronizar interfaces para facilitar escalabilidade em projetos maiores.

## 🎨 CSS e Responsividade

- Uso de **CSS Modules** e variáveis globais;
- Medidas responsivas com `rem`, `%`, `vh/vw`;
- Layout mobile simplificado (sem imagens pesadas e com fontes 20% menores);
- Compatibilidade testada em diferentes navegadores (Chrome, Firefox e Edge);
- Correção de bug de `max-width` no Firefox.

🛠️ _Melhoria contínua_: estudar e aplicar metodologias como CSS-in-JS para escalabilidade futura.

## ♿ Acessibilidade

- Utilização do leitor de tela **NVDA** para testes;
- `aria-roles`, elementos semânticos e estrutura acessível;
- Avaliação no Lighthouse:

  - **100/100** em melhores práticas;
  - **96/100** em acessibilidade.
  - **83/100** em SEO.
  - **82/100** em performance.

Acredito na importância de construir interfaces inclusivas e acessíveis, e sigo aprendendo constantemente sobre esse tema.

## ⚛️ React e Lógica da To-do List

- Gestão de estado com **Context API + useReducer**;
- Interface intuitiva: clique no nome da tarefa abre o input de edição;
- Suporte a tarefas default (sandbox local) e sincronização com API ao logar;
- Drag-and-drop funcional com `dnd-kit`, mesmo com desafios técnicos;
- Organização da lista com inserção no topo e reordenação dinâmica.

🛠️ _Melhoria futura_: revisar lógica de drag-and-drop com mais testes automatizados e estudos aprofundados da lib `dnd-kit`.

## 🔧 Back-end

- Autenticação com **JWT** via cookies (login e persistência);
- CRUD completo com reordenação de tarefas no banco;
- Envio de e-mail com template via **Nodemailer** (testado via API);
- Organização do banco com **migrations do Knex**;
- Middleware para segurança e validação de rotas protegidas.
- Teste de integração com Jest

🛠️ _Melhoria futura_: implementar outros testes de integração.

# 🧗‍♂️ Desafios e Soluções

- **Gerenciar o tempo e escopo do projeto**
  → Planejamento inicial no ClickUp com entregas divididas por dia.

- **Fidelidade ao layout no Figma**
  → Criação de variáveis CSS e foco no detalhamento visual; em projetos futuros, pretendo anotar medidas e tokens com mais precisão.

- **Drag-and-drop com `dnd-kit`**
  → Resolvi grande parte dos desafios, mas restaram dois bugs:

  - Scroll infinito ao arrastar a tela segurando o elemento e depois fazer drop;
  - Duplicação de tarefas ao soltar sobre elementos com `onClick`.

  Tentei soluções com `overflow: hidden` e `useRef`, mas sem sucesso total. Continuo tentado arrumar esses bugs.

- **Conciliar lista local (sandbox) com dados da API**
  → Implementei fallback de estado para usuários não autenticados, com transição automática ao logar.

# ✅ Resultados Finais

A aplicação permite:

- Criar, visualizar, editar, reordenar e excluir tarefas;
- Reordenar tarefas na mesma coluna ou mover entre colunas com drag-and-drop;
- Usar a to-do list localmente (sem login);
- Fazer cadastro e login com token JWT via cookie;
- Ver e manipular tarefas próprias ao estar logado;
- Acessar de qualquer dispositivo com navegador e internet;
- Usar com boa acessibilidade e responsividade.

# 🧾 Conclusão

Este projeto consolidou para mim a importância de:

- Planejamento antes da implementação;
- Desenvolvimento **mobile-first** com foco em performance;
- Validação visual **fiel ao Figma**;
- Boas práticas de **acessibilidade**, **usabilidade** e **semântica**;
- Integração completa entre front-end e back-end com segurança e estado sincronizado.

Apesar dos desafios enfrentados e pontos que ainda posso melhorar (aprofundamento em algumas bibliotecas e organização), considero que o projeto atinge seus objetivos e mostra meu comprometimento com entregas funcionais, organizadas e com qualidade de código.

## Informações adicionais do Projeto

- 📅 Início: 22 de junho de 2025
- ✅ Conclusão: 27 de junho de 2025
- ⏱️ Tempo estimado de desenvolvimento: 75 horas em 6 dias

Com foco em:

- Boas práticas de acessibilidade e semântica HTML
- Mobile first e design responsivo
- Autenticação JWT com cookies HTTP-only (backend Express + frontend React/Vite)
- Integração com backend (todo list sincronizado)
- Estrutura de código organizada e reutilizável

## Atualizações após o teste

Depois do teste corrigi os 2 bugs do dnd-kit, travei o scroll quando estiver arrastando e arrumei uma condição da função para não dropar o item na mesma coluna, apenas reordenar. Além disso, terminei as duas seções do carrossel e do formulário de e-mail que já estão funcionando.
