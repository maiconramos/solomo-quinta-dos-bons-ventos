# Visual Review — Skill de Auditoria Visual

Processo de comparação entre o componente renderizado e o design original do Figma.

## Quando Usar

- Após codificar uma seção, para validar fidelidade visual
- Quando o usuário executa `/review-section`

## Processo de Revisão

### 1. Preparar Comparação
- Abrir a LP no browser (`npm run dev` → localhost:3000)
- Ter o print da fatia em `referencia-desenvolvimento/XX-secao/print.png`
- Ter o `context.md` da seção como referência

### 2. Checklist de Revisão

#### Fidelidade Visual
- [ ] Cores correspondem ao design (backgrounds, textos, botões)
- [ ] Fontes corretas (família, peso, tamanho)
- [ ] Espaçamentos visualmente próximos (padding, margin, gap)
- [ ] Imagens/ícones no lugar correto e com tamanho adequado

#### Responsivo
- [ ] Mobile (375px): layout empilhado, textos legíveis, sem overflow horizontal
- [ ] Tablet (768px): transição suave, sem elementos cortados
- [ ] Desktop (1280px+): layout do design original, max-width respeitado

#### Qualidade de Código
- [ ] Componente dentro do limite de 250-300 linhas
- [ ] Sem CSS customizado — apenas Tailwind utilities
- [ ] `next/image` para todas as imagens
- [ ] Nomes de classes semânticos e organizados

#### Acessibilidade Básica
- [ ] Alt text em todas as imagens
- [ ] Contraste adequado entre texto e background
- [ ] Hierarquia de headings (h1 → h2 → h3)

### 3. Ajustes
- Se houver diferenças, ajustar o Tailwind no componente
- Re-verificar após cada ajuste
- Quando aprovado, marcar no `progress.md`:
  ```
  | Seção | Sliced | Coded | Reviewed |
  |-------|--------|-------|----------|
  | Hero  | [x]    | [x]   | [x]      |
  ```

## Critérios de Aceite Final

- Fidelidade visual ≥ 90% em relação ao design
- Zero overflow horizontal em qualquer breakpoint
- Todos os textos legíveis em mobile
- Imagens carregam corretamente
- Sem erros no console do browser
