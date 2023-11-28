import { config } from './configs.js'
import { log } from './utils.js'
import axios from 'axios'
import RSS from 'rss'
import { Storage } from '@google-cloud/storage'

const storage =
  config.gcs.projectId && config.gcs.keyFilename
    ? new Storage({
        projectId: config.gcs.projectId,
        keyFilename: config.gcs.keyFilename,
      })
    : new Storage()

const fetchPosts = async () => {
  try {
    const payload = {
      query: `
        query Posts($orderBy: [PostOrderByInput!]!, $take: Int, $where: PostWhereInput!) {
          posts(orderBy: $orderBy, take: $take, where: $where) {
            title
            publishedDate
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
            publishedDate: 'desc',
          },
        ],
        where: {
          status: {
            equals: 'published',
          },
          publishedDate: {
            gte: new Date(
              new Date().setHours(0, 0, 0, 0) - 2 * 24 * 60 * 60 * 1000 // 2 days ago
            ),
          },
        },
      },
    }
    const postRes = await axios.post(config.apiUrl, payload)
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
    const file = bucket.file(config.rssFileName)
    await file.save(data, { contentType: 'application/xml' })
    await log(
      `RSS feed uploaded to GCS bucket: ${config.bucketName}/${config.rssFileName}`
    )
  } catch (error) {
    await log('Error uploading RSS to GCS', error)
  }
}

const main = async () => {
  const posts = await fetchPosts()
  const rss = generateRSS(posts)
  await uploadToGCS(rss)
  log(`Cronjob RSS feed completed.`)
}

main()
