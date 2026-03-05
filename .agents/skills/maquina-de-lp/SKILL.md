# Máquina de LP — Skill Principal

Skill para criação de Landing Pages estáticas usando o workflow de fatiamento Figma → Code.

## Quando Usar

- Ao iniciar a criação de uma nova landing page
- Ao fatiar seções do Figma e converter em componentes React/Tailwind
- Como referência geral do processo LP Factory

## Processo: Node Slicing

O fatiamento por nós (Node Slicing) é a técnica central do workflow:

1. **Conectar ao Figma** via MCP `ClaudeTalkToFigma`
   - Use `join_channel` com o canal do plugin Figma
   - Confirme conexão com `get_document_info`

2. **Mapear a Árvore de Nós**
   - `get_pages` → identifique a página da LP
   - `get_node_info` no frame principal → liste todas as seções
   - Para cada seção, anote: nome, posição, dimensões

3. **Exportar por Seção**
   - `export_node_as_image` → salve em `referencia-desenvolvimento/XX-nome-secao/print.png`
   - `get_svg` para ícones → salve em `public/images/`
   - `get_image_from_node` para fotos/backgrounds → salve em `public/images/`
   - `scan_text_nodes` → extraia textos e fontes
   - `get_styles` → extraia cores e tokens

4. **Criar Context File**
   - Salve `referencia-desenvolvimento/XX-nome-secao/context.md` com:
     - Textos extraídos
     - Cores (hex)
     - Fontes e tamanhos
     - Espaçamentos observados
     - Lista de assets baixados

## Regras de Código

- **Static Export Only** — `output: 'export'` no next.config.ts
- **Max 250-300 linhas por arquivo** — dividir em sub-componentes se necessário
- **Mobile First** — construir de mobile → tablet → desktop
- **Tailwind CSS v4** — utility classes apenas, sem CSS customizado
- **next/image** para todas as imagens, com `unoptimized` já configurado
- **Formulários** usam proxy PHP `/send-form.php` → n8n webhook
- **Nomes semânticos** para assets: `hero-background.jpg`, `icon-check.svg`

## Estrutura de Pastas

```
src/
├── app/
│   ├── globals.css      # Tokens de cor e fonte
│   ├── layout.tsx       # Fontes e metadata
│   └── page.tsx         # Composição de seções
├── components/
│   ├── sections/        # Uma seção = um arquivo
│   ├── layout/          # Header, Footer
│   └── ui/              # Botões, inputs, cards
└── lib/                 # Helpers
```

## Tracking

Use `progress.md` na raiz para acompanhar o status de cada seção:

| Seção | Sliced | Coded | Reviewed |
|-------|--------|-------|----------|
| Hero  | [ ]    | [ ]   | [ ]      |
