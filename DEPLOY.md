# 🚀 Deployment Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Build for Production

```bash
npm run build
```

### 3. Test Production Build Locally

```bash
npm start
```

## Deployment Options

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js
   - Deploy!

### Other Platforms

#### Netlify

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add environment variables if needed

#### Self-Hosted

```bash
# Build
npm run build

# Start production server
npm start
```

## Environment Variables

No environment variables required for basic setup.

## Post-Deployment Checklist

- [ ] Test all pages
- [ ] Verify images load correctly
- [ ] Check animations work
- [ ] Test theme toggle
- [ ] Verify mobile responsiveness
- [ ] Check SEO meta tags
- [ ] Test PWA functionality

## Performance Tips

- Images are automatically optimized by Next.js
- CSS is automatically minified
- JavaScript is automatically code-split
- Static assets are cached

