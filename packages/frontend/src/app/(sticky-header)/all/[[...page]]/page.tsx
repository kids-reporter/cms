import axios from 'axios'
import { notFound } from 'next/navigation'
import PostCard from '@/app/components/post-card'
import Pagination from '@/app/components/pagination'
import { PostSummary } from '@/app/components/types'
import {
  API_URL,
  CMS_URL,
  POST_PER_PAGE,
  GetThemeFromCategory,
} from '@/app/constants'
import './page.scss'

const postsCountGQL = `
query Query {
  postsCount
}
`

const latestPostsGQL = `
query($orderBy: [PostOrderByInput!]!, $take: Int, $skip: Int!) {
  posts(orderBy: $orderBy, take: $take, skip: $skip) {
    title
    slug
    ogDescription
    heroImage {
      resized {
        medium
      }
      imageFile {
        url
      }
    }
    subSubcategories {
      name
      subcategory {
        name
      }
    }
    publishedDate
  }
}
`

export default async function LatestPosts({
  params,
}: {
  params: { page: string }
}) {
  const currentPage = !params.page ? 1 : Number(params.page?.[0])

  if (params.page?.length > 1 || !(currentPage > 0)) {
    console.error('Incorrect page!', params.page, currentPage)
    notFound()
  }

  let postsCount, posts
  try {
    const postsCountRes = await axios.post(API_URL, {
      query: postsCountGQL,
    })
    postsCount = postsCountRes?.data?.data?.postsCount

    if (postsCount > 0) {
      const postsRes = await axios.post(API_URL, {
        query: latestPostsGQL,
        variables: {
          orderBy: {
            publishedDate: 'desc',
          },
          take: POST_PER_PAGE,
          skip: (currentPage - 1) * POST_PER_PAGE,
        },
      })
      posts = postsRes?.data?.data?.posts
    }
  } catch (err) {
    console.error('Fetch post data failed!', err)
    notFound()
  }

  const postSummeries: (PostSummary | undefined)[] = Array.isArray(posts)
    ? posts.map((post: any) => {
        return post
          ? {
              image: `${CMS_URL}${post.heroImage?.imageFile?.url}`,
              title: post.title,
              url: `/article/${post.slug}`,
              desc: post.ogDescription,
              category: post.subSubcategories?.subcategory?.name,
              subSubcategory: post.subSubcategories.name,
              publishedDate: post.publishedDate,
              theme: GetThemeFromCategory(
                post.subSubcategories?.subcategory?.name
              ),
            }
          : undefined
      })
    : []

  const totalPages = Math.ceil(postsCount / POST_PER_PAGE)

  return (
    <main className="container">
      <div className="content">
        <img src={'/images/new_article.svg'} />
        <div className="post-list">
          {postSummeries.length > 0 ? (
            postSummeries.map((post, index) => {
              return (
                post && (
                  <PostCard key={`author-post-card-${index}`} post={post} />
                )
              )
            })
          ) : (
            <p>沒有文章</p>
          )}
        </div>
        {totalPages > 0 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    </main>
  )
}
