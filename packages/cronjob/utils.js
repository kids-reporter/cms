import { config } from './configs.js'
import { IncomingWebhook } from '@slack/webhook'
// @ts-ignore `@twreporter/errors` does not have tyepscript definition file yet
import _errors from '@twreporter/errors'
import axios from 'axios'

// @twreporter/errors is a cjs module, therefore, we need to use its default property
export const errors = _errors.default

const sendSlackNotification = async (message) => {
  try {
    const webhook = new IncomingWebhook(config.slackLogHook)
    await webhook.send({
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            emoji: true,
            text: ':information_source:  RSS Cronjob',
          },
        },
        {
          type: 'context',
          elements: [
            {
              text: `*${new Date().toISOString()}*`,
              type: 'mrkdwn',
            },
          ],
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: message,
          },
        },
      ],
    })
    console.log(`Slack notification sent: ${message}`)
  } catch (err) {
    errorHandling(err)
  }
}

export const logWithSlack = async (message) => {
  if (config.slackLogHook) {
    await sendSlackNotification(message)
  }
  console.log(message)
}

export const errorHandling = (err) => {
  console.error(
    JSON.stringify({
      severity: 'ERROR',
      message: errors.helpers.printAll(
        err,
        { withStack: true, withPayload: true },
        0,
        0
      ),
    })
  )
  process.exit(1)
}

export class TokenManager {
  static instance

  constructor(email, password, apiEndpoint = config.apiUrl) {
    this.email = email
    this.password = password
    this.apiEndpoint = apiEndpoint
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

      //TODO: The API should provide the expiration time, as we have currently configured it to be one hour from the present moment.
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

      //TODO: The API should provide the expiration time, as we have currently configured it to be one hour from the present moment.
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

    let axiosRes
    // fetch token
    try {
      axiosRes = await axios.post(this.apiEndpoint, {
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
    if (!sessionToken) {
      throw new Error(
        'Session token "' + sessionToken + '" is not a valid string'
      )
    }

    return sessionToken
  }
}
