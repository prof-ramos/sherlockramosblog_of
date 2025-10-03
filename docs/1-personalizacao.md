# Manual de Personalização - Hugo PaperMod

Este manual descreve como personalizar a aparência do seu site usando o tema PaperMod.

## 📚 Recursos Oficiais

- **GitHub:** https://github.com/adityatelange/hugo-PaperMod
- **Wiki:** https://github.com/adityatelange/hugo-PaperMod/wiki
- **Site Demo:** https://adityatelange.github.io/hugo-PaperMod/
- **Guia de Features:** https://adityatelange.github.io/hugo-PaperMod/posts/papermod/papermod-features/
- **FAQs:** https://adityatelange.github.io/hugo-PaperMod/posts/papermod/papermod-faq/

---

## 🎨 Como Mudar as Cores do Site

### Passo 1: Criar o Arquivo CSS Personalizado

O PaperMod processa automaticamente CSS personalizado. Crie esta estrutura de pastas:

```
seu-site/
├── assets/
│   └── css/
│       └── extended/
│           └── custom.css    <-- seu CSS aqui
```

**Comando para criar:**
```bash
mkdir -p assets/css/extended
touch assets/css/extended/custom.css
```

### Passo 2: Adicionar as Variáveis de Cor

Adicione este código no arquivo `assets/css/extended/custom.css`:

```css
:root {
    --theme: #fff;                      /* Fundo principal */
    --entry: #cfcfff;                   /* Fundo dos cards/entradas */
    --primary: rgba(0, 0, 106, 0.88);   /* Cor do texto principal */
    --secondary: rgba(0, 0, 80, 0.78);  /* Texto secundário (datas, metadados) */
    --tertiary: rgba(0, 0, 106, 0.16);  /* Elementos terciários */
    --content: rgba(0, 0, 60, 0.88);    /* Cor do conteúdo */
    --hljs-bg: #1c1d21;                 /* Fundo de código destacado */
    --code-bg: #f5f5f5;                 /* Fundo de blocos de código */
    --border: #eee;                     /* Cor das bordas */
}

/* Cores para o modo escuro */
.dark {
    --theme: #101c7a;
    --entry: #202062;
    --primary: rgba(235, 235, 255, 0.96);
    --secondary: rgba(235, 235, 255, 0.66);
    --tertiary: rgba(1, 1, 5, 0.32);
    --content: rgba(235, 235, 255, 0.82);
    --hljs-bg: #2e2e33;
    --code-bg: #37383e;
    --border: #446;
}
```

**Referência das Variáveis:**
- `--theme`: Fundo geral da página
- `--entry`: Fundo dos cards de posts
- `--primary`: Cor principal do texto
- `--secondary`: Texto secundário (metadados, datas)
- `--tertiary`: Elementos UI terciários
- `--content`: Texto do conteúdo principal
- `--code-bg`: Fundo dos blocos de código
- `--border`: Cor das bordas

---

## 🔤 Como Mudar as Fontes

### Passo 1: Adicionar Fontes Externas

Crie o arquivo `layouts/partials/extend_head.html`:

```bash
mkdir -p layouts/partials
touch layouts/partials/extend_head.html
```

Adicione as fontes do Google Fonts (ou outra fonte):

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```

### Passo 2: Aplicar as Fontes via CSS

No arquivo `assets/css/extended/custom.css`, adicione:

```css
body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Fontes para títulos */
h1, h2, h3, h4, h5, h6 {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
}

/* Fontes para código */
code, pre {
    font-family: 'Fira Code', 'Courier New', monospace;
}
```

**Fontes populares:**
- **Inter**: Moderna e limpa
- **Roboto**: Profissional
- **Poppins**: Arredondada e amigável
- **Fira Code**: Ideal para código (suporta ligaduras)

---

## 🎭 Como Mudar os Ícones

### Ícones Sociais (Página Inicial / Profile Mode)

Lista completa de ícones disponíveis: https://github.com/adityatelange/hugo-PaperMod/tree/master/layouts/partials/svg.html

**Ícones disponíveis:**
- github, gitlab, bitbucket
- twitter, x (novo logo do Twitter)
- linkedin, facebook, instagram
- youtube, telegram, discord
- email, rss, mastodon
- stackoverflow, reddit
- e muitos outros...

**Como usar no `hugo.yaml`:**

```yaml
params:
  profileMode:
    enabled: true
    title: "Seu Nome"
    socialIcons:
      - name: github
        url: "https://github.com/usuario"
      - name: twitter
        url: "https://twitter.com/usuario"
      - name: linkedin
        url: "https://linkedin.com/in/usuario"
      - name: email
        url: "mailto:voce@exemplo.com"
      - name: rss
        url: "/index.xml"
