import { config } from './configs.js'
import { IncomingWebhook } from '@slack/webhook'

const sendSlackNotification = async (message, type = 'log') => {
  try {
    const webhook = new IncomingWebhook(
      type === 'error' ? config.slackErrorHook : config.slackLogHook
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
    await log('Error sending Slack notification', error)
  }
}

export const log = async (message, error = '', type = '') => {
  if (type === '') {
    type = error === '' ? 'log' : 'error'
  }
  if (type === 'error') {
    console.error(message, error)
    if (config.slackErrorHook) {
      await sendSlackNotification(`${message}: ${error.toString()}`, type)
    }
  } else if (type === 'log') {
    console.log(message, error)
    if (config.slackLogHook) {
      await sendSlackNotification(message, type)
    }
  }
}
