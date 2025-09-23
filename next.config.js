/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Remove output: 'standalone' as it can cause issues with Vercel
  // Add trailing slash for better routing
  trailingSlash: false,
  // Ensure proper image optimization
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig