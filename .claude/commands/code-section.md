Gerar componente React/Tailwind a partir de uma seção fatiada.

Solicite ao usuário (se não fornecido):
1. **Nome da seção** (ex: "Hero", "Features")
2. **Número da seção** (para encontrar em `referencia-desenvolvimento/`)

Passos:

1. **Ler contexto**
   - Leia `referencia-desenvolvimento/XX-nome-secao/context.md`
   - Visualize `referencia-desenvolvimento/XX-nome-secao/print.png`

2. **Análise semântica Tailwind**
   - Mapeie cores do design → tokens `brand-*` de `globals.css`
   - Mapeie fontes → `font-heading` / `font-body`
   - Mapeie tamanhos → classes Tailwind (`text-lg`, `text-xl`, etc.)
   - Defina layout: grid/flex por breakpoint

3. **Criar componente**
   - Crie `src/components/sections/NomeSecao.tsx`
   - Use Mobile First (classes base = mobile, `md:` = tablet, `lg:` = desktop)
   - Use `next/image` para todas as imagens
   - Máximo 250-300 linhas — divida em sub-componentes se necessário

4. **Integrar na página**
   - Importe o componente em `src/app/page.tsx`
   - Posicione na ordem correta

5. **Verificação básica**
   - `npm run lint` — sem erros
   - `npm run dev` — componente renderiza

6. **Atualizar progress.md**
   - Marque a seção como "Coded" ✅

Ao final, mostre o componente gerado e confirme que renderiza.
