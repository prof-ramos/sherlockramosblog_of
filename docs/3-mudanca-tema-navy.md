# Como Foi Feita a Mudança para o Tema Navy

Este documento explica o processo de alteração das cores do site de cinza para azul dark navy fosco.

## 📅 Data da Mudança
**03 de outubro de 2025**

---

## 🎯 Objetivo

Substituir as cores padrão cinza do tema PaperMod por um esquema de cores azul dark navy fosco, mantendo a legibilidade e o contraste adequado tanto no modo claro quanto no modo escuro.

---

## 📝 Processo Passo a Passo

### 1. Criar a Estrutura de Pastas para CSS Personalizado

O PaperMod permite adicionar CSS personalizado através da pasta `assets/css/extended/`. Qualquer arquivo `.css` nesta pasta é automaticamente incluído no bundle final do site.

**Comando executado:**
```bash
mkdir -p assets/css/extended
```

### 2. Criar o Arquivo CSS Personalizado

Criei o arquivo `assets/css/extended/custom.css` com as variáveis CSS customizadas.

**Arquivo criado:** `assets/css/extended/custom.css`

### 3. Definir as Cores Navy

Escolhi uma paleta de cores navy que proporciona boa legibilidade:

**Modo Claro:**
- Fundo principal: `#e8edf4` (azul muito claro, quase branco)
- Fundo de cards: `#d4dae3` (azul claro suave)
- Texto principal: `#0f1419` (navy muito escuro, quase preto)
- Texto secundário: `#1a2332` (navy escuro)
- Código: `#cbd3df` (azul claro fosco)
- Bordas: `#a8b2c0` (azul médio acinzentado)

**Modo Escuro:**
- Fundo principal: `#0f1419` (navy muito escuro, fosco)
- Fundo de cards: `#161b2e` (navy escuro com leve toque azulado)
- Texto principal: `#e8edf4` (azul muito claro)
- Texto secundário: `#b8c2d0` (azul claro acinzentado)
- Código: `#1a1f2e` (navy escuro fosco)
- Bordas: `#2a3040` (navy médio)

### 4. Aplicar as Variáveis CSS com `!important`

Como o PaperMod já define cores padrão nas suas variáveis CSS core, foi necessário usar `!important` para sobrescrever essas definições.

**Conteúdo final do arquivo `assets/css/extended/custom.css`:**

```css
/* Navy Theme - Modo Claro */
:root {
    --theme: #e8edf4 !important;
    --entry: #d4dae3 !important;
    --primary: #0f1419 !important;
    --secondary: #1a2332 !important;
    --tertiary: rgba(15, 20, 25, 0.12) !important;
    --content: #0f1419 !important;
    --code-block-bg: #1a1f2e !important;
    --code-bg: #cbd3df !important;
    --border: #a8b2c0 !important;
}

/* Navy Theme - Modo Escuro */
.dark {
    --theme: #0f1419 !important;
    --entry: #161b2e !important;
    --primary: #e8edf4 !important;
    --secondary: #b8c2d0 !important;
    --tertiary: rgba(232, 237, 244, 0.08) !important;
    --content: #d4dae3 !important;
    --code-block-bg: #0a0d12 !important;
    --code-bg: #1a1f2e !important;
    --border: #2a3040 !important;
}
```

### 5. Como o Hugo Processa o CSS

O Hugo automaticamente:

1. **Detecta** arquivos em `assets/css/extended/*.css`
2. **Concatena** todos os arquivos CSS extended em um bundle
3. **Minifica** o CSS para reduzir o tamanho
4. **Adiciona fingerprint** (hash no nome do arquivo) para cache-busting
5. **Serve** o arquivo final como `/assets/css/stylesheet.[hash].css`

Conforme definido no template `themes/PaperMod/layouts/partials/head.html`:
```go
{{- $extended := (resources.Match "css/extended/*.css") | resources.Concat "assets/css/extended.css" | resources.Minify }}
{{- $stylesheet := (slice $license_css $core $extended) | resources.Concat "assets/css/stylesheet.css"  }}
```

### 6. Verificação da Aplicação

O Hugo detectou automaticamente a mudança no arquivo CSS e reconstruiu o site:

```
Change detected, rebuilding site (#1).
Asset changed /css/extended/custom.css
Web Server is available at /
Total in 8 ms
```

---

## 🎨 Variáveis CSS Utilizadas

| Variável | Modo Claro | Modo Escuro | Descrição |
|----------|------------|-------------|-----------|
| `--theme` | #e8edf4 | #0f1419 | Cor de fundo principal da página |
| `--entry` | #d4dae3 | #161b2e | Cor de fundo dos cards/posts |
| `--primary` | #0f1419 | #e8edf4 | Cor do texto principal |
| `--secondary` | #1a2332 | #b8c2d0 | Cor do texto secundário (metadados) |
| `--tertiary` | rgba(15,20,25,0.12) | rgba(232,237,244,0.08) | Elementos terciários UI |
| `--content` | #0f1419 | #d4dae3 | Cor do conteúdo dos posts |
| `--code-block-bg` | #1a1f2e | #0a0d12 | Fundo de blocos de código destacados |
| `--code-bg` | #cbd3df | #1a1f2e | Fundo de código inline e blocos |
| `--border` | #a8b2c0 | #2a3040 | Cor das bordas |

