import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PostList from '@/app/components/post-list'
import Pagination from '@/app/components/pagination'
import {
  DEFAULT_AVATAR,
  GENERAL_DESCRIPTION,
  POST_PER_PAGE,
  POST_CONTENT_GQL,
  KIDS_URL_ORIGIN,
  ContentType,
} from '@/app/constants'
import { getPostSummaries, sendGQLRequest, log, LogLevel } from '@/app/utils'

const authorGQL = `
  query($authorWhere2: AuthorWhereUniqueInput!, $take: Int, $skip: Int!, $orderBy: [PostOrderByInput!]!) {
    author(where: $authorWhere2) {
      bio
      name
      email
      avatar {
        resized {
          tiny
        }
      }
      posts(orderBy: $orderBy, take: $take, skip: $skip) {
        ${POST_CONTENT_GQL}
      }
      postsCount
    }
  }
`

const metaGQL = `
query($where: AuthorWhereUniqueInput!) {
  author(where: $where) {
    slug
    name
    bio
    image {
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
  params: { slug: any }
}): Promise<Metadata> {
  const slug = params.slug?.[0]

  const authorMetaRes = await sendGQLRequest({
    query: metaGQL,
    variables: {
      where: {
        slug: slug,
      },
    },
  })
  const authorMeta = authorMetaRes?.data?.data?.author
  if (!authorMeta) {
    log(LogLevel.WARNING, `Author meta not found! ${slug}`)
  }

  return {
    title: authorMeta.name,
    alternates: {
      canonical: `${KIDS_URL_ORIGIN}/author/${slug}`,
    },
    openGraph: {
      title: authorMeta.name,
      description: authorMeta.bio ?? GENERAL_DESCRIPTION,
      images: authorMeta.image?.resized?.small
        ? [authorMeta.image.resized.small]
        : [],
    },
    other: {
      // Since we can't inject <!-- <PageMap>...</PageMap> --> to <head> section with Next metadata API,
      // so handle google seo with extra <meta> tag here, but be awared there are limitations(maximum 50 tags):
      // https://developers.google.com/custom-search/docs/structured_data?hl=zh-tw#limitations
      contentType: ContentType.AUTHOR,
    },
  }
}

// Author's routing path: /author/[slug]/[page num], ex: /author/yunruchen/1
export default async function Author({ params }: { params: { slug: any } }) {
  const slug = params.slug?.[0]
  const currentPage = !params.slug?.[1] ? 1 : Number(params.slug[1])

  if (params.slug?.length > 2 || !slug || !(currentPage > 0)) {
    log(LogLevel.WARNING, 'Incorrect author routing!')
    notFound()
  }

  const response = await sendGQLRequest({
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
  const author = response?.data?.data?.author
  if (!author) {
    log(LogLevel.WARNING, 'Author not found!')
    notFound()
  }
  const posts = author.posts
  const postsCount = author.postsCount

  const avatarURL = author.avatar?.resized?.tiny ?? DEFAULT_AVATAR

  const totalPages = Math.ceil(postsCount / POST_PER_PAGE)
  if (currentPage > 1 && currentPage > totalPages) {
    log(
      LogLevel.WARNING,
      `Request page(${currentPage}) exceeds total pages(${totalPages})!`
    )
    notFound()
  }

  const postSummeries = getPostSummaries(posts)

  return (
    <main
      style={{ width: '95vw' }}
      className="flex flex-col justify-center items-center mb-10 gap-10"
    >
      <div className="max-w-2xl flex flex-col justify-center items-center pt-10 px-9 bg-white gap-1.5">
        <div className="max-w-44 max-h-44 overflow-hidden object-cover rounded-full mx-auto mb-1.5">
          <img
            className="max-w-44 max-h-44 w-full object-cover"
            src={avatarURL}
            alt={author.name}
            loading="lazy"
          />
        </div>
        <h1
          style={{ lineHeight: '160%', letterSpacing: '.08em' }}
          className="text-center text-xl text-gray-900 font-bold mt-3 mb-9"
        >
          {author.name}
        </h1>
        {author.email && (
          <Link
            style={{
              lineHeight: '160%',
              letterSpacing: '.05em',
              color: 'var(--paletteColor1)',
            }}
            className="text-center not-italic font-medium text-base mb-2"
            href={`mailto:${author.email}`}
          >
            {author.email}
          </Link>
        )}
        <p
          style={{ lineHeight: '200%', letterSpacing: '.05em' }}
          className="text-center not-italic font-normal text-lg text-gray-900 whitespace-pre-wrap"
        >
          {author.bio}
        </p>
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
