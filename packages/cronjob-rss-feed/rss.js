import axios from 'axios'
import RSS from 'rss'
import { Storage } from '@google-cloud/storage'
import { IncomingWebhook } from '@slack/webhook'
import { config } from './configs.js'

const storage =
  config.gcs.projectId && config.gcs.keyFilename
    ? new Storage({
        projectId: config.gcs.projectId,
        keyFilename: config.gcs.keyFilename,
      })
    : new Storage()
const webhook = new IncomingWebhook(config.slackWebhook)

const fetchPosts = async () => {
  try {
    const postRes = await axios.post(config.apiUrl, {
      query: `
        query Posts($orderBy: [PostOrderByInput!]!, $take: Int, $where: PostWhereInput!) {
          posts(orderBy: $orderBy, take: $take, where: $where) {
            title
            createdAt
            slug
            heroImage {
              resized {
                small
              }
            }
          }
        }
      `,
      variables: {
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
        take: 10,
        where: {
          status: {
            equals: 'published',
          },
        },
      },
    })
    return postRes?.data?.data?.posts
  } catch (error) {
    await log('Error fetching posts', error)
    return []
  }
}

const generateRSS = (posts) => {
  const feed = new RSS({
    site_url: config.baseUrl,
    feed_url: `${config.baseUrl}rss.xml`,
    title: config.rss.title,
    description: config.rss.description,
    language: config.rss.language,
    image_url: config.rss.image_url,
    copyright: 'CC BY-NC-ND 3.0',
  })

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${config.baseUrl}/article/${post.slug}`,
      date: post.createdAt,
    })
  })

  return feed.xml()
}

const uploadToGCS = async (data) => {
  try {
    const bucket = storage.bucket(config.bucketName)
    const file = bucket.file(`rss/${config.rssFileName}`)
    await file.save(data, { contentType: 'application/xml' })
    await log(
      `RSS feed uploaded to GCS bucket: ${config.bucketName}/rss/${config.rssFileName}`
    )
  } catch (error) {
    await log('Error uploading RSS to GCS', error)
  }
}

const sendSlackNotification = async (message, type = 'log') => {
  try {
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

const log = async (message, error = '', type = '') => {
  if (type === '') {
    type = error === '' ? 'log' : 'error'
  }
  if (type === 'error') {
    console.error(message, error)
    await sendSlackNotification(`${message}: ${error.toString()}`, type)
  } else if (type === 'log') {
    console.log(message, error)
    await sendSlackNotification(message, type)
  }
}

const main = async () => {
  const posts = await fetchPosts()
  const rss = generateRSS(posts)
  await uploadToGCS(rss)
  log(`Cronjob RSS feed completed.`)
}

main()
