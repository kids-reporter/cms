import { Express, Request, Response, NextFunction } from 'express'
import { KeystoneContext } from '@keystone-6/core/types'

import { gql } from '@keystone-6/core/admin-ui/apollo'

export function twoFactorAuthMiddleware(
  app: Express,
  commonContext: KeystoneContext
) {
  // froce redirect to 2fa verification after signin
  app.get('/signin', (req: Request, res: Response, next: NextFunction) => {
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
        return res.redirect(redirectTo2faVerify)
      }
    }
    return next()
  })

  // reset twoFactorAuthVerified to false when user logout
  app.post(
    '/api/graphql',
    async (req: Request, res: Response, next: NextFunction) => {
      if (req.body?.operationName === 'EndSession') {
        const context = await commonContext.withRequest(req, res)
        await context.db.User.updateOne({
          where: { id: context.session.itemId },
          data: {
            twoFactorAuthVerified: null,
          },
        })
      }
      return next()
    }
  )

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
        return next()
      }

      const excludedOperations = [
        'UpdateUser', // to update user 2FA status
        'EndSession', // to logout
      ]
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
      if (req.originalUrl.startsWith('/2fa-verify')) {
        // Redirect to 2FA setup if 2FA is not set up
        if (!context.session?.data.twoFactorAuth.set) {
          return res.redirect('/2fa-setup')
        }
        // Redirect to home if 2FA is verified
        if (
          context.session?.data.twoFactorAuth.bypass ||
          context.session?.data.twoFactorAuth.verified
        ) {
          const from = req.query.from
          // if from is not empty, redirect to it
          if (from) {
            return res.redirect(from as string)
          } else {
            return res.redirect('/')
          }
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

    if (context.session?.data.twoFactorAuth.set) {
      // If 2FA is set up but not verified, redirect to 2FA verification page
      res.redirect('/2fa-verify')
    } else {
      // If 2FA is not set up, redirect to 2FA setup page
      res.redirect('/2fa-setup')
    }

    // All checks passed, proceed to the next middleware
    return next()
  })
}
