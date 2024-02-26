import { Express } from 'express'
import bodyParser from 'body-parser'

import { KeystoneContext } from '@keystone-6/core/types'

import { twoFactorAuthMiddleware } from './middleware'
import { twoFactorAuthRoute } from './route'

export function twoFactorAuth(app: Express, commonContext: KeystoneContext) {
  app.use(bodyParser.json())
  twoFactorAuthMiddleware(app, commonContext)
  twoFactorAuthRoute(app, commonContext)
}
