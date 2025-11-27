import type { Metadata, Viewport } from 'next';
import { Outfit, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import ScrollToTop from '@/components/ScrollToTop';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://halifolium.com'),
  title: 'Halifolium - Creative Developer & Designer',
  description: 'Creative developer passionate about building beautiful, functional web experiences. Portfolio of Halifolium.',
  keywords: ['web developer', 'designer', 'portfolio', 'frontend', 'react', 'vue', 'javascript'],
  authors: [{ name: 'Halifolium' }],
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Halifolium - Creative Developer & Designer',
    description: 'Creative developer passionate about building beautiful, functional web experiences.',
    images: [{ url: '/img/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Halifolium - Creative Developer & Designer',
    description: 'Creative developer passionate about building beautiful, functional web experiences.',
    images: ['/img/og-image.jpg'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: '/img/favicon.svg',
    apple: '/img/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#f4a5b8',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${outfit.variable} ${jetbrainsMono.variable}`}>
        <Script
          src="https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js"
          strategy="afterInteractive"
        />
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').catch(() => {});
              });
            }
          `}
        </Script>
        <Preloader />
        <CustomCursor />
        <BackgroundAnimation />
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}

