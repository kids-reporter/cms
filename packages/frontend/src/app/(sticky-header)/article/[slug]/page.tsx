import { Metadata } from 'next'
import axios from 'axios'
import { notFound } from 'next/navigation'
import errors from '@twreporter/errors'
import Article from './article'
import {
  API_URL,
  KIDS_URL_ORIGIN,
  GENERAL_DESCRIPTION,
  POST_CONTENT_GQL,
  OG_SUFFIX,
} from '@/app/constants'
import { log, LogLevel } from '@/app/utils'
import './page.scss'

const topicRelatedPostsNum = 5

const heroImageGQL = `
  heroImage {
    resized {
      small
      medium
      large
    }
  }
`

const categoryGQL = `
  subSubcategoriesOrdered {
    name
    slug
    subcategory {
      name
      slug
      category {
        name
        slug
        themeColor
      }
    }
  }
`

const postGQL = `
  query($where: PostWhereUniqueInput!, $orderBy: [NewsReadingGroupItemOrderByInput!]!, $take: Int, $relatedPostsWhere: PostWhereInput!) {
    post(where: $where) {
      title
      newsReadingGroup {
        items (orderBy: $orderBy){
          name
          embedCode
        }
      }
      brief
      content
      publishedDate
      ${heroImageGQL}
      heroCaption
      authors {
        avatar {
          resized {
            tiny
          }
        }
        bio
        id
        name
        slug
      }
      authorsJSON
      tagsOrdered {
        name
        slug
      }
      relatedPostsOrdered {
        title
        slug
        publishedDate
        ${heroImageGQL}
        ogDescription
        ${categoryGQL}
      }
      subtitle
      ${categoryGQL}
      mainProject {
        title
        slug
      }
      projects {
        title
        slug
        relatedPosts(take: $take, where: $relatedPostsWhere) {
          ${POST_CONTENT_GQL}
        }
      }
    }
  }
`

const metaGQL = `
query($where: PostWhereUniqueInput!) {
  post(where: $where) {
    publishedDate
    ogDescription
    ogTitle
    ogImage {
      resized {
        small
      }
    }
    ${categoryGQL}
  }
}
`

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const slug = params.slug

  let postMeta
  try {
    const postMetaRes = await axios.post(API_URL, {
      query: metaGQL,
      variables: {
        where: {
          slug: slug,
        },
      },
    })
    postMeta = postMetaRes?.data?.data?.post
    if (!postMeta) {
      log(LogLevel.INFO, `Post meta not found! ${params.slug}`)
    }
  } catch (err) {
    const annotatedErr = errors.helpers.annotateAxiosError(err)
    const msg = errors.helpers.printAll(annotatedErr, {
      withStack: true,
      withPayload: true,
    })
    log(LogLevel.ERROR, msg)
  }

  return {
    title: `${postMeta?.ogTitle ? postMeta.ogTitle + ' - ' : ''}${OG_SUFFIX}`,
    alternates: {
      canonical: `${KIDS_URL_ORIGIN}/article/${slug}`,
    },
    openGraph: {
      title: postMeta?.ogTitle ?? OG_SUFFIX,
      description: postMeta?.ogDescription ?? GENERAL_DESCRIPTION,
      images: postMeta?.ogImage?.resized?.small
        ? [postMeta.ogImage.resized.small]
        : [],
      type: 'article',
    },
    other: {
      // Since we can't inject <!-- <PageMap>...</PageMap> --> to <head> section with Next metadata API,
      // so handle google seo with extra <meta> tag here, but be awared there are limitations(maximum 50 tags):
      // https://developers.google.com/custom-search/docs/structured_data?hl=zh-tw#limitations
      publishedDate: postMeta?.publishedDate ?? '',
      category:
        postMeta?.subSubcategoriesOrdered?.[0]?.subcategory?.category?.name ??
        '',
      subcategory:
        postMeta?.subSubcategoriesOrdered?.[0]?.subcategory?.name ?? '',
      subSubcategory: postMeta?.subSubcategoriesOrdered?.[0]?.name ?? '',
      contentType: 'article',
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const slug = params.slug
  if (!slug) {
    log(LogLevel.INFO, 'Invalid post slug!')
    notFound()
  }

  let post
  try {
    const postRes = await axios.post(API_URL, {
      query: postGQL,
      variables: {
        where: {
          slug: slug,
        },
        relatedPostsWhere: {
          slug: {
            notIn: slug,
          },
        },
        orderBy: [{ order: 'asc' }],
        take: topicRelatedPostsNum,
      },
    })
    post = postRes?.data?.data?.post
    if (!post) {
      log(LogLevel.INFO, `Post not found! ${slug}`)
      notFound()
    }
  } catch (err) {
    const annotatedErr = errors.helpers.annotateAxiosError(err)
    const msg = errors.helpers.printAll(annotatedErr, {
      withStack: true,
      withPayload: true,
    })
    log(LogLevel.ERROR, msg)
    notFound()
  }

  return <main>{post && <Article post={post} />}</main>
}
