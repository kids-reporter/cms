import { Metadata } from 'next'
import axios from 'axios'
import { notFound } from 'next/navigation'
import PostCard from '@/app/components/post-card'
import Pagination from '@/app/components/pagination'
import { PostSummary } from '@/app/components/types'
import {
  API_URL,
  GENERAL_DESCRIPTION,
  POST_PER_PAGE,
  POST_CONTENT_GQL,
} from '@/app/constants'
import { GetPostSummaries } from '@/app/utils'
import './page.scss'

export const metadata: Metadata = {
  title: '標籤 - 少年報導者 The Reporter for Kids',
  description: GENERAL_DESCRIPTION,
}

const tagGQL = `
query($where: TagWhereUniqueInput!, $take: Int, $skip: Int!, $orderBy: [PostOrderByInput!]!) {
  tag(where: $where) {
    posts(orderBy: $orderBy, take: $take, skip: $skip) {
      ${POST_CONTENT_GQL}
    }
    postsCount
    name
  }
}
`
// Tag's routing path: /tag/[slug]/[page num], ex: /tag/life/1
export default async function Tag({ params }: { params: { slug: any } }) {
  const slug = params.slug?.[0]
  const currentPage = !params.slug?.[1] ? 1 : Number(params.slug[1])

  if (params.slug?.length > 2 || !slug || !(currentPage > 0)) {
    console.error('Incorrect tag routing!')
    notFound()
  }

  let tag, posts, postsCount
  try {
    const response = await axios.post(API_URL, {
      query: tagGQL,
      variables: {
        where: {
          slug: slug,
        },
        orderBy: [
          {
            publishedDate: 'desc',
          },
        ],
        take: POST_PER_PAGE,
        skip: (currentPage - 1) * POST_PER_PAGE,
      },
    })

    tag = response?.data?.data?.tag
    if (!tag) {
      console.error('Tag not found!')
      notFound()
    }
    posts = tag.posts
    postsCount = tag.postsCount
  } catch (err) {
    console.error('Fetch post data failed!', err)
    notFound()
  }

  const totalPages = Math.ceil(postsCount / POST_PER_PAGE)
  if (currentPage > totalPages) {
    console.error(
      `Request page(${currentPage}) exceeds total pages(${totalPages}!`
    )
    notFound()
  }

  const postSummeries: (PostSummary | undefined)[] = GetPostSummaries(posts)

  return (
    <main>
      <div className="info">
        <h1>#{tag.name}</h1>
      </div>
      <div className="post-list">
        {postSummeries.length > 0 ? (
          postSummeries.map((post, index) => {
            return (
              post && <PostCard key={`author-post-card-${index}`} post={post} />
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
          routingPrefix={`/tag/${slug}`}
        />
      )}
    </main>
  )
}
