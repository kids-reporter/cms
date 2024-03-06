import { Express } from 'express'
import { KeystoneContext } from '@keystone-6/core/types'

import appConfig from '../../config'

import qrcode from 'qrcode'
import { authenticator } from 'otplib'

export function twoFactorAuthRoute(
  app: Express,
  commonContext: KeystoneContext
) {
  if (!appConfig.twoFactorAuth.enable) {
    app.get('/2fa-verify', async (req, res) => {
      return res.redirect('/')
    })
    app.get('/2fa-setup', async (req, res) => {
      return res.redirect('/')
    })
  } else {
    // generate secret and get QR code
    app.get('/api/2fa/setup', async (req, res) => {
      const context = await commonContext.withRequest(req, res)
      const currentSession = context?.session
      if (!currentSession) {
        res.status(403).send({ status: 'error', message: 'no session' })
        return
      }
      const tempSecret = authenticator.generateSecret()
      // save tempSecret to user table column twoFactorAuthTemp
      try {
        await context.prisma.User.update({
          where: { id: currentSession?.itemId },
          data: {
            twoFactorAuthTemp: tempSecret,
          },
        })
      } catch (error) {
        console.error('Failed to save tempSecret to user table:', error)
        res.status(500).send({
          status: 'error',
          message: 'Failed to save tempSecret to user table',
        })
        return
      }

      const service = appConfig.twoFactorAuth.serviceName
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

        res.send({ status: 'success', qrcode: imageUrl })
      })
    })

    // verify token and save temp secret to user
    app.post('/api/2fa/setup', async (req, res) => {
      const token = req.body?.token
      if (!token) {
        res.status(422).send({ status: 'error', message: 'no token' })
        return
      }

      const context = await commonContext.withRequest(req, res)
      const currentSession = context?.session
      if (!currentSession) {
        res.status(403).send({ status: 'error', message: 'no session' })
        return
      }

      const user = await context.db.User.findOne({
        where: { id: currentSession?.itemId },
      })
      if (!user) {
        res.status(500).send({ status: 'error', message: 'no user' })
        return
      }

      const tempSecret = user?.twoFactorAuthTemp
      const isValid = authenticator.check(token, String(tempSecret))

      if (isValid) {
        const sessionExpireTime = new Date(
          new Date().getTime() + appConfig.session.maxAge * 1000
        )
        try {
          await context.prisma.User.update({
            where: { id: currentSession?.itemId },
            data: {
              twoFactorAuthSecret: tempSecret,
              twoFactorAuthTemp: '',
              twoFactorAuthVerified: sessionExpireTime,
            },
          })
        } catch (error) {
          console.error('Failed to save 2fa setup to user table:', error)
          res.status(500).send({
            status: 'error',
            message: 'Failed to save 2fa setup to user table',
          })
          return
        }
        res.send({ status: 'success' })
      } else {
        res.status(403).send({ status: 'error', message: 'invalid token' })
        return
      }
    })

    // verify token
    app.post('/api/2fa/check', async (req, res) => {
      const token = req.body?.token
      if (!token) {
        res.status(422).send({ status: 'error', message: 'no token' })
        return
      }

      const context = await commonContext.withRequest(req, res)
      const currentSession = context?.session
      if (!currentSession) {
        res.status(403).send({ status: 'error', message: 'no session' })
        return
      }

      const user = await context.db.User.findOne({
        where: { id: currentSession?.itemId },
      })
      if (!user) {
        res.status(500).send({ status: 'error', message: 'no user' })
        return
      }

      const isValid = authenticator.check(
        token,
        String(user?.twoFactorAuthSecret)
      )

      res.send({ status: isValid ? 'success' : 'error' })
    })
  }
}
