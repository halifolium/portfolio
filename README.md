# Halifolium Portfolio

Modern, animated portfolio website built with Next.js 14, React, and TypeScript. Features a beautiful Japanese-inspired design with smooth animations powered by Anime.js.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Anime.js** for smooth animations
- **Responsive Design** - Mobile-first approach
- **Dark/Light Theme** toggle
- **PWA Ready** - Progressive Web App support
- **SEO Optimized** - Meta tags, Open Graph, Twitter Cards
- **Performance Optimized** - Image optimization, lazy loading

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: CSS Modules with CSS Variables
- **Animations**: Anime.js
- **Fonts**: Google Fonts (Outfit, JetBrains Mono)

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx
│   ├── Testimonials.tsx
│   └── Experience.tsx
├── data/
│   └── skills.ts        # Skills data
├── public/
│   ├── img/            # Images
│   └── manifest.json   # PWA manifest
└── package.json
```

## 🎨 Customization

### Colors

Edit CSS variables in `app/globals.css`:

```css
:root {
  --accent-primary: #f4a5b8;
  --bg-primary: #0f1318;
  /* ... */
}
```

### Content

- **Skills**: Edit `data/skills.ts`
- **Projects**: Edit `components/Projects.tsx`
- **Experience**: Edit `components/Experience.tsx`
- **Testimonials**: Edit `components/Testimonials.tsx`

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

```bash
# Build the project
npm run build

# The output will be in the .next folder
# Deploy according to your platform's instructions
```

## ⚠️ Security Notes

The project may show npm audit warnings for dev dependencies (ESLint, glob). These are development tools only and do not affect production builds. The warnings are related to `eslint-config-next` dependencies and will be resolved in future Next.js updates.

## 📝 License

© 2025 Halifolium. All rights reserved.

