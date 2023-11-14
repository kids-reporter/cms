import { Metadata } from 'next'
import axios from 'axios'
import { notFound } from 'next/navigation'
import errors from '@twreporter/errors'
import PostList from '@/app/components/post-list'
import Pagination from '@/app/components/pagination'
import {
  API_URL,
  CMS_URL,
  DEFAULT_AVATAR,
  GENERAL_DESCRIPTION,
  POST_PER_PAGE,
  POST_CONTENT_GQL,
} from '@/app/constants'
import { getPostSummaries, log, LogLevel } from '@/app/utils'
import './page.scss'

export const metadata: Metadata = {
  title: '工作團隊 - 少年報導者 The Reporter for Kids',
  description: GENERAL_DESCRIPTION,
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
    log(LogLevel.WARNING, 'Incorrect author routing!')
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
      log(LogLevel.WARNING, 'Author not found!')
      notFound()
    }
    posts = author.posts
    postsCount = author.postsCount
  } catch (err) {
    const annotatedErr = errors.helpers.annotateAxiosError(err)
    const msg = errors.helpers.printAll(annotatedErr, {
      withStack: true,
      withPayload: true,
    })
    log(LogLevel.ERROR, msg)
    notFound()
  }

  const avatarURL = author.avatar?.imageFile?.url
    ? `${CMS_URL}${author.avatar.imageFile.url}`
    : DEFAULT_AVATAR

  const totalPages = Math.ceil(postsCount / POST_PER_PAGE)
  if (currentPage > totalPages) {
    log(
      LogLevel.ERROR,
      `Request page(${currentPage}) exceeds total pages(${totalPages}!`
    )
    notFound()
  }

  const postSummeries = getPostSummaries(posts)

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
      <PostList posts={postSummeries} />
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
