import cors from 'cors'
import { config } from '@keystone-6/core'
import { listDefinition as lists } from './lists'
import appConfig from './config'
import envVar from './environment-variables'
import { Request, Response, NextFunction } from 'express'
import { createAuth } from '@keystone-6/auth'
import { statelessSessions } from '@keystone-6/core/session'
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache'
import { createPreviewMiniApp } from './express-mini-apps/preview/app'

import qrcode from 'qrcode'
import { authenticator } from 'otplib'
import bodyParser from 'body-parser'

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'name role email twoFactorAuthBypass twoFactorAuthVerified',
  secretField: 'password',
  initFirstItem: {
    // If there are no items in the database, keystone will ask you to create
    // a new user, filling in these fields.
    fields: ['name', 'email', 'password', 'role'],
  },
})

const session = statelessSessions(appConfig.session)

export default withAuth(
  config({
    db: {
      provider: appConfig.database.provider,
      url: appConfig.database.url,
      idField: {
        kind: 'autoincrement',
      },
    },
    ui: {
      // If `isDisabled` is set to `true` then the Admin UI will be completely disabled.
      isDisabled: envVar.isUIDisabled,
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
    storage: {
      files: {
        kind: 'local',
        type: 'file',
        storagePath: appConfig.files.storagePath,
        serverRoute: {
          path: '/files',
        },
        generateUrl: (path) => `/files${path}`,
      },
      images: {
        kind: 'local',
        type: 'image',
        storagePath: appConfig.images.storagePath,
        serverRoute: {
          path: '/images',
        },
        generateUrl: (path) => `/images${path}`,
      },
    },
    graphql: {
      apolloConfig: {
        cache: new InMemoryLRUCache({
          // ~100MiB
          maxSize: Math.pow(2, 20) * envVar.memoryCacheSize,
          // 5 minutes (in milliseconds)
          ttl: envVar.memoryCacheTtl,
        }),
      },
    },
    server: {
      healthCheck: {
        path: '/health_check',
        data: { status: 'healthy' },
      },
      extendExpressApp: (app, commonContext) => {
        app.use(bodyParser.json())

        // 2FA: froce redirect to 2fa verification after signin
        app.use(async (req: Request, res: Response, next: NextFunction) => {
          const signinRoute = '/signin'
          const redirectTo2faVerify = `${signinRoute}?from=%2F2fa-verify`
          if (
            req.originalUrl.startsWith(signinRoute) &&
            req.originalUrl !== redirectTo2faVerify
          ) {
            return res.redirect(redirectTo2faVerify)
          }
          next()
        })

        const corsOpts = {
          origin: envVar.cors.allowOrigins,
        }

        console.log(
          JSON.stringify({
            severity: 'DEBUG',
            message: 'cors allow origins',
            debugPayload: {
              corsOpts,
            },
          })
        )

        const corsMiddleware = cors(corsOpts)

        // Check if the request is sent by an authenticated user
        const authenticationMw = async (
          req: Request,
          res: Response,
          next: NextFunction
        ) => {
          const context = await commonContext.withRequest(req, res)
          const token = req?.cookies?.['keystonejs-session']

          // User has been logged in
          if (context?.session?.data?.role) {
            return next()
          }

          if (token) {
            res.status(401).json({
              status: 'fail',
              data: 'Authentication fails due to session cookie is not valid.',
            })
          }

          return next()
        }

        // enable cors and authentication middlewares
        app.options('/api/graphql', authenticationMw, corsMiddleware)
        app.post('/api/graphql', authenticationMw, corsMiddleware)

        // 2FA: reset twoFactorAuthVerified to false when user logout
        app.use(async (req, res, next) => {
          if (
            req.originalUrl === '/api/graphql' &&
            req.body?.operationName === 'EndSession'
          ) {
            const context = await commonContext.withRequest(req, res)
            await context.db.User.updateOne({
              where: { id: context.session.itemId },
              data: {
                twoFactorAuthVerified: false,
              },
            })
          }
          next()
        })

        // 2FA: middleware to check if user has verified 2FA on every request
        app.use(async (req: Request, res: Response, next: NextFunction) => {
          const context = await commonContext.withRequest(req, res)

          // Skip 2FA check if user is not logged in
          if (!context.session?.data) {
            return next()
          }

          // Skip 2FA check for some routes
          const excludedRoutes = ['/2fa', '/_next', '/favicon.ico', '/api']
          if (
            excludedRoutes.some((route) => req.originalUrl.startsWith(route))
          ) {
            if (
              req.originalUrl === '/2fa-verify' &&
              context.session?.data.twoFactorAuthVerified
            ) {
              return res.redirect('/')
            } else {
              return next()
            }
          }

          // Skip 2FA check if user has bypassed flag
          if (context.session?.data.twoFactorAuthBypass) {
            return next()
          }

          // Redirect if user has not verified 2FA
          if (context.session?.data.twoFactorAuthVerified) {
            return next()
          } else {
            res.redirect('/2fa-verify')
          }
        })

        // 2FA: generate secret and get QR code
        app.get('/api/2fa/setup', async (req, res) => {
          const context = await commonContext.withRequest(req, res)
          const currentSession = context?.session
          if (!currentSession) {
            res.status(403).send({ success: false, error: 'no session' })
            return
          }
          const tempSecret = authenticator.generateSecret()
          // save tempSecret to user table column twoFactorAuthTemp
          await context.db.User.updateOne({
            where: { id: currentSession?.itemId },
            data: {
              twoFactorAuthTemp: tempSecret,
            },
          })

          const service = 'KidsReporter Keystone' //TODO: env
          const otpauth = authenticator.keyuri(
            currentSession?.data?.email,
            service,
            tempSecret
          )

          qrcode.toDataURL(otpauth, (err, imageUrl) => {
            if (err) {
              console.warn('Error with QR')
              return
            }

            res.send({ qrcode: imageUrl })
          })
        })

        // 2FA: verify token and save temp secret to user
        app.post('/api/2fa/setup', async (req, res) => {
          const token = req.body?.token
          if (!token) {
            res.status(422).send({ success: false, error: 'no token' })
            return
          }

          const context = await commonContext.withRequest(req, res)
          const currentSession = context?.session
          if (!currentSession) {
            res.status(403).send({ success: false, error: 'no session' })
            return
          }

          const user = await context.db.User.findOne({
            where: { id: currentSession?.itemId },
          })
          if (!user) {
            res.status(500).send({ success: false, error: 'no user' })
            return
          }

          const tempSecret = user?.twoFactorAuthTemp
          const isValid = authenticator.check(token, String(tempSecret))

          if (isValid) {
            await context.db.User.updateOne({
              where: { id: currentSession?.itemId },
              data: {
                twoFactorAuthSecret: tempSecret,
              },
            })
            await context.db.User.updateOne({
              where: { id: currentSession?.itemId },
              data: {
                twoFactorAuthTemp: '',
              },
            })
            res.send({ success: true })
          } else {
            res.status(403).send({ success: false, error: 'invalid token' })
            return
          }
        })

        // 2FA: verify token
        app.post('/api/2fa/check', async (req, res) => {
          const token = req.body?.token
          if (!token) {
            res.status(422).send({ success: false, error: 'no token' })
            return
          }

          const context = await commonContext.withRequest(req, res)
          const currentSession = context?.session
          if (!currentSession) {
            res.status(403).send({ success: false, error: 'no session' })
            return
          }

          const user = await context.db.User.findOne({
            where: { id: currentSession?.itemId },
          })
          if (!user) {
            res.status(500).send({ success: false, error: 'no user' })
            return
          }

          const isValid = authenticator.check(
            token,
            String(user?.twoFactorAuthSecret)
          )

          res.send({ success: isValid })
        })

        // proxy authenticated requests to preview server
        app.use(
          createPreviewMiniApp({
            previewServer: envVar.previewServer,
            keystoneContext: commonContext,
          })
        )
      },
    },
  })
)
