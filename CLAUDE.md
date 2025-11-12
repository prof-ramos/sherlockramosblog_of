# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog built with **Hugo** (static site generator) using the **PaperMod** theme. The blog is titled "Sherlock Ramos" and is deployed to GitHub Pages via GitHub Actions.

- **Language**: Portuguese Brazilian (pt-BR)
- **Theme**: PaperMod (located in `themes/PaperMod`)
- **Author**: Gabriel Ramos
- **Hugo Version**: v0.146.0 (specified in workflows and build scripts)
- **Deploy Target**: GitHub Pages

## Essential Commands

### Local Development

```bash
# Start local development server with live reload
hugo server

# Start server with drafts visible
hugo server -D

# Access at: http://localhost:1313/
```

### Building

```bash
# Build site for production (outputs to public/)
hugo --gc

# Build with minification
hugo --gc --minify

# Build with specific base URL
hugo --gc --minify --baseURL "https://yoursite.github.io/"
```

### Content Management

```bash
# Create a new blog post
hugo new posts/my-post.md

# Posts are created in: content/posts/
```

### Deployment

- **Automatic**: Push to `main` branch triggers GitHub Actions workflow (`.github/workflows/deploy.yml`)
- **Manual**: Use the build script for local builds: `./build.sh`
- The `build.sh` script installs Hugo v0.146.0 Extended for Linux and builds the site

## Architecture

### Directory Structure

```
content/
├── posts/          # Blog posts (markdown files)
├── about/          # About page
└── offline.md      # Offline page

static/
└── images/         # Static images (profile photos, post images)

themes/
└── PaperMod/       # Hugo theme (submodule or cloned)

layouts/            # Custom layout overrides for theme

public/             # Generated site (git-ignored, build output)
docs/               # Alternative build output directory

.github/
└── workflows/
    └── deploy.yml  # GitHub Pages deployment automation
```

### Configuration

The main configuration file is `hugo.yaml` (YAML format), which contains:

- Site metadata (title, language, author)
- Theme configuration (PaperMod)
- Profile mode settings with custom image
- Menu structure (Posts, About, Tags)
- Social icons (Twitter/X)
- Content display options (reading time, share buttons, TOC, etc.)
- Syntax highlighting with Monokai style

### Content Structure

All content is in Markdown format with YAML frontmatter:

- **Posts**: `content/posts/*.md`
  - Frontmatter fields: title, date, draft, tags, categories, description, cover
  - Cover images support: image, alt text, caption

- **About**: `content/about/_index.md`
  - Single page with custom content

### PagesCMS Integration

The `.pages.yml` file configures PagesCMS (https://pagescms.org) for visual content editing:
- Media uploads to `static/images/`
- Post management with rich-text editor
- About page editing

## Deployment

### GitHub Actions Workflow

The workflow (`.github/workflows/deploy.yml`):
1. Installs Hugo Extended v0.146.0 on Ubuntu
2. Checks out repository with submodules
3. Builds site with `hugo --gc --minify`
4. Deploys to GitHub Pages using `actions/deploy-pages@v4`

**Triggers**: Push to `main` branch or manual workflow dispatch

**Permissions Required**:
- `contents: read`
- `pages: write`
- `id-token: write`

### Local Build Script

`build.sh` is designed for CI/CD environments:
- Downloads and installs Hugo Extended v0.146.0 for Linux
- Builds site with garbage collection
- Outputs to `public/` directory

**Note**: For macOS development, use Homebrew-installed Hugo instead of this script.

## Theme Customization

PaperMod theme is configured with:
- **Profile Mode**: Enabled with custom profile image and buttons
- **Post Features**: Reading time, word count, share buttons, breadcrumbs, code copy buttons
- **Social Links**: Configured for Twitter/X
- **Syntax Highlighting**: Monokai style with line numbers

To customize theme templates, create overrides in the `layouts/` directory following Hugo's lookup order.

## Important Notes

- The site uses Hugo Extended version (required for SCSS/SASS processing)
- Base URL is set to `/` in hugo.yaml (GitHub Actions sets correct URL during build)
- Content language is set to Portuguese Brazilian (pt-BR)
- Images should be placed in `static/images/` directory
- Profile image is currently at `/images/IMG_0293.JPG`
