---
name: frontend-responsive-design-standards
description: "Padrões de design responsivo mobile-first para landing pages. Breakpoints, tipografia fluida, imagens adaptativas."
source: adapted from community (frontend-design)
---

# Frontend Responsive Design Standards

Padrões de design responsivo mobile-first para landing pages de alta conversão.

## Quando Usar

- Ao criar layouts de seções
- Ao revisar responsividade
- Ao ajustar tipografia e espaçamentos
- Ao otimizar para diferentes dispositivos

## Princípio: Mobile First

Toda classe CSS base é para **mobile (375px)**. Breakpoints adicionam complexidade para telas maiores.

```html
<!-- CORRETO: mobile first -->
<h1 class="text-2xl lg:text-5xl">Título</h1>
<div class="flex flex-col lg:flex-row">...</div>

<!-- ERRADO: desktop first -->
<h1 class="text-5xl sm:text-2xl">Título</h1>
```

## Breakpoints de Referência

| Dispositivo | Largura | Breakpoint Tailwind |
|-------------|---------|---------------------|
| iPhone SE | 375px | base |
| iPhone 14 | 390px | base |
| iPad Mini | 768px | `md:` |
| iPad Pro | 1024px | `lg:` |
| Desktop | 1280px | `xl:` |
| Desktop wide | 1536px | `2xl:` |

## Tipografia Responsiva

### Escala recomendada
| Elemento | Mobile | Tablet | Desktop |
|----------|--------|--------|---------|
| H1 (hero) | `text-3xl` | `text-4xl` | `text-5xl` / `text-6xl` |
| H2 (seção) | `text-2xl` | `text-3xl` | `text-4xl` |
| H3 (sub) | `text-xl` | `text-xl` | `text-2xl` |
| Body | `text-base` | `text-base` | `text-lg` |
| Small | `text-sm` | `text-sm` | `text-base` |

### Exemplo
```html
<h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold">
  Título Principal
</h1>
<p class="text-base lg:text-lg font-body text-gray-600">
  Descrição do produto ou serviço.
</p>
```

## Layout Patterns

### Hero Section
```html
<!-- Mobile: imagem em cima, texto embaixo -->
<!-- Desktop: lado a lado -->
<section class="w-full px-4 py-12 lg:py-20">
  <div class="mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-8">
    <div class="w-full lg:w-1/2">
      <h1 class="text-3xl lg:text-5xl font-bold">...</h1>
      <p class="mt-4 text-base lg:text-lg">...</p>
      <button class="mt-6 ...">CTA</button>
    </div>
    <div class="w-full lg:w-1/2">
      <Image src="..." alt="..." ... />
    </div>
  </div>
</section>
```

### Grid de Cards
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
  <!-- Cards -->
</div>
```

### Formulário
```html
<form class="w-full max-w-md mx-auto flex flex-col gap-4">
  <input class="w-full px-4 py-3 rounded-lg border" />
  <button class="w-full py-3 bg-brand-accent text-white rounded-lg">
    Enviar
  </button>
</form>
```

## Imagens Responsivas

### Regras
- Sempre definir `width` e `height` para evitar CLS
- Hero images: `priority={true}`
- Background images: usar `object-cover` com container fixo
- Ícones: SVG inline ou `next/image` com tamanho fixo

### Exemplo
```tsx
<div className="relative w-full h-[300px] lg:h-[500px]">
  <Image
    src="/images/hero-bg.jpg"
    alt="Descrição"
    fill
    className="object-cover"
    priority
  />
</div>
```

## Espaçamentos Responsivos

### Padrão de seção
```html
<!-- Padding vertical menor no mobile, maior no desktop -->
<section class="px-4 py-8 md:py-12 lg:py-20 xl:py-24">
  <div class="mx-auto max-w-7xl">...</div>
</section>
```

### Gaps
- Mobile: `gap-4` (16px)
- Tablet: `gap-6` (24px)
- Desktop: `gap-8` (32px)

## Checklist de Responsividade

- [ ] Sem overflow horizontal em nenhum breakpoint
- [ ] Textos legíveis em mobile (min 14px / `text-sm`)
- [ ] Botões touch-friendly (min 44x44px → `py-3 px-6`)
- [ ] Imagens não distorcidas
- [ ] Grid colapsa corretamente em mobile
- [ ] Hero section funciona em 375px
- [ ] Max-width no container principal (`max-w-7xl`)
- [ ] Formulários usáveis em mobile
