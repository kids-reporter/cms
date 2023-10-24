/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: '/images',
        destination: process.env.IMAGE_ORIGIN,
      },
    ]
  },
  poweredByHeader: false, // Remove poweredby for security issue, ref: https://nextjs.org/docs/pages/api-reference/next-config-js/poweredByHeader
}
module.exports = nextConfig

/*
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({})
*/
