import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  reactStrictMode: true,

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
