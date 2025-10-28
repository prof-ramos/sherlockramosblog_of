# Como Usar o PagesCMS com seu Site Hugo

## 📋 O que é PagesCMS?

PagesCMS é um CMS (Sistema de Gerenciamento de Conteúdo) **gratuito e open-source** que funciona direto no GitHub. Ele permite editar o conteúdo do seu site Hugo através de uma interface visual amigável, sem precisar mexer em arquivos YAML ou Git.

## ✨ Principais Vantagens

- ✅ **Gratuito e Open Source**
- ✅ **Sem instalação** - Funciona online
- ✅ **Interface visual** - Edite posts sem ver código
- ✅ **Baseado no GitHub** - Todo conteúdo versionado
- ✅ **Configuração simples** - Um único arquivo `.pages.yml`
- ✅ **Editor rich-text** - Formatação visual de textos

## 🚀 Como Começar

### Passo 1: Conectar seu Repositório ao GitHub

Se ainda não fez isso:

```bash
# Inicializar Git (se necessário)
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Adicionar configuração PagesCMS"

# Conectar ao GitHub (substitua com seu repositório)
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git

# Enviar para GitHub
git push -u origin main
```

### Passo 2: Acessar o PagesCMS

1. Acesse: **https://pagescms.org**
2. Clique em **"Login with GitHub"**
3. Autorize o acesso ao seu repositório
4. Selecione o repositório do seu site Hugo
5. Pronto! O CMS vai carregar automaticamente

### Passo 3: Criar Conteúdo

No painel do PagesCMS você verá:

- **Posts do Blog** - Gerenciar artigos
- **Página Sobre** - Editar página "Sobre"

## 📝 Criando um Novo Post

1. Clique em **"Posts do Blog"**
2. Clique em **"New Post"** ou **"Novo"**
3. Preencha os campos:
   - **Título**: Nome do post
   - **Data**: Data de publicação
   - **Rascunho**: Marque se ainda não quiser publicar
   - **Tags**: Palavras-chave (ex: hugo, tecnologia, tutorial)
   - **Categorias**: Categorias do post
   - **Descrição**: Resumo curto
   - **Imagem de Capa**: Upload de imagem opcional
   - **Conteúdo**: Texto principal (editor visual)
4. Clique em **"Save"** ou **"Salvar"**
5. O PagesCMS fará commit automaticamente no GitHub

## 📁 Estrutura de Arquivos

O PagesCMS está configurado para gerenciar:

```
seu-site/
├── .pages.yml              ← Configuração do PagesCMS
├── content/
│   ├── posts/              ← Posts do blog (editáveis via CMS)
│   └── about/              ← Página Sobre (editável via CMS)
├── static/
│   └── images/             ← Imagens enviadas via CMS
└── hugo.yaml              ← Configurações do site (editar manualmente)
```

## 🖼️ Gerenciamento de Imagens

### Upload via PagesCMS

Ao adicionar uma **Imagem de Capa** no editor:
1. Clique no campo "Imagem"
2. Escolha **"Upload"**
3. Selecione a imagem do seu computador
4. A imagem será salva em `static/images/`

### Usar Imagem no Post

No editor rich-text, você pode:
- Inserir imagens direto do campo "Imagem de Capa"
- Arrastar e soltar imagens no conteúdo
- Colar imagens copiadas

## ⚙️ Campos Disponíveis

### Post do Blog

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| **Título** | Texto curto | ✅ Sim | Nome do post |
| **Data** | Data/Hora | ✅ Sim | Data de publicação |
| **Rascunho** | Checkbox | Não | Se marcado, não publica |
| **Tags** | Lista | Não | Palavras-chave (ex: `hugo`, `web`) |
| **Categorias** | Lista | Não | Categorias do post |
| **Descrição** | Texto longo | Não | Resumo para SEO |
| **Imagem de Capa** | Objeto | Não | Imagem principal do post |
| **Conteúdo** | Rich-text | Não | Texto principal do post |

### Imagem de Capa (subcampos)

