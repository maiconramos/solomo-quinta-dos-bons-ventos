# Slice and Code — Skill de Fatiamento e Codificação

Processo completo de fatiamento de uma seção no Figma e conversão para componente React/Tailwind.

## Quando Usar

- Ao desenvolver cada seção da landing page
- Quando o usuário executa `/slice-section` seguido de `/code-section`

## Fase 1: Fatiamento (Slice)

### Pré-requisitos
- MCP `ClaudeTalkToFigma` conectado (canal ativo)
- Figma aberto com a LP no frame correto

### Passos
1. **Navegar até a seção**
   ```
   get_document_info → get_pages → get_node_info(frame_id)
   ```
2. **Exportar print da seção**
   ```
   export_node_as_image(node_id) → referencia-desenvolvimento/XX-secao/print.png
   ```
3. **Extrair tokens**
   - `scan_text_nodes(node_id)` → textos, fontes, tamanhos
   - `get_styles` → cores usadas
   - Anotar espaçamentos (padding, gap, margin) observados nos nós
4. **Baixar assets**
   - Ícones: `get_svg(node_id)` → `public/images/icon-nome.svg`
   - Fotos: `get_image_from_node(node_id)` → `public/images/nome-semantico.jpg`
5. **Criar context.md**
   ```markdown
   # Seção: Nome da Seção
   ## Textos
   - Título: "..."
   - Subtítulo: "..."
   ## Cores
   - Background: #xxx
   - Texto: #xxx
   ## Fontes
   - Título: Font Name, 32px, bold
   - Body: Font Name, 16px, regular
   ## Assets
   - hero-bg.jpg (1920x800)
   - icon-check.svg
   ## Layout
   - Desktop: grid 3 colunas
   - Mobile: stack vertical
   ```

## Fase 2: Codificação (Code)

### Input
- `referencia-desenvolvimento/XX-secao/context.md`
- `referencia-desenvolvimento/XX-secao/print.png`

### Passos
1. Criar `src/components/sections/NomeSecao.tsx`
2. Seguir padrão Mobile First com Tailwind
3. Usar `next/image` para todas as imagens
4. Máximo 250-300 linhas — dividir em sub-componentes se necessário
5. Importar no `src/app/page.tsx` na posição correta

### Template de Componente
```tsx
import Image from "next/image";

export default function NomeSecao() {
  return (
    <section className="w-full px-4 py-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Conteúdo */}
      </div>
    </section>
  );
}
```

## Critérios de Aceite

- [ ] Context.md criado com todos os tokens
- [ ] Assets baixados com nomes semânticos
- [ ] Componente renderiza sem erros
- [ ] Layout responsivo (mobile, tablet, desktop)
- [ ] Dentro do limite de linhas
