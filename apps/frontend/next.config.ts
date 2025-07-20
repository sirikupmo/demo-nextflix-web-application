import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      { // Added for TMDB images
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/**',
      },
      // Add other image domains if necessary
    ],
  },
  /** 
   * Rewrites:  /api/**  --->  {BACKEND}/api/**
   * NestJS มี `app.setGlobalPrefix('api')` แล้ว
   */
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
    },
  ],
};

export default nextConfig;
