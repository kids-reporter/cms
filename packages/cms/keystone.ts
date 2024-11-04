import Path from 'node:path'
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
import { twoFactorAuth } from './express-mini-apps/two-factor-auth'

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'name role email twoFactorAuth',
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
      // Replace default favicon, ref: https://github.com/keystonejs/keystone/discussions/7506
      getAdditionalFiles: [
        async () => [
          {
            mode: 'copy',
            inputPath: Path.resolve('public/favicon.ico'),
            outputPath: 'public/favicon.ico',
          },
          {
            mode: 'copy',
            inputPath: Path.resolve('public/typing-texting.gif'),
            outputPath: 'public/typing-texting.gif',
          },
        ],
      ],
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

        // enable 2FA middleware and related routes
        twoFactorAuth(app, commonContext)

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
