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

const fetchData = async () => {
  try {
    const fetchAfter = new Date(
      new Date().setHours(0, 0, 0, 0) -
        parseInt(config.rssFetchDays) * 24 * 60 * 60 * 1000
    )
    await log(
      `Fetching data in last ${config.rssFetchDays} days (${fetchAfter})...`
    )
    const where = {
      status: {
        equals: 'published',
      },
      publishedDate: {
        gte: fetchAfter,
      },
    }
    const payload = {
      query: `
        query Data(
          $postWhere: PostWhereInput!,
          $projectWhere: ProjectWhereInput!,
        ) {
          posts(where: $postWhere) {
            title
            publishedDate
            slug
            heroImage {
              resized {
                small
              }
            }
            __typename
          }
          projects(where: $projectWhere) {
            title
            publishedDate
            slug
            heroImage {
              resized {
                small
              }
            }
            __typename
          }
        }
      `,
      variables: {
        postWhere: where,
        projectWhere: where,
      },
    }
    const dataRes = await axios.post(config.apiUrl, payload)
    const data = [...dataRes?.data?.data.posts, ...dataRes?.data?.data.projects]
    data.sort((a, b) => {
      return new Date(b.publishedDate) - new Date(a.publishedDate)
    })
    return data
  } catch (error) {
    await log('Error fetching data', error)
    return []
  }
}

const generateRSS = (data) => {
  const feed = new RSS({
    site_url: config.baseUrl,
    feed_url: `https://${config.bucketName}/${config.rssFileName}`,
    title: config.rss.title,
    description: config.rss.description,
    language: config.rss.language,
    image_url: config.rss.image_url,
    copyright: 'CC BY-NC-ND 3.0',
  })

  data.forEach((entry) => {
    let url = ''
    if (entry.__typename === 'Post') {
      url = `${config.baseUrl}article/${entry.slug}`
    } else if (entry.__typename === 'Project') {
      url = `${config.baseUrl}topic/${entry.slug}`
    }
    feed.item({
      title: entry.title,
      description: entry.description,
      url: url,
      date: entry.publishedDate,
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
  const data = await fetchData()
  const rss = generateRSS(data)
  await uploadToGCS(rss)
  console.log(`Cronjob RSS feed completed.`)
}

main()
