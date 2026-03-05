---
name: seo-audit
description: "Auditoria SEO para landing pages estáticas. Foco em meta tags, performance, estrutura e Core Web Vitals."
source: adapted from community (coreyhaines31/marketingskills)
---

# SEO Audit para Landing Pages

Auditoria SEO focada em landing pages estáticas (Next.js Static Export).

## Quando Usar

- Antes do deploy de uma nova LP
- Ao revisar uma LP existente
- Ao otimizar para busca orgânica
- Como checklist final de qualidade

## Contexto: Landing Pages Estáticas

LPs estáticas têm características específicas:
- Página única (single page)
- Foco em conversão (formulário de lead)
- Static export (HTML/CSS/JS puro)
- Hospedagem em cPanel/FTP

## Checklist SEO

### 1. Meta Tags (Crítico)

```tsx
// src/app/layout.tsx
export const metadata: Metadata = {
  title: "Título — até 60 caracteres",
  description: "Descrição — até 155 caracteres, com CTA implícito",
  openGraph: {
    title: "Título para compartilhamento",
    description: "Descrição para redes sociais",
    images: ["/images/og-image.jpg"],  // 1200x630px
    type: "website",
  },
};
```

- [ ] Title tag único e descritivo (≤ 60 chars)
- [ ] Meta description com proposta de valor (≤ 155 chars)
- [ ] Open Graph tags (title, description, image)
- [ ] Viewport meta tag (Next.js adiciona automaticamente)
- [ ] `lang="pt-BR"` no `<html>`

### 2. Headings (Importante)

- [ ] Um único `<h1>` na página (no Hero)
- [ ] Hierarquia lógica: h1 → h2 → h3
- [ ] Headings contêm palavras-chave naturalmente
- [ ] Não pular níveis (h1 → h3 sem h2)

### 3. Imagens (Importante)

- [ ] Todas as imagens com `alt` descritivo
- [ ] Nomes de arquivo semânticos (`hero-empreendimento.jpg`, não `IMG_001.jpg`)
- [ ] Imagens comprimidas (WebP quando possível)
- [ ] Hero image com `priority={true}` (LCP)
- [ ] Dimensões definidas (sem CLS)

### 4. Performance / Core Web Vitals (Crítico)

**LCP (Largest Contentful Paint) < 2.5s**
- [ ] Hero image com `priority`
- [ ] Fontes via `next/font` (sem FOUT)
- [ ] Sem JavaScript bloqueante desnecessário

**CLS (Cumulative Layout Shift) < 0.1**
- [ ] Imagens com `width` e `height` definidos
- [ ] Fontes pré-carregadas
- [ ] Sem conteúdo que "pula" ao carregar

**INP (Interaction to Next Paint) < 200ms**
- [ ] Formulário responsivo ao clique
- [ ] Sem JavaScript pesado bloqueando interações

### 5. Estrutura HTML (Básico)

- [ ] HTML semântico (`<section>`, `<header>`, `<footer>`, `<main>`)
- [ ] Links internos com `<a>` (não `<div onClick>`)
- [ ] Formulário com `<form>`, `<label>`, `<input>`
- [ ] Skip to content (opcional para LP simples)

### 6. Conteúdo (Básico)

- [ ] Texto real (não apenas imagens de texto)
- [ ] Palavras-chave no H1 e primeiros parágrafos
- [ ] CTA claro e visível
- [ ] Informações de contato/empresa visíveis

### 7. Técnico

- [ ] HTTPS (configurar no hosting)
- [ ] Sem mixed content (HTTP em HTTPS)
- [ ] Canonical tag (Next.js gera automaticamente)
- [ ] Robots.txt permite indexação
- [ ] Favicon presente

## Ferramentas de Verificação

Após o deploy, testar com:
1. **PageSpeed Insights** — Core Web Vitals
2. **Google Search Console** — Indexação
3. **Meta Tags Preview** — Open Graph
4. **Mobile-Friendly Test** — Responsividade

## Scoring Simplificado para LPs

| Área | Peso | Pontuação |
|------|------|-----------|
| Meta Tags | 25% | /100 |
| Performance (CWV) | 30% | /100 |
| Imagens | 15% | /100 |
| Headings + Estrutura | 15% | /100 |
| Conteúdo | 15% | /100 |

**Score ≥ 80:** Pronta para deploy
**Score 60-79:** Ajustes necessários
**Score < 60:** Requer revisão significativa
