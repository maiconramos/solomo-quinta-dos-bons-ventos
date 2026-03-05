# CLAUDE.md

Instruções para agentes de IA trabalhando neste repositório.

## Visão Geral

Boilerplate para criação de Landing Pages estáticas da agência Solomo. Built como **static export** Next.js — sem server runtime. Output final: pasta `/out`.

## Build & Development

```bash
npm run dev      # Dev server (localhost:3000)
npm run build    # Static export para /out (SSG only)
npm run lint     # ESLint
```

**Crítico:** `next.config.ts` tem `output: 'export'` e `images: { unoptimized: true }`. Nunca use SSR features (`getServerSideProps`), API Routes, ou qualquer coisa que exija Node.js runtime. O build vai falhar.

## Stack

- **Next.js 16** (App Router) com **React 19**, TypeScript
- **Tailwind CSS v4** — utility classes apenas, tokens customizados em `globals.css` via `@theme inline`
- **Fontes:** Placeholder (Inter + Roboto) via `next/font/google` (CSS vars `--font-heading`, `--font-body`) — substituir por projeto
- **Cores:** `brand-primary`, `brand-secondary`, `brand-accent`, `brand-highlight` — definidas em `globals.css`
- Path alias: `@/*` → `./src/*`

## Arquitetura

**`src/app/page.tsx`** é a entrada single-page compondo seções na ordem:
HeroBanner → Seções intermediárias → LeadCaptureForm → Footer

**Organização de componentes:**
- `src/components/sections/` — seções full-width (um arquivo por seção)
- `src/components/layout/` — componentes estruturais (Header/Footer)
- `src/components/ui/` — micro-componentes reutilizáveis (botões, inputs, cards, CookieConsent)
- `src/lib/` — helpers e utilitários
- `src/lib/design-system.ts` — tokens semânticos do design system (cores, fontes, botões, tipografia mapeados para classes Tailwind)

**Páginas:**
- `src/app/page.tsx` — landing page principal (ou página de manutenção, conforme `MAINTENANCE_MODE`)
- `src/app/home/page.tsx` — rota de preview da LP (sempre acessível, mesmo em modo manutenção)
- `src/app/politica-de-privacidade/page.tsx` — política de privacidade (texto genérico, substituir "Nome da Empresa" por projeto)

**Modo Manutenção:** Controlado por `MAINTENANCE_MODE` em `.env`. Quando `"true"`, `/` exibe página de manutenção e a LP fica acessível em `/home` para revisão. Quando `"false"` (ou não definido), `/` exibe a LP normalmente. Trocar o modo requer rebuild (`npm run build`).

**Cookie Consent:** `src/components/ui/CookieConsent.tsx` — banner fixo no bottom, persiste aceite via `localStorage`. Incluído no `layout.tsx`.

## Constraints

- **Max 250–300 linhas por arquivo.** Refatore imediatamente se exceder — divida em sub-componentes.
- **Mobile-first responsive.** Construa de mobile para `lg:`/`xl:`. Use Flexbox/Grid, nunca `position: absolute` para estrutura de layout.
- **Imagens:** Use `next/image` com `unoptimized` (já configurado). Use `priority={true}` para imagens above-the-fold (LCP).
- **Sem webhooks expostos.** Forms fazem POST para `/send-form.php` (proxy PHP em `/public`), que redireciona para a URL real do webhook n8n. A URL do webhook fica hardcoded server-side no `send-form.php`, nunca no frontend.
- **Secrets** ficam apenas em `.env`. Nunca use `NEXT_PUBLIC_` para URLs de webhook ou API keys.

## Workflow Figma-to-Code (Fatiamento)

Processo de 3 passos para cada seção:

### 1. Fatiamento (Slice)
1. Conecte ao Figma via MCP `ClaudeTalkToFigma` (`join_channel`)
2. Use `get_document_info` → `get_pages` → `get_node_info` para navegar a árvore
3. Exporte print da seção com `export_node_as_image` para `referencia-desenvolvimento/`
4. Baixe assets (SVG/PNG) com `get_svg` ou `get_image_from_node` para `public/images/`
5. Crie `referencia-desenvolvimento/XX-secao/context.md` com tokens extraídos

### 2. Codificação (Code)
1. Leia o `context.md` + print visual da fatia
2. Gere componente em `src/components/sections/NomeSecao.tsx`
3. Use Tailwind puro, Mobile First
4. Importe em `src/app/page.tsx` na ordem correta

### 3. Revisão Visual (Review)
1. Compare componente renderizado vs design original
2. Verifique responsivo em mobile, tablet, desktop
3. Ajuste até ficar visualmente fiel
4. Marque como concluído no `progress.md`

## Setup de Novo Projeto (Checklist)

1. Clone este boilerplate
2. Atualize `package.json` (name)
3. Atualize cores em `src/app/globals.css`
4. Atualize fontes em `src/app/layout.tsx`
5. Atualize metadata (title, description) em `src/app/layout.tsx`
6. Copie `.env.example` → `.env` e preencha
7. Atualize URL do webhook em `public/send-form.php`
8. `npm install`
9. Definir `MAINTENANCE_MODE="true"` no `.env` (padrão até aprovação; após aprovação, trocar para `"false"` e rebuild)
10. `npm run dev` para verificar

## Slash Commands Disponíveis

- `/init-project` — Setup inicial do projeto (cores, fontes, metadata, npm install)
- `/slice-section` — Fatiar uma seção do Figma (conectar MCP, exportar, criar context.md)
- `/code-section` — Gerar componente TSX a partir do context.md
- `/review-section` — Comparar componente vs design, checar responsivo
- `/build-deploy` — Lint, build, verificar /out, deploy via FTP
