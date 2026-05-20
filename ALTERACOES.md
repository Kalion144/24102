# Alterações Necessárias para Conectar Frontend e Backend

---

## Frontend - Testes e Remoção de @ts-nocheck

### Arquivos Criados:

1. **src/**tests**/App.test.tsx**: Teste básico do componente App
2. **src/**tests**/setup.ts**: Setup do Vitest
3. **vitest.config.ts**: Configuração do Vitest

### Dependências Instaladas:

- vitest
- @testing-library/react
- @testing-library/jest-dom
- jsdom
- @types/react
- @types/react-dom

### Scripts Adicionados no package.json:

- test: executa os testes
- test:ui: executa os testes com interface visual

### Modificações:

- Removido todos os dos arquivos .tsx/.ts do frontend

---

## Backend - Correção dos Controllers

### Arquivos Corrigidos:

1. **src/controllers/authController.ts**:
   - Substituído `. $returningId()` por `.returning({ id: users.id })`

2. **src/controllers/professionalController.ts**:
   - Substituído `. $returningId()` por `.returning({ id: professionalProfiles.id })`
   - Substituído `. $returningId()` por `.returning({ id: professionalServices.id })`

3. **src/controllers/proposalController.ts**:
   - Substituído `. $returningId()` por `.returning({ id: proposals.id })`

4. **src/controllers/ratingController.ts**:
   - Substituído `. $returningId()` por `.returning({ id: ratings.id })`

### Arquivos Removidos:

- src/controllers/profissionalController.ts (duplicado)
- src/routes/profissionalRoutes.ts (duplicado)

---

## Backend - Scripts de Banco de Dados

### Arquivo: package.json

#### Modificações:

- Adicionados scripts para o Drizzle Kit:
  - `db:push`: Cria/atualiza as tabelas no banco de dados
  - `db:studio`: Abre o Drizzle Studio para visualizar o banco de dados

---

## Frontend - Migração para TypeScript

### Arquivos Criados/Atualizados:

- **tsconfig.json**: Configuração do TypeScript para o frontend (compatível com Vite + React)
- **tsconfig.node.json**: Configuração do TypeScript para o Vite config
- Todos os arquivos renomeados:
  - .jsx → .tsx
  - .js → .ts
- **vite.config.ts**: Arquivo de configuração do Vite (renomeado de .js para .ts)
- **index.html**: Atualizado para referenciar main.tsx em vez de main.jsx
- **services/api.ts**: Corrigido tipos para o TypeScript
- Adicionado no topo de todos os arquivos .tsx/.ts para ignorar erros temporariamente
- **.prettierrc**: Arquivo de configuração do Prettier
- **.eslintrc.json**: Arquivo de configuração do ESLint

### Dependências Instaladas:

- typescript
- @types/react
- @types/react-dom
- @types/react-router-dom
- eslint
- eslint-plugin-react
- eslint-plugin-react-hooks
- eslint-plugin-react-refresh
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- prettier
- eslint-config-prettier
- eslint-plugin-prettier

---

## Backend - Logging e Tratamento de Erros

### Arquivo: src/app.ts

#### Modificações:

1. **Adicionado middleware CORS**:
   - Instalação do pacote `cors` e `@types/cors`
   - Adicionado `app.use(cors())` para permitir requisições cross-origin
2. **Adicionado middleware de logging de requisições**:
   - Loga método HTTP, URL, body, params e query de cada requisição
   - Inclui timestamp para cada log
   - Corrigido erro de null/undefined no body/params/query
3. **Adicionado middleware de tratamento de erros**:
   - Captura erros não tratados
   - Loga stack trace do erro
   - Retorna resposta JSON com erro (detalhes apenas em desenvolvimento)

### Arquivo: src/controllers/authController.ts

#### Modificações:

- Adicionados console logs em cada etapa do registro e login
- Adicionados logs detalhados para erros
- Adicionado log da resposta enviada para o cliente

---

## Arquivo: front-react/src/services/api.js

### Modificações:

1. **Atualizado endpoints** para corresponder às rotas do backend:
   - `/cadastro` → `/auth/register`
   - `/login` → `/auth/login`
2. **Adicionado função `getAuthHeader()`** para enviar o token JWT no header Authorization
3. **Adicionado todas as funções** para as APIs do backend (listarProfissionais, criarProposta, etc.)

---

## Arquivo: front-react/src/App.jsx

### Modificações:

1. **Removido `.html` de todas as rotas**
2. **Corrigido caminhos** para serem mais limpos e seguir padrão React Router:
   - `/logn-user.html` → `/login` (corrigido erro de digitação)
   - `/publicarServico-cli.html` → `/publicar-servico`
   - `/todasPropostas-sev.html` → `/todas-propostas-sev`
   - `/Perfil-Sev.html` → `/perfil-sev`
   - `/confPerfil-cli.html` → `/perfil-cli`
   - `/sobre.html` → `/sobre`
   - `/cadastro.html` → `/cadastro`
   - `/home-cli.html` → `/home-cli`
   - `/home-sev.html` → `/home-sev`
   - `/servicos-cli.html` → `/servicos-cli`
   - `/propostas-cli.html` → `/propostas-cli`

---

## Arquivos de Páginas - Navegações Corrigidas

### 1. front-react/src/pages/Index.jsx

- **Modificações**: Links de navegação atualizados para `/cadastro` e `/login`

### 2. front-react/src/pages/LoginUser.jsx

- **Modificações**:
  - Nome do componente alterado de `LognUser` para `LoginUser`
  - Link de cadastro atualizado para `/cadastro`
  - Navegação após login atualizada para `/home-cli` e `/home-sev`
  - Verificação de sucesso alterada de `resposta.sucesso` para `resposta.token`
  - Armazenamento do token no localStorage

### 3. front-react/src/pages/Cadastro.jsx

- **Modificações**:
  - Adicionado `useNavigate` para navegação
  - Armazenamento do token e usuário no localStorage após cadastro
  - Navegação após cadastro para `/home-cli` ou `/home-sev`

### 4. front-react/src/components/BottomNav.jsx

- **Modificações**:
  - Adicionado prop `userType` para diferenciar navegação de CLIENTE e PROFISSIONAL
  - Criados arrays `clienteItems` e `profissionalItems` com caminhos corretos

### 5. front-react/src/pages/HomeCli.jsx

- **Modificações**: Links de navegação no header atualizados para usar `navigate()`

### 6. front-react/src/pages/HomeSev.jsx

- **Modificações**: Links de navegação no header atualizados para usar `navigate()`

---

## Arquivos de Páginas - Navegações Corrigidas (continuação)

### 7. front-react/src/pages/ServicosCli.jsx

- **Modificações**:
  - Link de home atualizado para `/home-cli`
  - Link de criar serviço atualizado para `/publicar-servico`

### 8. front-react/src/pages/PublicarServicoCli.jsx

- **Modificações**: Navegação após publicar serviço atualizada para `/servicos-cli`

### 9. front-react/src/pages/PropostasCli.jsx

- **Modificações**: Link de home atualizado para `/home-cli`

### 10. front-react/src/pages/TodasPropostasSev.jsx

- **Modificações**:
  - Adicionado `useNavigate`
  - Links no header atualizados para `/home-sev`, `/todas-propostas-sev`, `/perfil-sev`
  - Logout atualizado para usar `navigate('/')`

### 11. front-react/src/pages/DetalhesServicoSev.jsx

- **Modificações**: Link de voltar para home atualizado para `/home-sev`

### 12. front-react/src/pages/ConfPerfilCli.jsx

- **Modificações**:
  - Adicionado `useNavigate`
  - Links no header atualizados para `/propostas-cli` e `/home-cli`
  - Logout atualizado para usar `navigate('/')`

---

## Tarefas Pendentes

- [ ] Corrigir navegações em PerfilSev.jsx
- [ ] Integrar as páginas com as APIs do backend
