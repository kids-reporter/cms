import { default as express } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { KeystoneContext } from '@keystone-6/core/types'

export function createPreviewMiniApp({
  previewServer,
  previewSecret,
  keystoneContext,
}: {
  previewServer: {
    origin: string
    path: string
  }
  previewSecret: string
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

  // proxy preview server traffic to subdirectory to prevent path collision between CMS and preview server
  router.get(
    '/assets/images/*',
    createProxyMiddleware({
      target: previewServer.origin,
      changeOrigin: true,
      pathRewrite: {
        '/assets/images/': `${previewServer.path}/assets/images/`,
      },
    })
  )

  router.get(`${previewServer.path}/*`, authenticationMw, (req, res) => {
    // '/preview-server/article/slug' => [ '', 'preview-server', 'article', 'slug' ]
    const paths = req.originalUrl?.split('/')
    const type = paths?.[2]
    const slug = paths?.[3]
    const isValidPath = (type === 'article' || type === 'topic') && slug
    const previewDestination = `${previewServer.origin}${
      isValidPath
        ? `/api/draft?secret=${previewSecret}&type=${type}&slug=${slug}`
        : 'not-found'
    }`
    res.redirect(301, previewDestination)
  })

  router.use(
    `${previewServer.path}/_next/*`,
    createProxyMiddleware({
      target: previewServer.origin,
      changeOrigin: true,
    })
  )

  return router
}
