import { config } from './configs.js'
import { IncomingWebhook } from '@slack/webhook'

const sendSlackNotification = async (message) => {
  try {
    if (!config.slackLogHook) {
      console.log('Slack log hook is empty. Skipping notification.')
      return
    }
    const webhook = new IncomingWebhook(config.slackLogHook)
    await webhook.send({
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            emoji: true,
            text: ':information_source:  KidsReporter Image Resizer',
          },
        },
        {
          type: 'context',
          elements: [
            {
              text: `LOG  |  *${new Date().toISOString()}*`,
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
              text: 'Sent from kids-reporter/kids-reporter-monorepo/packages/image-resizer',
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

export const log = async (message) => {
  console.log(message)
  await sendSlackNotification(message)
}
