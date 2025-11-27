# Инструкция по деплою на Render

## Настройки в Render Dashboard

1. **Build Command:**
   ```
   npm install && npm run build
   ```

2. **Start Command:**
   ```
   npx serve@latest out
   ```

3. **Environment:**
   - **Node Version:** 18.x или 20.x

## Важно!

- ✅ Проект настроен на **статический экспорт** (`output: 'export'` в `next.config.js`)
- ✅ После сборки Next.js создаст папку `out` со статическими файлами
- ✅ Render будет использовать `serve` для раздачи статических файлов
- ❌ **НЕ используйте** `npm start` или `next start` - они не работают со статическим экспортом

## Переменные окружения (если нужны)

Если используете переменные окружения, добавьте их в настройках проекта:
- `NEXT_PUBLIC_SITE_URL` - URL вашего сайта (например: `https://your-app.onrender.com`)

## После деплоя

После успешного деплоя ваш сайт будет доступен по адресу:
`https://your-app.onrender.com`

## Альтернатива: Netlify

Если хотите использовать Netlify вместо Render:
- **Build command:** `npm run build`
- **Publish directory:** `out`
- **Deploy command:** (оставьте пустым)

