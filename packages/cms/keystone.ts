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
  sessionData: 'name role email',
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

        // proxy authenticated requests to preview server
        app.use(
          createPreviewMiniApp({
            previewServer: envVar.previewServer,
            keystoneContext: commonContext,
          })
        )

        app.use(bodyParser.json())
        // 2FA: generate secret and get QR code
        app.get('/api/2fa/setup', async (req, res) => {
          const context = await commonContext.withRequest(req, res)
          const currentSession = context?.session
          if (!currentSession) {
            res.status(403).send({ success: false, error: 'no session' })
            return
          }
          console.log('session', currentSession) //TEST
          // console.log('cookies', req?.cookies) //TEST
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

          console.log(currentSession) //TEST
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
          console.log('session', currentSession) //TEST
          // console.log('cookies', req?.cookies) //TEST

          const user = await context.db.User.findOne({
            where: { id: currentSession?.itemId },
          })
          if (!user) {
            res.status(500).send({ success: false, error: 'no user' })
            return
          }

          const tempSecret = user?.twoFactorAuthTemp
          console.log(tempSecret) //TEST
          const isValid = authenticator.check(token, String(tempSecret))
          console.log(authenticator.generate(tempSecret)) //TEST

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
          console.log(authenticator.generate(user?.twoFactorAuthSecret)) //TEST

          res.send({ success: isValid })
        })
      },
    },
  })
)
