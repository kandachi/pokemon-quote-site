import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd36moxvk4g8o5m.cloudfront.net', // あなたのCloudFrontドメイン
        // port: '', // 必要であれば
        // pathname: '/account123/**', // 必要であればパスのパターン
      },
    ],
  },
};

export default nextConfig;
