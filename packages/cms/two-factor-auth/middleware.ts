import { Express, Request, Response, NextFunction } from 'express'
import { KeystoneContext } from '@keystone-6/core/types'

import { gql } from '@keystone-6/core/admin-ui/apollo'

export function twoFactorAuthMiddleware(
  app: Express,
  commonContext: KeystoneContext
) {
  // froce redirect to 2fa verification after signin
  app.use(async (req: Request, res: Response, next: NextFunction) => {
    const signinRoute = '/signin'
    const redirectTo2faVerify = `${signinRoute}?from=%2F2fa-verify`
    if (
      req.originalUrl.startsWith(signinRoute) &&
      req.originalUrl !== redirectTo2faVerify
    ) {
      return res.redirect(redirectTo2faVerify)
    }
    return next()
  })

  // reset twoFactorAuthVerified to false when user logout
  app.use(async (req: Request, res: Response, next: NextFunction) => {
    if (
      req.originalUrl === '/api/graphql' &&
      req.body?.operationName === 'EndSession'
    ) {
      const context = await commonContext.withRequest(req, res)
      await context.db.User.updateOne({
        where: { id: context.session.itemId },
        data: {
          twoFactorAuthVerified: null,
        },
      })
    }
    return next()
  })

  // middleware to check if user has verified 2FA on every request
  app.use(async (req: Request, res: Response, next: NextFunction) => {
    const context = await commonContext.withRequest(req, res)

    // Skip 2FA check if user is not logged in
    if (!context.session?.data) {
      return next()
    }

    // Skip 2FA check for specific graphql operations
    if (req.originalUrl === '/api/graphql') {
      const parsedGql = gql`
        ${req.body?.query}
      `

      const gqlOperation = parsedGql.definitions[0].operation
      const gqlOperationName = parsedGql.definitions[0].name?.value
      const gqlOperationSelection =
        parsedGql.definitions[0].selectionSet?.selections

      const excludedSelections = ['authenticatedItem']
      if (
        gqlOperation == 'query' &&
        gqlOperationSelection.some(
          (selection) =>
            selection.name && excludedSelections.includes(selection.name.value)
        )
      ) {
        return next()
      }

      const excludedOperations = ['UpdateUser', 'EndSession']
      if (
        excludedOperations.some((operation) => gqlOperationName === operation)
      ) {
        return next()
      }
    }

    // Skip 2FA check for some routes
    const excludedRoutes = [
      '/_next',
      '/__nextjs',
      '/2fa',
      '/api/2fa',
      '/favicon.ico',
    ]
    if (excludedRoutes.some((route) => req.originalUrl.startsWith(route))) {
      if (req.originalUrl === '/2fa-verify') {
        if (!context.session?.data.twoFactorAuth.set) {
          return res.redirect('/2fa-setup')
        }
        if (context.session?.data.twoFactorAuth.verified) {
          return res.redirect('/')
        }
      }
      return next()
    }

    // Skip 2FA check if user has bypassed flag
    if (context.session?.data.twoFactorAuth.bypass) {
      return next()
    }

    // Proceed if 2FA is verified
    if (context.session?.data.twoFactorAuth.verified) {
      return next()
    }

    // If 2FA is set up but not verified, redirect to 2FA verification page
    if (context.session?.data.twoFactorAuth.set) {
      res.redirect('/2fa-verify')
    }

    // All checks passed, proceed to the next middleware
    return next()
  })
}
