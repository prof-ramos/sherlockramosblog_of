# HUGO

Hugo é um gerador de sites estáticos que facilita a configuração do seu próprio blog ou site pessoal.

## Adicionando conteúdo

Você pode criar arquivos de conteúdo manualmente (por exemplo, como `content/<CATEGORY>/<FILE>.<FORMAT>`) e fornecer metadados neles, no entanto, você pode usar o comando `new` para fazer algumas coisas por você (como adicionar título e data):

```sh
$ hugo new posts/my-post.md
```

Por padrão, este modelo cria um `posts/hello.md` para você, sinta-se à vontade para remover/renomeá-lo se quiser.

## Mudando temas

- Explore temas [aqui](https://themes.gohugo.io/)
- Baixe o tema para `themes/<NAME>`

```sh
git clone https://github.com/siegerts/hugo-theme-basic themes/basic
```

- Altere a entrada `theme` em `config.toml` para o nome do tema

## Passo a passo: Deploy, Teste e Customização

1.  **Deploy no GitHub Pages:**

    *   **Crie um repositório no GitHub:** Nomeie o repositório como `<SEU_USUARIO>.github.io`.
    *   **Configure o `config.toml`:**
        *   Adicione a linha `baseurl = "https://<SEU_USUARIO>.github.io/"`.
        *   Certifique-se de que `publishDir = "public"` (ou a pasta onde o Hugo gera os arquivos estáticos).

    *   **Gere os arquivos estáticos:**
        ```bash
        hugo
        ```
        Isso criará uma pasta `public` (ou a pasta configurada) com os arquivos do seu site.

    *   **Faça o commit e o push para o GitHub:**
        ```bash
        git init
        git add .
        git commit -m "Deploy inicial do site Hugo"
        git branch -M main
        git remote add origin git@github.com:<SEU_USUARIO>/<SEU_USUARIO>.github.io.git  # Substitua pelo seu repositório
        git push -u origin main
        ```

    *   **Habilite o GitHub Pages:**
        *   Vá para as configurações do seu repositório no GitHub.
        *   Na seção "Pages", selecione a branch `main` (ou a branch onde você fez o push) e a pasta `/ (root)`.
        *   Salve. Seu site estará disponível em `https://<SEU_USUARIO>.github.io`.

2.  **Teste:**
    *   **Teste localmente:**
        ```bash
        hugo server
        ```
        Acesse `http://localhost:1313/` (ou a porta exibida no terminal) para visualizar o site localmente.

    *   **Teste no GitHub Pages:**
        *   Aguarde alguns minutos após o deploy para que o site seja publicado no GitHub Pages.
        *   Verifique o link do seu site para confirmar.

3.  **Customização:**
    *   **Edite os arquivos de tema:**
        *   Edite os arquivos na pasta `themes/<NOME_DO_TEMA>/`.
        *   Modifique arquivos `*.html`, `*.css`, `*.js` e outros arquivos do tema para personalizar a aparência e o comportamento do seu site.
    *   **Crie seus próprios conteúdos:**
        *   Adicione artigos, páginas e outros conteúdos na pasta `content/`.
        *   Use Markdown para formatar o conteúdo e adicione metadados no início de cada arquivo (título, data, etc.).
    *   **Configuração do site:**
        *   Edite o arquivo `config.toml` para alterar configurações globais, como título do site, descrição, autor, menus, etc.

Para mais informações, consulte a [documentação oficial](https://gohugo.io/documentation/).
