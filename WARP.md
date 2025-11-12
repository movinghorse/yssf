# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

云水山房 (YSSF) - A Chinese-language Hexo-based static site generator project for a boutique inn/guesthouse website. The site features a custom theme with booking system integration via Supabase, seasonal theming, and traditional Chinese design aesthetics.

## Common Commands

### Development
```bash
# Start local development server (default port 4000)
npm run server

# Build static files to public/ directory
npm run build

# Clean generated files and cache
npm run clean
```

### Content Management
```bash
# Create a new post (will be created in source/_posts/)
hexo new post "文章标题"

# Create a new page
hexo new page "页面名称"

# Create a draft
hexo new draft "草稿标题"
```

### Deployment
```bash
# Deploy to GitHub Pages (configured for git@github.com:movinghorse/yssf.git, branch: pages)
npm run deploy

# Build and deploy in one step
npm run clean && npm run build && npm run deploy
```

## Architecture

### Site Structure

- **Hexo Framework**: Static site generator with custom theming
- **Custom Theme**: `themes/yssf/` - Custom theme with traditional Chinese design
- **Content Source**: `source/` - All content files and assets
- **Generated Output**: `public/` - Built static files (git-ignored)
- **Configuration**: `_config.yml` - Main Hexo config with site metadata, theme settings, deployment config

### Theme Architecture (themes/yssf/)

The custom YSSF theme implements a single-page design with multiple key features:

**Layout System**:
- `layout/index.ejs` - Main single-page layout (~22KB, comprehensive homepage)
- `layout/partial/head.ejs` - HTML head with meta tags and assets
- `layout/partial/footer.ejs` - Footer component

**Frontend Assets**:
- `source/js/main.js` - Main JavaScript with:
  - Navigation system (scroll-based hide/show, mobile menu)
  - Hero slider with auto-advance (5s intervals)
  - Room card flip animations
  - **Supabase integration** for booking form submissions
  - Scroll-based animations (IntersectionObserver)
  - Seasonal theme switching (spring/summer/autumn/winter)
- `source/js/supabase-config.js` - Supabase client configuration
- `source/css/` - Theme styles
- `source/images/` - Theme image assets
- `source/fonts/` - Custom fonts

**Key Features**:
- **Booking System**: Form submissions saved to Supabase `bookings` table with fields: check_in, check_out, room, guests, name, phone, special_requests, status
- **Seasonal Theming**: Auto-detects current season and applies theme-specific content/styling
- **Parallax Scrolling**: Configured via `theme_config.features.parallax`
- **VR Room Views**: Configured room URLs in `_config.yml` under `custom.vr_rooms`

### Content Organization

The `source/` directory contains:
- `_posts/` - Blog posts/news articles
- Custom pages: 客房介绍, 庭院介绍, 温馨公告, 留言预定, etc.
- Room pages: 停云馆, 吟风亭, 筛月阁, 筛月阁-2, 还山楼
- `images/` - Content images
- `img/` - Additional image assets

### Configuration Hierarchy

1. **Root `_config.yml`**: 
   - Site metadata (title: 云水山房, language: zh-CN, timezone: Asia/Shanghai)
   - Room configurations (`rooms` array with pricing, amenities)
   - Service configurations (`services` array)
   - Theme-specific config under `theme_config`
   - Deployment config (GitHub Pages via hexo-deployer-git)

2. **Theme `themes/yssf/_config.yml`**:
   - Theme-level defaults
   - Color scheme (primary: #3A5A40, secondary: #F5F1E6, accent: #8B4513)
   - Layout settings
   - Feature toggles

### Dependencies

Key packages:
- `hexo@^7.3.0` - Core static site generator
- `hexo-deployer-git@^4.0.0` - Git deployment
- `@supabase/supabase-js@^2.77.0` - Backend for booking system
- Various hexo generators (archive, category, index, tag)
- Various hexo renderers (ejs, marked, pug, stylus)

### Supabase Integration

The booking system requires:
- Supabase project URL and anon key configured in `themes/yssf/source/js/supabase-config.js`
- Database table `bookings` with appropriate schema
- Currently uses placeholder values - **must be configured before deployment**

## Development Notes

### Working with the Theme

- Main theme entry point: `themes/yssf/layout/index.ejs`
- JavaScript uses ES6 modules (import/export) - requires proper build tooling
- Seasonal content automatically updates based on current month (0-11 indexing)
- Navigation uses hash-based routing for single-page sections

### Content Creation

- Posts use scaffolds from `scaffolds/` directory (draft.md, page.md, post.md)
- New posts support asset folders (`post_asset_folder: true` in config)
- Permalinks follow pattern: `:year/:month/:day/:title/`

### Deployment Flow

1. Content is in `source/` directory
2. `hexo generate` builds to `public/` directory
3. `hexo deploy` pushes `public/` to `pages` branch on GitHub
4. Configure GitHub Pages to serve from `pages` branch

## Important Configuration Values

- **Site Title**: 云水山房
- **Language**: zh-CN
- **Theme**: yssf
- **Deployment Branch**: pages
- **Booking Phone**: 400-888-8888 (configured in theme_config)
- **Address**: 浙江省杭州市西湖区云栖路88号
