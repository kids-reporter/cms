/** @type {import('next').NextConfig} */

const isPreviewMode = process.env.IS_PREVIEW_MODE === 'true'

const nextConfig = {
  basePath: isPreviewMode ? '/preview-server' : '',
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