- **Imagem**: Upload da imagem
- **Texto Alternativo**: Descrição para acessibilidade
- **Legenda**: Texto que aparece abaixo da imagem

## 🔄 Workflow Recomendado

### Para Criar Conteúdo

1. **PagesCMS**: Criar e editar posts
2. **GitHub**: Versionar automaticamente
3. **Replit Deploy**: Publica automaticamente as mudanças

### Para Configurações do Site

1. **Editar diretamente**: `hugo.yaml` no Replit
2. **Fazer commit**: Enviar mudanças para GitHub
3. **Deploy**: Atualizar site publicado

## 🛠️ Personalizar Configuração

Se quiser adicionar mais campos ou coleções, edite `.pages.yml`:

### Exemplo: Adicionar campo "Autor"

```yaml
content:
  - name: posts
    fields:
      # ... campos existentes ...
      
      - name: author
        label: Autor
        type: string
        default: "Seu Nome"
```

### Exemplo: Adicionar coleção "Projetos"

```yaml
content:
  # ... posts e about ...
  
  - name: projects
    label: Projetos
    type: collection
    path: content/projects
    fields:
      - {name: title, label: Título, type: string}
      - {name: url, label: URL, type: string}
      - {name: description, label: Descrição, type: text}
      - {name: body, label: Detalhes, type: markdown}
```

## 🎯 Dicas e Boas Práticas

### ✅ Faça

- Use títulos descritivos para posts
- Adicione texto alternativo em todas as imagens
- Preencha a descrição para melhor SEO
- Use tags consistentes (sempre minúsculas)
- Salve como rascunho se o post não estiver pronto

### ❌ Evite

- Não use caracteres especiais nos nomes de arquivo
- Não faça upload de imagens muito grandes (comprima antes)
- Não esqueça de desmarcar "Rascunho" quando publicar
- Não edite `.pages.yml` diretamente pelo PagesCMS

## 🔐 Segurança

- PagesCMS **não armazena** seu conteúdo
- Tudo fica no **seu repositório GitHub**
- Você mantém controle total dos arquivos
- Pode revogar acesso a qualquer momento

## 📚 Alternativas ao PagesCMS

Se preferir outra solução:

| CMS | Tipo | Custo | Complexidade |
|-----|------|-------|--------------|
| **PagesCMS** | Git-based | Grátis | Baixa ⭐ |
| **Decap CMS** | Git-based | Grátis | Média ⭐⭐ |
| **Forestry** | Git-based | $$ | Média ⭐⭐ |
| **Strapi** | Headless | Grátis | Alta ⭐⭐⭐ |

## 🆘 Troubleshooting

### Problema: PagesCMS não encontra meu repositório

**Solução**: 
1. Verifique que o repositório está no GitHub (não GitLab/Bitbucket)
2. Certifique-se que `.pages.yml` está na raiz do projeto
3. Tente desconectar e reconectar no pagescms.org

### Problema: Imagens não aparecem no site

**Solução**:
1. Verifique que imagens estão em `static/images/`
2. No post, use caminho: `/images/nome-da-imagem.jpg`
3. Faça rebuild do site Hugo

### Problema: Mudanças não aparecem no site publicado

**Solução**:
1. Aguarde o GitHub processar o commit (1-2 min)
2. Force rebuild no Replit Deploy
3. Limpe cache do navegador (Ctrl+Shift+R)

## 🔗 Links Úteis

- **PagesCMS**: https://pagescms.org
- **Documentação**: https://pagescms.org/docs
- **GitHub do PagesCMS**: https://github.com/pages-cms/pages-cms
- **Hugo Docs**: https://gohugo.io/documentation/

## ✨ Próximos Passos

1. ✅ Configuração do PagesCMS concluída (`.pages.yml` criado)
2. ⬜ Conectar repositório ao GitHub
3. ⬜ Acessar https://pagescms.org e fazer login
4. ⬜ Criar seu primeiro post
5. ⬜ Publicar e compartilhar!

---

**Nota**: O arquivo `.pages.yml` já está configurado e pronto para uso. Basta conectar ao GitHub e acessar o PagesCMS!
