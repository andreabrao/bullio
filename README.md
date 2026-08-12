# Bull.io - landing page fictícia

Projeto completo de uma landing page responsiva para a **Bull.io**, criado exclusivamente como estudo de portfólio. A marca, empresa, produto, números, participantes, formulário, canais de contato e integrações exibidos são fictícios.

## Aviso importante

- Nenhum dado preenchido no formulário sai do navegador ou é armazenado.
- Não existe corretora, serviço financeiro, plataforma operacional ou promessa de acesso vinculada a este projeto.
- Não há analytics, CRM, API, domínio personalizado ou e-mail real configurado.
- A simulação não oferece recomendação de investimento nem promete rentabilidade.

## Executar localmente

Requer Node.js 22+ e pnpm.

```bash
pnpm install
pnpm dev
```

Para verificar a versão de produção:

```bash
pnpm build
pnpm preview
```

O build estático é gerado em `dist/`.

## Publicar no GitHub Pages

O arquivo `.github/workflows/deploy-pages.yml` já contém o fluxo de publicação. Depois de enviar o projeto para um repositório GitHub:

1. Abra **Settings > Pages** no repositório.
2. Em **Build and deployment**, selecione **GitHub Actions**.
3. Envie um commit para a branch `main` ou execute o fluxo manualmente na aba **Actions**.

O Vite usa caminhos relativos, portanto funciona em URLs do tipo `usuario.github.io/repositorio/` sem precisar conhecer previamente o nome do repositório.

## Estrutura principal

- `src/main.tsx`: conteúdo e interações da página.
- `src/styles.css`: sistema visual e responsividade.
- `public/`: logo, arte conceitual, imagem social e arquivos estáticos.
- `.github/workflows/deploy-pages.yml`: automação de build e publicação.

## Materiais de origem

Identidade, copy e diretrizes foram baseadas no briefing e no kit fictício Bull.io, versão 1.0 de 12/08/2026.
