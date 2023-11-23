import { MetadataRoute } from 'next'
import axios from 'axios'
import errors from '@twreporter/errors'
import { API_URL } from '@/app/constants'
import { log, LogLevel } from '@/app/utils'

const postsGQL = `
query() {
  posts() {
    slug
    publishedDate
  }
}
`
const topicsGQL = `
query() {
  projects() {
    slug
    publishedDate
  }
}
`

const fetchURL = async (): Promise<{ url: string; lastModified: Date }[]> => {
  const urls: { url: string; lastModified: Date }[] = []
  try {
    const postsRes = await axios.post(API_URL, {
      query: postsGQL,
    })
    console.log(postsRes)
  } catch (err) {
    const annotatedErr = errors.helpers.annotateAxiosError(err)
    const msg = errors.helpers.printAll(annotatedErr, {
      withStack: true,
      withPayload: true,
    })
    log(LogLevel.ERROR, msg)
  }

  try {
    const postsRes = await axios.post(API_URL, {
      query: topicsGQL,
    })
    console.log(postsRes)
  } catch (err) {
    const annotatedErr = errors.helpers.annotateAxiosError(err)
    const msg = errors.helpers.printAll(annotatedErr, {
      withStack: true,
      withPayload: true,
    })
    log(LogLevel.ERROR, msg)
  }

  return urls
}

export default function sitemap(): MetadataRoute.Sitemap {
  false && fetchURL()
  return [
    {
      url: 'https://acme.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://acme.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://acme.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}
