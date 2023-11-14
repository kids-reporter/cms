import { Metadata } from 'next'
import axios from 'axios'
import { notFound } from 'next/navigation'
import errors from '@twreporter/errors'
import PostList from '@/app/components/post-list'
import Pagination from '@/app/components/pagination'
import {
  API_URL,
  GENERAL_DESCRIPTION,
  POST_PER_PAGE,
  POST_CONTENT_GQL,
} from '@/app/constants'
import { getPostSummaries, log, LogLevel } from '@/app/utils'
import './page.scss'

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
        log(
          LogLevel.ERROR,
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
    const annotatedErr = errors.helpers.annotateAxiosError(err)
    const msg = errors.helpers.printAll(annotatedErr, {
      withStack: true,
      withPayload: true,
    })
    log(LogLevel.ERROR, msg)
    notFound()
  }

  const postSummeries = getPostSummaries(posts)

  return (
    <main className="container">
      <img className="title-image" src={'/assets/images/new_article.svg'} />
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
