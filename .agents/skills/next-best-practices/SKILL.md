---
name: next-best-practices
description: "Padrões e boas práticas para Next.js 16 com App Router e Static Export. Focado em landing pages estáticas."
source: adapted from community (frontend-dev-guidelines)
---

# Next.js 16 Best Practices

Padrões para desenvolvimento de landing pages com Next.js 16, App Router, e Static Export.

## Quando Usar

- Ao criar novos componentes ou páginas
- Ao configurar rotas e layouts
- Ao otimizar performance
- Ao revisar código frontend

## Regras Fundamentais (Static Export)

### O que PODE usar
- App Router (`src/app/`)
- Client Components (`"use client"`)
- `next/image` (com `unoptimized: true`)
- `next/font/google`
- `next/link`
- CSS Modules, Tailwind CSS
- Static metadata (`export const metadata`)

### O que NÃO PODE usar
- `getServerSideProps` / `getStaticProps` (Pages Router)
- API Routes (`/api/*`)
- Server Actions
- Dynamic routes com `generateStaticParams` não-estático
- `next/headers`, `next/cookies`
- Middleware
- `revalidate`, ISR

## Estrutura de Componentes

### Ordem dentro de um componente
1. Imports
2. Types / Interfaces
3. Componente (export default function)
4. Sub-componentes (se necessário, inline)

### Template padrão
```tsx
import Image from "next/image";

interface NomeSecaoProps {
  // props se necessário
}

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

## Performance

### Imagens
- Sempre usar `next/image` com `width`, `height` e `alt`
- `priority={true}` para imagens above-the-fold (LCP)
- Formatos: WebP/AVIF para fotos, SVG para ícones
- Lazy loading automático para imagens below-the-fold

### Fontes
- Usar `next/font/google` para evitar FOUT/FOIT
- Definir como CSS variables no layout
- Máximo 2 famílias de fontes

### Bundle
- Componentes pesados: usar `dynamic()` com `ssr: false` se necessário
- Evitar imports desnecessários
- Preferir SVG inline para ícones pequenos

## Organização de Arquivos

```
src/
├── app/
│   ├── globals.css      # Tokens Tailwind
│   ├── layout.tsx       # Root layout (fontes, metadata)
│   └── page.tsx         # Composição de seções
├── components/
│   ├── sections/        # 1 seção = 1 arquivo (max 300 linhas)
│   ├── layout/          # Header, Footer
│   └── ui/              # Botões, inputs, cards
└── lib/                 # Helpers
```

## Checklist de Qualidade

- [ ] Nenhuma feature SSR sendo usada
- [ ] `npm run build` gera `/out` sem erros
- [ ] Todas as imagens usam `next/image`
- [ ] Fontes via `next/font/google`
- [ ] Metadata definida no layout
- [ ] `lang="pt-BR"` no HTML
- [ ] Sem imports não utilizados
- [ ] Cada arquivo ≤ 300 linhas
