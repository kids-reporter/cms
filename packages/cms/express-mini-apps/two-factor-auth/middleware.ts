import { Express, Request, Response, NextFunction } from 'express'
import { KeystoneContext } from '@keystone-6/core/types'

import { gql } from '@keystone-6/core/admin-ui/apollo'

export function twoFactorAuthMiddleware(
  app: Express,
  commonContext: KeystoneContext
) {
  // Froce redirect to 2fa verification after signin
  const siginFromOverrideMw = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const signinRoute = '/signin'
    const queryString = Object.keys(req.query)
      .map((key) => key + '=' + req.query[key])
      .join('&')

    // prevent 2fa-verify redirect loop
    if (!queryString.includes('2fa-verify')) {
      const redirectTo2faVerify = `${signinRoute}?from=%2F2fa-verify${encodeURIComponent(
        queryString ? '?' + queryString : ''
      )}`

      if (req.originalUrl !== redirectTo2faVerify) {
        res.locals.skip2fa = true
        return res.redirect(redirectTo2faVerify)
      }
    }
    return next()
  }

  // Reset twoFactorAuthVerified to false when user logout
  const endSessionMw = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (req.body?.operationName === 'EndSession') {
      const context = await commonContext.withRequest(req, res)
      await context.db.User.updateOne({
        where: { id: context.session.itemId },
        data: {
          twoFactorAuthVerified: null,
        },
      })
      res.locals.skip2fa = true
      return next('route')
    }
    return next()
  }

  // Skip 2FA check for specific graphql operations
  const gqlAllowOperationsMw = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const parsedGql = gql`
      ${req.body?.query}
    `

    const gqlOperation = parsedGql?.definitions?.[0]?.operation
    const gqlOperationName = parsedGql.definitions[0].name?.value
    const gqlOperationSelection =
      parsedGql.definitions[0].selectionSet?.selections

    const excludedSelections = [
      'authenticatedItem', // to get current user
    ]
    if (
      gqlOperation == 'query' &&
      gqlOperationSelection.some(
        (selection) =>
          selection.name && excludedSelections.includes(selection.name.value)
      )
    ) {
      res.locals.skip2fa = true
      return next('route')
    }

    const excludedOperations = [
      'GetCurrentUser', // to get current user
      'UpdateUser', // to update user 2FA status
      'EndSession', // to logout
    ]
    if (
      excludedOperations.some((operation) => gqlOperationName === operation)
    ) {
      res.locals.skip2fa = true
      return next('route')
    }
    return next()
  }

  // 2fa-verify page redirection
  const twoFactorAuthVerifyMw = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const context = await commonContext.withRequest(req, res)

    // Redirect to 2FA setup if 2FA is not set up
    if (!context.session?.data.twoFactorAuth.set) {
      res.locals.skip2fa = true
      return res.redirect('/2fa-setup')
    }
    // Redirect to home if 2FA is verified
    if (
      context.session?.data.twoFactorAuth.bypass ||
      context.session?.data.twoFactorAuth.verified
    ) {
      const from = req.query.from
      res.locals.skip2fa = true
      // if from is not empty, redirect to it
      if (from) {
        return res.redirect(from as string)
      } else {
        return res.redirect('/')
      }
    }
    return next()
  }

  // Whitelist 2FA check for some routes to allow access and prevent redirect loop
  app.get(
    [
      '/_next*',
      '/__nextjs*',
      '/2fa*',
      '/api/2fa*',
      '/favicon.ico',
      '/images/*',
      '/files/*',
      '/preview-server/*',
    ],
    (req: Request, res: Response, next: NextFunction) => {
      res.locals.skip2fa = true
      return next('route')
    }
  )
  app.post(['/api/2fa*'], (req: Request, res: Response, next: NextFunction) => {
    res.locals.skip2fa = true
    return next('route')
  })

  app.get('/signin', siginFromOverrideMw)
  app.post('/api/graphql', endSessionMw, gqlAllowOperationsMw)
  app.get('/2fa-verify', twoFactorAuthVerifyMw)

  // Skip 2FA general check according to flag
  const twoFactorSkipMw = (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.skip2fa) {
      return next('route')
    }
    return next()
  }

  // Skip 2FA check if user is not logged in
  const signinCheckMw = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const context = await commonContext.withRequest(req, res)
    if (!context.session?.data) {
      return next('route')
    }
    return next()
  }

  // Skip 2FA check if user has bypassed flag
  const twoFactorBypassMw = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const context = await commonContext.withRequest(req, res)
    if (context.session?.data.twoFactorAuth.bypass) {
      return next('route')
    }
    return next()
  }

  // Proceed if 2FA is verified
  const twoFactorVerifiedMw = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const context = await commonContext.withRequest(req, res)
    if (context.session?.data.twoFactorAuth.verified) {
      return next('route')
    }
    return next()
  }

  // 2FA redirections
  const twoFactorRedirectMw = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const context = await commonContext.withRequest(req, res)
    if (context.session?.data.twoFactorAuth.set) {
      // If 2FA is set up but not verified, redirect to 2FA verification page
      if (req.originalUrl !== '/2fa-verify') {
        return res.redirect('/2fa-verify')
      }
    } else {
      // If 2FA is not set up, redirect to 2FA setup page
      if (req.originalUrl !== '/2fa-setup') {
        return res.redirect('/2fa-setup')
      }
    }
    return next()
  }

  // general 2FA check
  app.get(
    '*',
    twoFactorSkipMw,
    signinCheckMw,
    twoFactorBypassMw,
    twoFactorVerifiedMw,
    twoFactorRedirectMw
  )
  app.post(
    '*',
    twoFactorSkipMw,
    signinCheckMw,
    twoFactorBypassMw,
    twoFactorVerifiedMw,
    twoFactorRedirectMw
  )
}
