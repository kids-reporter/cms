import { Express } from 'express'
import { KeystoneContext } from '@keystone-6/core/types'

import appConfig from '../config'

import qrcode from 'qrcode'
import { authenticator } from 'otplib'

export function twoFactorAuthRoute(
  app: Express,
  commonContext: KeystoneContext
) {
  // generate secret and get QR code
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

  // verify token and save temp secret to user
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
      const sessionExpireTime = new Date(
        new Date().getTime() + appConfig.session.maxAge * 1000
      )
      await context.db.User.updateOne({
        where: { id: currentSession?.itemId },
        data: {
          twoFactorAuthSecret: tempSecret,
          twoFactorAuthTemp: '',
          twoFactorAuthVerified: sessionExpireTime,
        },
      })
      res.send({ success: true })
    } else {
      res.status(403).send({ success: false, error: 'invalid token' })
      return
    }
  })

  // verify token
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
}
