import cors from 'cors'
import { config } from '@keystone-6/core'
import { listDefinition as lists } from './lists'
import appConfig from './config'
import envVar from './environment-variables'
import express, { Request, Response, NextFunction } from 'express'
import gqlTag from 'graphql-tag'
import { createAuth } from '@keystone-6/auth'
import { statelessSessions } from '@keystone-6/core/session'
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache'

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'name role',
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

        // This middleware is available in Express v4.16.0 onwards
        const jsonBodyParser = express.json()

        // The above `/api/graphql` endpoint only accepts authenticated requets,
        // which means those requests are along with session cookie.
        //
        // But the client has to request `authenticateUserWithPassword` mutation
        // to get the session cookie.
        //
        // Therefore, we provide another endpoint `/api/authenticate-user` for anonymous requests.
        // But, this endpoint only accepts `authenticateUserWithPassword` mutation.
        app.post('/api/authenticate-user', jsonBodyParser, async (req, res) => {
          let gqlQuery

          try {
            gqlQuery = gqlTag`
                ${req.body?.query}
              `
          } catch (err) {
            console.log(
              JSON.stringify({
                severity: 'INFO',
                message:
                  '(express/endpoint): `/api/authenticate-user` can not parse the graphql query/mutation',
              })
            )
            return res.status(400).json({
              status: 'fail',
              data: 'Can not parse graphql query/mutation',
            })
          }

          const def = gqlQuery?.definitions?.[0]
          if (
            def?.kind === 'OperationDefinition' &&
            def?.operation === 'mutation' &&
            def?.selectionSet.selections?.[0]?.kind === 'Field' &&
            def?.selectionSet.selections?.[0]?.name?.value ===
              'authenticateUserWithPassword'
          ) {
            const context = await commonContext.withRequest(req, res)
            const result = await context.graphql.raw({
              query: req.body?.query,
              variables: req.body?.variables,
            })
            return res.status(200).json(result)
          }
          return res.status(400).json({
            status: 'fail',
            data: 'Only accept mutation field authenticateUserWithPassword',
          })
        })
      },
    },
  })
)
