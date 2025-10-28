# 📸 Usando Imagens WebP com Fallback

**Data:** 28 de Outubro de 2025

---

## 🎯 Objetivo

Implementar suporte a imagens WebP (formato moderno, ~30% menor que JPG/PNG) com fallback automático para navegadores antigos.

---

## ✅ Implementação

### 1. Shortcode Hugo: `webp-image`

Criado em `layouts/shortcodes/webp-image.html` - Gera tags `<picture>` com WebP e fallback.

**Uso em posts Markdown:**

```markdown
{{< webp-image src="/images/foto.jpg" alt="Descrição da imagem" >}}

{{< webp-image 
    src="/images/banner.png" 
    alt="Banner do site"
    width="1200"
    height="630"
    class="hero-image"
    loading="eager"
>}}
```

**Parâmetros:**
- `src` (obrigatório): Caminho para imagem JPG/PNG original
- `alt` (obrigatório): Texto alternativo para acessibilidade
- `class` (opcional): Classes CSS
- `width` (opcional): Largura da imagem
- `height` (opcional): Altura da imagem
- `loading` (opcional): `lazy` (padrão) ou `eager`

### 2. HTML Gerado

```html
<picture class="hero-image">
  <source srcset="/images/foto.webp" type="image/webp">
  <img src="/images/foto.jpg" alt="Descrição" width="1200" height="630" loading="lazy" decoding="async">
</picture>
```

**Como funciona:**
1. Navegadores modernos (Chrome, Firefox, Edge): carregam `.webp` (menor, mais rápido)
2. Navegadores antigos (IE11, Safari < 14): carregam `.jpg`/`.png` (fallback)
3. Zero JavaScript necessário - funciona nativamente

### 3. Detecção de Suporte (Opcional)

Script criado em `static/js/webp-support.js` - Adiciona classe `.webp` ou `.no-webp` no HTML para targeting CSS.

**Uso em CSS:**

```css
/* Estilos específicos para browsers com WebP */
.webp .background {
    background-image: url('/images/bg.webp');
}

/* Fallback para browsers sem WebP */
.no-webp .background {
    background-image: url('/images/bg.jpg');
}
```

---

## 📦 Workflow Recomendado

### Passo 1: Adicionar imagem original
```
static/images/minha-foto.jpg
```

### Passo 2: Converter para WebP

**Online (fácil):**
- https://cloudconvert.com/jpg-to-webp
- https://ezgif.com/jpg-to-webp

**Linha de comando (avançado):**
```bash
# Usando cwebp (Google)
cwebp -q 80 minha-foto.jpg -o minha-foto.webp

# Usando ImageMagick
convert minha-foto.jpg -quality 80 minha-foto.webp
```

### Passo 3: Colocar ambos os arquivos no `static/images/`
```
static/images/minha-foto.jpg    (original)
static/images/minha-foto.webp   (WebP otimizado)
```

### Passo 4: Usar no post
```markdown
{{< webp-image src="/images/minha-foto.jpg" alt="Minha foto" >}}
```

O shortcode automaticamente busca `minha-foto.webp` como source!

---

## 📊 Benefícios

| Aspecto | Benefício |
|---------|-----------|
| **Tamanho** | ~30-50% menor que JPG/PNG |
| **Qualidade** | Igual ou melhor que JPG na mesma qualidade |
| **Performance** | Carregamento mais rápido, melhor LCP (Lighthouse) |
| **Compatibilidade** | Fallback automático para browsers antigos |
| **SEO** | Melhor score no PageSpeed Insights |

### Suporte de Browsers (2025):
- ✅ Chrome/Edge: 100%
- ✅ Firefox: 100%
- ✅ Safari: 100% (desde v14, 2020)
- ✅ iOS Safari: 100% (desde iOS 14)
- ⚠️ IE11: Fallback para JPG/PNG

---

## 🎨 Exemplo Completo

**Arquivo:** `content/posts/exemplo-imagens.md`

```markdown
---
title: "Post com Imagens"
date: 2025-10-28
---

## Imagem Simples

{{< webp-image src="/images/paisagem.jpg" alt="Linda paisagem" >}}

## Imagem com Lazy Loading Desabilitado (Above the Fold)

{{< webp-image 
    src="/images/hero.png" 
    alt="Banner principal"
    loading="eager"
    width="1920"
    height="1080"
>}}

## Imagem com Classe CSS

{{< webp-image 
    src="/images/perfil.jpg" 
    alt="Foto de perfil"
    class="rounded-full shadow-lg"
>}}
```

---

## 🔧 Troubleshooting

### Imagem não aparece
- ✅ Verifique se o arquivo `.jpg`/`.png` existe em `static/images/`
- ✅ Crie a versão `.webp` com o mesmo nome base
- ✅ Verifique o caminho no `src` (deve começar com `/`)

### WebP não carrega
- ✅ Arquivo `.webp` deve estar na mesma pasta que original
- ✅ Nome deve ser idêntico exceto pela extensão
- ✅ Browser deve suportar WebP (use DevTools Network para verificar)

### Fallback não funciona
- ✅ Tag `<picture>` deve ter `<img>` dentro (não pode ser vazia)
- ✅ Atributo `alt` é obrigatório para acessibilidade

---

## ✅ Checklist Final

- [x] Shortcode `webp-image.html` criado
- [x] Script `webp-support.js` criado (opcional)
- [x] Documentação completa
- [x] Fallback automático para browsers antigos
- [x] Lazy loading por padrão
- [x] Acessibilidade (alt text obrigatório)

---

**Status:** PRODUCTION-READY ✅  
**Manutenção:** Sempre criar `.webp` ao adicionar novas imagens
