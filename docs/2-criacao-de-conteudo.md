# Manual de Criação de Conteúdo - Hugo PaperMod

Este manual ensina como criar posts, adicionar imagens e usar os recursos do Hugo/PaperMod.

## 📚 Recursos Oficiais

- **Features Guide:** https://adityatelange.github.io/hugo-PaperMod/posts/papermod/papermod-features/
- **Variables Reference:** https://adityatelange.github.io/hugo-PaperMod/posts/papermod/papermod-variables/
- **Hugo Content Management:** https://gohugo.io/content-management/

---

## ✍️ Como Criar um Post no Blog

### Método 1: Usando o Comando Hugo (Recomendado)

```bash
hugo new posts/meu-primeiro-post.md
```

Isso cria automaticamente o arquivo `content/posts/meu-primeiro-post.md` com o frontmatter padrão.

### Método 2: Criando Manualmente

Crie o arquivo manualmente em `content/posts/nome-do-post.md` e adicione o frontmatter (veja seção abaixo).

---

## 📋 Frontmatter Recomendado pelo Hugo/PaperMod

O **frontmatter** é o cabeçalho YAML no topo de cada arquivo markdown que contém os metadados do post.

### Estrutura Básica

```yaml
---
title: "Título do Seu Post"
date: 2025-10-03T10:00:00-03:00
draft: false
author: "Seu Nome"
description: "Breve descrição do post para SEO"
tags: ["hugo", "blog", "tutorial"]
categories: ["Tecnologia"]
---
```

### Estrutura Completa (Todas as Opções)

```yaml
---
title: "Título do Seu Post"
date: 2025-10-03T10:00:00-03:00
lastmod: 2025-10-03T15:00:00-03:00
draft: false
author: "Seu Nome"
authorLink: "https://seusite.com/sobre"
description: "Descrição para SEO e redes sociais"
summary: "Resumo curto que aparece na lista de posts"

tags: ["hugo", "blog", "web"]
categories: ["Tecnologia", "Tutoriais"]

# Imagem de capa
cover:
    image: "capa.jpg"
    alt: "Texto alternativo da imagem"
    caption: "Legenda da imagem com [links](https://exemplo.com)"
    relative: true  # IMPORTANTE para page bundles
    hidden: false   # false = mostra no post, true = esconde

# Controle de exibição
ShowToc: true              # Mostra índice (table of contents)
TocOpen: false             # Índice começa aberto?
ShowReadingTime: true      # Mostra tempo de leitura
ShowBreadCrumbs: true      # Mostra breadcrumbs
ShowPostNavLinks: true     # Links anterior/próximo
ShowWordCount: true        # Mostra contagem de palavras
ShowRssButtonInSectionTermList: true
UseHugoToc: true
ShowShareButtons: true     # Botões de compartilhar
ShowCodeCopyButtons: true  # Botão copiar código

# SEO e redes sociais
keywords: ["palavra-chave1", "palavra-chave2"]
images:
  - /posts/meu-post/capa.jpg  # Imagem para OpenGraph/Twitter Card

# Opções avançadas
weight: 1                  # Ordem de exibição (menor = primeiro)
hideSummary: false         # Esconde o resumo na listagem
hidemeta: false            # Esconde metadados (data, tempo de leitura)
disableShare: false        # Desabilita compartilhamento
disableHLJS: false         # Desabilita highlight.js
searchHidden: false        # Esconde da busca
robotsNoIndex: false       # Impede indexação por buscadores
editPost:
    URL: "https://github.com/usuario/repo/content"
    Text: "Sugerir Mudanças"
    appendFilePath: true
---
```

### Campos Essenciais Explicados

| Campo | Descrição | Obrigatório |
|-------|-----------|-------------|
| `title` | Título do post | Sim |
| `date` | Data de publicação | Sim |
| `draft` | `true` = rascunho (não publica), `false` = publicado | Não (padrão: false) |
| `description` | Descrição para SEO | Recomendado |
| `summary` | Resumo na listagem de posts | Não |
| `tags` | Lista de tags | Não |
| `categories` | Lista de categorias | Não |

