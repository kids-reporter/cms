import { Metadata } from 'next'
import axios from 'axios'
import { notFound } from 'next/navigation'
import Article from './article'
import {
  API_URL,
  GENERAL_DESCRIPTION,
  POST_CONTENT_GQL,
  OG_SUFFIX,
} from '@/app/constants'
import { LogError } from '@/app/utils'
import './page.scss'

const topicRelatedPostsNum = 5

const heroImageGQL = `
  heroImage {
    resized {
      medium
    }
    imageFile {
      url
    }
  }
`

const categoryGQL = `
  subSubcategories {
    name
    slug
    subcategory {
      name
      slug
      category {
        name
        slug
      }
    }
  }
`

const postGQL = `
  query($where: PostWhereUniqueInput!, $orderBy: [NewsReadingGroupItemOrderByInput!]!, $take: Int) {
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
          imageFile {
            url
          }
        }
        bio
        id
        name
        slug
      }
      authorsJSON
      tags {
        name
        slug
      }
      relatedPosts {
        title
        themeColor
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
        relatedPosts(take: $take) {
          ${POST_CONTENT_GQL}
        }
      }
    }
  }
`

const ogGQL = `
query($where: PostWhereUniqueInput!) {
  post(where: $where) {
    ogDescription
    ogTitle
    ogImage {
      resized {
        small
      }
    }
  }
}
`

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const slug = params.slug

  let postOG
  try {
    const postOGRes = await axios.post(API_URL, {
      query: ogGQL,
      variables: {
        where: {
          slug: slug,
        },
      },
    })
    postOG = postOGRes?.data?.data?.post
    if (!postOG) {
      console.error('Post not found!', params.slug)
    }
  } catch (err) {
    LogError(err)
  }

  return {
    title: `${postOG?.ogTitle ? postOG.ogTitle + ' - ' : ''}${OG_SUFFIX}`,
    openGraph: {
      title: postOG?.ogTitle ?? OG_SUFFIX,
      description: postOG?.ogDescription ?? GENERAL_DESCRIPTION,
      images: postOG?.ogImage?.resized?.small
        ? [postOG.ogImage.resized.small]
        : [],
      type: 'article',
    },
  }
}

// TODO: add pageMap for google indexing/search
export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  if (!params.slug) {
    console.error('Invalid post slug!')
    notFound()
  }

  let post
  try {
    const postRes = await axios.post(API_URL, {
      query: postGQL,
      variables: {
        where: {
          slug: params.slug,
        },
        orderBy: [{ order: 'asc' }],
        take: topicRelatedPostsNum,
      },
    })
    post = postRes?.data?.data?.post
    if (!post) {
      console.error('Post not found!', params.slug)
      notFound()
    }
  } catch (err) {
    LogError(err)
    notFound()
  }

  return <main>{post && <Article post={post} />}</main>
}
