Fatiar uma seção do Figma e preparar para codificação.

Solicite ao usuário (se não fornecido):
1. **Nome da seção** (ex: "Hero", "Features", "FAQ")
2. **Número da seção** (ex: 01, 02, 03) para ordenação

Pré-requisitos:
- MCP `ClaudeTalkToFigma` deve estar conectado
- Se não estiver, use `join_channel` para conectar (peça o canal ao usuário)

Passos:

1. **Conectar ao Figma** (se necessário)
   - `join_channel` com o canal do plugin
   - Confirme com `get_document_info`

2. **Navegar até a seção**
   - `get_pages` → identifique a página da LP
   - `get_node_info` no frame principal → encontre o nó da seção

3. **Exportar print**
   - `export_node_as_image(node_id)` → salve em `referencia-desenvolvimento/XX-nome-secao/print.png`

4. **Extrair tokens**
   - `scan_text_nodes(node_id)` → textos e fontes
   - `get_styles` → cores e estilos

5. **Baixar assets**
   - Ícones SVG: `get_svg(node_id)` → `public/images/`
   - Imagens: `get_image_from_node(node_id)` → `public/images/`
   - Use nomes semânticos (ex: `hero-background.jpg`, `icon-check.svg`)

6. **Criar context.md**
   - Salve `referencia-desenvolvimento/XX-nome-secao/context.md` com:
     - Textos, cores, fontes, espaçamentos, assets listados

7. **Atualizar progress.md**
   - Marque a seção como "Sliced" ✅

Ao final, mostre o conteúdo do `context.md` gerado.
