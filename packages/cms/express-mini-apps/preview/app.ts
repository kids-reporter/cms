import { promises as fs } from 'fs'
import { default as express } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { KeystoneContext } from '@keystone-6/core/types'

// TODO: remove previewProxyMiddleware-related when substitution service is steady
const previewFeatureFlag = true

export function createPreviewMiniApp({
  previewServer,
  previewSecretPath,
  frontendOrigin,
  keystoneContext,
}: {
  previewServer: {
    origin: string
    path: string
  }
  previewSecretPath: string
  frontendOrigin: string
  keystoneContext: KeystoneContext
}) {
  const router = express.Router()

  /**
   *  Check if the request is sent by an authenticated user
   */
  const authenticationMw: express.RequestHandler = async (req, res, next) => {
    const context = await keystoneContext.withRequest(req, res)
    // User has been logged in
    if (context?.session?.data?.role) {
      return next()
    }

    // Otherwise, redirect them to login page
    const originUrl = req.originalUrl
    res.redirect(`/signin?from=${encodeURIComponent(originUrl)}`)
  }

  const previewProxyMiddleware = createProxyMiddleware({
    target: previewServer.origin,
    changeOrigin: true,
    onProxyRes: (proxyRes) => {
      // The response from preview nuxt server might be with Cache-Control header.
      // However, we don't want to get cached responses for `draft` posts.
      // Therefore, we do not cache html response intentionlly by overwritting the Cache-Control header.
      proxyRes.headers['cache-control'] = 'no-store'
    },
  })

  const previewProxyMw = createProxyMiddleware({
    target: frontendOrigin,
    changeOrigin: true,
    followRedirects: true,
    pathRewrite: async (path) => {
      // '/preview-server/article/slug' => [ '', 'preview-server', 'article', 'slug' ]
      const paths = path?.split('/')
      const type = paths?.[2]
      const slug = paths?.[3]

      let secretValue
      try {
        secretValue = await fs.readFile(previewSecretPath, {
          encoding: 'utf8',
        })
      } catch (err) {
        console.error('Failed to read secret!', err)
      }

      const isRequestValid =
        (type === 'article' || type === 'topic') && slug && secretValue
      const previewDestination = isRequestValid
        ? `/api/draft?secret=${secretValue}&type=${type}&slug=${slug}`
        : '/not-found'
      return previewDestination
    },
  })

  // proxy preview server traffic to subdirectory to prevent path collision between CMS and preview server
  router.get(
    '/assets/images/*',
    createProxyMiddleware({
      target: previewServer.origin,
      changeOrigin: true,
      pathRewrite: {
        '/assets/images/': `${frontendOrigin}/assets/images/`,
      },
    })
  )

  router.get(
    `${previewServer.path}/*`,
    authenticationMw,
    previewFeatureFlag ? previewProxyMw : previewProxyMiddleware
  )

  router.use(
    `${previewServer.path}/_next/*`,
    createProxyMiddleware({
      target: previewServer.origin,
      changeOrigin: true,
    })
  )

  return router
}