---

## 🖼️ Como Inserir Imagens em um Post

### Método 1: Page Bundle (Recomendado)

**O que é Page Bundle?**
É uma pasta que contém o post e suas imagens juntas.

**Estrutura:**
```
content/
└── posts/
    └── meu-post/          <-- Pasta do post
        ├── index.md       <-- Conteúdo do post
        ├── capa.jpg       <-- Imagem de capa
        ├── foto1.jpg      <-- Outras imagens
        └── foto2.png
```

**Como criar:**
```bash
hugo new posts/meu-post/index.md
```

**Frontmatter para imagem de capa:**
```yaml
---
title: "Meu Post"
cover:
    image: "capa.jpg"              # Nome do arquivo (sem pasta)
    alt: "Descrição da imagem"
    caption: "Legenda opcional"
    relative: true                 # CRUCIAL para page bundles
---
```

**Inserindo imagens no texto:**
```markdown
![Descrição da foto](foto1.jpg)
```

**Vantagens:**
- Tudo organizado em uma pasta
- Imagens otimizadas automaticamente pelo Hugo
- Responsive images com srcset automático
- Fácil de gerenciar

### Método 2: Pasta `/static`

**Estrutura:**
```
static/
└── images/
    └── posts/
        └── meu-post/
            ├── capa.jpg
            └── foto1.jpg
```

**Frontmatter:**
```yaml
cover:
    image: "/images/posts/meu-post/capa.jpg"  # Caminho absoluto com /
    alt: "Descrição"
    relative: false
```

**No texto:**
```markdown
![Descrição](/images/posts/meu-post/foto1.jpg)
```

### Método 3: Imagens Externas (CDN/URL)

**Frontmatter:**
```yaml
cover:
    image: "https://example.com/imagem.jpg"
    alt: "Descrição"
    relative: false
```

**No texto:**
```markdown
![Descrição](https://example.com/foto.jpg)
```

---

## 🎯 Opções Avançadas de Imagem de Capa

### Esconder Imagem em Locais Específicos

```yaml
cover:
    image: "capa.jpg"
    alt: "Alt text"
    relative: true
    hidden: false        # Mostra/esconde no próprio post
    hiddenInList: false  # Mostra/esconde na homepage/lista
    hiddenInSingle: false
```

**Exemplos de uso:**
- `hidden: true` - Esconde apenas no post (mostra na lista)
- `hiddenInList: true` - Esconde na homepage (mostra no post)

### Hierarquia de Imagens para OpenGraph/Twitter

O PaperMod usa esta ordem de prioridade para redes sociais:

1. `cover.image` no frontmatter
2. `images` (lista) - primeira imagem
3. Arquivos na page bundle com `feature` no nome
4. Arquivos com `cover` ou `thumbnail` no nome

**Exemplo usando lista `images`:**
```yaml
images:
  - /posts/meu-post/capa.jpg
  - /posts/meu-post/thumbnail.jpg
```

---

## 📝 Formatação de Conteúdo em Markdown

### Títulos
```markdown
# Título H1
## Título H2
### Título H3
#### Título H4
```

### Texto
```markdown
**Negrito**
*Itálico*
~~Riscado~~
`código inline`
```

### Links
```markdown
[Texto do link](https://exemplo.com)
[Link com título](https://exemplo.com "Título ao passar o mouse")
```

### Listas

**Lista não-ordenada:**
```markdown
- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2
- Item 3
```

**Lista ordenada:**
```markdown
1. Primeiro
2. Segundo
3. Terceiro
```

### Citações
```markdown
> Esta é uma citação.
> Pode ter múltiplas linhas.
```

### Blocos de Código

**Código inline:** `` `código` ``

**Bloco de código com syntax highlighting:**
```
```python
def hello():
    print("Olá, mundo!")
```
```

**Linguagens suportadas:** python, javascript, go, html, css, bash, yaml, json, etc.

---

## 🎨 Recursos Especiais do PaperMod

### Índice (Table of Contents)

