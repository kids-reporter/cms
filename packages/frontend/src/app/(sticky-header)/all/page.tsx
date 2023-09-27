import axios from 'axios'
import { notFound } from 'next/navigation'
import PostCard from '@/app/components/post-card'
import Pagination from '@/app/components/pagination'
import { PostSummary } from '@/app/components/types'
import { API_URL, CMS_URL, GetThemeFromCategory } from '@/app/constants'
import './page.scss'

const postsPerPage = 9

const postsCountGQL = `
query Query {
  postsCount
}
`

const latestPostsGQL = `
query($orderBy: [PostOrderByInput!]!) {
  posts(orderBy: $orderBy) {
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

export default async function LatestPosts() {
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
        {postsCount > postsPerPage && (
          <Pagination currentPage={1} totalPages={10} />
        )}
      </div>
    </main>
  )
}
