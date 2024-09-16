/** @type {import('next').NextConfig} */

const isPreviewMode = process.env.NEXT_PUBLIC_IS_PREVIEW_MODE === 'true'
const origin = process.env.ORIGIN || 'http://localhost:3000'

const nextConfig = {
  basePath: isPreviewMode ? '/preview-server' : '',
  assetPrefix: origin,
  output: 'standalone',
  compiler: {
    styledComponents: true,
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
