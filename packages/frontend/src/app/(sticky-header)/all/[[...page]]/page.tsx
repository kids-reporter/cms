import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import PostList from '@/app/components/post-list'
import Pagination from '@/app/components/pagination'
import {
  GENERAL_DESCRIPTION,
  POST_PER_PAGE,
  POST_CONTENT_GQL,
  ERROR_PAGE,
} from '@/app/constants'
import { getPostSummaries, sendGQLRequest, log, LogLevel } from '@/app/utils'

export const metadata: Metadata = {
  title: '所有文章 - 少年報導者 The Reporter for Kids',
  description: GENERAL_DESCRIPTION,
}

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
    log(LogLevel.WARNING, `Incorrect page!: ${params.page}, ${currentPage}`)
    notFound()
  }

  // Fetch total posts count
  const postsCountRes = await sendGQLRequest({
    query: postsCountGQL,
  })
  if (!postsCountRes) {
    log(LogLevel.WARNING, `Empty post count response!`)
  }
  const postsCount = postsCountRes?.data?.data?.postsCount

  let posts, totalPages
  if (postsCount > 0) {
    totalPages = Math.ceil(postsCount / POST_PER_PAGE)
    if (currentPage > 1 && currentPage > totalPages) {
      log(
        LogLevel.WARNING,
        `Request page(${currentPage}) exceeds total pages(${totalPages})!`
      )
      notFound()
    }

    // Fetch posts of specific page
    const postsRes = await sendGQLRequest({
      query: latestPostsGQL,
      variables: {
        orderBy: {
          publishedDate: 'desc',
        },
        take: POST_PER_PAGE,
        skip: (currentPage - 1) * POST_PER_PAGE,
      },
    })
    if (!postsRes) {
      log(LogLevel.WARNING, `Empty posts response!`)
      redirect(ERROR_PAGE)
    }
    posts = postsRes?.data?.data?.posts
  }

  const postSummeries = getPostSummaries(posts)

  return (
    <main
      style={{ width: '95vw' }}
      className="flex flex-col justify-center items-center mb-10 gap-10"
    >
      <img className="max-w-xl w-full" src={'/assets/images/new_article.svg'} />
      <PostList posts={postSummeries} />
      {totalPages && totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          routingPrefix={'/all'}
        />
      )}
    </main>
  )
}
