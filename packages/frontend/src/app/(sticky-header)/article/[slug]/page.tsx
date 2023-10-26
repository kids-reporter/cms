import { Metadata } from 'next'
import axios from 'axios'
import { notFound } from 'next/navigation'
import Article from './article'
import { API_URL, GENERAL_DESCRIPTION } from '@/app/constants'
import './page.scss'

const ogSuffix = '少年報導者 The Reporter for Kids'

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
  query($where: PostWhereUniqueInput!, $orderBy: [NewsReadingGroupItemOrderByInput!]!) {
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
      projects {
        title
        slug
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
    console.error('Fetch post failed!', err)
  }

  return {
    title: `${postOG?.ogTitle ? postOG.ogTitle + ' - ' : ''}${ogSuffix}`,
    openGraph: {
      title: postOG?.ogTitle ?? ogSuffix,
      description: postOG?.ogDescription ?? GENERAL_DESCRIPTION,
      images: postOG?.ogImage?.resized?.small
        ? [postOG.ogImage.resized.small]
        : [],
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
      },
    })
    post = postRes?.data?.data?.post
    if (!post) {
      console.error('Post not found!', params.slug)
      notFound()
    }
  } catch (err) {
    console.error('Fetch post failed!', err)
    notFound()
  }

  return <main>{post && <Article post={post} />}</main>
}
