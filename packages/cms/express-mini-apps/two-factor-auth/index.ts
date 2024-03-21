import { Express } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { verify } from 'jsonwebtoken'

import { KeystoneContext } from '@keystone-6/core/types'

import { twoFactorAuthMiddleware } from './middleware'
import { twoFactorAuthRoute } from './route'
import appConfig from '../../config'

function verify2FAJWT(jwt: string, currentUserId: string) {
  try {
    const decoded = verify(jwt, appConfig.twoFactorAuth.secret)
    const { userId, twoFactorExpire } = decoded

    if (currentUserId !== userId || Date.now() > twoFactorExpire) {
      return false
    }

    return true
  } catch (error) {
    // consider failed if jwt decode failed
    console.warn('2FA JWT verification failed:', error)
    return false
  }
}

function twoFactorAuth(app: Express, commonContext: KeystoneContext) {
  app.use(bodyParser.json())
  app.use(cookieParser())
  twoFactorAuthMiddleware(app, commonContext)
  twoFactorAuthRoute(app, commonContext)
}

export { twoFactorAuth, verify2FAJWT }
