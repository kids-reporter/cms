import { MetadataRoute } from 'next'
import axios from 'axios'
import errors from '@twreporter/errors'
import { API_URL, KIDS_URL_ORIGIN } from '@/app/constants'
import { log, LogLevel } from '@/app/utils'

export const revalidate = 86400

const postsGQL = `
query {
  posts {
    slug
    publishedDate
  }
}
`

const topicsGQL = `
query {
  projects {
    slug
    publishedDate
  }
}
`

const fetchSitemaps = async (): Promise<
  { url: string; lastModified: Date }[]
> => {
  let sitemaps: { url: string; lastModified: Date }[] = []
  try {
    const postsRes = await axios.post(API_URL, {
      query: postsGQL,
    })
    const posts = postsRes?.data?.data?.posts?.map((post: any) => {
      return {
        url: `${KIDS_URL_ORIGIN}/article/${post.slug}`,
        lastModified: post.publishedDate,
      }
    })
    if (posts) {
      sitemaps = [...posts]
    }
  } catch (err) {
    const annotatedErr = errors.helpers.annotateAxiosError(err)
    const msg = errors.helpers.printAll(annotatedErr, {
      withStack: true,
      withPayload: true,
    })
    log(LogLevel.ERROR, msg)
  }

  try {
    const topicsRes = await axios.post(API_URL, {
      query: topicsGQL,
    })
    const topics = topicsRes?.data?.data?.projects?.map((topic: any) => {
      return {
        url: `${KIDS_URL_ORIGIN}/topic/${topic.slug}`,
        lastModified: topic.publishedDate,
      }
    })
    if (topics) {
      sitemaps = [...sitemaps, ...topics]
    }
  } catch (err) {
    const annotatedErr = errors.helpers.annotateAxiosError(err)
    const msg = errors.helpers.printAll(annotatedErr, {
      withStack: true,
      withPayload: true,
    })
    log(LogLevel.ERROR, msg)
  }

  return sitemaps
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemaps = await fetchSitemaps()
  return sitemaps?.map((sitemap) => {
    return {
      url: sitemap.url,
      lastModified: sitemap.lastModified,
    }
  })
}
