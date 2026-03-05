# Init Project — Skill de Inicialização

Documenta o processo completo de inicialização de um novo projeto LP a partir deste boilerplate.

## Quando Usar

- Ao clonar o boilerplate para iniciar uma nova LP
- Quando o usuário executa `/init-project`

## Checklist de Inicialização

### 1. Identidade do Projeto
- [ ] Atualizar `name` no `package.json`
- [ ] Atualizar `title` e `description` em `src/app/layout.tsx` (metadata)

### 2. Cores da Marca
Editar `src/app/globals.css`, substituir os tokens:
```css
--color-brand-primary: #NOVA_COR;
--color-brand-secondary: #NOVA_COR;
--color-brand-accent: #NOVA_COR;
--color-brand-highlight: #NOVA_COR;
```

### 3. Fontes
Editar `src/app/layout.tsx`:
- Trocar imports de `Inter` e `Roboto` pelas fontes do projeto
- Manter as CSS variables `--font-heading` e `--font-body`

### 4. Variáveis de Ambiente
- Copiar `.env.example` → `.env`
- Configurar `MAINTENANCE_MODE="true"` (padrão para projetos novos; trocar para `"false"` após aprovação e rebuild)
- Preencher: `PROJECT_NAME`, `FIGMA_PAGE_LINK`, `N8N_WEBHOOK_URL`
- Preencher FTP: `FTP_SERVER`, `FTP_USER`, `FTP_PASSWORD`, `FTP_PATH`

### 5. Webhook do Formulário
- Editar `public/send-form.php`
- Substituir `COLOQUE_A_URL_DO_N8N_AQUI` pela URL real do webhook

### 6. Instalar e Validar
```bash
npm install
npm run dev    # Verificar localhost:3000
npm run build  # Verificar se /out é gerado
npm run lint   # Sem erros
```

### 7. Política de Privacidade e Cookie Consent
- Substituir "Nome da Empresa" em `src/app/politica-de-privacidade/page.tsx` pelo nome real do projeto (texto e metadata)
- Verificar que `<CookieConsent />` está presente em `src/app/layout.tsx`

### 8. Estrutura de Pastas
- Criar `referencia-desenvolvimento/` (será ignorada pelo git)
- Verificar que `public/images/` existe

## Inputs Esperados

O agente deve solicitar ao usuário:
1. Nome do projeto
2. Cores da marca (4 cores hex)
3. Fontes do Google Fonts (heading + body)
4. Título e descrição da LP
5. Link do Figma (opcional neste passo)
