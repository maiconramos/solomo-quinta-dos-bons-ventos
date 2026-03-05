Build e deploy da landing page para produção via FTP.

Passos:

1. **Lint**
   ```bash
   npm run lint
   ```
   - Se houver erros, corrija antes de prosseguir

2. **Build**
   ```bash
   npm run build
   ```
   - Verifique que `/out` foi gerado com sucesso
   - Confirme que `index.html` existe em `/out`

3. **Verificação pré-deploy**
   - Confirme que `send-form.php` tem a URL correta do webhook (não o placeholder)
   - Confirme que não há secrets expostos no código
   - Confirme que todas as imagens estão em `/out`

4. **Deploy via FTP**
   - Leia variáveis de ambiente: `FTP_SERVER`, `FTP_USER`, `FTP_PASSWORD`, `FTP_PATH`
   - Se estiverem configuradas, execute deploy via curl/FTP ou oriente o usuário a usar o GitHub Action (`deploy-ftp.yml`)
   - Se não estiverem, informe ao usuário que precisa configurar o `.env` com as credenciais FTP

5. **Verificação pós-deploy**
   - Informe a URL esperada ao usuário para verificação manual
   - Sugira testar: formulário, imagens, responsivo

Ao final, mostre um resumo do deploy com a URL de acesso.
