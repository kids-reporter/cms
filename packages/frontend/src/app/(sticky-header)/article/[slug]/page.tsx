import axios from 'axios'
import { notFound } from 'next/navigation'
import Article from './article'
import { API_URL } from '@/app/constants'
import './page.scss'

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

  return <main className="container">{post && <Article post={post} />}</main>
}
