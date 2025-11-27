/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Статический экспорт для Cloudflare Pages и Render
  output: 'export',
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
    unoptimized: true, // Требуется для статического экспорта
  },
  // Оптимизация для продакшена
  compress: true,
  poweredByHeader: false,
  // Примечание: headers не работают со статическим экспортом
  // Headers можно настроить на уровне хостинга (Cloudflare Pages, Render и т.д.)
};

module.exports = nextConfig;

