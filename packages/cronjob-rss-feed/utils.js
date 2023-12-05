import { config } from './configs.js'
import { IncomingWebhook } from '@slack/webhook'
// @ts-ignore `@twreporter/errors` does not have tyepscript definition file yet
import _errors from '@twreporter/errors'

// @twreporter/errors is a cjs module, therefore, we need to use its default property
export const errors = _errors.default

const sendSlackNotification = async (message) => {
  try {
    const webhook = new IncomingWebhook()
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
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: message,
          },
        },
        {
          type: 'divider',
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
