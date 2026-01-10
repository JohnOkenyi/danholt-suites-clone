/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'danholt-suites-ccb8a24a.base44.app',
      },
    ],
  },
}

module.exports = nextConfig
