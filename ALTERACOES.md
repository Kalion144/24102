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

---

## Correção de Bugs Críticos no Frontend — 27/05/2026

### Arquivo: `front-react/src/pages/Cadastro.tsx`

**Bug 1 — Tipo `Errors` inexistente:**
- `import { Errors }` causava erro de compilação TypeScript (`Errors` não exportado de `types.ts`)
- Corrigido: → `import { FormErrors }` e `useState<FormErrors>`

**Bug 2 — Estado `toast` sem `null` no tipo:**
- `useState<Toast>(null)` — `null` não é atribuível a `Toast`
- Corrigido: → `useState<Toast | null>(null)`

**Bug 3 — Radio buttons com valores errados (bug funcional crítico):**
- Radio buttons armazenavam `'Cliente'` e `'Prestador de serviços'` no estado
- A conversão `userType === 'CLIENTE' ? 'CLIENTE' : 'PROFISSIONAL'` nunca era verdadeira para esses valores
- Resultado: **todo usuário era cadastrado como `PROFISSIONAL`**, independente da seleção
- Corrigido: radio buttons agora armazenam `'CLIENTE'` e `'PROFISSIONAL'` diretamente; conversão simplificada para `userType as 'CLIENTE' | 'PROFISSIONAL'`

**Bug 4 — `useEffect` vazio e import desnecessário:**
- `useEffect(() => {}, [])` sem corpo e `useEffect` importado sem uso
- Corrigido: removidos ambos

---

### Arquivo: `front-react/src/contexts/AuthContext.tsx`

**Bug 5 — Tipo de retorno incorreto em `login` e `cadastrar`:**
- Ambas as funções tinham tipo `Promise<void>` no contrato `AuthContextType`, mas retornavam `resposta.usuario`
- `LoginUser.tsx` usava o valor de retorno (`const usuarioLogado = await login(...)`) para redirecionar o usuário — código que TypeScript rejeitava silenciosamente
- Corrigido: tipo atualizado para `Promise<Usuario>` em ambas

---

### Arquivo: `front-react/tsconfig.json`

**Bug 6 — Include apontando para o backend:**
- `"include": ["src", "../src/controllers/professional"]` incluía código do backend no projeto frontend
- Criava acoplamento incorreto entre projetos; podia poluir a checagem de tipos
- Corrigido: → `"include": ["src"]`

---

### Arquivo: `front-react/src/lib/types.ts`

**Bug 7 — `ProposalStatus` divergia do schema do banco:**
- Tipo frontend: `'PENDENTE' | 'ABERTA' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA'`
- Schema real (`schema.ts`): `'PENDENTE' | 'ACEITA' | 'RECUSADA' | 'CANCELADA' | 'EM_ANDAMENTO' | 'FINALIZADA' | 'AVALIADA'`
- Valores como `'ABERTA'` e `'CONCLUIDA'` nunca existiriam no banco, causando inconsistências silenciosas
- Corrigido: `ProposalStatus` e `ProposalProfessionalStatus` alinhados com o schema

---

### Arquivo: `front-react/src/pages/professional/Home.tsx`

**Bug 8 — `setLocation` chamado sem estado correspondente:**
- `location` era declarada como `const` mas `handleEditLocation` chamava `setLocation(newLocation)`
- Erro TypeScript: `Cannot find name 'setLocation'`
- Corrigido: convertida para `const [location, setLocation] = useState('Brasília - DF')`

---

### Resultado

Após todas as correções, `tsc --noEmit` passa **sem nenhum erro**.
