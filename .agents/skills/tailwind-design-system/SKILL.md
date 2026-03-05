---
name: tailwind-design-system
description: "Padrões de design system com Tailwind CSS v4 para landing pages. Tokens, responsivo, componentes."
source: adapted from community (wshobson/agents)
---

# Tailwind CSS v4 Design System

Padrões para construir landing pages com Tailwind CSS v4, incluindo design tokens, responsivo e componentes.

## Quando Usar

- Ao criar ou estilizar componentes
- Ao implementar design tokens do Figma
- Ao construir layouts responsivos
- Ao padronizar UI patterns

## Tailwind v4 — Diferenças Importantes

### Configuração via CSS (não tailwind.config.js)
```css
@import "tailwindcss";

@theme inline {
  --color-brand-primary: #1a1a2e;
  --color-brand-secondary: #16213e;
  --color-brand-accent: #0f3460;
  --color-brand-highlight: #e94560;
  --font-heading: var(--font-heading);
  --font-body: var(--font-body);
}
```

### Uso dos tokens
```html
<div class="bg-brand-primary text-white font-heading">
  Título
</div>
<p class="text-brand-accent font-body">
  Texto
</p>
```

## Hierarquia de Tokens

```
Brand Tokens (cores do cliente)
  └── Semantic Tokens (propósito: primary, accent)
      └── Component Classes (Tailwind utilities)
```

### Cores — 4 tokens obrigatórios
| Token | Uso |
|-------|-----|
| `brand-primary` | Backgrounds principais, textos de destaque |
| `brand-secondary` | Backgrounds secundários, variações |
| `brand-accent` | CTAs, links, elementos de ação |
| `brand-highlight` | Badges, alertas, destaques visuais |

### Fontes — 2 tokens obrigatórios
| Token | Uso |
|-------|-----|
| `font-heading` | Títulos h1-h6 |
| `font-body` | Texto corrido, labels |

## Padrões de Componentes

### Seção padrão
```tsx
<section className="w-full px-4 py-12 lg:py-20">
  <div className="mx-auto max-w-7xl">
    {/* Conteúdo */}
  </div>
</section>
```

### Botão CTA
```tsx
<button className="bg-brand-accent text-white px-6 py-3 rounded-lg font-heading font-semibold hover:opacity-90 transition-opacity">
  Texto do CTA
</button>
```

### Card
```tsx
<div className="bg-white rounded-xl shadow-md p-6">
  <h3 className="text-xl font-heading font-bold text-brand-primary">Título</h3>
  <p className="mt-2 text-gray-600 font-body">Descrição</p>
</div>
```

## Responsivo — Mobile First

### Breakpoints Tailwind v4
| Prefix | Min-width | Dispositivo |
|--------|-----------|-------------|
| (base) | 0px | Mobile |
| `sm:` | 640px | Mobile landscape |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Desktop wide |

### Padrão obrigatório
```html
<!-- Mobile primeiro, depois breakpoints maiores -->
<div class="flex flex-col gap-4 lg:flex-row lg:gap-8">
  <div class="w-full lg:w-1/2">...</div>
  <div class="w-full lg:w-1/2">...</div>
</div>
```

### Grid responsivo
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Cards -->
</div>
```

## Anti-Patterns

- Nunca usar CSS customizado (inline styles, CSS modules) quando Tailwind resolve
- Nunca usar `!important`
- Nunca criar classes com `@apply` extensivamente
- Nunca usar valores arbitrários (`w-[347px]`) quando existe classe próxima
- Nunca ignorar mobile — sempre começar pelo mobile

## Checklist

- [ ] Tokens de cor definidos em `globals.css` via `@theme inline`
- [ ] Fontes como CSS variables
- [ ] Mobile first em todos os componentes
- [ ] Sem CSS customizado desnecessário
- [ ] Espaçamentos consistentes (scale do Tailwind)
- [ ] Componentes reutilizáveis na pasta `ui/`
