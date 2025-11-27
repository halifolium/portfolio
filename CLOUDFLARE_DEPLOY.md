# Инструкция по деплою на Cloudflare Pages

## Настройки в Cloudflare Pages Dashboard

1. **Build command:**
   ```
   npm run build
   ```

2. **Build output directory:**
   ```
   out
   ```

3. **Root directory (optional):**
   ```
   /
   ```

4. **Deploy command:**
   ```
   (оставьте пустым)
   ```

## Важно!

- ❌ **НЕ используйте** `npx wrangler deploy` - это для Workers, не для Pages
- ✅ Проект настроен на **статический экспорт** (`output: 'export'` в `next.config.js`)
- ✅ После сборки Next.js создаст папку `out` со статическими файлами
- ✅ Cloudflare Pages автоматически задеплоит содержимое папки `out`

## Переменные окружения (если нужны)

Если используете переменные окружения, добавьте их в настройках проекта:
- `NEXT_PUBLIC_SITE_URL` - URL вашего сайта (например: `https://your-site.pages.dev`)

## После деплоя

После успешного деплоя ваш сайт будет доступен по адресу:
`https://your-project-name.pages.dev`

