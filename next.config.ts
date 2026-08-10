import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig
