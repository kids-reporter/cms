import axios from 'axios'
import errors from '@twreporter/errors'
import { NextResponse } from 'next/server'
import {
  apiOrigin,
  apiHeadlessAccountEmail,
  apiHeadlessAccountPassword,
} from '@/app/environment-variables'

const accoutEmail = apiHeadlessAccountEmail
const accountPassword = apiHeadlessAccountPassword

/**
 *  Since our original GQL server only accepts authenticated requests,
 *  the client side/browser cannot request GQL server directly due to lacking of session token.
 *
 *  Therefore, this route handler is built for accepting client side GQL requests.
 *  After this handler received the requests from client side,
 *  it will try to get the session token via account and password authentication first.
 *
 *  If the handler has the session token,
 *  it will request GQL server with that session token and the GQL request body.
 *
 *  @TODO:
 *  The better way for this handler is to proxy the client request to original GQL server,
 *  rather than parsing request body and compose another request to the GQL server.
 *  However, the 'http-proxy-middleware' library that we used to use is not ready for NextJS 13 api routes.
 *  If someday 'http-proxy-middleware' is ready, we could use it to proxy the requests, instead of doing it
 *  by ourselves.
 */
export async function POST(request: Request) {
  // request body
  const body = await request.json()

  const tokenManager = new TokenManager(accoutEmail, accountPassword)

  // session token, used to pass GQL server authentication
  let token = ''
  try {
    // `TokenMananger` is implmented by Singleton pattern.
    // Therefore, for different requests, they all got the same instance of `TokenManager`,
    // and use the same session token.
    // Hence, we could reduce the original GQL server workloads.
    token = await tokenManager.getToken()
  } catch (err) {
    console.log(
      JSON.stringify({
        severity: 'ERROR',
        message: errors.helpers.printAll(
          err,
          {
            withStack: true,
            withPayload: true,
          },
          0,
          0
        ),
      })
    )
    return NextResponse.json(
      {
        status: 'error',
        message: errors.helpers.printOne(err, {
          withStack: false,
          withPayload: false,
        }),
      },
      {
        status: 500,
      }
    )
  }
  try {
    // original GQL server endpoint
    const gqlEndpoint = apiOrigin + '/api/graphql'
    const axiosRes = await axios.post(gqlEndpoint, body, {
      headers: {
        'Content-Type': 'application/json',
        // original GQL server is using Cookie to do the authentication
        Cookie: `keystonejs-session=${token}`,
        'x-apollo-operation-name': '',
      },
    })
    return NextResponse.json(axiosRes.data)
  } catch (err) {
    const errorStatusCode =
      (err as { response: { status: number } })?.response?.status || 500

    // renew token if request failure is due to authentication
    if (errorStatusCode == 401) {
      tokenManager.renewToken()
    }

    const annotatedErr = errors.helpers.annotateAxiosError(err)
    console.log(
      JSON.stringify({
        severity: 'ERROR',
        message: errors.helpers.printAll(
          annotatedErr,
          {
            withStack: true,
            withPayload: true,
          },
          0,
          0
        ),
      })
    )
    return NextResponse.json(
      {
        status: 'error',
        message: errors.helpers.printOne(annotatedErr, {
          withStack: false,
          withPayload: false,
        }),
      },
      {
        status: errorStatusCode,
      }
    )
  }
}

const gqlQuery = `
mutation AuthenticateUserWithPassword($email: String!, $password: String!) {
  authenticateUserWithPassword(email: $email, password: $password) {
    ... on UserAuthenticationWithPasswordSuccess {
      sessionToken
    }
    ... on UserAuthenticationWithPasswordFailure {
      message
    }
  }
}
`

class TokenManager {
  // Singleton
  static instance?: TokenManager
  private email: string
  private password: string
  private token: string
  private expiredAt?: number // timestamp

  constructor(name: string, password: string) {
    this.email = name
    this.password = password
    this.token = ''

    if (TokenManager.instance) {
      return TokenManager.instance
    }

    TokenManager.instance = this
  }

  /**
   *  This function will return a cache token if token is existed and not expired.
   */
  async getToken() {
    if (this.token && this.expiredAt && this.expiredAt >= Date.now()) {
      return this.token
    }

    // fetch token
    try {
      const sessionToken = await this._fetchToken()
      this.token = sessionToken

      // @TODO expiry time should be returned by API
      // So far, we set expiry time as one hour later
      this.expiredAt = Date.now() + 3600 * 1000

      return this.token
    } catch (err) {
      const annotatedErr = errors.helpers.wrap(
        err,
        'TokenManangerError',
        'Fail to get session token',
        {
          accoutEmail: this.email,
        }
      )
      throw annotatedErr
    }
  }

  /**
   *  This function will return a new token.
   */
  async renewToken() {
    try {
      const sessionToken = await this._fetchToken()
      this.token = sessionToken

      // @TODO expiry time should be returned by API
      // So far, we set expiry time as one hour later
      this.expiredAt = Date.now() + 3600 * 1000
      return this.token
    } catch (err) {
      const annotatedErr = errors.helpers.wrap(
        err,
        'TokenManangerError',
        'Fail to renew session token',
        {
          accoutEmail: this.email,
        }
      )
      throw annotatedErr
    }
  }

  async _fetchToken() {
    let axiosRes
    // fetch token
    try {
      const gqlEndpoint = apiOrigin + '/api/authenticate-user'
      axiosRes = await axios.post(gqlEndpoint, {
        query: gqlQuery,
        variables: {
          email: this.email,
          password: this.password,
        },
      })
    } catch (err) {
      throw errors.helpers.annotateAxiosError(err)
    }

    const authenticationResult =
      axiosRes.data?.data?.authenticateUserWithPassword
    const errorMessage = authenticationResult?.message
    if (errorMessage) {
      throw new Error(errorMessage)
    }

    const sessionToken = authenticationResult?.sessionToken
    return sessionToken
  }
}
