/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Статический экспорт для Cloudflare Pages
  output: 'export',
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
    unoptimized: true, // Требуется для статического экспорта
  },
  // Оптимизация для продакшена
  compress: true,
  poweredByHeader: false,
  // PWA поддержка
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

