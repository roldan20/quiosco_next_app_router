import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  },


  async redirects() {
    return [
      {
        source: '/',
        destination: '/order/cafe',
        permanent: false,
      },
    ]
  }
};

export default nextConfig;
