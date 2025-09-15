import type { NextConfig } from 'next'


const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX ?? '/tina-docs'
const imagesPath = basePath ? `${basePath}/landing/_next/image` : '/_next/image'
 
const nextConfig: NextConfig = {
  // basePath,
  assetPrefix,
  images: {
    path: imagesPath,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.tina.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      }
    ],
  },
  async headers() {
    // these are also defined in the root layout since github pages doesn't support headers
    const headers = [
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
      {
        key: 'Content-Security-Policy',
        value: "frame-ancestors 'self'",
      },
    ];
    return [
      {
        source: '/(.*)',
        headers,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ];
  },
};

export default nextConfig