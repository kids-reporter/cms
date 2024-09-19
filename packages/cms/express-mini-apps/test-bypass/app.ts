import { default as express } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

export function createProxyMiniApp({
  frontendOrigin,
}: {
  frontendOrigin: string
}) {
  const router = express.Router()

  router.get(
    `/test-bypass`,
    createProxyMiddleware({
      target: frontendOrigin,
      changeOrigin: true,
      followRedirects: true,
      pathRewrite: {
        '^/test-bypass': '/api/test-bypass',
      },
    })
  )

  return router
}
