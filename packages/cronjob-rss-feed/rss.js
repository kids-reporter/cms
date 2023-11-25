import axios from 'axios'
import RSS from 'rss'
import { Storage } from '@google-cloud/storage'
import { IncomingWebhook } from '@slack/webhook'
import { config } from './configs.js'

const storage = new Storage()
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
    console.error('Error fetching posts:', error)
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
    console.log(
      `RSS feed uploaded to GCS bucket: ${config.bucketName}/rss/${config.rssFileName}`
    )
  } catch (error) {
    console.error('Error uploading RSS to GCS:', error)
  }
}

const sendSlackNotification = async (message) => {
  try {
    await webhook.send({
      text: message,
    })
    console.log('Slack notification sent')
  } catch (error) {
    console.error('Error sending Slack notification:', error)
  }
}

const main = async () => {
  const posts = await fetchPosts()
  console.log(posts)
  const rss = generateRSS(posts)
  console.log(rss)
  await uploadToGCS(rss)
  await sendSlackNotification(
    `RSS feed uploaded to GCS bucket: ${config.bucketName}/rss/${config.rssFileName}`
  )
}

main()
