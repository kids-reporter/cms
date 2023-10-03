import axios from 'axios'
import { notFound } from 'next/navigation'
import PostCard from '@/app/components/post-card'
import Pagination from '@/app/components/pagination'
import { PostSummary } from '@/app/components/types'
import { API_URL, POST_PER_PAGE, POST_CONTENT_GQL } from '@/app/constants'
import { GetPostSummaries } from '@/app/utils'
import './page.scss'

const postsCountGQL = `
query Query {
  postsCount
}
`

const latestPostsGQL = `
query($orderBy: [PostOrderByInput!]!, $take: Int, $skip: Int!) {
  posts(orderBy: $orderBy, take: $take, skip: $skip) {
    ${POST_CONTENT_GQL}
  }
}
`

// TODO: improve posts loading with ajax instead of routing to avoid page reload
// Latest post page's routing path: /all/[page num], ex: /all/1
export default async function LatestPosts({
  params,
}: {
  params: { page: any }
}) {
  const currentPage = !params.page ? 1 : Number(params.page?.[0])

  if (params.page?.length > 1 || !(currentPage > 0)) {
    console.error('Incorrect page!', params.page, currentPage)
    notFound()
  }

  let postsCount, posts, totalPages
  try {
    // Fetch total posts count
    const postsCountRes = await axios.post(API_URL, {
      query: postsCountGQL,
    })
    postsCount = postsCountRes?.data?.data?.postsCount

    if (postsCount > 0) {
      totalPages = Math.ceil(postsCount / POST_PER_PAGE)
      if (currentPage > totalPages) {
        console.error(
          `Request page(${currentPage}) exceeds total pages(${totalPages}!`
        )
        notFound()
      }

      // Fetch posts of specific page
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

  const postSummeries: (PostSummary | undefined)[] = GetPostSummaries(posts)

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
            <h1>沒有文章</h1>
          )}
        </div>
        {totalPages && totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            routingPrefix={'/all'}
          />
        )}
      </div>
    </main>
  )
}
