import { config } from './configs.js'
import { IncomingWebhook } from '@slack/webhook'
import { Logging } from '@google-cloud/logging'
const logging = new Logging()

const sendSlackNotification = async (message, type = 'info') => {
  try {
    const webhook = new IncomingWebhook(
      type === 'error' ? config.slackErrorHook || '' : config.slackLogHook || ''
    )
    await webhook.send({
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            emoji: true,
            text:
              type === 'error'
                ? ':warning:  KidsReporter Cronjob'
                : ':information_source:  KidsReporter Cronjob',
          },
        },
        {
          type: 'context',
          elements: [
            {
              text: `${type.toUpperCase()}  |  *${new Date().toISOString()}*`,
              type: 'mrkdwn',
            },
          ],
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
              type: 'mrkdwn',
              text: 'Sent from kids-reporter/kids-reporter-monorepo/packages/cronjob-rss-feed',
            },
          ],
        },
      ],
    })
    console.log('Slack notification sent')
  } catch (error) {
    console.error('Error sending Slack notification', error)
  }
}

export const log = async (message, error = '', type = '') => {
  if (type === '') {
    type = error === '' ? 'info' : 'error'
  }

  const logName = 'TEST-cronjob-rss-feed'
  const log = logging.log(logName)
  const severity = type.toUpperCase()
  const metadata = {
    resource: { type: 'global' },
    severity: severity,
  }

  let data
  if (type === 'error') {
    data = {
      message: message,
      error: error,
    }
    console.error(message, error)
  } else {
    data = {
      message: message,
    }
    if (config.slackLogHook) {
      await sendSlackNotification(message, type)
    }
    console.log(message)
  }

  const entry = log.entry(metadata, data)
  await log.write(entry)
}
