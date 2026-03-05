Setup inicial de um novo projeto LP a partir deste boilerplate.

Solicite ao usuário as seguintes informações (se não fornecidas):
1. **Nome do projeto** (ex: "meu-empreendimento-lp")
2. **Cores da marca** — 4 cores hex: primary, secondary, accent, highlight
3. **Fontes** — nome de 2 fontes do Google Fonts (heading + body)
4. **Título da LP** e **descrição** (para SEO/metadata)
5. **Link do Figma** (opcional)

Com as informações, execute:

1. Atualize o `name` no `package.json` com o nome do projeto
2. Substitua as cores placeholder em `src/app/globals.css`:
   - `--color-brand-primary`, `--color-brand-secondary`, `--color-brand-accent`, `--color-brand-highlight`
3. Atualize as fontes em `src/app/layout.tsx`:
   - Troque os imports de `Inter` e `Roboto` pelas fontes escolhidas
   - Mantenha as variáveis CSS `--font-heading` e `--font-body`
4. Atualize `title` e `description` no metadata de `src/app/layout.tsx`
5. Copie `.env.example` → `.env`, preencha `PROJECT_NAME` e `FIGMA_PAGE_LINK`, e mantenha `MAINTENANCE_MODE="true"`
6. Crie a pasta `referencia-desenvolvimento/` se não existir
7. Execute `npm install`
8. Substitua "Nome da Empresa" em `src/app/politica-de-privacidade/page.tsx` pelo nome real do projeto (no texto e no metadata)
9. Execute `npm run dev` para verificar que tudo funciona
10. Confirme que `npm run build` gera `/out` sem erros

Ao final, mostre um resumo das alterações feitas.