```

### Ícones de Compartilhamento (Posts)

Ative no `hugo.yaml`:

```yaml
params:
  ShowShareButtons: true  # Mostra botões de compartilhar em posts
```

### Adicionar Ícones Personalizados (SVG)

Crie o arquivo `layouts/partials/svg.html` e adicione seu ícone personalizado:

```html
{{- if (eq .name "meu-icone") }}
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <!-- seu código SVG aqui -->
  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
</svg>
{{- end }}
```

Depois use no config:

```yaml
socialIcons:
  - name: meu-icone
    url: "https://exemplo.com"
```

---

## 🎨 Personalizações Avançadas

### Sobrescrever Templates do Tema

Para modificar qualquer template do tema:

1. Copie o arquivo de: `themes/PaperMod/layouts/_default/list.html`
2. Cole em: `layouts/_default/list.html` (na raiz do site)
3. Edite sua cópia - Hugo vai usar ela no lugar da original

### Adicionar JavaScript Personalizado

Crie `layouts/partials/extend_footer.html`:

```html
<script>
  // Seu JavaScript aqui
  console.log('Script personalizado carregado');
</script>
```

### Favicon Personalizado

Adicione os arquivos na pasta `/static/`:
- `favicon.ico`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png`
- `safari-pinned-tab.svg`

---

## 🔧 Outras Configurações Úteis

### Tema Padrão (Claro/Escuro)

No `hugo.yaml`:

```yaml
params:
  defaultTheme: auto  # Opções: auto, light, dark
```

### Mostrar/Ocultar Elementos

```yaml
params:
  ShowReadingTime: true       # Tempo de leitura
  ShowShareButtons: true      # Botões de compartilhar
  ShowPostNavLinks: true      # Links próximo/anterior
  ShowBreadCrumbs: true       # Breadcrumbs (migalhas de pão)
  ShowCodeCopyButtons: true   # Botão copiar código
  ShowWordCount: true         # Contador de palavras
  disableScrollToTop: false   # Botão voltar ao topo
```

---

## 📦 Exemplo de Configuração Completa

```yaml
baseURL: "https://seusite.com/"
title: Meu Site
theme: PaperMod
languageCode: pt-br
defaultContentLanguage: pt-br

params:
  env: production
  defaultTheme: auto
  ShowReadingTime: true
  ShowShareButtons: true
  ShowPostNavLinks: true
  ShowBreadCrumbs: true
  ShowCodeCopyButtons: true
  
  profileMode:
    enabled: true
    title: "Bem-vindo"
    subtitle: "Meu site pessoal"
    imageUrl: "profile.jpg"
    buttons:
      - name: Posts
        url: /posts/
      - name: Sobre
        url: /about/
  
  socialIcons:
    - name: github
      url: "https://github.com/usuario"
    - name: twitter
      url: "https://twitter.com/usuario"
    - name: email
      url: "mailto:voce@exemplo.com"

menu:
  main:
    - name: Posts
      url: /posts/
      weight: 10
    - name: Tags
      url: /tags/
      weight: 20
    - name: Sobre
      url: /about/
      weight: 30
```

---

## 📖 Recursos Adicionais

- **ExampleSite (código fonte):** https://github.com/adityatelange/hugo-PaperMod/tree/exampleSite
- **Lista de Ícones SVG:** https://github.com/adityatelange/hugo-PaperMod/blob/master/layouts/partials/svg.html
- **Documentação Hugo (templates):** https://gohugo.io/documentation/

Todas as personalizações respeitam o pipeline de assets do Hugo (minificação, fingerprinting, bundling) automaticamente!
