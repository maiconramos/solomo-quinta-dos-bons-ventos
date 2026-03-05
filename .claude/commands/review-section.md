Revisar visualmente uma seção codificada, comparando com o design original.

Solicite ao usuário (se não fornecido):
1. **Nome da seção** a ser revisada

Passos:

1. **Preparar comparação**
   - Localize o print em `referencia-desenvolvimento/XX-nome-secao/print.png`
   - Localize o componente em `src/components/sections/NomeSecao.tsx`
   - Leia o `context.md` da seção

2. **Checklist de revisão**

   **Fidelidade Visual:**
   - Cores correspondem ao design?
   - Fontes corretas (família, peso, tamanho)?
   - Espaçamentos visualmente próximos?
   - Imagens/ícones posicionados corretamente?

   **Responsivo:**
   - Mobile (375px): sem overflow, textos legíveis?
   - Tablet (768px): transição suave?
   - Desktop (1280px+): layout fiel ao design?

   **Qualidade de Código:**
   - Dentro do limite de 250-300 linhas?
   - Apenas Tailwind utilities (sem CSS custom)?
   - `next/image` em todas as imagens?

   **Acessibilidade:**
   - Alt text nas imagens?
   - Contraste adequado?
   - Hierarquia de headings correta?

3. **Aplicar ajustes**
   - Corrija diferenças encontradas
   - Re-verifique após cada ajuste

4. **Atualizar progress.md**
   - Marque a seção como "Reviewed" ✅

Ao final, mostre um relatório resumido da revisão com status de cada item do checklist.