---

## ⚙️ Por Que Usar `!important`?

O uso de `!important` foi necessário porque:

1. **Ordem de carregamento**: O CSS extended é carregado DEPOIS do CSS core do tema
2. **Especificidade igual**: Ambos usam `:root` e `.dark`, tendo a mesma especificidade
3. **Última regra ganha**: Sem `!important`, o core sobrescreve o extended
4. **Solução garantida**: `!important` garante que nossas cores sejam aplicadas

**Alternativa sem `!important` (mais complexa):**
- Criar um tema filho completo
- Modificar os arquivos core do tema
- Usar seletores mais específicos (menos elegante)

---

## 🔄 Como Alterar as Cores Novamente

Se quiser mudar as cores no futuro:

1. Edite o arquivo `assets/css/extended/custom.css`
2. Modifique os valores hexadecimais das cores
3. Salve o arquivo
4. O Hugo automaticamente detecta e reconstrói o site

**Exemplo:**
```css
:root {
    --theme: #sua-nova-cor !important;
    --primary: #outra-cor !important;
}
```

---

## 🧪 Teste de Cores

Para testar diferentes cores antes de aplicar:

1. Use ferramentas online:
   - **Coolors.co**: Gerador de paletas
   - **Contrast Checker**: Verificar legibilidade WCAG
   - **Color Hunt**: Inspiração de paletas

2. Teste sempre o contraste:
   - Texto principal deve ter pelo menos 4.5:1 de contraste
   - Texto grande pode ter 3:1

3. Verifique em ambos os modos (claro/escuro)

---

## 📊 Comparação Antes x Depois

### Antes (Cores Padrão PaperMod)
- Fundo claro: Branco `#ffffff`
- Fundo escuro: Cinza escuro `#1e1e1e`
- Bordas: Cinza claro `#eaeaea`

### Depois (Navy Personalizado)
- Fundo claro: Azul claro `#e8edf4`
- Fundo escuro: Navy escuro fosco `#0f1419`
- Bordas claro: Azul médio `#a8b2c0`
- Bordas escuro: Navy médio `#2a3040`

---

## 🛠️ Troubleshooting

### Problema: Cores não aparecem

**Solução:**
1. Limpe o cache do navegador (Ctrl+Shift+R ou Cmd+Shift+R)
2. Verifique se o arquivo está em `assets/css/extended/custom.css`
3. Confirme que o Hugo está rodando e detectou a mudança
4. Verifique os logs: `Change detected, Asset changed /css/extended/custom.css`

### Problema: Algumas cores não mudaram

**Solução:**
1. Adicione `!important` às variáveis que não mudaram
2. Verifique se usou os nomes corretos das variáveis CSS
3. Limpe a pasta `resources/` e reconstrua: `rm -rf resources && hugo`

### Problema: Modo escuro não funciona

**Solução:**
1. Certifique-se de ter definido `.dark { ... }` no CSS
2. Verifique se o botão de tema está ativo no site
3. Teste clicando no ícone da lua/sol no cabeçalho

---

## 📚 Referências

- **PaperMod CSS Extended**: https://github.com/adityatelange/hugo-PaperMod/wiki/FAQs#bundling-custom-css-with-themes-assets
- **Hugo Asset Pipeline**: https://gohugo.io/hugo-pipes/introduction/
- **CSS Custom Properties**: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
- **WCAG Contrast Guidelines**: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

---

## ✅ Checklist de Implementação

- [x] Criar pasta `assets/css/extended/`
- [x] Criar arquivo `custom.css`
- [x] Definir variáveis para modo claro (`:root`)
- [x] Definir variáveis para modo escuro (`.dark`)
- [x] Adicionar `!important` para sobrescrever defaults
- [x] Testar no navegador (modo claro)
- [x] Testar no navegador (modo escuro)
- [x] Verificar contraste de legibilidade
- [x] Documentar as mudanças

---

## 💡 Dicas Finais

1. **Mantenha cópias**: Guarde as cores antigas comentadas no CSS para fácil reversão
2. **Teste acessibilidade**: Use ferramentas de contraste para garantir legibilidade
3. **Consistência**: Mantenha a mesma paleta em todo o site
4. **Documentação**: Sempre documente mudanças significativas de design
5. **Git**: Faça commit das mudanças com mensagem descritiva

---

**Arquivo de implementação:** `assets/css/extended/custom.css`  
**Data de criação:** 03 de outubro de 2025  
**Status:** ✅ Implementado e funcionando