**Ativar no frontmatter:**
```yaml
ShowToc: true
TocOpen: false  # false = começa fechado, true = começa aberto
```

### Links de Edição (Contribuir no GitHub)

```yaml
editPost:
    URL: "https://github.com/usuario/repo/content"
    Text: "Sugerir Mudanças"
    appendFilePath: true  # Adiciona o caminho do arquivo automaticamente
```

### Botão de Compartilhamento

```yaml
ShowShareButtons: true
```

Adiciona botões para compartilhar em:
- Twitter/X
- LinkedIn
- Reddit
- Facebook
- WhatsApp
- Telegram

---

## 📂 Organização de Conteúdo

### Estrutura Recomendada

```
content/
├── posts/              # Posts do blog
│   ├── 2025/
│   │   ├── post1/
│   │   │   ├── index.md
│   │   │   └── imagens...
│   │   └── post2.md
│   └── 2024/
│       └── post-antigo.md
├── about/
│   └── index.md        # Página sobre
├── projects/
│   └── index.md        # Página de projetos
└── search.md           # Página de busca
```

### Seções Personalizadas

Para criar uma nova seção (ex: "Projetos"):

1. Crie a pasta: `content/projetos/`
2. Adicione um `_index.md`:

```markdown
---
title: "Projetos"
layout: "archives"
url: "/projetos/"
---
```

3. Adicione ao menu no `hugo.yaml`:

```yaml
menu:
  main:
    - name: Projetos
      url: /projetos/
      weight: 20
```

---

## 🚀 Comandos Úteis do Hugo

```bash
# Criar novo post
hugo new posts/nome-do-post.md

# Criar page bundle
hugo new posts/nome-do-post/index.md

# Executar servidor de desenvolvimento
hugo server -D  # -D mostra rascunhos (draft: true)

# Construir site para produção
hugo

# Ver versão do Hugo
hugo version

# Limpar cache
hugo mod clean
```

---

## ✅ Checklist para Criar um Post

- [ ] Criar arquivo do post (manual ou com `hugo new`)
- [ ] Adicionar frontmatter completo (título, data, descrição)
- [ ] Definir `draft: false` para publicar
- [ ] Adicionar tags e categorias relevantes
- [ ] Adicionar imagem de capa (com `alt` text)
- [ ] Escrever conteúdo em markdown
- [ ] Adicionar imagens no texto (se necessário)
- [ ] Revisar ortografia e formatação
- [ ] Testar no servidor local (`hugo server`)
- [ ] Verificar se aparece corretamente na homepage
- [ ] Construir site para produção (`hugo`)

---

## 🔍 Troubleshooting Comum

### Post não aparece no site
- Verifique se `draft: false` no frontmatter
- Confirme que a data não está no futuro
- Execute `hugo server -D` para ver rascunhos

### Imagem não carrega
- **Page bundle:** Use `relative: true` no frontmatter
- **Pasta static:** Use caminho absoluto começando com `/`
- Verifique se o arquivo existe e o nome está correto

### Imagem muito grande
- O PaperMod exibe imagens no tamanho original
- Redimensione/comprima a imagem antes de adicionar
- Recomendado: máximo 1200px de largura

---

## 📖 Recursos Adicionais

- **Features PaperMod:** https://adityatelange.github.io/hugo-PaperMod/posts/papermod/papermod-features/
- **Variables Reference:** https://adityatelange.github.io/hugo-PaperMod/posts/papermod/papermod-variables/
- **Hugo Content Management:** https://gohugo.io/content-management/
- **Markdown Guide:** https://www.markdownguide.org/

---

## 💡 Dicas Finais

1. **Use page bundles** sempre que possível - melhor organização
2. **Sempre adicione `alt` text** nas imagens - importante para acessibilidade e SEO
3. **Escreva boas descrições** - aparecem no Google e redes sociais
4. **Use tags relevantes** - ajuda na organização e descoberta
5. **Teste localmente** antes de publicar - use `hugo server`
6. **Mantenha imagens otimizadas** - comprime para carregar mais rápido
