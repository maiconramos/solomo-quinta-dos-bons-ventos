# Solomo LP Boilerplate

Boilerplate para criação rápida de Landing Pages estáticas via "vibe coding" com agentes de IA.

## Quick Start

```bash
# 1. Clone o boilerplate
git clone <repo-url> nome-do-projeto
cd nome-do-projeto

# 2. Abra no Claude Code e execute o setup
/init-project

# 3. Ou faça manualmente:
cp .env.example .env
# Edite .env com as configurações do projeto
npm install
npm run dev
```

## LP Factory Workflow

O processo de criação segue 4 etapas:

### 1. Setup (`/init-project`)
Configure cores, fontes, metadata e variáveis de ambiente do novo projeto.

### 2. Fatiamento (`/slice-section`)
Conecte ao Figma via MCP, exporte prints de cada seção, extraia tokens e baixe assets.

### 3. Codificação (`/code-section`)
Gere componentes React/Tailwind a partir do context.md e print visual de cada seção.

### 4. Revisão (`/review-section`)
Compare o componente renderizado com o design, ajuste até fidelidade visual.

### 5. Deploy (`/build-deploy`)
Lint, build estático e deploy via FTP para cPanel.

## Stack

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| Next.js | 16 | App Router, Static Export |
| React | 19 | UI Components |
| TypeScript | 5 | Type Safety |
| Tailwind CSS | v4 | Styling (utility-first) |
| PHP | - | Form proxy (send-form.php → n8n) + Meta CAPI proxy (messenger.php) |

## Estrutura do Projeto

```
├── src/
│   ├── app/
│   │   ├── globals.css          # Tokens de cor e fonte (Tailwind v4)
│   │   ├── layout.tsx           # Fontes, metadata, lang="pt-BR"
│   │   └── page.tsx             # Composição de seções
│   ├── components/
│   │   ├── sections/            # Seções full-width da LP
│   │   ├── layout/              # Header, Footer
│   │   └── ui/                  # Botões, inputs, cards, MetaPixel, LeadForm
│   ├── hooks/
│   │   └── useTracking.ts       # Hook de rastreamento Meta CAPI + Pixel (dedup, consent)
│   └── lib/                     # Helpers e utilitários
├── public/
│   ├── api/
│   │   └── messenger.php        # Proxy PHP → Meta CAPI + n8n (tokens injetados no deploy)
│   ├── images/                  # Assets do projeto
│   └── send-form.php            # Proxy PHP → n8n webhook
├── .agents/
│   ├── skills/                  # Skills para agentes IA
│   └── workflows/               # Workflows documentados
├── .claude/
│   └── commands/                # Slash commands (/init-project, etc.)
├── .github/
│   └── workflows/
│       └── deploy-ftp.yml       # CI/CD: build + inject secrets + FTP deploy
├── referencia-desenvolvimento/  # Prints e context.md (gitignored)
├── progress.md                  # Tracking de seções
├── CLAUDE.md                    # Instruções para agentes IA
└── .env.example                 # Template de variáveis
```

## Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| `PROJECT_NAME` | Nome do projeto/cliente |
| `FIGMA_PAGE_LINK` | Link do arquivo Figma |
| `N8N_WEBHOOK_URL` | URL do webhook n8n (server-side only) |
| `FTP_SERVER` | Servidor FTP do cPanel |
| `FTP_USER` | Usuário FTP |
| `FTP_PASSWORD` | Senha FTP |
| `FTP_PATH` | Caminho no servidor |
| `NEXT_PUBLIC_ENABLE_TRACKING` | Habilita rastreamento Meta (`true`/`false`) |
| `NEXT_PUBLIC_META_PIXEL_ID` | ID do Pixel Meta (browser-side) |
| `META_PIXEL_ID` | ID do Pixel Meta (server-side, injetado no deploy) |
| `META_ACCESS_TOKEN` | Token de acesso Meta CAPI (injetado no deploy) |
| `META_TEST_EVENT_CODE` | Codigo de teste Meta Events Manager (opcional) |
| `FIGMA_API_KEY` | API key do Figma |

## Comandos Disponíveis

### npm scripts
```bash
npm run dev      # Dev server (localhost:3000)
npm run build    # Static export → /out
npm run lint     # ESLint
```

### Slash Commands (Claude Code)
| Comando | Função |
|---------|--------|
| `/init-project` | Setup: cores, fontes, metadata, npm install |
| `/slice-section` | Fatiar seção do Figma → context.md + assets |
| `/code-section` | Gerar componente TSX a partir do fatiamento |
| `/review-section` | Auditoria visual: componente vs design |
| `/build-deploy` | Lint + build + deploy FTP |

## Deploy

### Automático (GitHub Actions)
Configure os secrets no GitHub:
- `FTP_SERVER`, `FTP_USER`, `FTP_PASSWORD`, `FTP_PATH`, `N8N_WEBHOOK_URL`
- `META_PIXEL_ID`, `META_ACCESS_TOKEN` (para rastreamento Meta CAPI)

Configure as variables no GitHub:
- `MAINTENANCE_MODE`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_ENABLE_TRACKING`, `NEXT_PUBLIC_META_PIXEL_ID`

Push para `main` dispara build + inject secrets + deploy automático.

### Manual
```bash
npm run build
# Upload manual da pasta /out/ via FTP
```

## Constraints

- **Static Export Only** — sem SSR, sem API Routes
- **Max 250-300 linhas por arquivo** — dividir em sub-componentes
- **Mobile First** — classes base = mobile, breakpoints para desktop
- **Sem webhooks/tokens expostos** — formularios usam proxy PHP, URLs e tokens injetados no deploy
- **Secrets em .env** — nunca usar `NEXT_PUBLIC_` para URLs sensiveis ou tokens de API
- **Meta CAPI** — rastreamento server-side via `useTracking` hook + `messenger.php` (ativar com `NEXT_PUBLIC_ENABLE_TRACKING`)
