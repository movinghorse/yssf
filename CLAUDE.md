# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hexo static site for 云水山房 (YSSF), a Chinese guesthouse/homestay website. The site features a booking system, VR room viewing, seasonal themes, and a custom-built theme.

## Commands

```bash
# Development
hexo server          # Start local server at http://localhost:4000

# Build
hexo generate        # Generate static files to /public
hexo clean           # Clean generated files

# Deployment
hexo deploy          # Deploy to GitHub Pages (branch: pages)

# Content
hexo new post "文章标题"    # Create new blog post
hexo new page "页面名称"    # Create new page
```

This project uses yarn as the package manager.

## Architecture

### Theme Structure
The custom theme is located at `themes/yssf/`:
- `layout/` - EJS templates (index.ejs is the main layout)
- `layout/partial/` - Reusable template partials (head.ejs, footer.ejs)
- `source/css/` - Stylesheets
- `source/js/` - Client-side JavaScript (main.js, supabase-config.js)
- `source/images/` - Theme images

### Configuration
- `_config.yml` - Main Hexo configuration and theme settings
- `themes/yssf/_config.yml` - Theme-specific defaults

Key configuration sections in root `_config.yml`:
- `rooms` - Room listings with prices and amenities
- `services` - Featured services displayed on site
- `theme_config` - Theme customization (colors, features, SEO, VR rooms)

### Booking System
The booking system uses Supabase as a backend:
- `themes/yssf/source/js/supabase-config.js` - Supabase connection configuration
- `themes/yssf/source/js/main.js` - Booking form submission logic
- Requires a `bookings` table in Supabase with fields: id, check_in, check_out, room, guests, name, phone, special_requests, created_at, status

### Content Structure
- `source/_posts/` - Blog posts
- `source/` - Static pages (each in its own folder with index.md)
- `source/images/` - Site images including room photos

### Features
- **Seasonal themes**: Auto-switches based on current month (spring/summer/autumn/winter)
- **VR viewing**: Uses Pannellum library for 360° room views
- **Responsive design**: Mobile-first with hamburger menu
- **Booking form**: Integrates with Supabase backend

## Deployment

Deployed to GitHub Pages at `git@github.com:movinghorse/yssf.git` on the `pages` branch.
