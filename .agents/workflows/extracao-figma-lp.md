# Workflow: Extração Figma → Landing Page

Workflow de 3 passos para converter um design Figma em uma landing page Next.js funcional.

## Passo 1: Fatiar Seções + Exportar Imagens

**Objetivo:** Dividir a LP em seções individuais e extrair todos os assets.

1. Conectar ao Figma via MCP (`join_channel`)
2. Obter estrutura do documento (`get_document_info` → `get_pages`)
3. Identificar o frame principal da LP
4. Para cada seção do frame:
   a. Exportar screenshot (`export_node_as_image`)
   b. Salvar em `referencia-desenvolvimento/XX-nome/print.png`
   c. Extrair textos (`scan_text_nodes`)
   d. Baixar assets (SVG: `get_svg`, PNG: `get_image_from_node`)
   e. Salvar assets em `public/images/`
   f. Criar `context.md` com tokens (cores, fontes, espaçamentos, textos)
5. Atualizar `progress.md` marcando seções como "Sliced"

**Output:** Pasta `referencia-desenvolvimento/` com prints + context.md por seção, assets em `public/images/`

## Passo 2: Análise Semântica Tailwind

**Objetivo:** Mapear os tokens visuais do Figma para classes Tailwind CSS.

Para cada `context.md`:
1. Mapear cores → tokens `brand-*` definidos em `globals.css`
2. Mapear fontes → `font-heading` / `font-body`
3. Mapear tamanhos de texto → `text-sm`, `text-base`, `text-lg`, `text-xl`, etc.
4. Mapear espaçamentos → `p-*`, `m-*`, `gap-*`
5. Definir layout grid/flex para cada breakpoint
6. Anotar o mapeamento no `context.md`

**Output:** `context.md` enriquecido com mapeamento Tailwind

## Passo 3: Gerar Código React Modular

**Objetivo:** Criar componentes Next.js para cada seção.

Para cada seção mapeada:
1. Criar `src/components/sections/NomeSecao.tsx`
2. Implementar usando Tailwind (Mobile First)
3. Usar `next/image` para imagens
4. Respeitar limite de 250-300 linhas
5. Importar no `src/app/page.tsx`
6. Testar visualmente
7. Marcar como "Coded" no `progress.md`

**Output:** Componentes React funcionais, compostos na page.tsx

## Fluxo Resumido

```
Figma Design
    ↓ (MCP ClaudeTalkToFigma)
Fatiamento (prints + assets + context.md)
    ↓ (Análise semântica)
Mapeamento Tailwind (context.md enriquecido)
    ↓ (Codificação)
Componentes React (sections/*.tsx)
    ↓ (Revisão visual)
LP Finalizada (build → /out)
```
