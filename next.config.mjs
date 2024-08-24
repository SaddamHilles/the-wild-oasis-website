/** @type {import('next').NextConfig} */
const nextConfig = {
  // i18n: {
  //   locales: ['en', 'fr', 'es'], // List of supported locales
  //   defaultLocale: 'en',          // Default locale
  //   localeDetection: true,        // Auto-detect user locale
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qhcoiyybtosnkbgkqcby.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/cabin-images/**',
      },
    ],
  },
};

export default nextConfig;
