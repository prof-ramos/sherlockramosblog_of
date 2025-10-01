# Overview

This is a Hugo static site generator project configured with the PaperMod theme with ProfileMode enabled. Hugo is a framework for building static websites and blogs with content written in Markdown. The project includes a basic blog setup with posts, an about page, and full theme customization through the PaperMod theme, which provides modern styling, dark mode support, and profile mode for the homepage.

# Recent Changes

**October 1, 2025**
- Installed PaperMod theme with ProfileMode enabled
- Upgraded Hugo from v0.126.1 to v0.146.0 (installed binary at ~/.local/bin/hugo)
- Converted configuration from config.toml to hugo.yaml
- Set language to Portuguese (pt-br)
- Created /about/ page
- Configured ProfileMode with welcome message and social icons

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Static Site Generation
- **Framework**: Hugo (v0.146.0) - A Go-based static site generator that compiles Markdown content into HTML
  - Binary location: `~/.local/bin/hugo`
  - Configuration: `hugo.yaml` (YAML format)
- **Content Organization**: Content is structured in the `/content` directory with separate folders for different content types (posts, about pages)
- **Archetype System**: Uses archetypes (templates) in `/archetypes/default.md` to scaffold new content with frontmatter
- **Language**: Portuguese (pt-br) with defaultContentLanguage set

## Theme Architecture
- **Theme**: PaperMod - A feature-rich Hugo theme based on hugo-paper
- **Theme Location**: Installed in `/themes/PaperMod` directory
- **CSS Architecture**: Modular CSS system with separate files for components (header, footer, post entries, search, etc.) and core styles (reset, theme variables, media queries)
- **Asset Pipeline**: Uses Hugo's asset generator with pipelining, fingerprinting, bundling, and minification for CSS and JavaScript

## Key Features
- **ProfileMode**: Enabled on homepage with custom welcome message, subtitle, and navigation buttons
- **Multiple Display Modes**: Supports regular mode, home-info mode, and profile mode for different homepage layouts
- **Theming**: Light/dark theme toggle with automatic detection based on browser preferences, using CSS custom properties for theme variables
- **Social Icons**: GitHub, Twitter, and LinkedIn icons configured
- **Search Functionality**: Client-side search powered by Fuse.js (fuzzy search library)
- **Internationalization**: Portuguese (pt-br) language support
- **Content Features**: Table of contents generation, breadcrumb navigation, post metadata, social sharing buttons, archive pages

## Frontend Structure
- **Layouts**: Template files in `/themes/PaperMod/layouts` define page structure using Go templating
- **Partials**: Reusable components (header, footer, breadcrumbs, social icons, etc.) in `/layouts/partials`
- **Shortcodes**: Custom content elements (figure, collapse, rawhtml, etc.) in `/layouts/shortcodes`
- **Responsive Design**: Mobile-first approach with media queries for different screen sizes

## Build Process
- **Output Directory**: Static files are generated to `/public` directory
- **Resource Generation**: CSS and other assets are processed and cached in `/resources/_gen`
- **Live Reload**: Development server includes live reload functionality for instant preview

## Content Workflow
- Content is written in Markdown with YAML frontmatter for metadata
- New content can be created manually or via `hugo new` command using archetypes
- Draft posts can be marked and excluded from production builds
- Posts support cover images, tags, categories, and custom taxonomies

# External Dependencies

## Core Framework
- **Hugo**: Static site generator (minimum version 0.146.0)

## Theme
- **PaperMod Theme**: Third-party Hugo theme providing UI components and styling
  - Source: https://github.com/adityatelange/hugo-PaperMod
  - License: MIT

## JavaScript Libraries
- **Fuse.js** (v7.0.0): Lightweight fuzzy-search library for client-side search functionality
  - Bundled in `/themes/PaperMod/assets/js/fuse.basic.min.js`
  - License: Apache 2.0

## Build Tools
- No external build tools required beyond Hugo itself
- Hugo handles all asset processing (CSS, JS minification, bundling)

## Hosting/Deployment
- Static files in `/public` can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, etc.)
- No server-side runtime dependencies

## Browser APIs
- LocalStorage: Used for theme preference persistence and menu scroll position
- Intersection Observer: Used for scroll-to-top functionality
- CSS Custom Properties: For dynamic theming