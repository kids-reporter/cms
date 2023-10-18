import { Metadata } from 'next'
import axios from 'axios'
import { notFound } from 'next/navigation'
import PostCard from '@/app/components/post-card'
import Pagination from '@/app/components/pagination'
import { PostSummary } from '@/app/components/types'
import {
  API_URL,
  CMS_URL,
  DEFAULT_AVATAR,
  POST_PER_PAGE,
  POST_CONTENT_GQL,
} from '@/app/constants'
import { GetPostSummaries } from '@/app/utils'
import './page.scss'

export const metadata: Metadata = {
  title: '工作團隊 - 少年報導者 The Reporter for Kids',
  description:
    '《少年報導者》是由非營利媒體《報導者》針對兒少打造的深度新聞報導品牌，與兒童和少年一起理解世界，參與未來。',
}

const authorGQL = `
  query($authorWhere2: AuthorWhereUniqueInput!, $take: Int, $skip: Int!, $orderBy: [PostOrderByInput!]!) {
    author(where: $authorWhere2) {
      bio
      name
      email
      avatar {
        imageFile {
          url
        }
      }
      posts(orderBy: $orderBy, take: $take, skip: $skip) {
        ${POST_CONTENT_GQL}
      }
      postsCount
    }
  }
`

// Author's routing path: /author/[slug]/[page num], ex: /author/yunruchen/1
export default async function Author({ params }: { params: { slug: any } }) {
  const slug = params.slug?.[0]
  const currentPage = !params.slug?.[1] ? 1 : Number(params.slug[1])

  if (params.slug?.length > 2 || !slug || !(currentPage > 0)) {
    console.error('Incorrect author routing!')
    notFound()
  }

  let author, posts, postsCount
  try {
    const response = await axios.post(API_URL, {
      query: authorGQL,
      variables: {
        authorWhere2: {
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
    author = response?.data?.data?.author
    if (!author) {
      console.error('Author not found!')
      notFound()
    }
    posts = author.posts
    postsCount = author.postsCount
  } catch (err) {
    console.error('Fetch post data failed!', err)
    notFound()
  }

  const avatarURL = author.avatar?.imageFile?.url
    ? `${CMS_URL}${author.avatar.imageFile.url}`
    : DEFAULT_AVATAR

  const totalPages = Math.ceil(postsCount / POST_PER_PAGE)
  if (currentPage > totalPages) {
    console.error(
      `Request page(${currentPage}) exceeds total pages(${totalPages}!`
    )
    notFound()
  }

  const postSummeries: (PostSummary | undefined)[] = GetPostSummaries(posts)

  return (
    <main className="container">
      <div className="info">
        <div className="avatar">
          <img src={avatarURL} alt={author.name} />
        </div>
        <h1>{author.name}</h1>
        {author.email && <a href={`mailto:${author.email}`}>{author.email}</a>}
        <p className="bio">{author.bio}</p>
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
          routingPrefix={`/author/${slug}`}
        />
      )}
    </main>
  )
}
